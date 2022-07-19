//EDIT: new way to specify transaction on ethereumjs-tx
const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://rinkeby.infura.io/v3/8b31aa8a9e104bb99f1464915c82ab67')

//created new accounts and put private keys here. not real accounts.
const account1 = '0x3818D56202fbD8dc01c4e2c522a3947555bF436a'
const account2 = '0x279D7F2b2CDB8381561eCF598FDD724998708cd3'

const privKey1 = Buffer.from('5d678e604b1018c3472c63f0f0d035fbcf28ea7e2eca34f9d33e6c758d865048', 'hex')
const privKey2 = Buffer.from('9cbba535bed7f18cf7ee446ac1b89b2cce27e12fe7feb3149bd2af2cd885ab19', 'hex')

//get the balance and print to console
web3.eth.getBalance(account1, (err, bal) => {
    console.log('account 1 balance:', web3.utils.fromWei(bal, 'ether'))
})
web3.eth.getBalance(account2, (err, bal) => {
    console.log('account 2 balance:', web3.utils.fromWei(bal, 'ether'))
})

    
web3.eth.getTransactionCount(account1, (err, txCount)=> {
    //build tx
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei('1','ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    //sign tx
    //EDIT: new way to specify txObject on non mainnet chain
    const tx = new Tx(txObject, {'chain':'rinkeby'});
    tx.sign(privKey1)
    
    const serializedTransaction = tx.serialize()
    const raw = '0x'+serializedTransaction.toString('hex')
    
    //broadcast tx
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
    })
})
