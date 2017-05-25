var BTBToken = artifacts.require("./BTBToken.sol");

module.exports = function(deployer) {
  deployer.deploy(BTBToken);
};
