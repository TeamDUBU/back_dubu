require("dotenv").config();
const Caver = require("caver-js");
const CaverExt = require("caver-js-ext-kas");
const caver = new Caver(process.env.KLAYTN_NODE_URL);
const abiNFT = require("../ABI_NFT.json");
const abiDUBU = require("../ABI_DUBU.json");
const caverExt = new CaverExt(
  1001,
  process.env.KAS_ACCESS_ID,
  process.env.KAS_ACCESS_KEY
);

const NFTcontract = new caver.contract(abiNFT, process.env.NFT_ADDR);
const DUBUcontract = new caver.contract(abiDUBU, process.env.DUBU_ADDR);

async function useGetVault(tokenID) {
  const res = await NFTcontract.methods.getVault(tokenID).call();
  return res;
}
async function useGetTokensListAll() {
  try {
    const res = await NFTcontract.methods.getTokensListAll().call();
    return res;
  } catch (error) {
    console.error("Error calling getTokensListAll:", error);
  }
}
async function useGetApproved(tokenID) {
  return await NFTcontract.methods
    .getApproved(tokenID)
    .call()
    .then(async (res) => {
      return res;
    });
}
async function useGetOwner(tokenID, hosu) {
  return await NFTcontract.methods
    .getOwner(tokenID, hosu)
    .call()
    .then(async (res) => {
      return res;
    });
}
async function useGetAllHistory(tokenID, hosu) {
  return await NFTcontract.methods
    .getAllHistory(tokenID, hosu)
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
async function useGetTokenURI(tokenID) {
  return await NFTcontract.methods
    .tokenURI(tokenID)
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
  return await NFTcontract.methods // 해당 회차의 거래 정보 조회
    .historyData(tokenID, hosu, index)
    .call()
    .then(async (res) => {
      return res;
    });
}
async function useGetHistoryData(tokenID, hosu, index) {
  return await NFTcontract.methods // 모든 거래 내역 조회
    .getHistoryData(tokenID, hosu)
    .call()
    .then(async (res) => {
      return res;
    });
}
///////DUBU
async function useGetAgentsListAll() {
  return await DUBUcontract.methods
    .getAgentsListAll()
    .call()
    .then(async (res) => {
      return res;
    });
}

async function useAgent_list(address) {
  const res = await DUBUcontract.methods.agent_list(address).call();
  return res;
}

async function useItem_List(tokenID, hosu) {
  return await DUBUcontract.methods
    .item_list(tokenID, hosu)
    .call()
    .then(async (res) => {
      return res;
    });
}
async function useGetUrlList(tokenID, hosu) {
  return await DUBUcontract.methods
    .getUrlList(tokenID, hosu)
    .call()
    .then(async (res) => {
      return res;
    });
}
async function useGetURL() {
  return await NFTcontract.methods
    .getURL()
    .call()
    .then(async (res) => {
      urls = {
        realEstate: res[0],
        toji: res[1],
        building: res[2],
        Thumbnail: res[3]
      }
      return urls;
    });
}

async function useGetItemsListAll() {
  // return await DUBUcontract.methods
  //   .getItemsListAll()
  //   .call()
  //   .then(async (res) => {
  //     return res;
  //   });
  const res = await DUBUcontract.methods.getItemsListAll().call();
  return res;
}
// test area
//tokenID : 1159010700110190021
// async function testFunction() {
//   const out = await useGetHistoryData("1159010200105000001", "102");
//   console.log(out);
// }

// testFunction();
module.exports = {
  useGetTokensListAll,
  useGetVault,
  useGetApproved,
  useGetAllHistory,
  useGetHosuData,
  useGetHistoryData,
  useGetHosuDataArray,
  useHistoryData,
  useHosuData,
  useHosuDataArray,
  useGetAgentsListAll,
  useItem_List,
  useGetItemsListAll,
  useGetUrlList,
  useGetOwner,
  useGetTokenURI,
  useAgent_list,
  useGetURL
};
