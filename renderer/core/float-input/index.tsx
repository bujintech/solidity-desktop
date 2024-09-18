import { cyberFetch } from '@/service';
import { SolidityEditorRouterType } from '@/typings/interface';
import { useRouterState } from '@cyberutopian/hooks';
import { Input } from 'antd';
import { useState } from 'react';

const Search = Input.Search;

const FloatInput = () => {
  const [input, setInput] = useState<string>();

  const [state, setState] = useRouterState<SolidityEditorRouterType>();

  const onSearch = async (value: any) => {
    if (!value) return;
    try {
      const result = await cyberFetch({
        url: '/ether/api',
        method: 'GET',
        data: {
          module: 'contract',
          action: 'getsourcecode',
          address: value,
          apikey: import.meta.env.VITE_ETHERSCAN_API_KEY,
        },
      });

      // @ts-ignore
      const data = result.result?.[0];
      const abi = JSON.parse(data.ABI);

      setState((v) => ({
        ...v,
        solidity: {
          abi,
          contract: data.SourceCode,
          contractName: data.ContractName,
          address: value,
          evm: data.EVMVersion,
          compilerVersion: data.CompilerVersion,
        },
        navigate: { ...v.navigate, floatVisible: false },
      }));
      setInput(undefined);
    } catch (error: any) {
      console.log(error);
      setInput(undefined);
    }
  };

  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 z-30 px-4 bg-text-6 radius-8"
      style={{ display: state.navigate.floatVisible ? 'block' : 'none' }}
    >
      <Search
        placeholder="input contract address"
        className="my-[12px]"
        autoFocus
        value={input}
        onChange={(v) => setInput(v.target.value)}
        onSearch={onSearch}
        style={{ width: 400 }}
      />
    </div>
  );
};

export default FloatInput;
