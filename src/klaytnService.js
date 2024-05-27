require("dotenv").config();
const Caver = require("caver-js");
const CaverExt = require("caver-js-ext-kas");
const caver = new Caver(process.env.KLAYTN_NODE_URL);
const abiNFT = require("../ABI_NFT.json");
const caverExt = new CaverExt(
  1001,
  process.env.KAS_ACCESS_ID,
  process.env.KAS_ACCESS_KEY
);

const NFTcontract = new caver.contract(
  abiNFT,
  "0x19bD53B59024BD432cb5417f3dD97188c9ff47fb"
);
// async function testFunction() {
//   const version = await caver.rpc.klay.getClientVersion();
//   console.log(version);
// }
async function useGetVault(tokenID) {
  //const vault = await NFTcontract.call("getVault", tokenID);
  return await NFTcontract.methods
    .getVault(tokenID)
    .call()
    .then(async (res) => {
      //console.log(res[1]);
      return res[1];
    });
}

// testFunction();

module.exports = { useGetVault };
