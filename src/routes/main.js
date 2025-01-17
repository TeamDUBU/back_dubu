const express = require("express");
const {
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
  useGetURL
} = require("../klaytnService");
const router = express.Router();
router.get("/kmap", async (req, res) => {
  kmap_res = [];
  try {
    const ITEMS = await useGetItemsListAll();
    for (const item of ITEMS) {
      const vault = await useGetVault(item[0]);
      const hosudata = await useGetHosuData(item[0], item[1]);
      const info = {
        tokenId: item[0],
        addr: vault["addrToji"],
        note: vault["note"],
        price: hosudata["price"],
        hosu: item[1],
      };
      kmap_res.push(info);
    }
    res.json(kmap_res);
  } catch (error) {
    console.log(error);
  }
});
router.get("/", async (req, res) => {
  let uri = {};
  var itemlist = [];
  try {
    const ITEMS = await useGetItemsListAll();
    useGetURL().then(async (res) => { uri = res });
    for (const item of ITEMS) {
      const tmp = await useItem_List(item[0], item[1]);
      const tmp2 = await useGetUrlList(item[0], item[1]);
      const vault = await useGetVault(item[0]);
      let itemSchema = {
        tokenId: tmp.tokenId,
        hosu: tmp.hosu,
        code: tmp.code,
        agent: tmp.agent,
        isReady: tmp.isReady,
        status: tmp.status,
        option: tmp.option,
        index: tmp.index,
        contract_list: tmp.contract_list,
        url: tmp2,
        url2: uri,
        addrToji: vault["addrToji"],
        note: vault["note"],
      };
      itemlist.push(itemSchema);
    }
    res.send(itemlist);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
