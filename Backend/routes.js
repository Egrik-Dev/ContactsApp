const express = require("express");

const controller = require("./controller");

const router = express.Router();

router.get("/contacts/:userId", controller.getContacts);

router.post("/login", controller.postLoginUser);

router.post("/create-user", controller.postCreateUser);

router.post("/add-contact", controller.postAddContact);

router.post("/delete-contact", controller.deleteContact);

router.post("/edit-contact", controller.editContact);

module.exports = router;
