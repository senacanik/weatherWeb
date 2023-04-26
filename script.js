const url = "https://api.openweathermap.org/data/2.5/";
const key = "29bbf5279c39b4fd3cafed2e85cd8cec";

const setQuery = (e) => {
    if(e.keyCode == "13")
    getResult(searchBox.value)
}

const getResult = (cityName) =>{
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`
    fetch(query)
        .then(weather=>{
            return weather.json()
        })
        .then(displayResult)
}
const displayResult = (result) => {
    let city = document.querySelector(".city")
    city.innerText = `${result.name}, ${result.sys.country}`

    let temp = document.querySelector(".temp")
    temp.innerText = `${Math.round(result.main.temp)}°C`

    let desc = document.querySelector(".desc")
    desc.innerText = result.weather[0].description

    let minmax = document.querySelector(".minmax")
    minmax.innerText = `${Math.round(result.main.temp_min)}°c / ${Math.round(result.main.temp_max)}°c`

    if (result.main.temp > 20) {
        let hotAlert = document.querySelector(".card-footer");
        hotAlert.innerText = "Dikkat! Hava sıcaklığı 20 derecenin üzerinde İnce giyinebilirsin.";
        hotAlert.style.color = "red";
    }
    else if (result.main.temp < 20) {
        let coldAlert = document.querySelector(".card-footer");
        coldAlert.innerText = "Dikkat! Hava sıcaklığı 20 derecenin altında. Kalın giyinebilirsin.";
        coldAlert.style.color = "blue";
    }
}
const searchBtn = document.querySelector('.searchBtn');
searchBtn.addEventListener("click",()=>{
    const cityName = searchBox.value;
    getResult(cityName);
})
const searchBox = document.querySelector(".searchBoxClass");
searchBox.addEventListener("keypress",setQuery);
