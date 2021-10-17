const ConvertLib = artifacts.require("ConvertLib");
const GldnfCoin = artifacts.require("GldnfCoin");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, GldnfCoin);
  deployer.deploy(GldnfCoin);
};
