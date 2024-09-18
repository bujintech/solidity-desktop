import { useSolidityStateContext } from '@/context';
import useContract from '@/hooks/useContract';
import { AbiItem } from '@/typings/solidity-state';
import { Button, Form, Input } from 'antd';
import { FC, Fragment, useState } from 'react';
import Label from '../label';

const WriteStateItem: FC<{ name: AbiItem['name']; inputs: AbiItem['inputs'] }> = ({ inputs, name }) => {
  const [form] = Form.useForm();
  const [txList, setTxList] = useState<{ hash: string; status: boolean }[]>([]); // 交易记录

  const { getWriteContract } = useContract();
  const { address, abi } = useSolidityStateContext();

  const onSubmit = async () => {
    if (!abi || !address) {
      return;
    }
    const data = await form.validateFields();
    const params = inputs.reduce((pre, cur) => {
      let val = data[cur.name];
      if (cur.type.includes('uint')) {
        val = Number(val);
      }
      return [...pre, val];
    }, []);

    try {
      const contract = await getWriteContract(abi, address);

      const action = contract?.[name];
      const tx = await action.apply(null, params);

      console.log('Transaction:', tx);
      setTxList((_t) => [..._t, { hash: tx.hash, status: false }]);
      // 等待交易被确认
      const receipt = await tx.wait();
      console.log('Transaction was confirmed in block', receipt);
      setTxList((_txList) => {
        return _txList.map((_newTxList) => {
          if (_newTxList.hash === tx.hash) {
            _newTxList.status = true;
          }
          return _newTxList;
        });
      });
    } catch (error) {
      // @ts-ignore
      console.log(error.message);
    }
  };

  const loading = !!txList.find((v) => !v.status);

  return (
    <Fragment>
      <Form form={form}>
        {inputs.map((v, i) => {
          return (
            <Form.Item
              style={{ marginBottom: 0 }}
              key={`${v.name}_${i}`}
              name={v.name}
              label={<Label name={v.name} type={v.type}></Label>}
              rules={[{ required: true, message: `Please input ${v.name}!` }]}
            >
              <Input placeholder={`Please input ${v.name}.`}></Input>
            </Form.Item>
          );
        })}
      </Form>

      <Button loading={loading} type="primary" size="small" onClick={onSubmit}>
        {loading ? 'Waiting for transaction...' : 'submit'}
      </Button>

      <div>
        {txList.map((v) => (
          <div key={v.hash}>
            hash:
            <a target="_blank" href={`https://sepolia.etherscan.io/tx/${v.hash}`}>
              {v.hash}
            </a>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default WriteStateItem;
