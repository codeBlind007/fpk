import { cartServices } from "../services/cart.services";

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
            message: "Internal server error"
        })
    }
}

export const cartController = {
    getCartItems,
}