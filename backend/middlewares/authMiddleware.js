const authMiddleware = (req, res, next) => {
    req.user = { userId: 1, name: "user" }; // Mock authenticated user
    next();
}

export default authMiddleware;