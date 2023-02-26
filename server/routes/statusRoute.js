const { Router } = require("express");
const { getUserStatus, createUserStatus, deleteUserStatus } = require("../controllers/statusController");

const statusRoute = Router();

statusRoute.get('/:userID', getUserStatus);

statusRoute.post('/', createUserStatus);

exports.statusRoute = statusRoute;