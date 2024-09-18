export interface AbiItem {
  inputs: any[];
  name: string;
  outputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  stateMutability: string;
  type: string;
  checked?: boolean;
}
