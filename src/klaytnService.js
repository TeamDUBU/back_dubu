const Caver = require("caver-js");
const CaverExt = require("caver-js-ext-kas");
const caver = new Caver(process.env.KLAYTN_NODE_URL);
const caverExt = new CaverExt(
  1001,
  process.env.KAS_ACCESS_ID,
  process.env.KAS_ACCESS_KEY
);
