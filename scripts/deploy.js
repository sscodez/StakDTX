async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const StakDTX = await ethers.getContractFactory("StakDTX"); // Replace with your contract artifact name
  const stakDTX = await StakDTX.deploy(deployer.address);

  console.log("StakDTX address:", stakDTX.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
