const express = require("express");
const router = express.Router();
//라우트 모듈 호출
const mainRoutes = require("./main");
const homeRoutes = require("./home");
//라우트 경로 맵핑
router.use("/main", mainRoutes);
router.use("/", homeRoutes);

//최종 라우터 메인으로 내보내기
module.exports = router;
