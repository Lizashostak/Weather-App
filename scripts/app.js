const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const name_input = document.getElementById('name_input');

const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    return {
        cityDetails,
        weather
    };
};
//on submit search
cityForm.addEventListener('submit', e => {
    e.preventDefault();
    //get city value from the form and reset
    const city = cityForm.city.value.trim();
    cityForm.reset();
    //update the ui with new city
    updateCity(city)
        .then(data => updadeUI(data))
        .catch(err => {
            console.log(err)
        });
});

//update UI with city Temp details
const updadeUI = (data) => {
    // const cityDetailes = data.cityDetails;
    // const weather = data.weather;

    //destructure properties
    const {
        cityDetails,
        weather
    } = data;

    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;
    //remove d-none class
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

    //update the day/night & icon img
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
}

// Add a keyup event listener to input element
name_input.addEventListener("keyup", e => {
    var input = e.target;
    var huge_list = document.getElementById('huge_list');

    var min_characters = 0;
    if (input.value.length < min_characters) {
        return;
    } else {
        getPlace(input.value)
            .then(data => {
                huge_list.innerHTML = "";

                var cities = [];
                for (i = 0; i < data.length; i++) {
                    cities.push(data[i].LocalizedName);
                }
                cities.forEach(function (item) {
                    var option = document.createElement('option');
                    option.value = item;
                    huge_list.appendChild(option);
                });
            });
    }
});