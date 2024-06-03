const express = require("express");
const axios = require("axios");
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
    useGetOwner,
    useGetTokenURI,
    useGetURL
} = require("../klaytnService");
const router = express.Router();
router.get("/:address", async (req, res) => {
    const Token = await useGetTokensListAll();
    var myNFT = [];
    var myNFTs = [];
    let HosuArr;
    let vault;
    let me;
    let uri = {};
    for (const item of Token) {
        HosuArr = await useGetHosuDataArray(item);
        vault = await useGetVault(item);
        await useGetURL().then(async (res) => { uri = res });
        for (const hosu of HosuArr) {
            me = await useGetOwner(item, hosu);
            if (me.toLowerCase() == req.params.address.toLowerCase()) {
                myNFT.push(hosu);
            }
        }
        if (myNFT.length > 0) {
            myNFTs.push({
                tokenId: item,
                hosu: myNFT,
                addrToji: vault["addrToji"],
                note: vault["note"],
                url: uri
            });
            myNFT = [];
        }
    }
    res.send(myNFTs);
});

module.exports = router;
