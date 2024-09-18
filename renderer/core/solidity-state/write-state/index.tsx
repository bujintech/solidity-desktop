import { AbiItem } from '@/typings/solidity-state';
import { Collapse } from 'antd';
import { ethers } from 'ethers';
import { FC } from 'react';
import WriteStateItem from './write-state-item';

const WriteState: FC<{ contract?: ethers.Contract; writeAbi: AbiItem[] }> = ({ contract, writeAbi }) => {
  return writeAbi.length ? (
    <Collapse
      className="flex-1"
      size="small"
      items={writeAbi
        .filter((v) => typeof v.checked === 'undefined' || v.checked)
        .map((item) => {
          return {
            key: item.name,
            label: item.name,
            children: <WriteStateItem inputs={item.inputs} name={item.name} />,
          };
        })}
    />
  ) : null;
};

export default WriteState;
