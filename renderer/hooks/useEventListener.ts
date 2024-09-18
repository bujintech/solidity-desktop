import { SolidityEditorRouterType } from '@/typings/interface';
import { useRouterState } from '@cyberutopian/hooks';
import debounce from 'lodash/debounce';
import { RefObject, useEffect, useState } from 'react';

const useEventListener = (containerRef: RefObject<HTMLDivElement>) => {
  const [_, setState] = useRouterState<SolidityEditorRouterType>();

  // 浏览器可视区宽度高度
  const [clientRect, setClientRect] = useState({
    clientWidth: document.body.clientWidth < 900 ? 900 : document.body.clientWidth,
    clientHeight: document.body.clientHeight,
  });

  useEffect(() => {
    const handleContextmenu = (e: HTMLElementEventMap['contextmenu']) => {
      e.stopPropagation();
      e.preventDefault();
    };

    containerRef.current?.addEventListener('contextmenu', handleContextmenu);
    return () => {
      containerRef.current?.removeEventListener('contextmenu', handleContextmenu);
    };
  }, []);

  useEffect(() => {
    const resizeCallback = debounce(() => {
      // 最小宽度1200
      setClientRect({
        clientWidth: document.body.clientWidth < 900 ? 900 : document.body.clientWidth,
        clientHeight: document.body.clientHeight,
      });
    }, 200);

    window.addEventListener('resize', resizeCallback);
    return () => {
      window.removeEventListener('resize', resizeCallback);
    };
  }, []);

  useEffect(() => {
    const clickCallback = () => {
      setState((v) => ({
        ...v,
        navigate: { ...v.navigate, floatVisible: false },
      }));
    };

    containerRef.current?.addEventListener('click', clickCallback);
    return () => {
      containerRef.current?.removeEventListener('click', clickCallback);
    };
  }, []);

  return { clientRect };
};

export default useEventListener;
