import { SolidityEditorRouterType } from '@/typings/interface';
import { useRouterState } from '@cyberutopian/hooks';
import { CSSProperties, FC, memo } from 'react';
import EmptyContent from './empty-content';
import PanelContent from './panel-content';

const ContentPanel: FC<{ className: string; style?: CSSProperties; width: number; height: number }> = ({
  className,
  style,
  width,
  height,
}) => {
  const [routerState] = useRouterState<SolidityEditorRouterType>();
  // 代码编辑器的tab相关数据
  const { items = [] } = routerState.editorTab || {};

  return (
    <section className={'flex flex-col bg-text-1 ' + className} style={style}>
      {items.length ? <PanelContent width={width} height={height} /> : <EmptyContent />}
    </section>
  );
};

export default memo(ContentPanel);
