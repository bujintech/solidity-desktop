// import { UseFetchReturnType, useCyberFetch } from '@/service';
import { FileListType, SolidityEditorRouterType } from '@/typings/interface';
import { useRouterState } from '@cyberutopian/hooks';
import { useMemo } from 'react';

export interface UseFileListReturnType {
  // loading: boolean;
  dataSource: FileListType;
  // setDataSource: Dispatch<SetStateAction<FileListType>>;
  // sendRequest: UseFetchReturnType['sendRequest'];
  // sendRequest: any;
}
const useFileList = () => {
  const [state] = useRouterState<SolidityEditorRouterType>();

  const dataSource: FileListType = useMemo(() => {
    const { contract, abi, ...rest } = state.solidity || {};
    if (!contract) {
      return [];
    }

    return [
      {
        key: state.solidity?.address!,
        label: state.solidity?.address!,
        children: [
          {
            key: `${state.solidity?.address}-${state.solidity?.contractName}`!,
            label: state.solidity?.contractName!,
            isLeaf: true,
          },
        ],
      },
    ];
  }, [state.solidity]);
  // // 项目mql列表
  // const { data, sendRequest, loading } = useCyberFetch['GET/api/v1/query/list']({});

  // // 项目\mql的前缀逻辑
  // const { addPrefix } = usePrefix();

  // useEffect(() => {
  //   const list = (data || []).map((v) => {
  //     const key = addPrefix(v.key, PrefixEnums.PROJECT);
  //     if (v.children) {
  //       const child = v.children.map((ie) => ({ ...ie, key: addPrefix(ie.key, PrefixEnums.MQL) }));
  //       return { ...v, key, children: child };
  //     }
  //     return { ...v, key };
  //   });
  //   setDataSource(list as FileListType);
  // }, [data]);

  return { dataSource };
};

export default useFileList;
