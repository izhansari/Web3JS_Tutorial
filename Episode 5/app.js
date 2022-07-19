//PURPOSE: we already read a smart contract. but lets interact with the deployed contract by sending a transaction on the network.
//NOTE: for this, the data in the txObject is the main key. Its a hex version of function with args to send a tx.
//      We can see all the methods in RemixIDE under the GasEstimates section of the details tab.

//EDIT: new way to specify transaction on ethereumjs-tx
const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://rinkeby.infura.io/v3/8b31aa8a9e104bb99f1464915c82ab67')

//created new accounts and put private keys here. not real money in accounts.
const account1 = '0x3818D56202fbD8dc01c4e2c522a3947555bF436a'
const account2 = '0x279D7F2b2CDB8381561eCF598FDD724998708cd3'

const privKey1 = Buffer.from('5d678e604b1018c3472c63f0f0d035fbcf28ea7e2eca34f9d33e6c758d865048', 'hex')
const privKey2 = Buffer.from('9cbba535bed7f18cf7ee446ac1b89b2cce27e12fe7feb3149bd2af2cd885ab19', 'hex')

const contractAdress = '0x9b15ae75f9701d76474d375e255cc965839241f9'
const contractABI = ([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]);

//this is a javascript instantiated version of smart contract.
const contract = new web3.eth.Contract(contractABI, contractAdress)

//this is where we specify which method we want to call before building our txObject to send.
const data = contract.methods.transfer(account1, 7000).encodeABI() //we can see from console.log(data) that it prints like this: 0xa9059cbb000000000000000000000000279d7f2b2cdb8381561ecf598fdd724998708cd30000000000000000000000000000000000000000000000000000000000001b58


web3.eth.getTransactionCount(account2, (err, txCount)=>{
  
    //create tx object
    const txObject = {
        nonce: web3.utils.toHex(txCount) , //# of txs that an account alr sent
        gasLimit: web3.utils.toHex(800000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        to: contractAdress, //remember, we are interacting with the smart contract here.
        data: data
    }

    //sign tx object
    const tx = new Tx(txObject, {'chain':'rinkeby'}); //REMEMBER we need to specify chain now
    tx.sign(privKey2)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    //send signed tx to network
    web3.eth.sendSignedTransaction(raw, (err, txHash) =>{
        console.log('err:', err, 'txHash:', txHash)
    })
    
})

contract.methods.totalSupply().call((err, result) =>{
    console.log('totalSupply:', result)
})
contract.methods.balanceOf(account1).call((err, bal) =>{
    console.log('account1 bal:', bal)
})
contract.methods.balanceOf(account2).call((err, bal) =>{
    console.log('account2 bal:', bal)
})


//we can see it worked by looking at etherscan holders of our token -->
//https://rinkeby.etherscan.io/token/0x9b15ae75f9701d76474d375e255cc965839241f9#balances