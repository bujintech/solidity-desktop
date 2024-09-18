import { useSolidityStateContext } from '@/context';
import useContract from '@/hooks/useContract';
import { AbiItem } from '@/typings/solidity-state';
import { formatRenderResult } from '@/utils';
import { Button, Form, Input } from 'antd';
import { FC, Fragment, useState } from 'react';
import Label from '../label';

const ReadStateItem: FC<{
  name: AbiItem['name'];
  inputs: AbiItem['inputs'];
  outputs: AbiItem['outputs'];
}> = ({ inputs, name, outputs }) => {
  const [form] = Form.useForm();
  const [result, setResult] = useState();

  const { getReadContract } = useContract();
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
      const contract = await getReadContract(abi, address);

      const action = contract?.[name];
      const data = await action.apply(null, params);
      console.log('data', data);
      setResult(data);
    } catch (error) {
      console.error(error);
    }
  };

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
      <Button type="primary" size="small" onClick={onSubmit}>
        query
      </Button>
      <div>
        <p>
          <strong>query result</strong>
          <span style={{ color: '#999' }}>{`[ ${outputs[0]?.type} ]`}</span>：{formatRenderResult(result)}
        </p>
      </div>
    </Fragment>
  );
};

export default ReadStateItem;
