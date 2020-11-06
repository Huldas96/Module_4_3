// Here I set up the API key and baselink in a veriable

const api = {
    key: "8f270c0501a93fe292ff1f696376aaa1",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector(".search-box");

// Here is an event listener that waits for a keypress
searchbox.addEventListener("keypress", setQuery); 

//This function sets the search query if the user presses enter (keycode 13)
function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value); // Here we call the getResults function and inside the argument is what was typed in the input
        console.log(searchbox.value); // Here is a test to see if what you type in shows up and that this works. 
    }
}


// Here is a function called getResults.
// The argument is the search query (what you type in the input)
// We make a fetch request to get weather information for the location that was typed in.

// fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)

// First we add backticks. Then we call the api.base to get the base link for the api.
// Then we add weather?q= (that is basicly we want weather and the query is...)
// Then we add the search query that was typed in the input, we use a function setQuery to add it.
// Then we set the units, for this we will use metric
// Then finally we add the appID api.key, wich is the api key.

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => { // Then we want the weather converted into json
            return weather.json(); // Then we want to run the json trough display results
        }).then(displayResults);
}

function displayResults (weather) {

    console.log(weather); // Here is a test to see if we get the information from the API

    // Getting location and country
    let city = document.querySelector(".location .city"); 
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    // Getting current date
    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerHTML = dateBuilder(now);

    // Getting the temperature
    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    // Getting the weather status
    let weather_el = document.querySelector(".current .weather");
    weather_el.innerHTML = weather.weather[0].main;

    // Getting the lowest and highest temperature of the day
    let hilow = document.querySelector(".hi-low");
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°c | ${Math.round(weather.main.temp_max)}°c`;


}
 // Here is a simple function that makes the current date by passing in a veriable called now that is new Date();
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}