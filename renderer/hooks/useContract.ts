import { AbiItem } from '@/typings/solidity-state';
import { useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, ethers } from 'ethers';

const useContract = () => {
  const { walletProvider } = useWeb3ModalProvider();

  const getReadContract = async (data: AbiItem[], address: string) => {
    const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_ETHERSCAN_SEPOLIA_URL);
    const contract = new ethers.Contract(address, data, provider);

    return contract;
  };

  const getWriteContract = async (data: AbiItem[], address: string) => {
    const provider = new BrowserProvider(walletProvider!);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(address, data, signer);

    return contract;
  };

  return { getReadContract, getWriteContract };
};

export default useContract;
