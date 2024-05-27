const express = require("express");
const { useGetVault } = require("../klaytnService");
const router = express.Router();
//const klaytnSrv = require("../klaytnService");
router.get("/", async (req, res) => {
  const vaultData = await useGetVault("1159010700110190021");
  res.send(vaultData);
});

module.exports = router;
