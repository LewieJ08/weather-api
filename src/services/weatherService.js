module.exports = async location => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${process.env.API_KEY}&contentType=json`;
    try {
        const response = await fetch(url, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error({status: response.status});
        }

        const rawData = await response.json();
        const days = [];
        
        for (day of rawData.days) {
            const hours = [];

            for (hour of day.hours) {
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
        throw error;
    }
}