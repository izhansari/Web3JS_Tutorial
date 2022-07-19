//PURPOSE:  cool tips for web3. 
            // - average gas price
            // - 
//NOTE:     


const Web3 = require('web3')
const web3 = new Web3('https://mainnet.infura.io/v3/8b31aa8a9e104bb99f1464915c82ab67')

//get average gas price
web3.eth.getGasPrice().then((result)=> {
    console.log(web3.utils.fromWei(result, 'ether'))
})

//create a sha3 hash from string
console.log('sha3 string:', web3.utils.sha3('creates a sha3 hash from this string'))

//create a sha3 hash from number... cant do from raw int. need to wrap as string OR cast as BN (but don't have that functionality rn in this code...)
console.log('sha3 #:', web3.utils.sha3('123'))

//create a keccak256 hash from string. Same as sha3.
console.log('keccak256 string:', web3.utils.keccak256('creates a sha3 hash from this string'))

//can use solidity's Sha3 hashing function.
console.log('solidity sha3 string:', web3.utils.soliditySha3('creates a sha3 hash from this string'))

//create a randomHex of x length
console.log('randomHex0:', web3.utils.randomHex(0))
console.log('randomHex1:', web3.utils.randomHex(1))
console.log('randomHex2:', web3.utils.randomHex(2))
console.log('randomHex0:', web3.utils.randomHex(0))
console.log('randomHex1:', web3.utils.randomHex(1))
console.log('randomHex2:', web3.utils.randomHex(2))
