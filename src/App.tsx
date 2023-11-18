import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // If you're using react-router
import Home from './components/Home';
import RestaurantReviews from './components/RestaurantReviews';
import RandomNoun from './components/RandomNoun';
import { Toaster } from "react-hot-toast";
import MapComponent from './components/Map';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  AvatarComponent,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { polygonZkEvmTestnet, mainnet } from 'wagmi/chains';
import QRCode from './components/QrCodeClient';

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  const color = "blue";
  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
    />
  ) : (
    <div
      style={{
        backgroundColor: color,
        borderRadius: 999,
        height: size,
        width: size,
      }}
    >
      :^)
    </div>
  );
};

function App() {

  const { chains, publicClient } = configureChains(
    [mainnet, polygonZkEvmTestnet],
    [
      alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'istanbul-project',
    projectId: '1b9bcae39199150637f2e49e34192885',
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

  return (
    <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider avatar={CustomAvatar} theme={darkTheme({
        accentColor: '#000000',
        accentColorForeground: 'white',
        borderRadius: 'medium',
      })} chains={chains}>
      <Router>
        <div className="App">
          <Toaster/>
          <Navbar />
          <RandomNoun />

          {/* Your route components go here */}
          <Routes>
            <Route path="/" element={<Home/> }/>
            <Route path="/restaurants/:restaurantId" element={<RestaurantReviews />} />
            <Route path="/maps" element={<MapComponent/> }/>
            <Route path="/qr" element={<QRCode/> }/>

          </Routes>
        </div>
      </Router>
    </RainbowKitProvider>
  </WagmiConfig>
  
  )
}

export default App
