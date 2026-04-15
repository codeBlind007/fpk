import pool from "../database/db.js";
import { productServices } from "../services/product.services.js";

const getProducts = async(req, res, next) => {
    try {
        const products = await productServices.getProducts();
        console.log(products);
        res.status(200).json({
            success: true,
            results: products.length,
            products,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const getProductById = async(req, res, next) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            })
        }
        const product = await productServices.getProductById(id);

        res.status(200).json({
            success: true,
            product,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const filterProductsByCategory = async(req, res, next) => {
    try {
        const {category} = req.query;
        if(!category){
            return res.status(400).json({
                success: false,
                message: "Category is required"
            })
        }
        const products = await productServices.filterProductsByCategory(category);
        res.status(200).json({
            success: true,
            results: products.length,
            products,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const searchProducts = async(req, res, next) => {
    try {
        const {name} = req.query;
        if(!name){
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            })
        }

        const products = await productServices.searchProducts(name);
        res.status(200).json({
            success: true,
            results: products.length,
            products,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const productDetails = async(req, res, next) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            })
        }

        const product = await productServices.getProductById(id);

        res.status(200).json({
            success: true,
            product,    
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const productController = {
    getProducts,
    getProductById,
    filterProductsByCategory,
    searchProducts, 
    productDetails,
}