import React, { useState } from "react";
import Web3 from "web3";

const Wallet = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Enable MetaMask
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Create Web3 instance
        const web3 = new Web3(window.ethereum);
        // Get selected account
        const accounts = await web3.eth.getAccounts();
        const selectedAccount = accounts[0];
        // Set wallet connected state
        setWalletConnected(true);
        // Log wallet address
        console.log("Connected wallet address:", selectedAccount);
      } else {
        setErrorMessage(
          "MetaMask extension not detected. Please install MetaMask to connect your wallet."
        );
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setErrorMessage("Failed to connect wallet. Please try again.");
    }
  };

  return (
    <>
      <div>
        <button onClick={connectWallet}>Connect Wallet</button>
        {walletConnected && <p>Wallet connected successfully!</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </>
  );
};

export default Wallet;

// desk quote fluid hen easy gym glide alone excuse night force agree
