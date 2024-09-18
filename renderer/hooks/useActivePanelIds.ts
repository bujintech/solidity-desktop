import { SolidityEditorRouterType } from '@/typings/interface';
import { useRouterState } from '@cyberutopian/hooks';
import { useMemo } from 'react';
import { PrefixEnums } from '../config/config';
import usePrefix from './usePrefix';

const useActivePanelIds = () => {
  const { removePrefix } = usePrefix();

  const [routerState] = useRouterState<SolidityEditorRouterType>();
  // 代码编辑器的tab相关数据
  const { activeKey, items = [] } = routerState.editorTab || {};

  const activeTab = useMemo(() => items.find((v) => v.key === activeKey), [items, activeKey]);

  const projectId = useMemo(() => removePrefix(activeTab?.projectId, PrefixEnums.PROJECT), [activeTab?.projectId]);
  const queryId = useMemo(() => removePrefix(activeTab?.queryId, PrefixEnums.MQL), [activeTab?.queryId]);
  const executionId = useMemo(
    () => removePrefix(activeTab?.executionId, PrefixEnums.HISTORY),
    [activeTab?.executionId],
  );

  return { projectId, queryId, executionId, activeTab };
};

export default useActivePanelIds;
