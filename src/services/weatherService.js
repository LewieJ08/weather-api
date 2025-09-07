module.exports = async location => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${process.env.API_KEY}&contentType=json`;
    try {
        const response = await fetch(url, {
            method: "GET"
        });

        if (!response.ok) {
            const error = new Error(`Weather API failed with status code ${response.status}`);
            error.status = response.status;
            throw error;
        }

        const rawData = await response.json();
        const days = [];
        
        for (const day of rawData.days) {
            const hours = [];
            for (const hour of day.hours) {
                hours.push({
                    datetime: hour.datetime,
                    temp: hour.temp,
                    icon: hour.icon
                });
            }

            if (!days[9]) {
                days.push({
                    datetime: day.datetime,
                    tempmax: day.tempmax,
                    tempmin: day.tempmin,
                    conditions: day.conditions,
                    description: day.description,
                    icon: day.icon,
                    hours: hours
                 });
            } else {
                break;
            }
        }

        const data = {
            address: rawData.address,
            description: rawData.description,
            days: days
        };

        return data;
    } catch(error) {
        if (error.status === 400) {
            throw new Error(`Must be valid location, got '${location}'`);
        }

        throw error;
    }
}