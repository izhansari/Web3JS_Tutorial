//THIS CODE WILL INTERACT WITH A SMART CONTRACT

//EDIT: updated way to specify transaction on ethereumjs-tx
const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://rinkeby.infura.io/v3/8b31aa8a9e104bb99f1464915c82ab67')

const account2 = '0x279D7F2b2CDB8381561eCF598FDD724998708cd3'
const privKey2 = Buffer.from('9cbba535bed7f18cf7ee446ac1b89b2cce27e12fe7feb3149bd2af2cd885ab19', 'hex')

//NOTE: ABI found from remixIDE after compiling in Details tab. ALSO I set the total supply in the smart contract on RemixIDE
const contractABI = ([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}])
const contractAddress = '0x9b15ae75f9701d76474d375e255cc965839241f9'
var IzhanRupeeTokenContract = new web3.eth.Contract(contractABI, contractAddress)

console.log('Contract Address:', contractAddress)

IzhanRupeeTokenContract.methods.name().call((err, result) => {
    console.log('--Name:', result)
})

IzhanRupeeTokenContract.methods.symbol().call((err, result) => {
    console.log('--Symbol:', result)
})

IzhanRupeeTokenContract.methods.totalSupply().call((err, result) => {
    console.log('--Total Supply:', result)
})

IzhanRupeeTokenContract.methods.balanceOf(account2).call((err, result) => {
    console.log('--Balance of Msg.Sender:', result)
})

console.log('--ALL METHODS FROM CONTRACT--')
console.log(IzhanRupeeTokenContract.methods)