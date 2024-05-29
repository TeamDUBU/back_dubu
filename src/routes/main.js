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
  useGetUrlList
} = require("../klaytnService");
const router = express.Router();
router.get("/kmap", async (req, res) => {
  const ITEMS = await useGetItemsListAll();
  kmap_res = [];
  for (const item of ITEMS) {
    const vault = await useGetVault(item[0]);
    const info = { addr: vault["addrToji"], note: vault["note"] };
    kmap_res.push(info);
  }
  res.json(kmap_res);
});
router.get("/", async (req, res) => {
  const ITEMS = await useGetItemsListAll();
  var itemlist = [];
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
      addrToji: vault["addrToji"],
      note: vault["note"]
    }
    itemlist.push(itemSchema);
  }
  res.send(itemlist);
});

module.exports = router;
