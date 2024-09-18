import { EditorTabItemType, SolidityEditorRouterType } from '@/typings/interface';
import { useRouterState } from '@cyberutopian/hooks';
import useActivePanelIds from './useActivePanelIds';

const useOptionBarHandler = () => {
  const [_, setState] = useRouterState<SolidityEditorRouterType>();
  const { activeTab } = useActivePanelIds();

  const handleTogglePanel = () => {
    setState((v) => ({
      ...v,
      editorTab: {
        ...v.editorTab,
        items: v.editorTab.items.map((it: EditorTabItemType) => ({
          ...it,
          state: it.id === activeTab?.id ? !it.state : it.state,
        })),
      },
    }));
  };

  return { handleTogglePanel };
};

export default useOptionBarHandler;
