import {ethers} from "hardhat";

async function main(){
const TokenSwap = await ethers.getContractFactory("TokenSwap");

const Tok = ethers.utils.parseEther("400000000000000000000000")
const tokenSwap = await TokenSwap.deploy("Oreo", "ORE",Tok);
await tokenSwap.deployed();
console.log(`Token Swap is deployed at: ${tokenSwap.address}`);


// const tokenSwap = await ethers.getContractAt("TokenSwap", "0xe14058B1c3def306e2cb37535647A04De03Db092");


// Account to impersonate 
// const usdtContractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const usdtContractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
// const usdtHolder = "0xA997faA3EE748067d1D6E17e16333DD8Ad29535e";
 const usdtHolder= "0x748dE14197922c4Ae258c7939C7739f3ff1db573";

//  impersonating the DAi Holde
const helpers = require("@nomicfoundation/hardhat-network-helpers");
await helpers.impersonateAccount(usdtHolder);
const impersonatedSigner = await ethers.getSigner(usdtHolder);

const USDTCONNECT = await ethers.getContractAt("IUSDT", usdtContractAddress);
 const balance = await USDTCONNECT.balanceOf(usdtHolder);
 console.log(`USDT Balance Before ${balance}`);

 const val = ethers.utils.parseEther("100000");
// Approvig my contract to spend the Usdt
  await USDTCONNECT.connect(impersonatedSigner).approve(tokenSwap.address, val);



const getPriceFeed = await  tokenSwap.getLivePrice();
console.log(`Eth live price feed ${getPriceFeed}`);
const totalSupply = await tokenSwap.totalSupply();
// const ape = await totalSupply
console.log(totalSupply);

 
 const swap = await tokenSwap.connect(impersonatedSigner).swapme(val);
 console.log(swap);

 const getbalance = await tokenSwap.connect(impersonatedSigner).getUserBalance();
 console.log(`Your Oreo balance is ${getbalance}`);

 const TokenAddress = await USDTCONNECT.balanceOf(tokenSwap.address);

 console.log(`your usdt price is ${TokenAddress}`);
//  console.log(await swap.wait());
//  const swat= (await swap.wait()).events;
//  const swaA = await swat[0].args;

//  console.log(swaA);

}
main().catch((error)=>{
    console.error(error);
    process.exitCode = 1;

})