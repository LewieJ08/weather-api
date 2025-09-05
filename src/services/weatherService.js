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
            if (!days[9]) {
                days.push({
                    dateTime: day.datetime,
                    tempMax: day.tempmax,
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