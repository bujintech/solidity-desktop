import { useRouterState } from '@cyberutopian/hooks';
import { useMemo } from 'react';
import { PrefixEnums } from '../config/config';
import { SolidityEditorRouterType } from '../pages/solidity-editor/interface';
import usePrefix from './usePrefix';

const useLeftPanelIds = () => {
  const { removePrefix } = usePrefix();

  const [routerState] = useRouterState<SolidityEditorRouterType>();

  const projectId = useMemo(
    () => removePrefix(routerState.leftPanel?.projectId, PrefixEnums.PROJECT),
    [routerState.leftPanel?.projectId],
  );
  const queryId = useMemo(
    () => removePrefix(routerState.leftPanel?.queryId, PrefixEnums.MQL),
    [routerState.leftPanel?.queryId],
  );
  const executionId = useMemo(
    () => removePrefix(routerState.leftPanel?.executionId, PrefixEnums.HISTORY),
    [routerState.leftPanel?.executionId],
  );

  return { projectId, queryId, executionId };
};

export default useLeftPanelIds;
