const addresses = require('../frontend/src/contracts/contract-address.json');
const hre = require('hardhat');
async function main() {
  const AverseDaiStaking = await ethers.getContractFactory("AverseDaiStaking");
  const averseDaiStaking = await AverseDaiStaking.attach(addresses.AverseDaiStaking);
  await averseDaiStaking.issueTokens()
  console.log("Tokens issued!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });