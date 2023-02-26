const { Router } = require("express");
const { authUser, authStatus } = require("../controllers/authController");

const authRoute = Router();

authRoute.post('/', authUser);

authRoute.get('/me', authStatus);

exports.authRoute = authRoute;