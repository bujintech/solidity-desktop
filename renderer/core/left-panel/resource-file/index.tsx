import { ProjectMqlProvider, useSolidityEditorContext } from '@/context';
import useFileList from '@/hooks/useFileList';
import { EditorTabItemType, FileListType, SolidityEditorRouterType, ToggleEventObjType } from '@/typings/interface';
import { ContextmenuListType } from '@cyberutopian/components/dist/contextmenu/interface';
import { useRouterState, useScrollShadow } from '@cyberutopian/hooks';
import { FC, memo, useEffect } from 'react';
import EmptyContent from './empty-content';
import ProjectFileList from './project-mql-list';

const WrapperFileList: FC<{ className: string; dataSource: FileListType }> = ({
  className,
  dataSource,
  // setDataSource,
  // sendRequest,
}) => {
  const { wrapperRef } = useScrollShadow(40);
  const [routerState, setRouterState] = useRouterState<SolidityEditorRouterType>();
  const { resourceOption } = routerState || {};

  // // mql新增逻辑
  // const { handleCreate, handleSaveMql, handleDelete, handleCopy, handleEdit, getNewEditorItems } = useMqlHandler(
  //   dataSource,
  //   setDataSource,
  //   sendRequest,
  // );

  const { shouldLeave } = useSolidityEditorContext();

  // 订阅mql的操作项
  useEffect(() => {
    if (!resourceOption) {
      return;
    }

    // if (resourceOption.type === 'delete') {
    //   handleDelete();
    // }
    // if (resourceOption.type === 'create') {
    //   handleCreate();
    // }
    // if (resourceOption.type === 'reload') {
    //   sendRequest().finally(() => {
    //     setRouterState((v) => ({
    //       ...v,
    //       resourceOption: undefined, // 重置mql操作项状态
    //     }));
    //   });
    // }
    // if (resourceOption.type === 'copy') {
    //   handleCopy();
    // }
    // if (resourceOption.type === 'edit') {
    //   handleEdit();
    // }
  }, [resourceOption]);

  const handleSaveMql = () => {};

  // 点击选择项目或mql
  const toggleGroup = (id: string, open: boolean, isLeaf: boolean, obj: ToggleEventObjType) => {
    if (!shouldLeave()) return;

    const params: EditorTabItemType = {
      key: id,
      id,
      icon: 'icon-MQLwenjian',
      fileName: obj.label,
      type: 'file',
      readOnly: false,
      state: false,
    };
    const exist = routerState.editorTab?.items.some((v) => v.key === params.key);
    const items = exist
      ? routerState.editorTab?.items.map((v) => (v.key === params.key ? params : v))
      : routerState.editorTab?.items.concat(params);

    setRouterState((v) => ({
      ...v,
      editorTab: {
        ...v.editorTab,
        readOnly: isLeaf ? false : v.editorTab.readOnly,
        activeKey: isLeaf ? id : v.editorTab.activeKey,
        items: isLeaf ? items : v.editorTab.items,
      },
      leftPanel: {
        activeKey: id,
        projectId: isLeaf ? obj.parentId : id,
        queryId: isLeaf ? id : undefined,
        openKeys: isLeaf
          ? v?.leftPanel?.openKeys
          : open
            ? v?.leftPanel?.openKeys.concat(id)
            : v?.leftPanel?.openKeys.filter((i: string) => i !== id),
      },
    }));
  };

  // 触发右键菜单选项
  const handleSelectContextmenu = (data: ContextmenuListType, target: ToggleEventObjType) => {
    const { key, parentId, isLeaf } = target;

    setRouterState((v) => ({
      ...v,
      resourceOption: { key, type: data.key },
      leftPanel: {
        openKeys: v.leftPanel.openKeys.concat(parentId as string),
        activeKey: data.key === 'edit' ? v.leftPanel.activeKey : key,
        projectId: isLeaf ? parentId : key,
        queryId: isLeaf ? key : undefined,
      },
    }));
  };

  return (
    <ProjectMqlProvider value={{ toggleGroup, handleSaveMql, handleSelectContextmenu }}>
      <div className={'text-14 text-text-8 my-[8px] pl-[4px] pr-[4px] ' + className} ref={wrapperRef}>
        <ProjectFileList data={dataSource} />
      </div>
    </ProjectMqlProvider>
  );
};

const ProjectMql: FC<{ className: string }> = ({ className }) => {
  const { dataSource } = useFileList();

  return dataSource.length ? <WrapperFileList className={className} dataSource={dataSource} /> : <EmptyContent />;
};

export default memo(ProjectMql);
