const GldnfCoin = artifacts.require("GldnfCoin");

contract('GldnfCoin', (accounts) => {
  it('should put 10000 GldnfCoin in the first account', async () => {
    const GldnfCoinInstance = await GldnfCoin.deployed();
    const balance = await GldnfCoinInstance.getBalance.call(accounts[0]);

    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });
  it('should call a function that depends on a linked library', async () => {
    const GldnfCoinInstance = await GldnfCoin.deployed();
    const GldnfCoinBalance = (await GldnfCoinInstance.getBalance.call(accounts[0])).toNumber();
    const GldnfCoinEthBalance = (await GldnfCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();

    assert.equal(GldnfCoinEthBalance, 2 * GldnfCoinBalance, 'Library function returned unexpected function, linkage may be broken');
  });
  it('should send coin correctly', async () => {
    const GldnfCoinInstance = await GldnfCoin.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await GldnfCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await GldnfCoinInstance.getBalance.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await GldnfCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await GldnfCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await GldnfCoinInstance.getBalance.call(accountTwo)).toNumber();


    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
