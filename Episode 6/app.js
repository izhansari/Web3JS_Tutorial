//PURPOSE: messing around with events. we'll do this on Mainnet.
//NOTE: we are using OMG Network Token (https://etherscan.io/token/0xd26114cd6EE289AccF82350c8d8487fedB8A0C07#readContract)
        //This is what we want --> https://etherscan.io/address/0xd26114cd6EE289AccF82350c8d8487fedB8A0C07#events
        //This is a good doc page for events on web3 --> https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#getpastevents 
//NOTE: this is important for building a DAPP
        //we can build a page or wall which will display whatever data we want from historical transactions.


//EDIT: new way to specify transaction on ethereumjs-tx
const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://mainnet.infura.io/v3/8b31aa8a9e104bb99f1464915c82ab67')

//accounts and privkey
const account1 = '0x3818D56202fbD8dc01c4e2c522a3947555bF436a'
const account2 = '0x279D7F2b2CDB8381561eCF598FDD724998708cd3'
const privKey1 = Buffer.from('5d678e604b1018c3472c63f0f0d035fbcf28ea7e2eca34f9d33e6c758d865048', 'hex')
const privKey2 = Buffer.from('9cbba535bed7f18cf7ee446ac1b89b2cce27e12fe7feb3149bd2af2cd885ab19', 'hex')

//contract info
const address = '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07'
const abi = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_releaseTime","type":"uint256"}],"name":"mintTimelocked","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
const contract = new web3.eth.Contract(abi, address)

contract.getPastEvents(
    'Transfer', 
    {
        fromBlock: 15169000, //did a more recent block so we don't get ALLL events. 
        toBlock: 'latest',
    },
    (err, events) => { console.log(events) }
)

//in our return values for transfer events we should see from, to, and value which are all args as part of the function. All in ERC20 standard
// https://github.com/ethereum/EIPS/blob/master/EIPS/eip-20.md
