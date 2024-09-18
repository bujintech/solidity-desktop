import { SolidityStateProvider } from '@/context';
import { SolidityEditorRouterType } from '@/typings/interface';
import { useRouterState } from '@cyberutopian/hooks';
import { Input } from 'antd';
import { FC } from 'react';
import SolidityState from './solidity-state';

const Search = Input.Search;

const StatePanel: FC<{ clientWidth: number; clientHeight: number }> = ({ clientWidth, clientHeight }) => {
  // const [contract, setContract] = useState<{
  //   abi: AbiItem[];
  //   error?: string;
  //   address: string;
  // }>({ abi: [], error: undefined, address: '' });

  const [state] = useRouterState<SolidityEditorRouterType>();

  // const { sendRequest } = useCyberFetch({ url: '/ether/api', method: 'GET' }, { manual: true });
  // const onSearch = async (value: any) => {
  //   if (!value) return;
  //   try {
  //     const result = await sendRequest({
  //       module: 'contract',
  //       action: 'getsourcecode',
  //       address: value,
  //       apikey: import.meta.env.VITE_ETHERSCAN_API_KEY,
  //     });

  //     // @ts-ignore
  //     const data = result.result?.[0];
  //     const abi = JSON.parse(data.ABI);
  //     console.log(data);

  //     setContract({ abi, error: '', address: value });
  //   } catch (error: any) {
  //     console.log(error);
  //     setContract({ abi: [], error: error.message, address: '' });
  //   }
  // };

  return (
    <div className={'overflow-scroll'} style={{ width: `${clientWidth}px`, height: `${clientHeight}px` }}>
      <div className="flex justify-end items-center gap-[16px] p-[12px] bg-text-7">
        <w3m-network-button />
        <w3m-button />
      </div>

      <div className="mx-[16px] py-[12px]">
        {/* <Search placeholder="input contract address" className="my-[12px]" onSearch={onSearch} style={{ width: 400 }} />
        {contract.error && <div className="text-error text-12">{contract.error}</div>} */}
        <SolidityStateProvider value={{ address: state.solidity?.address, abi: state.solidity?.abi }}>
          <SolidityState />
        </SolidityStateProvider>
      </div>
    </div>
  );
};

export default StatePanel;
