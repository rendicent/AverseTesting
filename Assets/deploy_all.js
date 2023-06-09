const hre = require("hardhat");






async function main() {
    console.log('Entering into deployment...');
  await deployAverseDaiStaking();
  await deployDaiToken();
}

 async function deployAverseDaiStaking() {
  const AverseDaiStaking = await hre.ethers.getContractFactory("AverseDaiStaking");
  const averseDaiStaking = await AverseDaiStaking.deploy();
  await averseDaiStaking.deployed();
  console.log("AverseDaiStaking deployed to: ", averseDaiStaking.address);
}

 async function deployDaiToken() {
    const DaiToken = await hre.ethers.getContractFactory("DaiToken");
    const daiToken = await DaiToken.deploy();
    await daiToken.deployed();
    console.log("DaiToken deployed to: ", daiToken.address);
  }

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  module.exports = {
    main,
    deployAverseDaiStaking,
    deployDaiToken
  }