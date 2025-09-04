module.exports = async location => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${process.env.API_KEY}&contentType=json`;
    const response = await fetch(url);

    return response;
}