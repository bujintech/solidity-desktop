import Icon, { IIcons } from '@/icon';
import { colorsEnums } from '@/specific/enums';
import { SolidityEditorRouterType } from '@/typings/interface';
import { useRouterState } from '@cyberutopian/hooks';
import { Tooltip } from 'antd';
import { memo } from 'react';

const options = [
  {
    icon: 'icon-xinjianMQLwenjian',
    tips: '新建',
    key: 'create',
  },
  {
    icon: 'icon-chufa',
    tips: '地址',
    key: 'address',
  },
  {
    icon: 'icon-shanchu1',
    tips: '删除',
    key: 'delete',
  },
];

const ResourceBar = () => {
  const [routerState, setRouterState] = useRouterState<SolidityEditorRouterType>();
  const { leftPanel, resourceOption } = routerState;
  const { activeKey, queryId } = leftPanel || {};

  const isDisAb = (v: { icon: string; tips: string; key: string }) => {
    if (v.key === 'address') {
      return false;
    }
    if (v.key === 'delete') {
      if (resourceOption?.type) {
        return true;
      }
      if (!activeKey || !queryId) {
        return true;
      }
    }
    if (v.key === 'create') {
      return !activeKey;
    }
    if (v.key === resourceOption?.type) {
      return true;
    }
    return false;
  };

  const handleClickOption = (e: any, data: { icon: string; tips: string; key: string }) => {
    e.stopPropagation();
    if (isDisAb(data)) return;

    setRouterState((v) => ({
      ...v,
      resourceOption: { key: activeKey, type: data.key },
      navigate: { ...v.navigate, floatVisible: data.key === 'address' },
    }));
  };

  return (
    <div className="flex justify-between items-center h-[35px] pl-[16px] pr-[12px] py-[7px]">
      <div className="title-13 text-text-6 flex-1 truncate">WORKSPACE</div>
      <ul className="flex justify-end items-center text-16">
        {options.map((v) => {
          const disabled = isDisAb(v);
          return (
            <li
              key={v.key}
              className={'ml-[4px] '}
              onClick={(e) => handleClickOption(e, v)}
              style={{
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}
            >
              <Tooltip title={v.tips}>
                <Icon
                  type={v.icon as IIcons}
                  className={
                    'p-[4px] radius-8 hover:bg-fill-5 text-fill-9 ' +
                    (v.key === 'delete' ? 'hover:text-error-hover' : '')
                  }
                  style={{ color: disabled ? colorsEnums['text-2'] : colorsEnums['fill-9'] }}
                />
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(ResourceBar);
