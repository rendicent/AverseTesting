import { abi, contractAddresses } from "@/constants";
import { ethers } from "ethers";

const stakingContractAddress = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const { chainId } = await provider.getNetwork();

    const contractAddress =
      contractAddresses[chainId][contractAddresses[chainId].length - 1];

    return contractAddress;
  } catch (err) {
    console.log(err);
  }
};

const createStakingInstance = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const { chainId } = await provider.getNetwork();

    const contractAddress =
      contractAddresses[chainId][contractAddresses[chainId].length - 1];
    const signer = provider.getSigner();

    const stakingContract = new ethers.Contract(contractAddress, abi, signer); //fully connected contract to send txns
    return stakingContract;
  } catch (err) {
    console.log(err);
  }
};

export { createStakingInstance, stakingContractAddress };
