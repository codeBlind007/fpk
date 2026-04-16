import { wishlistService } from "../services/wishlist.services.js";

const addToWishlist = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }
    const result = await wishlistService.addToWishlist(
      userId,
      req.body.productId,
    );

    res.status(200).json({
      success: true,
      message: result.message,
      item: result.item,
      alreadyExists: result.alreadyExists,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

const removeFromWishlist = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    await wishlistService.removeFromWishlist(
      req.user.userId,
      req.params.productId,
    );

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

const getWishlist = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const items = await wishlistService.getWishlist(userId);

    res.status(200).json({
      success: true,
      items,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

export const wishlistController = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
