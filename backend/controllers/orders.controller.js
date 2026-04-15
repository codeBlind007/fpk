import orderService from "../services/orders.services.js";

const getOrderSummary = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items array is required",
      });
    }

    const summary = await orderService.calculateSummary(userId, items);
    res.json({
      success: true,
      summary,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

const placeOrder = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { items, shipping_address } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items array is required",
      });
    }

    if (!shipping_address) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    const order = await orderService.createOrder(userId, {
      items,
      shipping_address,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order.id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    if (!id || !/^[0-9]+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Valid order ID is required",
      });
    }
    const order = await orderService.fetchOrderById(id, userId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

export const orderController = {
  getOrderSummary,
  placeOrder,
  getOrderById,
};
