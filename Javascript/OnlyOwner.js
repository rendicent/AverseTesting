import { HomeContext } from "@/contexts/stakingContext";
import React, { Fragment, useContext } from "react";
import FundStakingContract from "./FundStakingContract";
import Spier from "./Spier";
import OwnerInteraction from "./OwnerInteraction";

function OnlyOwner() {
  const { isConnected, chainId, supportedChains, isDisabled } =
    useContext(HomeContext);
  return (
    <Fragment>
      {isConnected ? (
        <Fragment>
          {supportedChains.includes(parseInt(chainId).toString()) ? (
            <div>
              {" "}
              <div
                className={
                  !isDisabled
                    ? " p-5 flex flex-col justify-center items-center text-xl"
                    : " p-5 flex flex-col justify-center items-center text-xl blur-md"
                }
              >
                <Fragment>
                  <FundStakingContract />
                  <OwnerInteraction />
                </Fragment>
              </div>
              {isDisabled ? <Spier /> : null}
            </div>
          ) : (
            <div className="p-5 flex flex-row justify-center items-center text-4xl">{`Please switch to a supported chainId. The supported Chain Ids are: ${supportedChains}`}</div>
          )}
        </Fragment>
      ) : (
        <div className="p-5 flex flex-row justify-center items-center text-4xl">
          Please connect to a Wallet
        </div>
      )}
    </Fragment>
  );
}

export default OnlyOwner;
