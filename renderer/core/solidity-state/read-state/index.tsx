import { AbiItem } from '@/typings/solidity-state';
import { Collapse } from 'antd';
import { ethers } from 'ethers';
import { FC } from 'react';
import ReadStateItem from './read-state-item';

const ReadState: FC<{ readAbi: AbiItem[]; contract?: ethers.Contract }> = ({ readAbi, contract }) => {
  return readAbi.length ? (
    <Collapse
      className="flex-1"
      size="small"
      items={readAbi
        .filter((v) => typeof v.checked === 'undefined' || v.checked)
        .map((item) => {
          return {
            key: item.name,
            label: item.name,
            children: <ReadStateItem inputs={item.inputs} outputs={item.outputs} name={item.name} />,
          };
        })}
    />
  ) : null;
};

export default ReadState;
