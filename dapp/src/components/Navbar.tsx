// src/components/Navbar.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useEnsName } from 'wagmi';
import {
  SignInWithLens, Theme, Size
} from '@lens-protocol/widgets-react'

const Navbar: React.FC = () => {
  const {address} = useAccount();
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBounce(true);

      // Remove the animation class after it completes
      setTimeout(() => setBounce(false), 3000); // Assuming the animation takes 3 seconds
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  
  async function onSignIn(tokens, profile) {
    console.log('tokens: ', tokens)
    console.log('profile: ', profile)
  }

  return (
    <nav className="navbar w-auto fixed top-5 left-40 right-40 text-white px-4 rounded-3xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center">
          <img src='logo-rex.png' className={`w-20 ${bounce ? 'rotate' : ''}`}/>
          <Link to="/" className='text-black no-underline font-bold rexo-logo hover:text-neutral-700 w-20'>
            rexo :)
          </Link>
        </div>
        <div className="flex items-center">
          {
            address && 
            <Link to="/qr" className="text-black no-underline mx-4 font-bold	 hover:text-neutral-700">
             my QR
            </Link>
          }
          {
            address && 
            <Link to="/my-rexes" className="text-black no-underline mx-4 font-bold	 hover:text-neutral-700">
             my Rexes
            </Link>
          }
          {/*<SignInWithLens
            onSignIn={onSignIn}
          />*/}
          <Link to="/maps" className="text-black no-underline mx-4 font-bold	 hover:text-neutral-700">
            maps
          </Link> 
          <Link to="/" className="text-black no-underline mx-4 font-bold	 hover:text-neutral-700">
            list
          </Link>
          <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button className='bg-black hover:text-neutral-700' onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button className='bg-black' onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 5}} className=''>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center', marginRight: "15px" }}
                    type="button"
                    className=' bg-black hover:text-neutral-700'
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button className='bg-black hover:text-neutral-700' onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
          </ConnectButton.Custom>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
