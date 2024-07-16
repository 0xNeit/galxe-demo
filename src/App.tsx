/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { WalletRadar } from '@razorlabs/m1-wallet-sdk'
import { InputEntryFunctionData, InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk'

function App() {
  const [connected, setConnected] = useState(false)

  const walletRadar = new WalletRadar();
  walletRadar.activate();

  const adapters = walletRadar.getDetectedWalletAdapters();
  const adapter = adapters.find((a) => a.name === 'Razor Wallet');

  const payload: InputEntryFunctionData = {
    functionArguments: [false],
    function: '0x1::aptos_account::set_allow_direct_coin_transfers',
    typeArguments: [],
  };

  const handleConnect = async () => {
    await adapter?.connect();
    setConnected(true);
  }

  const handleDisconnect = async () => {
    await adapter?.disconnect();
    setConnected(false);
  }

  const handleTx = async () => {
    try {
      adapter?.signAndSubmitTransaction({ payload: payload as InputGenerateTransactionPayloadData });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {!connected ? (
          <button onClick={() => handleConnect()}>
            Connect Wallet
          </button>
        ) : (
          <>
          <button onClick={() => handleDisconnect()}>
            {adapter?.accounts[0]?.address}
          </button>

          <button onClick={async () => handleTx()}>
            Sign Transaction
          </button>
          </>
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
