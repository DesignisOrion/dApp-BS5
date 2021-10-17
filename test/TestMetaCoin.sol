pragma solidity >=0.4.25 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/GldnfCoin.sol";

contract TestGldnfCoin {

  function testInitialBalanceUsingDeployedContract() public {
    GldnfCoin meta = GldnfCoin(DeployedAddresses.GldnfCoin());

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 GldnfCoin initially");
  }

  function testInitialBalanceWithNewGldnfCoin() public {
    GldnfCoin meta = new GldnfCoin();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 GldnfCoin initially");
  }

}
