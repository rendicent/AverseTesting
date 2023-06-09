import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import supportedChains from "../helper-config";
import { createStakingInstance } from "@/ethereum/createStaking";
export const HomeContext = createContext();
export function HomeProvider(props) {
  console.log("outside everything");

  const [chainId, setChainId] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [stakingContractOwner, setStakingContractOwner] = useState("");

  useEffect(() => {
    console.log("inside useEffect");

    const setValue = async () => {
      try {
        const stakingContract = await createStakingInstance();
        const stakingContractOwnerFromCall = await stakingContract.i_owner();
        console.log("From call", stakingContractOwnerFromCall);
        setStakingContractOwner(stakingContractOwnerFromCall);
        console.log("inside setValue");
        getChainId();
        getCurrentWalletConnected();
        addWalletListener();
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0 && stakingContractOwnerFromCall.toLowerCase() === accounts[0].toLowerCase()) {
          console.log("andar aaya");
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    setValue();
  }, [isConnected]);

  const addWalletListener = async () => {
    console.log("inside wallete listener");

    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("chainChanged", (chainId) => {
        const newChainId = parseInt(chainId).toString();
        setChainId(newChainId);
        console.log("Chain ID changed to", newChainId);
      });
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0 && !isConnected) {
          setIsConnected(true);
        } else if (accounts.length <= 0) {
          setIsConnected(false);
        }
        console.log("accounts changed to ", accounts[0]);
        setCurrentAccount(accounts[0]);

        if (accounts.length > 0 && stakingContractOwner.toLowerCase() == accounts[0].toLowerCase()) {
          console.log("run true");
          setIsOwner(true);
        } else {
          console.log("run false");
          setIsOwner(false);
        }
      });
    } else {
      /* MetaMask is not installed */

      console.log("Please install MetaMask");
    }
  };
  const getCurrentWalletConnected = async () => {
    console.log("inside currenct walletConnected");

    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setIsConnected(true);
          setCurrentAccount(accounts[0]);

          console.log(`isConnected changed to ${isConnected}`);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };
  async function getChainId() {
    console.log("inside inside getchainId");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { chainId } = await provider.getNetwork();
    setChainId(chainId);
  }
  return (
    <HomeContext.Provider
      value={{
        isConnected,
        chainId,
        supportedChains,
        currentAccount,
        isDisabled,
        setIsDisabled,
        isOwner,
        stakingContractOwner,
      }}
    >
      {props.children}
    </HomeContext.Provider>
  );
}
