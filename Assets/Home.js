import { Fragment, useContext } from "react";
import CollectReward from "./CollectReward";
import Withdraw from "./Withdraw";
import Staking from "./Staking";
import { ContractDataContext } from "@/contexts/contractDataContext";
import { HomeContext } from "@/contexts/stakingContext";
import Spier from "./Spier";
import React from "react";

function Home() {
  const { isConnected, chainId, supportedChains, isDisabled } = useContext(HomeContext);
  const { stakedTokens, totalSupply } = useContext(ContractDataContext);

  return (
    <Fragment>
      {isConnected ? (
        <Fragment>
          {supportedChains.includes(parseInt(chainId).toString()) ? (
            <Fragment>
              <div className={!isDisabled ? " p-5 flex flex-col justify-center items-center text-xl" : " p-5 flex flex-col justify-center items-center text-xl blur-md"}>
                <div className="mb-7 underline  text-primary "> STAKING DAPP</div>
                <div className="mb-5 text-2xl text-black font-bold">{`Staked Pool : ${totalSupply}`}</div>
                <div className="flex flex-col items-center justify-center mb-5">
                  <div className=" text-lg  text-black">{`Your tokens staked : ${stakedTokens}tokens`}</div>
                  <Withdraw />
                </div>
                <CollectReward />
                <Staking />
              </div>
              <div>{isDisabled ? <Spier /> : null}</div>
            </Fragment>
          ) : (
            <div className="p-5 flex flex-row justify-center items-center text-4xl">{`Please switch to a supported chainId. The supported Chain Ids are: ${supportedChains}`}</div>
          )}
        </Fragment>
      ) : (
        <div className="p-5 flex flex-row justify-center items-center text-4xl">Please connect to a Wallet</div>
      )}
    </Fragment>
  );
}

export default Home;
