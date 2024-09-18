import { mqlContextmenuList, projectContextmenuList } from '@/config/config';
import { useProjectMqlContext } from '@/context';
import Icon from '@/icon';
import { Contextmenu } from '@cyberutopian/components';
import { Input, InputRef } from 'antd';
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';

const LabelInput: FC<{ label: string; type: string }> = ({ label, type }) => {
  const [value, setValue] = useState<string | undefined>(() => (type === 'edit' ? label : undefined));
  const ref = useRef<InputRef>(null);

  const { handleSaveMql } = useProjectMqlContext();

  const onBlur = () => {
    return handleSaveMql(value, type);
  };
  useEffect(() => {
    const i = ref.current?.input?.value.lastIndexOf('.mql');
    if (i) {
      ref.current?.setSelectionRange(0, i);
    }
  }, []);

  return (
    <Input
      ref={ref}
      className="px-[8px] h-[27px] text-13 rounded-[4px] text-text-8 border-[#1677ff4d] bg-fill-1"
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onPressEnter={onBlur}
      onBlur={onBlur}
    />
  );
};

const ProjectMqlItemTitle: FC<{
  parentId?: string;
  isLeaf: boolean;
  label: string;
  id: string;
  type?: string;
  isOpen: boolean; // 项目展开
  isSelected: boolean;
  isFocus: boolean; // 聚焦
}> = ({ isLeaf = false, isSelected, id, label, isOpen, isFocus, type, parentId }) => {
  const { toggleGroup, handleSelectContextmenu } = useProjectMqlContext();

  const isEditing = !!(type && ['create', 'edit'].includes(type));

  const activeCls = useMemo(() => {
    if (!isEditing) {
      if (isSelected) {
        return '!border-[#1677ff4d] bg-[#bae0ff99] text-text-8 ';
      }

      if (isFocus) {
        return 'bg-[#bae0ff99] ';
      }

      return 'hover:bg-[#D8DBDF] ';
    }

    return ' ';
  }, [isSelected, isFocus, isEditing]);

  return (
    <Contextmenu
      data={isLeaf ? mqlContextmenuList : projectContextmenuList}
      shouldOpen={!isEditing}
      handleSelect={(v) => handleSelectContextmenu(v, { key: id, isLeaf, label, parentId })}
    >
      <div
        className={
          'flex justify-start items-center relative cursor-pointer rounded-[4px] h-[27px] box-border border border-[#ECEDEF] ' +
          (isLeaf ? 'pl-[30px] ' : 'pl-[12px] ') +
          activeCls
        }
        onClick={() => (isEditing ? null : toggleGroup(id, !isOpen, isLeaf, { key: id, isLeaf, label, parentId }))}
      >
        <Icon
          type={isLeaf ? 'icon-MQLwenjian' : 'icon-xuanzekuangjiantoudown'}
          className={
            'text-[#818594] text-13 mr-[4px] transition-transform ease-in-out duration-300 ' +
            (isLeaf ? 'rotate-0' : isOpen ? 'rotate-0' : '-rotate-90')
          }
        />
        {isEditing ? (
          <LabelInput label={label} type={type} />
        ) : (
          <span className="truncate" title={label}>
            {label}
          </span>
        )}
      </div>
    </Contextmenu>
  );
};

export default memo(ProjectMqlItemTitle);
