const getWeather = (req, res) => {
    res.status(200).json({
        success: true,
        message: `Weather for ${req.query.location} fetched successfully.`,
        data: {sampleData: `${req.query.location} weather.`}
    });
}

module.exports = {getWeather};