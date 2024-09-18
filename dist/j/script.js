const url = "https://api.openweathermap.org/data/2.5/";
const key = "29bbf5279c39b4fd3cafed2e85cd8cec";
let hotAlert = document.querySelector(".card-footer");

const setQuery = (e) => {
    if (e.keyCode == "13") getResult(searchBox.value);
}

const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
    fetch(query)
        .then(weather => {
            return weather.json();
        })
        .then(result => {
            if (result.cod === "404") {
                showError("Böyle bir şehir bulunamadı.");
            } else {
                hideError();
                displayResult(result);
            }
        })
        .catch(() => {
            showError("Veri alırken bir hata oluştu.");
        });
};

const displayResult = (result) => {
    let city = document.querySelector(".city");
    city.innerText = `${result.name}, ${result.sys.country}`;

    let temp = document.querySelector(".temp");
    temp.innerText = `${Math.round(result.main.temp)}°C`;

    let desc = document.querySelector(".desc");
    desc.innerText = result.weather[0].description;

    let minmax = document.querySelector(".minmax");
    minmax.innerText = `${Math.round(result.main.temp_min)}°c / ${Math.round(result.main.temp_max)}°c`;

    let informationOutput = document.querySelector(".information-output");
    informationOutput.style.display = "block"; // Veriler geldikten sonra görünür yap

    if (result.main.temp > 20) {
        hotAlert.innerText = "Dikkat! Hava sıcaklığı 20 derecenin üzerinde İnce giyinebilirsin.";
        hotAlert.style.color = "#af2a2a";
    } else {
        let coldAlert = document.querySelector(".card-footer");
        coldAlert.innerText = "Dikkat! Hava sıcaklığı 20 derecenin altında. Kalın giyinebilirsin.";
        coldAlert.style.color = "#2493cb";
    }
};

const showError = (message) => {
    let warningBox = document.querySelector(".warning-box");
    warningBox.innerText = message;
    warningBox.style.display = "block";
    let informationOutput = document.querySelector(".information-output");
    informationOutput.style.display = "none"; // Hatalı veri olduğunda gizle
    hotAlert.style.display ="none"
};

const hideError = () => {
    let warningBox = document.querySelector(".warning-box");
    warningBox.style.display = "none";
};

const searchBtn = document.querySelector('.searchBtn');
searchBtn.addEventListener("click", () => {
    const cityName = searchBox.value;
    getResult(cityName);
});

const searchBox = document.querySelector(".searchBoxClass");
searchBox.addEventListener("keypress", setQuery);

// Sayfa ilk yüklendiğinde information-output'u gizle
document.addEventListener("DOMContentLoaded", () => {
    let informationOutput = document.querySelector(".information-output");
    informationOutput.style.display = "none";
});
