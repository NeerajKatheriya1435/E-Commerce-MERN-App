import fs from "fs"
import slugify from "slugify"
import productModel from "../models/productModel.js"
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields
        const { photo } = req.files
        if (!name || !description || !price || !category || !quantity || !photo) {
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            })
        }
        if (photo.size > 200000) {
            return res.status(400).send({
                success: false,
                message: "Photo should not be more than 2 mb",
            })
        }
        const product = new productModel({ ...req.fields, slug: slugify(name) })

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save()
        return res.status(201).send({
            success: true,
            message: "Created product successfully",
            product
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error,
            success: false,
            message: "Error while creating product"
        })
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const allProduct = await productModel.find({}).select("-photo").limit(10).sort({ createdAt: -1 }).populate("category")
        return res.status(200).send({
            success: true,
            message: "Fetched all products",
            totalProduct: allProduct.length,
            allProduct
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error,
            success: false,
            message: "Error while fetching all product"
        })
    }
}

//get single product
export const getSingleProduct = async (req, res) => {
    try {
        const singleProduct = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        return res.status(200).send({
            success: true,
            message: "Fetched single product",
            singleProduct
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error,
            success: false,
            message: "Error while fetching product"
        })
    }
}
// get product photo
export const getProductPhoto = async (req, res) => {
    try {
        const productPhoto = await productModel.findById(req.params.pid).select('photo')
        if (productPhoto.photo.data) {
            res.set("Content-type", productPhoto.photo.contentType)
        }
        return res.status(200).send(productPhoto.photo.data)
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error,
            success: false,
            message: "Error while fetching product photo"
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        return res.status(200).send({
            success: true,
            message: "Deleted product successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error,
            success: false,
            message: "Error while deleting product photo"
        })
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields
        const { photo } = req.files
        if (!name || !description || !price || !category || !quantity) {
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            })
        }
        if (photo && photo.size > 200000) {
            return res.status(400).send({
                success: false,
                message: "Photo should not be more than 2 mb",
            })
        }
        const product = await productModel.findByIdAndUpdate(req.params.pid, {
            ...req.fields, slug: slugify(name)
        }, { new: true }
        )

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save()
        return res.status(201).send({
            success: true,
            message: "Updated product successfully",
            product
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error,
            success: false,
            message: "Error while updating product"
        })
    }
}
