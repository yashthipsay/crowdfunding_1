const ethers = require("ethers")
const fs = require("fs-extra")

require("dotenv").config()

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    //const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    // Instead of using the above function directly, we will make use of the encrypted file
    const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8")
    let wallet = new ethers.Wallet.fromEncryptedJsonSync(
        encryptedJson,
        process.env.PRIVATE_KEY_PASSWORD
    ) //Encryption of wallet
    //When new is written, it means we are creating an object for an instance of a particular library or class
    wallet = await wallet.connect(provider)
    // This is to manually connect wallet with the rpc address/provider

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")

    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)

    console.log("Deploying, please wait...")

    const contract = await contractFactory.deploy()

    console.log(`Contract Address: ${contract.address}`)
    // contract.address displays the address of the contract

    const currentFavoriteNumber = await contract.retrieve()
    console.log(`Current Favorite Number ${currentFavoriteNumber}`)

    const transactionResponse = await contract.store("5")
    const transactionReceipt = await transactionResponse.wait(1)

    const updatedFavoriteNumber = await contract.retrieve()
    console.log(`Updated Favorite Number: ${updatedFavoriteNumber}`)
}

main()
    .then(() => ProcessingInstruction.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
