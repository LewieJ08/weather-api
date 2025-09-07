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
                    dateTime: hour.datetime,
                    temp: hour.temp
                });
            }

            if (!days[9]) {
                days.push({
                    dateTime: day.datetime,
                    tempMax: day.tempmax,
                    hours: hours
                 });
            } else {
                break;
            }
        }

        return days;
    } catch(error) {
        if (error.status === 400) {
            throw new Error(`Must be valid location, got '${location}'`);
        }

        throw error;
    }
}