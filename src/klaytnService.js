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

const NFTcontract = new caver.contract(abiNFT, process.env.NFT_ADDR);

async function useGetVault(tokenID) {
  return await NFTcontract.methods
    .getVault(tokenID)
    .call()
    .then(async (res) => {
      return res;
    });
}

async function useHosuData(tokenID, hosu) {
  return await NFTcontract.methods
    .hosuData(tokenID, hosu)
    .call()
    .then(async (res) => {
      return res;
    });
}
async function useGetHosuData(tokenID, hosu) {
  return await NFTcontract.methods
    .getHosuData(tokenID, hosu)
    .call()
    .then(async (res) => {
      return res;
    });
}

async function useHosuDataArray(tokenID, index) {
  return await NFTcontract.methods
    .hosuDataArray(tokenID, index)
    .call()
    .then(async (res) => {
      return res;
    });
}
async function useGetHosuDataArray(tokenID) {
  return await NFTcontract.methods
    .getHosuDataArray(tokenID)
    .call()
    .then(async (res) => {
      return res;
    });
}
async function useHistoryData(tokenID, hosu, index) {
  return await NFTcontract.methods
    .historyData(tokenID, hosu, index)
    .call()
    .then(async (res) => {
      return res;
    });
}
// test area
//tokenID : 115901070011019002
async function testFunction() {
  const out = await useHistoryData("1159010700110190021", 203, 1);
  console.log(out);
}
testFunction();
module.exports = {
  useGetVault,
  useGetHosuData,
  useGetHosuDataArray,
  useHistoryData,
  useHosuData,
  useHosuDataArray,
};
