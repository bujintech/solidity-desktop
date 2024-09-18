import { IIcons } from '@/icon';
import { ContextmenuListType } from '@cyberutopian/components/dist/contextmenu/interface';
import { TabsItemType } from '@cyberutopian/components/dist/tabs/interface';
import { AbiItem } from './solidity-state';

export interface EditorTabItemType extends TabsItemType {
  id: string;
  type: 'file' | 'state';
  readOnly: boolean;
  state: boolean;
}

export interface SolidityEditorRouterType {
  navigate: {
    key: string;
    floatVisible: boolean;
  };
  solidity?: {
    abi: AbiItem[];
    contract: string;
    address: string;
    contractName: string;
    evm: string;
    compilerVersion: string;
  };
  /** @params 当前操作选项 */
  resourceOption?: {
    /** @param 当前mql操作的id */
    key: number;
    /** @param 当前mql操作的类型 */
    type: string;
  };
  /** @params 左侧面板状态 */
  leftPanel?: {
    /** @param 项目Id */
    projectId?: string;
    /** @param mql prefix-id */
    queryId?: string;
    /** @param 高亮mql、执行历史  */
    activeKey?: string;
    /** @param 聚焦 */
    focusKey?: string;
    /** @param 历史id */
    executionId?: string;
    /** @param 打开的项目 */
    openKeys: string[];
  };
  /** @params 执行结果面板状态 */
  execute?: {
    /** @param 执行id */
    executionId?: string;
    /** @param 执行结果数量 */
    resultLength?: number;
    /** @param 时间 */
    time?: string;
  };
  /** @param 编辑器 tab  */
  editorTab: {
    /** @param 高亮 tab/问题ID  */
    activeKey?: string;
    /** @param 编辑器 tab 数据 */
    items: EditorTabItemType[];
  };
  /** @params 重新加载配置 */
  reload?: {
    /** @param 强制更新mql列表 */
    mql: boolean;
    /** @param 强制更新当前mql历史 */
    history: boolean;
  };
}

export type FileListType = {
  key: string;
  label: string;
  children: {
    key: string;
    label: string;
    isLeaf: boolean;
    type?: 'create' | 'edit';
  }[];
}[];

export type ToggleEventObjType = Omit<FileListType[0], 'children'> & {
  isLeaf: boolean;
  parentId?: string;
};

export interface ProjectMqlContextType {
  handleSaveMql: (v: string | undefined, type: string) => void;
  toggleGroup: (v: string, o: boolean, l: boolean, obj: ToggleEventObjType) => void;
  handleSelectContextmenu: (v: ContextmenuListType, obj: ToggleEventObjType) => void;
}

export interface ExecutePanelContextType {
  height: number;
  handleToggleExecutePanel: () => void;
}

// MQL执行历史列表
export type HistoryListType = Array<any>;
// export type HistoryListType = Array<
//   Omit<
//     ResponseModelsType['GET/api/v1/query/:projectId/:queryId/execution']['data'][0],
//     'executionId' | 'projectId' | 'queryId'
//   > & {
//     executionId: string;
//     projectId: string;
//     queryId: string;
//   }
// >;
export type HistoryContextmenuDataType = HistoryListType[0] & { activeKey?: string };

// 编辑器操作按钮list
export interface ContentOptionsListType {
  key: string;
  icon: IIcons;
  color: string;
  label: string;
}

export type NavigateListType = {
  key: 'file' | 'state';
  label: string;
  icon: IIcons;
};
