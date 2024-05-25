import express from "express"
import {
    forgotPasswordController,
    loginController,
    registerController,
    testController
} from "../controller/authController.js"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

//register user
router.post("/register", registerController)
router.post("/login", loginController)
router.post("/test", requireSignIn, isAdmin, testController)

//protected user routes
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})
//protected admin routes
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

router.post("/forgot-password", forgotPasswordController)


export default router