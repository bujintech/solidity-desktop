import { ProjectMqlContextType } from '@/typings/interface';
import { AbiItem } from '@/typings/solidity-state';
import { createContext } from '@cyberutopian/hooks';
import { MutableRefObject } from 'react';

export const [SolidityEditorProvider, useSolidityEditorContext, Context] = createContext<SolidityEditorContextType>();

interface SolidityEditorContextType {
  /** @param 标签切换允许控制器 */
  leavePromiseRef: MutableRefObject<boolean>;
  /** @param 标签切换 */
  shouldLeave: () => boolean;
  /** @param 存储已打开的mql内容 */
  cacheRef: MutableRefObject<Record<string, string>>;
}

export const [ProjectMqlProvider, useProjectMqlContext, ProjectMqlContext] = createContext<ProjectMqlContextType>();

interface SolidityStateContextType {
  address?: string;
  abi?: AbiItem[];
}

export const [SolidityStateProvider, useSolidityStateContext, SolidityStateContext] =
  createContext<SolidityStateContextType>();
