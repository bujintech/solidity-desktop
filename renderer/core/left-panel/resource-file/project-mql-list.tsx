import { FileListType, SolidityEditorRouterType } from '@/typings/interface';
import { useRouterState } from '@cyberutopian/hooks';
import { FC } from 'react';
import ProjectMqlItem from './project-mql-item';

const ProjectFileList: FC<{
  parentId?: string;
  data: FileListType;
}> = ({ data, parentId }) => {
  const [routerState] = useRouterState<SolidityEditorRouterType>();
  const { leftPanel } = routerState;

  return (
    <ul className="select-none text-text-6 text-13 relative">
      {data.map((v) => {
        const isOpen = leftPanel?.openKeys?.includes(v.key) || false;
        const isSelected = leftPanel?.activeKey === v.key;
        const isFocus = leftPanel?.focusKey === v.key && !isSelected;

        return (
          <li key={v.key} className={' ' + (isOpen ? 'h-auto' : 'h-[27px]')}>
            <ProjectMqlItem
              label={v.label}
              id={v.key}
              parentId={parentId}
              type={(v as any).type}
              isLeaf={!v.children}
              isSelected={isSelected}
              isFocus={isFocus}
              isOpen={isOpen && !(v as any).isLeaf}
            />
            {v.children && isOpen && <ProjectFileList data={v.children as unknown as FileListType} parentId={v.key} />}
          </li>
        );
      })}
    </ul>
  );
};

export default ProjectFileList;
