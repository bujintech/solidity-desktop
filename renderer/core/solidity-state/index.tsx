import { contractHandlerList } from '@/config/enums';
import { useSolidityStateContext } from '@/context';
import { formatContractAbi } from '@/utils';
import { FC, Fragment, useMemo, useState } from 'react';
import ReadState from './read-state';
import WriteState from './write-state';

const SolidityState: FC<{}> = () => {
  const [active, setActive] = useState('read');

  const { abi } = useSolidityStateContext();
  const { readAbi, writeAbi } = useMemo(() => {
    if (!abi) {
      return { readAbi: [], writeAbi: [] };
    }
    const { readAbi, writeAbi } = formatContractAbi(abi);
    return { readAbi, writeAbi };
  }, [abi]);

  return (
    <Fragment>
      <ul className="flex justify-start items-center gap-[16px]">
        {contractHandlerList.map((item) => (
          <li
            key={item.key}
            className={
              'px-[12px] py-[3px] text-12 font-medium radius-8 cursor-pointer ' +
              (active === item.key ? 'bg-main-hover text-text-1' : 'bg-[#e5e7eb] hover:bg-[#e2e3e5]')
            }
            onClick={() => setActive(item.key)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-start gap-[16px] mt-[16px]">
        {active === 'read' ? <ReadState readAbi={readAbi} /> : <WriteState writeAbi={writeAbi} />}
      </div>
    </Fragment>
  );
};

export default SolidityState;
