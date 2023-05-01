const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    // The purpose of this function is to provide a strong encrption to the private key
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
    const encryptedJsonKey = await wallet.encrypt(
        process.env.PRIVATE_KEY_PASSWORD,
        process.env.PRIVATE_KEY
    )
    /* This constant is the encrypted key for this function and can be used locally with 
      the help of a password */
    /* It takes two parameters, the encrypted password and the private key itself  */

    console.log(encryptedJsonKey)
    fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey)
    // This is to create a new file and write some things into it.
}

main()
    .then(() => ProcessingInstruction.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
