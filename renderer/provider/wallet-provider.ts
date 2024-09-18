import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

export default class WalletProvider {
  constructor() {
    this.onload();
  }
  onload() {
    // 1. Get projectId
    const projectId = 'b011436b7407d0a1336bc638f9c89f20';

    // 2. Set chains
    const chains = [
      {
        chainId: 1,
        name: 'Ethereum',
        currency: 'ETH',
        explorerUrl: 'https://etherscan.io',
        rpcUrl: 'https://cloudflare-eth.com',
      },
      {
        chainId: 11155111,
        name: 'Sepolia测试网络',
        currency: 'SepoliaETH',
        explorerUrl: 'https://sepolia.etherscan.io',
        rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/H9kWk0mQrYppFaXx8x2WCAORN_u3p_V_',
      },
    ];

    // 3. Create a metadata object
    const metadata = {
      name: 'My Website',
      description: 'My Website description',
      url: 'https://mywebsite.com', // origin must match your domain & subdomain
      icons: ['https://avatars.mywebsite.com/'],
    };

    // 4. Create Ethers config
    const ethersConfig = defaultConfig({
      /*Required*/
      metadata,
      /*Optional*/
      // enableEIP6963: true, // true by default
      // enableInjected: true, // true by default
      // enableCoinbase: true, // true by default
      // rpcUrl: '...', // used for the Coinbase SDK
      // defaultChainId: 1, // used for the Coinbase SDK
    });

    // 5. Create a AppKit instance
    createWeb3Modal({
      ethersConfig,
      chains,
      projectId,
      enableAnalytics: true, // Optional - defaults to your Cloud configuration
      allowUnsupportedChain: true,
    });
  }
}
