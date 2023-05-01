const ethers = require("ethers") // This is a way to import ethers package
// require is a function in javascript used to import packages

const fs = require("fs")
//To deploy the smart contract, we need the ABI and the binary compiled code
// To read these two things, the 'fs' package is imported

require("dotenv").config()
// This package is used to access environment variables

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.RPC_URL
    ) /* This is the way this script is going to connect to the local blockchain.
     The RPC url is entered which acts as a communicator with the script */

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    //Private key from environment variables is called this way
    // This is way of interacting with a wallet with the local blockchain
    // Wallet function takes two parameters, the private key and a provider

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")

    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )
    // This fs function is used to read the smart contract
    // It takes two parameters, the path and options
    // Two files need to be read, the abi file and the binary compiled code file

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    // A Contract Factory is an object used to deploy smart contracts
    // It takes 3 parameters, the abi, binary and wallet functions
    /* Because of the ABI, the code knows how to interact with the contract,
     binary is the actual compiled code, and wallet has the private key to
     sign in to the deployed contract */

    console.log("Deploying, please wait...")

    const contract = await contractFactory.deploy()
    // await indicates to stop here until the contract is deployed
    // await and the function together creates a contract object
    /* If the await keyword is not used, then the whole program will run while the contract is getting deployed.
     It will show pending status before the blockhain gets deployed  */

    const deploymentReceipt = await contract.deployTransaction.wait(1)
    // If you want to wait certain blocks to make sure they are attached to the chain, this command is used
    /* This command is to tell the compiler to wait for 1 block confirmation
     to make sure it happened  */
    // You only get a transaction receipt when you wait for block confirmation

    console.log(contract)

    //deployment Transaction
    console.log("Here is the Deployment Transaction")
    console.log(contract.deployTransaction)
    console.log("Here is the deployment Receipt: ")
    console.log(deploymentReceipt)

    const currentFavoriteNumber = await contract.addPerson(5, "Name")
    /* The contract variable contains the abi for the deployed smart contract.
     Therefore we can access the functions inside the smart contract using the ABI */

    const favoriteNumber = await contract.retrieve()
    console.log(`Current favorite Number: ${favoriteNumber.toString()}`)
    // This is known as string interpolation.
    //Backticks are used to enclose strings and dollar signs are used for denoting variables
    const transactionResponse = await contract.store("5")
    // This is to give a value to the retrieve function.
    const transactionReceipt = await transactionResponse.wait(1)
    //Confirmation

    const updatedFavoriteNumber = await contract.retrieve()
    console.log(`Updated Favorite Number: ${updatedFavoriteNumber}`)
    // This is to get the stored number

    // This is to convert the string into a more readable form
}
// RPC server: http://127.0.0.1:7545

main()
    .then(() => ProcessingInstruction.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

// solc.js has a way to compile contracts that imports other contracts via relative paths
// Revise compilation commands
