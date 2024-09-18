import { INITIAL_MIN_MQL_LIST_HEIGHT, INITIAL_MQL_LIST_HEIGHT } from '@/config/config';
import { CSSProperties, FC, memo, useMemo, useState } from 'react';
import PanelContent from './panel-content';

const LeftPanel: FC<{ className: string; style?: CSSProperties; height: number; width: number }> = ({
  className,
  style,
  height: wrapperHeight,
  width,
}) => {
  const initMqlHeight = useMemo(
    () => (wrapperHeight < 680 ? INITIAL_MIN_MQL_LIST_HEIGHT : INITIAL_MQL_LIST_HEIGHT),
    [wrapperHeight],
  );
  // 项目mql区块高度
  const [height, setHeight] = useState(() => initMqlHeight);

  // const handleChangeVerticalLine = (h: number) => {
  //   setHeight(h);
  // };

  return (
    <section
      className={'relative reset-border border-r-[1px] h-full ' + className}
      style={{ ...style, width: `${width}px` }}
    >
      <PanelContent contentHeight={wrapperHeight - 6} mqlHeight={height} width={width} />
      {/* <VerticalDragLine
        initHeight={initMqlHeight}
        offsetHeight={OFFSET_MQL_LIST_HEIGHT}
        onChange={handleChangeVerticalLine}
      /> */}
    </section>
  );
};

export default memo(LeftPanel);
