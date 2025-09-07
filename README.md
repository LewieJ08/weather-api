# Weather API Wrapper Service

A Node.js & Express backend service that wraps around the **[Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)** and adds caching with Redis.  
This prevents repeated external API calls, improves response times, and hides sensitive API keys from clients.

![Weather API Diagram](./assets/weather-api-diagram.png)

---

## 📌 Features

- 🌍 Fetch real-time and forecast weather data from **Visual Crossing**
- 🔒 Keep API keys secure (never exposed to clients)
- ⚡ Cache responses in **Redis** to avoid unnecessary external API calls
- ⏳ Configurable cache expiration (default: 43200 seconds || 12 hours)
- 🧹 Provide a **clean and consistent JSON structure** regardless of the 3rd-party API
- 🔄 Acts as a **wrapper service**, so frontend apps don’t need to deal with raw Visual Crossing data

---

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Backend framework
- **Redis** – In-memory caching database

---

## Usage
1. Clone the repo and install dependencies:

```bash
git clone https://github.com/LewieJ08/weather-api.git
cd weather-api
npm install
```

2. Add this .env file in the route of the project

```env
PORT=3000
API_KEY="your_api_key"
REDIS_URL="redis://localhost:6379"
CACHE_EXPIRE=43200 
```

3. Ensure redis is running locally and run the start script:

```bash
npm run start
```

## Example request
```
GET http://localhost:3000/?location=london
```

## Example response

```
{
  "success": true,
  "message": "Weather for london fetched successfully.",
  "data": {
    "address": "london",
    "description": "Similar temperatures continuing with a chance of rain Wednesday, Thursday & Sunday.",
    "days": [
      {
        "datetime": "2025-09-07",
        "tempmax": 77.3,
        "tempmin": 60.3,
        "conditions": "Partially cloudy",
        "description": "Becoming cloudy in the afternoon.",
        "icon": "partly-cloudy-day",
        "hours": [
          {
            "datetime": "00:00:00",
            "temp": 63.3,
            "icon": "cloudy"
          }, 
          {
            ...
          }
        ]
      },
      {
        ...
      }
    ]
  }
}
```



