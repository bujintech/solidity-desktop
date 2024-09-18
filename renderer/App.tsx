import FileEntry from '@/core/file-entry';
import FloatInput from '@/core/float-input';
import Navigate from '@/core/navigate';
import StateEntry from '@/core/state-entry';
import useEventListener from '@/hooks/useEventListener';
import { useRouterState } from '@cyberutopian/hooks';
import { Fragment, useMemo, useRef } from 'react';
import './app.scss';
import { SolidityEditorRouterType } from './typings/interface';

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [state] = useRouterState<SolidityEditorRouterType>({
    navigate: {
      key: 'file',
      floatVisible: false,
    },
    editorTab: {
      items: [],
    },
    leftPanel: {
      openKeys: [],
    },
  });

  const {
    clientRect: { clientHeight, clientWidth },
  } = useEventListener(containerRef);

  const contentWidth = useMemo(() => clientWidth - 48 - 1, [clientWidth]);

  return (
    <Fragment>
      <FloatInput />
      <section className="relative h-full bg-text-1" ref={containerRef}>
        <div className="flex" style={{ height: `${clientHeight}px` }}>
          <Navigate className="w-[48px]" />
          {state.navigate.key === 'file' ? (
            <FileEntry clientWidth={contentWidth} clientHeight={clientHeight} />
          ) : (
            <StateEntry clientWidth={contentWidth} clientHeight={clientHeight} />
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default App;
