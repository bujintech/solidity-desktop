import { AbiItem } from '@/typings/solidity-state';

const READ_TYPE = ['view', 'pure'];
const WRITE_TYPE = ['nonpayable', 'payable'];

export const formatContractAbi = (abiList: AbiItem[]): { readAbi: AbiItem[]; writeAbi: AbiItem[] } => {
  const readAbi: AbiItem[] = [];
  const writeAbi: AbiItem[] = [];

  abiList.forEach((item) => {
    if (item.type !== 'function') return;

    if (READ_TYPE.includes(item.stateMutability)) {
      readAbi.push(item);
    } else if (WRITE_TYPE.includes(item.stateMutability)) {
      writeAbi.push(item);
    } else {
      console.log('unknown type');
    }
  });

  return {
    readAbi,
    writeAbi,
  };
};

const formatObject: any = (params: Object) => {
  if (Array.isArray(params)) {
    return params
      .map((v: any) => {
        return formatRenderResult(v);
      })
      .join(',');
  } else {
    return params;
  }
};

export const formatRenderResult = (params: any) => {
  if (!params) return '--';
  const type = typeof params;

  switch (type) {
    case 'string':
      return params;
    case 'number':
      return params;
    case 'object':
      return formatObject(params);
    case 'bigint':
      return params.toString();
    default:
      return 'not find';
  }
};
