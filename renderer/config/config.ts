import { colorsEnums } from '@/specific/enums';
import { ContentOptionsListType, NavigateListType } from '@/typings/interface';
import { ContextmenuListType } from '@cyberutopian/components/dist/contextmenu/interface';
import { SolidityStateContextmenuEnum } from './enums';

// 项目MQL内容的高度配置
export const INITIAL_MQL_LIST_HEIGHT = 560;
export const INITIAL_MIN_MQL_LIST_HEIGHT = 400;
export const OFFSET_MQL_LIST_HEIGHT = 100;

// 左侧列内容的宽度配置
export const INITIAL_LEFT_WIDTH = 310;
export const OFFSET_LEFT_WIDTH = 200;

// 查询台内容高度配置
export const INITIAL_MAIN_HEIGHT = 200;
export const OFFSET_MAIN_HEIGHT = 100;
// 执行结果bar高度
export const EXECUTE_BAR_HEIGHT = 35;
// 执行结果，列表区域宽度
export const INITIAL_EXECUTE_TABLE_WIDTH = 500;
export const OFFSET_EXECUTE_TABLE_WIDTH = 200;

// 菜单宽度
export const NAVIGATE_WIDTH = 48;

// 执行历史activeKey前缀
export const historyPrefix = 'e';
// 项目mql activeKey前缀
export const mqlPrefix = 'm';
// 项目 activeKey前缀
export const projectPrefix = 'p';

// 列表需要添加前缀来区分同一个id时的冲突
export enum PrefixEnums {
  HISTORY = 'h',
  MQL = 'm',
  PROJECT = 'p',
}

// 菜单列表
export const navigateList: NavigateListType[] = [
  {
    key: 'file',
    label: '文件树',
    icon: 'icon-wenjian',
  },
  {
    key: 'state',
    label: '钱包',
    icon: 'icon-chufa',
  },
];

// 项目右键菜单项
export const projectContextmenuList: ContextmenuListType[] = [
  {
    key: 'create',
    label: '新建MQL',
  },
  {
    key: 'reload',
    label: '刷新',
  },
];

// mql右键菜单项
export const mqlContextmenuList: ContextmenuListType[] = [
  {
    key: 'copy',
    label: '复制生成mql副本',
  },
  {
    key: 'edit',
    label: '重命名',
  },
  {
    key: 'line',
    type: 'divider',
  },
  {
    key: 'delete',
    label: '删除',
    danger: true,
  },
];

// mql执行历史
export const historyContextmenuList: ContextmenuListType[] = [
  {
    key: 'copy',
    label: '复制生成mql副本',
  },
  {
    key: 'reload',
    label: '刷新',
  },
  {
    key: 'line',
    type: 'divider',
  },
  {
    key: 'delete',
    label: '删除',
    danger: true,
  },
];

// editor tabs contextmenu
export const editorTabsContextmenuList: ContextmenuListType[] = [
  {
    key: SolidityStateContextmenuEnum.SAVE,
    label: '保存',
  },
  {
    key: SolidityStateContextmenuEnum.COPY,
    label: '复制内容',
  },
  {
    key: 'line',
    type: 'divider',
  },
  {
    key: SolidityStateContextmenuEnum.CLOSE_SAVE,
    label: '关闭并保存',
  },
  {
    key: SolidityStateContextmenuEnum.CLOSE_ALL,
    label: '关闭所有',
  },
  {
    key: SolidityStateContextmenuEnum.CLOSE_OTHERS,
    label: '关闭其他',
  },
];

export const optionsList: ContentOptionsListType[] = [
  {
    key: 'save',
    icon: 'icon-baocun1',
    color: colorsEnums['fill-9'],
    label: '保存',
  },
  {
    key: 'execute',
    icon: 'icon-zhihangsaomiao',
    color: colorsEnums['success'],
    label: '执行',
  },
  {
    key: 'stop',
    icon: 'icon-tingzhisaomiao',
    color: colorsEnums['error-active'],
    label: '停止',
  },
  {
    key: 'change',
    icon: 'icon-guizeguanli',
    color: colorsEnums['fill-9'],
    label: '切换',
  },
];
