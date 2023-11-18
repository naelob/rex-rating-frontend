import { useState } from 'react'
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
  darkTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


function App() {
  //const [count, setCount] = useState(0)
  const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base, zora],
    [
      alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

  return (
    <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider theme={darkTheme({
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

          </Routes>
        </div>
      </Router>
    </RainbowKitProvider>
  </WagmiConfig>
  
  )
}

export default App
