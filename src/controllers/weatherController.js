const connectRedis = require("../config/redis");
const fetchWeather = require("../services/weatherService");

const getWeather = async (req, res, next) => {
    let data;
    const location = req.query.location;

    if (!location) {
        return res.status(404).json({
            success: false,
            error: "No location query found"
        });
    }

    try {
        const client = await connectRedis();
        const cachedData = await client.get(location);

        if (!cachedData) {
            data = await fetchWeather(location);
            await client.set(location, JSON.stringify(data), "EX", 43200);
            console.log(`${location} Data cached for 12 hours.`);
        } else {
            data = JSON.parse(cachedData);
            console.log(`Fetched ${location} data from cache.`);
        }

        res.status(200).json({
            success: true,
            message: `Weather for ${location} fetched successfully.`,
            data: data
        });
    } catch(error) {
        next(error);
    }
}

module.exports = {getWeather};