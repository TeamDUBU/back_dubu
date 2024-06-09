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
  useAgent_list,
  useGetUrlList,
  useGetURL,
  useGetAgentHistory
} = require("../klaytnService");
const router = express.Router();

//front usage
//const params = {agents: "0x...."}
//axios.get("localhost:3000/manage/customerlist", {params})

router.get("/agentHistory/:agents", async (req, res) => {
  try {
    const me = req.params.agents.toLowerCase();
    const result = await useAgent_list(me);
    const myItems = [];
    for (let i = 0; i < result.count; i++) {
      let tmp = await useGetAgentHistory(me, i);
      const vault = await useGetVault(tmp.tokenId);
      const myitem = {
        tokenId: tmp.tokenId,
        hosu: tmp.hosu,
        status: tmp.status,
        code: tmp.code,
        agent: tmp.agent,
        isReady: tmp.isReady,
        option: tmp.option,
        contract_list: tmp.contract_list,
        addrToji: vault["addrToji"],
        note: vault["note"],
      }
      myItems.push(myitem);
    }
    res.json(myItems);
  } catch (error) {
    console.log(error);
  };
});
router.get("/customerlist/:agents", async (req, res) => {
  //GetItemListAll로 모든 매물 정보 로드
  //해당 매물에 대해 Item_List를 사용해 agent 조회
  //그게 해당 인물이라면 배열에 담아 리턴
  let uri = {};
  try {
    const ITEMS = await useGetItemsListAll();
    const me = req.params.agents.toLowerCase();
    const myItems = [];
    for (const item of ITEMS) {
      useGetURL().then(async (res) => { uri = res });
      const tmp = await useItem_List(item[0], item[1]);
      const tmp2 = await useGetUrlList(tmp.tokenId, tmp.hosu);
      const vault = await useGetVault(tmp.tokenId);
      if (me == tmp["agent"].toLowerCase()) {
        const myitem = {
          tokenId: tmp.tokenId,
          hosu: tmp.hosu,
          status: tmp.status,
          code: tmp.code,
          agent: tmp.agent,
          isReady: tmp.isReady,
          option: tmp.option,
          index: tmp.index,
          contract_list: tmp.contract_list,
          url: tmp2,
          url2: uri,
          addrToji: vault["addrToji"],
          note: vault["note"],
        };
        myItems.push(myitem);
      }
    }
    res.json(myItems);
  } catch (error) {
    console.log(error);
  }

});
//const params = {tokenId: "0x...", hosu: "202"}
//axios.get("localhost:3000/manage", {params})
router.get("/:tokenId/:hosu", async (req, res) => {
  var itemlist = [];
  try {
    const tmp = await useItem_List(req.params.tokenId, req.params.hosu);
    const tmp2 = await useGetUrlList(req.params.tokenId, req.params.hosu);
    const vault = await useGetVault(req.params.tokenId);
    let itemSchema = {
      tokenId: tmp.tokenId,
      hosu: tmp.hosu,
      status: tmp.status,
      code: tmp.code,
      agent: tmp.agent,
      isReady: tmp.isReady,
      option: tmp.option,
      index: tmp.index,
      contract_list: tmp.contract_list,
      url: tmp2,
      addrToji: vault["addrToji"],
      note: vault["note"],
    };
    itemlist.push(itemSchema);
    res.send(itemlist);
  } catch (error) {
    console.log(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const Agents_List = await useGetAgentsListAll();
    let Agents_info_array = [];
    var Agent_info;
    for (const agent of Agents_List) {
      const tmp = await useAgent_list(agent);
      Agent_info = {
        account: tmp.account,
        name: tmp.name,
        workplace: tmp.workplace,
        code: tmp.code,
        contact: tmp.contact,
        date: tmp.date,
      };
      Agents_info_array.push(Agent_info);
    }
    res.json(Agents_info_array);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
