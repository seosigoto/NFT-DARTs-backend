module.exports = app => {
  const monitorController = require("../controllers/monitor.controller.js");

  const router = require("express").Router();

  router.post("/status-change", monitorController.statusChange);

  router.get("/", monitorController.dashboard);

  app.use('/', router);
};
