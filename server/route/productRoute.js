import express from "express";
import { createProductController, deleteProduct, getAllProduct, getProductPhoto, getSingleProduct, updateProduct } from "../controller/productController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import formidableMiddleware from 'express-formidable';

const router = express.Router()

router.post("/create-new-product", requireSignIn, isAdmin, formidableMiddleware(), createProductController)
router.get("/get-single-product/:slug", requireSignIn, isAdmin, getSingleProduct)
router.put("/update-product/:pid", requireSignIn, isAdmin, formidableMiddleware(), updateProduct)
router.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteProduct)
router.get("/get-all-product", requireSignIn, isAdmin, getAllProduct)
router.get("/get-product-photo/:pid", requireSignIn, isAdmin, getProductPhoto)

export default router