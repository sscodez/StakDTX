const { expect } = require("chai");

// Import the contract artifact (ABI and bytecode) and the web3 instance

describe("StakDTX Contract", function () {
  let contract;
  let owner;
  let admin;
  let accounts;

  before(async function () {
    // Deploy the contract and get accounts
    contract = artifacts.require("StakDTX"); // Replace with your contract artifact
    [owner, admin, ...accounts] = await web3.eth.getAccounts();
  });

  beforeEach(async function () {
    // Deploy a fresh contract before each test
    contract = await contract.new(admin, { from: owner });
  });

  it("should set the owner and admin correctly", async function () {
    const contractOwner = await contract.owner();
    const contractAdmin = await contract.admin();

    expect(contractOwner).to.equal(owner);
    expect(contractAdmin).to.equal(admin);
  });

  it("should allow only owner to transfer ownership", async function () {
    const newOwner = accounts[0];

    await expect(
      contract.transferOwnership(newOwner, { from: admin })
    ).to.be.revertedWith("Not authorized");

    await contract.transferOwnership(newOwner, { from: owner });
    const contractOwner = await contract.owner();

    expect(contractOwner).to.equal(newOwner);
  });

  it("should allow only admin to upgrade implementation", async function () {
    const newImplementation = accounts[0];

    await expect(
      contract.upgrade(newImplementation, { from: owner })
    ).to.be.revertedWith("Not authorized");

    await contract.upgrade(newImplementation, { from: admin });
    const implementation = await contract.implementation();

    expect(implementation).to.equal(newImplementation);
  });

  // Add more test cases for other functions as needed
});
