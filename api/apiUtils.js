exports.ok = (message, data, res) => {
    res.json({
        message,
        status: true,
        data
    }).end();
}
exports.failed = (message, errors, res) =>{
    res.json({
        message,
        status: false,
        errors
    }).end();
}