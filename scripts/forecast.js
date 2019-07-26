const key = 'lXfDMWuNUFXUh13gmT6FXeEPkcAKGwZY';

//get city information
const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    if (response.status !== 200) {
        throw new Error('cant get the data');
    }
    const data = await response.json();
    return data[0];
}

//get weather information
const getWeather = async (id) => {
    base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
}

//get places autocomplete
const getPlace = async (name) => {
    const base = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete`;
    const query = `?apikey=${key}&q=${name}`;

    const response = await fetch(base + query);
    const data = await response.json();
    return data;

}
