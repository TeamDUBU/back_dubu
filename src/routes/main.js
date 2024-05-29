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
} = require("../klaytnService");
const router = express.Router();
router.get("/kmap", async (req, res) => {
  const ITEMS = await useGetItemsListAll();
  var itemlist = [];
  //console.log(ITEMS);
  for (const item of ITEMS) {
    const tmp = await useItem_List(item[0], item[1]);
    console.log(tmp);
    itemlist.push(tmp);
  }
  res.send(itemlist);
  //res.send("hi");
});

module.exports = router;
