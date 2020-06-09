const {createUser, getUserByUserId, getUsers, updateUser, deleteUser, loginuser} = require ("./user.controller");

const router = require("express").Router();
const {checkToken} = require("../../auth/token_validator")

router.post("/",checkToken, createUser);
router.get("/", checkToken,getUsers);
router.get("/:user_id",checkToken, getUserByUserId);
router.patch("/", checkToken,updateUser);
router.delete("/",checkToken, deleteUser);
router.post("/login", loginuser);

module.exports = router;