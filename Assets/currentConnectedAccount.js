import { ethers } from "ethers";

export default async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.send("eth_accounts", []);
  const owner = accounts[0];
  return owner;
};
