import { editorTabsContextmenuList, PrefixEnums } from '@/config/config';
import { SolidityStateContextmenuEnum } from '@/config/enums';
import { useSolidityEditorContext } from '@/context';
import usePrefix from '@/hooks/usePrefix';
import { SolidityEditorRouterType } from '@/typings/interface';
import { Contextmenu, Tabs } from '@cyberutopian/components';
import { ContextmenuListType } from '@cyberutopian/components/dist/contextmenu/interface';
import { TabsItemOptionType, TabsItemType } from '@cyberutopian/components/dist/tabs/interface';
import { useRouterState } from '@cyberutopian/hooks';
import { useMemo, useState } from 'react';

const TabsBar = () => {
  const [routerState, setRouterState] = useRouterState<SolidityEditorRouterType>();
  // 代码编辑器的tab相关数据
  const { activeKey = '', items = [] } = routerState.editorTab || {};

  const { removePrefix } = usePrefix();
  const { shouldLeave, cacheRef, leavePromiseRef } = useSolidityEditorContext();

  // 右键菜单点击的数据
  const [contextData, setContextData] = useState<{ type?: string; key?: string }>();
  // 右键菜单选项list
  const contextmenu = useMemo(
    () =>
      contextData
        ? contextData.type === 'history'
          ? editorTabsContextmenuList.filter(
              (v) => v.key !== SolidityStateContextmenuEnum.SAVE && v.key !== SolidityStateContextmenuEnum.CLOSE_SAVE,
            )
          : editorTabsContextmenuList
        : [],
    [contextData],
  );

  const changeActiveKey: TabsItemOptionType['onChange'] = (key, data) => {
    if (!shouldLeave()) return;

    setRouterState((v) => ({
      ...v,
      editorTab: {
        ...v.editorTab,
        activeKey: key,
      },
      leftPanel: {
        ...v.leftPanel,
        ...data,
        projectId: data.projectId,
        queryId: data.queryId,
        executionId: data.executionId,
        activeKey: key as string,
        focusKey: data.type === 'history' ? data.queryId : undefined,
        openKeys: (v.leftPanel?.openKeys || []).concat(data.projectId),
      },
    }));
  };

  const onCloseTab: TabsItemOptionType['onCloseTab'] = (key) => {
    if (!shouldLeave()) return;

    Reflect.deleteProperty(cacheRef.current, key);

    const its = items?.filter((v) => v.key !== key);
    const nextAct = its?.[its.length - 1] || {};

    // 关闭的是自己
    if (activeKey === key && nextAct.key) {
      changeActiveKey(nextAct?.key, nextAct);
    }

    const notFile = nextAct.type !== 'file';

    setRouterState((v) => ({
      ...v,
      editorTab: { ...v.editorTab, items: its, activeKey: nextAct.key as string, readOnly: !!nextAct.executionId },
      execute: notFile
        ? {
            executionId: removePrefix(nextAct.executionId, PrefixEnums.HISTORY) as unknown as string,
          }
        : undefined,
    }));
  };

  const handleSaveMql = async (data: TabsItemType, mql: string) => {
    const proId = removePrefix(data.projectId, PrefixEnums.PROJECT);
    const quId = removePrefix(data.queryId, PrefixEnums.MQL);

    // const result = await cyberFetch['POST/api/v1/query/:projectId/:queryId/save']({
    //   url: `/api/v1/query/${proId}/${quId}/save`,
    //   req: {
    //     mqlText: mql,
    //     queryName: data.fileName,
    //     saveType: 'mql',
    //   },
    // });

    // if (result.code === '200') {
    //   message.success('您的更改已保存成功');
    //   leavePromiseRef.current = true;
    // }
  };

  const handleSelect = async (context: ContextmenuListType) => {
    if (!contextData?.key) return;

    const data = items.find((v) => v.key === contextData.key);
    if (!data) return;

    switch (context.key) {
      case SolidityStateContextmenuEnum.SAVE:
        return handleSaveMql(data, cacheRef.current[contextData.key]);
      case SolidityStateContextmenuEnum.CLOSE_SAVE:
        // 关闭
        await handleSaveMql(data, cacheRef.current[contextData.key]);
        return onCloseTab(contextData.key, {} as any);
      case SolidityStateContextmenuEnum.CLOSE_ALL:
        cacheRef.current = {};
        setRouterState((v) => ({
          ...v,
          editorTab: { items: [], activeKey: undefined, readOnly: undefined }, // 重置
        }));
        break;
      case SolidityStateContextmenuEnum.CLOSE_OTHERS:
        // eslint-disable-next-line no-case-declarations
        const its = items.filter((v) => v.key === contextData.key);

        cacheRef.current = {
          [contextData.key]: cacheRef.current[contextData.key],
        };

        setRouterState((v) => ({
          ...v,
          editorTab: { ...v.editorTab, items: its }, // 重置
        }));
        changeActiveKey(its[0].key, its[0]);
        break;
      default:
        break;
    }
  };

  const getNodeAttribute = (node: HTMLElement, name: string): string | undefined => {
    const data = node.getAttribute(name);

    return data ? data : node.parentElement ? getNodeAttribute(node.parentElement, name) : undefined;
  };

  const handleContext = (e: MouseEvent) => {
    const type = getNodeAttribute(e.target as HTMLElement, 'data-type');
    const key = getNodeAttribute(e.target as HTMLElement, 'data-key');

    if (!type || !key) {
      return false;
    }
    setContextData({ type, key });
  };

  return (
    <Contextmenu data={contextmenu} handleContext={handleContext} handleSelect={handleSelect}>
      {(ref) => (
        <Tabs
          className="pr-[15px] box-content"
          style={{ width: `calc(100% - 15px)` }}
          tabsRef={ref}
          items={items}
          activeKey={activeKey}
          onChange={changeActiveKey}
          onCloseTab={onCloseTab}
        />
      )}
    </Contextmenu>
  );
};

export default TabsBar;
