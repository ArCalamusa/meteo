// prende il tag nella sua interezza
const htmlElement = document.documentElement;
const suggestion = document.querySelector('.suggestion');
const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');

// recupera browser sensori del dispositivo (geolocalizzazione) sfrutta 2 parametri, se recupera la posizione e se non la recupera
navigator.geolocation.getCurrentPosition(onSuccess, onError);

//! Funzione da eseguire in caso di errore
function onError() {
    //dato che la geolocalizzazione è disabilitata invito l'utente ad abilitarla
    weatherLocation.innerText = '';
    weatherIcon.alt = "Geolocation disabled";
    weatherIcon.src = "img/geolocation_disabled.png";
    suggestion.innerText = 'GOELOCALIZZAZIONE DISABILITATA';

    //disattivare loading
    htmlElement.className = '';
}

//* Funzione da eseguire in caso di successo
async function onSuccess(position) {
    console.log(position)

    //recupero latitudine e longitudine
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude)

    //chiamata API https://openweathermap.org/current
    const API_KEY = 'd62b48f4e865250695859dd5656f1fdb'
    const units = 'metric';
    const lang = 'it';

    const endPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}&lang${lang}`;

    const response = await fetch(endPoint);
    //converte i dati in oggetto chìon info
    const data = await response.json();
    const iconCode = data.weather[0].icon;
    const description = data.weather[0].description;

    //sostituisco elementi pagina
    weatherLocation.innerText = data.name;
    weatherIcon.alt = description;
    weatherIcon.src = `img/${iconCode}.png`;
    weatherTemperature.innerText = `${Math.floor(data.main.temp)}°`;
    suggestion.innerText = getSuggestion(iconCode);

    //disattivare loading
    htmlElement.className = '';
}

//! funzione suggerimento
function getSuggestion(iconCode) {
    const suggestions = {
        '01d': 'Ricordati la crema solare!',
        '01n': 'Buonanotte!',
        '02d': 'Oggi il sole va e viene...',
        '02n': 'Attenti ai lupi mannari...',
        '03d': 'Luce perfetta per fare foto!',
        '03n': 'Dormi sereno :)',
        '04d': 'Che cielo grigio :(',
        '04n': 'Non si vede nemmeno la luna!',
        '09d': 'Prendi l\'ombrello',
        '09n': 'Copriti bene!',
        '10d': 'Prendi l\'ombrello',
        '10n': 'Copriti bene!',
        '11d': 'Attento ai fulmini!',
        '11n': 'I lampi accendono la notte!',
        '13d': 'Esci a fare un pupazzo di neve!',
        '13n': 'Notte perfetta per stare sotto il piumone!',
        '50d': 'Accendi i fendinebbia!',
        '50n': 'Guida con prudenza!'
    };

    return suggestions[iconCode];
}
