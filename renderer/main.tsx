import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import ElectronUpdate from './components/electron-update';
// import '@/ipc';
import WalletProvider from '@/provider/wallet-provider';
import { bootstrap } from '@cyberutopian/components';
import Loading from './components/loading';
import './index.css';

const wallet = new WalletProvider();
wallet.onload();

bootstrap.config({
  paths: { vs: 'monaco/vs' },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
    {/* <ElectronUpdate /> */}
  </React.StrictMode>,
);

postMessage({ payload: 'removeLoading' }, '*');
