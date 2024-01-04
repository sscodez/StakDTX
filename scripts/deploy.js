const Factory = atrifacts.require("Factory.sol");
const Router = artifacts.require("Router.sol");
const Pair = atrifacts.require("Pair.sol");
const Token1 = artifacts.require("Token1.sol");
const Token2 = atrifacts.require("Token2.sol");

module.exports = async (done) => {
  try {
    const [admin, _] = await web3.eth.getAccounts();
    const factory = await Factory.at("");
    const router = await Router.at("");
    const token1 = await Token1.at("");
    const token2 = await Token2.at("");
    const pairAddress = await factory.createPair.call(
      token1.address,
      token2.address
    );
    const tx = await factory.createPair(token1.address, token2.address);
    await token1.approve(router.address, 1000);
    await token2.approve(router.address, 1000);
    await router.addLiquidity(
      token1.address,
      token2.address,
      10000,
      10000,
      10000,
      10000,
      admin,
      Math.floor(Date.now() / 1000) + 60 * 10
    );
    const pair = await Pair.at(pairAddress);
    const balance = await pair.balanceOf(admin);
    console.log(`balance of LP ${balance.toString()}`);
  } catch (error) {}
};
