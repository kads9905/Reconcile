

const healthCheck = (req, res) => {
    res.status(200)
    .json({
        success: true,
        message: "Reconcile API is running",
    });
};



export {
    healthCheck
};