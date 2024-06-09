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

router.get("/:tokenId/:hosu", async (req, res) => {
    let array = [];
    try {
        const arr = await useGetHistoryData(req.params.tokenId, req.params.hosu);
        for (const item of arr) {
            obj = {
                timeStamp: item[0],
                prevOwner: item[1],
                newOwner: item[2],
                code: item[3],
                note: item[4],
                price: item[5]
            }
            array.push(obj);
        }
        res.send(array);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
