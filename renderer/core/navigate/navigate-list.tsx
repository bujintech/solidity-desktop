import { navigateList } from '@/config/config';
import Icon from '@/icon';
import { NavigateListType, SolidityEditorRouterType } from '@/typings/interface';
import { useRouterState } from '@cyberutopian/hooks';
import { useMemo } from 'react';

const NavigateList = () => {
  const [state, setState] = useRouterState<SolidityEditorRouterType>();

  const top = useMemo(() => {
    let index = 0;
    for (const [num, element] of navigateList.entries()) {
      if (element.key === state.navigate.key) {
        index = num;
        break;
      }
    }
    return 4 + index * 54;
  }, [state.navigate.key]);

  const changeNavigate = (item: NavigateListType, k: number) => {
    setState((v) => ({ ...v, navigate: { ...v.navigate, key: item.key } }));
  };

  return (
    <ul className="relative">
      {navigateList.map((v, k) => (
        <li key={v.key} className="p-[11px] text-center cursor-pointer" onClick={() => changeNavigate(v, k)}>
          <Icon type={v.icon as any} className="text-[26px] text-fill-9" />
        </li>
      ))}

      <div className="absolute left-0 top-[4px] w-[2px] h-[40px] bg-main" style={{ top: `${top}px` }} />
    </ul>
  );
};

export default NavigateList;
