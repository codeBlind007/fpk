import { cartServices } from "../services/cart.services.js";

const getCartItems = async(req, res, next) => {
    try {
        const {userId} = req.user;
        const cartItems = await cartServices.getCartItems(userId);
        res.status(200).json({
            success: true,
            results: cartItems.length,
            cartItems,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

const addToCart = async(req, res, next) => {
    try {
        const {userId} = req.user;
        const {productId} = req.params;

        if(!productId){
            return res.status(400).json({
                success: false,
                message: "Product ID and quantity are required"
            })
        }

        const cartItem = await cartServices.addToCart(userId, productId);
        res.status(200).json({
            success: true,
            cartItem,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

const updateCartItem = async(req, res, next) => {
    try {
        const {userId} = req.user;
        const {cartId} = req.params;
        const {quantity} = req.body;

        if(!cartId || !quantity){
            return res.status(400).json({
                success: false,
                message: "Cart ID and quantity are required"
            })
        }

        const cartItem = await cartServices.updateCartItem(userId, cartId, quantity);
        res.status(200).json({
            success: true,
            cartItem,
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

const removeFromCart = async(req, res, next) => {
    try {
        const {userId} = req.user;
        const {cartId} = req.params;

        if(!cartId){
            return res.status(400).json({
                success: false,
                message: "Cart ID is required"
            })
        }

        const deletedItem = await cartServices.removeFromCart(userId, cartId);
        res.status(200).json({
            success: true,
            deletedItem,
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

const cartSummary = async(req, res, next) => {
    try {
        const {userId} = req.user;
        const summary = await cartServices.cartSummary(userId);
        res.status(200).json({
            success: true,
            summary,
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

export const cartController = {
    getCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartSummary
}