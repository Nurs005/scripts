const {ethers} = require('ethers');
const artifact = require('./Inflation.json');
const build = require('./buld.js');
const { Etherscan } = require( "@nomicfoundation/hardhat-verify/etherscan");
require('dotenv').config();

const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/4mWLRuZZnq7pghyzEzUl1usuZnY17u6l');

const signer = new ethers.Wallet(process.env.KEY, provider);

const factory  = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);

const deploy = async()=>{
   try {
    const contract = await factory.deploy("bub", "bub", "0xB973BfDC9597f249Fd34f695F397857AE0d2b04A");
    console.log(await contract.getAddress());
   } catch (error) {
    console.log(error);
   }
}

const instance = new Etherscan(
    "Y47898HH5WVAYSX2665PXJC7GKGKBFWS1B", // Etherscan API key
    "https://api-sepolia.etherscan.io/api", // Etherscan API URL
    "https://sepolia.etherscan.io/" // Etherscan browser URL
  );

const verifyCation = async()=>{
    console.log("here0");
    const isVer = await instance.isVerified("0x21767da1Cd658e277CaDb532C2F72b8c991ba224");
    if (!isVer) {
        try {
            console.log("here1");
            const { message: guid } = await instance.verify(
                // Contract address
                "0x21767da1Cd658e277CaDb532C2F72b8c991ba224",
                // Contract source code
                build,
                // Contract name
                "contracts/Inflation.sol:Inflation",
                // Compiler version
                "v0.8.20+commit.a1b79de6",
                // Encoded constructor arguments
                "000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000b973bfdc9597f249fd34f695f397857ae0d2b04a0000000000000000000000000000000000000000000000000000000000000003627562000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000036275620000000000000000000000000000000000000000000000000000000000"
              ); 
              console.log("here2");
              setTimeout(instance.verify ,1000);
              console.log("here1");
              const verificationStatus = await instance.getVerificationStatus(guid);
              console.log("here1");
              console.log(verificationStatus);
              
              if (verificationStatus.isSuccess()) {
                const contractURL = instance.getContractUrl("0x21767da1Cd658e277CaDb532C2F72b8c991ba224");
                console.log(
                  `Successfully verified contract "MyContract" on Etherscan: ${contractURL}`
                );
              }else{
                  console.log("not success");
              }  
        } catch (error) {
            console.log(error);
        }
      }
}

verifyCation();



