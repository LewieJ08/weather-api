const redis = require("redis");

let client;

module.exports = async () => {
    if (!client) {
        try {
            client = await redis.createClient({
                url: process.env.REDIS_URL
            });

            await client.connect();
            console.log("Redis cache connected.")

        } catch(error) {
            console.log(`Redis connection failed: ${error.stack}`);
            throw error;
        }
    }
    return client;
}