// import { UseFetchReturnType, cyberFetch } from '@/service';
import { EditorTabItemType, FileListType, SolidityEditorRouterType } from '@/typings/interface';
import { useRouterState } from '@cyberutopian/hooks';
import { Dispatch, SetStateAction } from 'react';
import useLeftPanelIds from './useLeftPanelIds';
import usePrefix from './usePrefix';

const useMqlHandler = (
  dataSource: FileListType,
  setDataSource: Dispatch<SetStateAction<FileListType>>,
  // sendRequest: UseFetchReturnType['sendRequest'],
  sendRequest: any,
) => {
  const [routerState, setRouterState] = useRouterState<SolidityEditorRouterType>();
  const { leftPanel, editorTab, resourceOption } = routerState;

  const { addPrefix, addSuffix } = usePrefix();

  const { projectId, queryId } = useLeftPanelIds();

  const resetMqlOption = () =>
    setRouterState((v) => ({
      ...v,
      resourceOption: undefined, // 重置mql操作项状态
    }));

  const getNewEditorItems = ({
    queryId,
    projectId,
    queryName,
  }: {
    queryId: string;
    projectId: string;
    queryName: string;
  }) => {
    const params: EditorTabItemType = {
      key: queryId,
      icon: 'icon-MQLwenjian',
      fileName: queryName,
      projectId: projectId,
      queryId: queryId,
      type: 'mql',
      readOnly: false,
    };

    const exist = editorTab?.items.some((v) => v.key === params.key);
    return exist ? editorTab?.items.map((v) => (v.key === params.key ? params : v)) : editorTab?.items.concat(params);
  };

  // 新增mql的请求
  const createMqlRequest = async (queryName: string) => {
    // const result = await cyberFetch['PUT/api/v1/query/:projectId/add']({
    //   url: `/api/v1/query/${projectId}/add`,
    //   req: { queryName: addSuffix(queryName) },
    // });
    // await sendRequest();
    // if (result.code === '200') {
    //   const { queryId: qId, queryName: qName, projectId: pId } = result.data;
    //   const queryKey = addPrefix(qId, PrefixEnums.MQL);
    //   const projectKey = addPrefix(pId, PrefixEnums.PROJECT);
    //   setRouterState((v) => ({
    //     ...v,
    //     editorTab: {
    //       ...v.editorTab,
    //       items: getNewEditorItems({ queryId: queryKey, queryName: qName, projectId: projectKey }),
    //       activeKey: queryKey,
    //       readOnly: false,
    //     },
    //     leftPanel: { ...v.leftPanel, activeKey: queryKey, projectId: projectKey, queryId: queryKey },
    //   }));
    // }
  };

  // 编辑mql的请求
  const editMqlRequest = async (queryName: string) => {
    // const result = await cyberFetch['POST/api/v1/query/:projectId/:queryId/save']({
    //   url: `/api/v1/query/${projectId}/${queryId}/save`,
    //   req: { queryName: addSuffix(queryName), saveType: 'name' },
    // });
    // await sendRequest();
    // if (result.code === '200') {
    //   const { queryId: qId, queryName: qName, projectId: pId } = result.data;
    //   const queryKey = addPrefix(qId, PrefixEnums.MQL);
    //   const projectKey = addPrefix(pId, PrefixEnums.PROJECT);
    //   setRouterState((v) => ({
    //     ...v,
    //     editorTab: {
    //       ...v.editorTab,
    //       readOnly: false,
    //       items: getNewEditorItems({ queryId: queryKey, queryName: qName, projectId: projectKey }),
    //       activeKey: queryKey,
    //     },
    //     leftPanel: { ...v.leftPanel, activeKey: queryKey, projectId: projectKey, queryId: queryKey },
    //   }));
    // }
  };

  // 保存mql
  const handleSaveMql = async (v: string | undefined, type: string) => {
    // if (!v || !trim(v)) {
    //   const newData = dataSource.map((v) => {
    //     if (v.key === leftPanel?.projectId) {
    //       const child = v.children.filter((i) => !i.type && i.type !== 'create');
    //       return { ...v, children: child };
    //     }
    //     return v;
    //   });
    //   setDataSource(newData as FileListType);
    // } else if (type === 'create') {
    //   await createMqlRequest(v);
    // } else if (type === 'edit') {
    //   await editMqlRequest(v);
    // }
    // return resetMqlOption();
  };

  // 创建mql
  const handleCreate = () => {
    // const key = dayjs().valueOf();
    // const newData = dataSource.map((v) => {
    //   if (v.key === leftPanel?.projectId) {
    //     const child = v.children || [];
    //     const hasCreate = child?.some((v) => v.type && v.type === 'create') || false;
    //     return {
    //       ...v,
    //       children: hasCreate ? child : [{ key, label: '', isLeaf: true, type: 'create' }, ...child],
    //     };
    //   }
    //   return v;
    // });
    // setDataSource(newData as FileListType);
    // setRouterState((v) => ({
    //   ...v,
    //   leftPanel: {
    //     ...v.leftPanel,
    //     openKeys: v.leftPanel.openKeys.concat(v.leftPanel.projectId as number),
    //     activeKey: key,
    //   },
    // }));
  };

  // 删除mql
  const handleDelete = async () => {
    // const result = await cyberFetch['DELETE/api/v1/query/:projectId/:queryId/delete']({
    //   url: `/api/v1/query/${projectId}/${queryId}/delete`,
    // });
    // if (result.code === '200') {
    //   message.success('删除成功');
    //   sendRequest();
    //   const list = editorTab.items.filter((v) => v.key !== resourceOption?.key);
    //   let params = {
    //     activeKey: editorTab.activeKey,
    //     projectId: leftPanel?.projectId,
    //     queryId: leftPanel?.queryId,
    //   };
    //   // 删除的是当前高亮的mql时
    //   if (editorTab.activeKey === resourceOption?.key) {
    //     const nextAct = list.at(0);
    //     params = { activeKey: nextAct?.key as string, projectId: nextAct?.projectId, queryId: nextAct?.queryId };
    //   }
    //   setRouterState((v) => ({
    //     ...v,
    //     editorTab: { ...v.editorTab, items: list, activeKey: params.activeKey },
    //     leftPanel: {
    //       ...v.leftPanel,
    //       activeKey: params.activeKey,
    //       projectId: params.projectId,
    //       queryId: params.queryId,
    //     },
    //   }));
    // }
    // return resetMqlOption();
  };

  // 创建mql副本
  const handleCopy = async () => {
    // const result = await cyberFetch['POST/api/v1/query/:projectId/:queryId/copy']({
    //   url: `/api/v1/query/${projectId}/${queryId}/copy`,
    // });
    // if (result.code === '200') {
    //   message.success('MQL副本生成成功');
    //   sendRequest();
    // }
    // return resetMqlOption();
  };

  // 重命名mql
  const handleEdit = async () => {
    // if (!leftPanel?.activeKey) return;
    // const newData = dataSource.map((v) => {
    //   if (v.key === leftPanel.projectId) {
    //     const child = (v.children || []).map((ie) => {
    //       return ie.key === leftPanel.queryId ? { ...ie, type: 'edit' } : ie;
    //     });
    //     return { ...v, children: child };
    //   }
    //   return v;
    // });
    // setDataSource(newData as FileListType);
  };

  return { handleCreate, handleSaveMql, handleDelete, handleCopy, handleEdit, getNewEditorItems };
};

export default useMqlHandler;
