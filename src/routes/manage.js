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

//front usage
//const params = {agents: "0x...."}
//axios.get("localhost:3000/manage/customerlist", {params})
router.get("/customerlist/:agents", async (req, res) => {
  //GetItemListAll로 모든 매물 정보 로드
  //해당 매물에 대해 Item_List를 사용해 agent 조회
  //그게 해당 인물이라면 배열에 담아 리턴
  const ITEMS = await useGetItemsListAll();
  const me = req.params.agents;
  const myItems = [];
  for (const item of ITEMS) {
    const tmp = await useItem_List(item[0], item[1]);
    console.log(me, tmp["agent"]);
    if (me == tmp["agent"]) {
      const myitem = {
        tokenId: tmp["tokenId"],
        hosu: tmp["hosu"],
        status: tmp["status"],
      };
      myItems.push(myitem);
    }
  }
  res.json(myItems);
});
//const params = {tokenId: "0x...", hosu: "202"}
//axios.get("localhost:3000/manage", {params})
router.get("/:tokenId/:hosu", async (req, res) => {
  const tmp = await useItem_List(req.params.tokenId, req.params.hosu);
  const tmp2 = await useGetUrlList(req.params.tokenId, req.params.hosu);
  const vault = await useGetVault(req.params.tokenId);
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
    note: vault["note"],
  };
  itemlist.push(itemSchema);
});

module.exports = router;
