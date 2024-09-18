import { SolidityEditorRouterType } from '@/typings/interface';
import { useRouterState } from '@cyberutopian/hooks';
import { Button } from 'antd';

const EmptyContent = () => {
  const [_, setState] = useRouterState<SolidityEditorRouterType>();

  const showSolidityState = () => {
    setState((v) => ({
      ...v,
      navigate: { ...v.navigate, floatVisible: true },
    }));
  };

  return (
    <div className="pt-[56px] mx-auto">
      <div className="text-center">
        <Button size="small" onClick={showSolidityState}>
          open contract
        </Button>
      </div>
    </div>
  );
};

export default EmptyContent;
