import { HorizontalDragLine } from '@/components/drag-line';
import { INITIAL_LEFT_WIDTH, NAVIGATE_WIDTH, OFFSET_LEFT_WIDTH } from '@/config/config';
import { SolidityEditorProvider } from '@/context';
import ContentPanel from '@/core/content-panel';
import LeftPanel from '@/core/left-panel';
import { FC, useMemo, useRef, useState } from 'react';

const FileEntry: FC<{ clientWidth: number; clientHeight: number }> = ({ clientWidth, clientHeight }) => {
  const leavePromiseRef = useRef(true);
  const cacheRef = useRef<Record<string, string>>({});

  const [width, setWidth] = useState(INITIAL_LEFT_WIDTH);

  const contentWidth = useMemo(() => clientWidth - width - 1, [clientWidth, width]);

  // 切换mql
  const shouldLeave = () => {
    if (leavePromiseRef.current) {
      leavePromiseRef.current = true;
      return true;
    }
    // message.warning('mql内容已变更，请先保存');
    return false;
  };

  // 左侧panel的拖拽
  const handleChangeHorizontalLine = (w: number) => {
    setWidth(w - NAVIGATE_WIDTH);
  };

  return (
    <SolidityEditorProvider value={{ leavePromiseRef, shouldLeave, cacheRef }}>
      <div className="flex" style={{ height: `${clientHeight}px` }}>
        <LeftPanel className={'w-auto'} height={clientHeight} width={width} />
        <ContentPanel
          className={'h-full w-full'}
          width={contentWidth}
          height={clientHeight}
          style={{ width: `${contentWidth}px`, height: `${clientHeight}px` }}
        />
        <HorizontalDragLine
          style={{ height: `${clientHeight}px` }}
          position={{ x: NAVIGATE_WIDTH, y: 0 }}
          initWidth={INITIAL_LEFT_WIDTH}
          offsetWidth={OFFSET_LEFT_WIDTH}
          onChange={handleChangeHorizontalLine}
        />
      </div>
    </SolidityEditorProvider>
  );
};

export default FileEntry;
