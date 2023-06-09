import { abiERC20, erc20ContractAddresses } from "@/constants";
import { ethers } from "ethers";

const erc20ContractAddress = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const { chainId } = await provider.getNetwork();

    const contractAddress =
      erc20ContractAddresses[chainId][
        erc20ContractAddresses[chainId].length - 1
      ];
    return contractAddress;
  } catch (err) {
    console.log(err);
  }
};

const createERC20Instance = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const { chainId } = await provider.getNetwork();

    const contractAddress =
      erc20ContractAddresses[chainId][
        erc20ContractAddresses[chainId].length - 1
      ];
    const signer = provider.getSigner();

    const erc20Contract = new ethers.Contract(
      contractAddress,
      abiERC20,
      signer
    ); //fully connected contract to send txns

    return erc20Contract;
  } catch (err) {
    console.error(err);
  }
};

export { createERC20Instance, erc20ContractAddress };
