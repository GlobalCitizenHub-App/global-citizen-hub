// /script.js
const continentList = ["Africa", "Asia", "Europe", "North America", "South America", "Antarctica", "Oceania"];
const countryCityMap = { "china": "Shanghai", "new zealand": "Auckland", "japan": "Tokyo", "south korea": "Seoul", "korea": "Seoul", "turkey": "Istanbul", "france": "Paris", "united kingdom": "London", "uk": "London", "australia": "Sydney", "canada": "Vancouver", "united states": "New York", "usa": "New York", "us": "New York", "germany": "Berlin", "italy": "Rome", "spain": "Madrid" };
const cityCountryResolver = { "seoul": "Seoul, South Korea", "incheon": "Incheon, South Korea", "busan": "Busan, South Korea", "tokyo": "Tokyo, Japan", "osaka": "Osaka, Japan", "paris": "Paris, France", "london": "London, UK", "sydney": "Sydney, Australia", "vancouver": "Vancouver, Canada", "istanbul": "Istanbul, Turkey", "dubai": "Dubai, UAE" };

function resolveCleanCity(inputVal) {
    let clean = inputVal.trim();
    if (!clean) return "";
    const lower = clean.toLowerCase();
    if (cityCountryResolver[lower]) return cityCountryResolver[lower];
    if (!lower.includes("new york") && !lower.includes("aurora") && !lower.includes("middletown") && !lower.includes("springfield")) {
        clean = clean.replace(/,?\s*(United States|US|U\.S\.|USA)$/i, '');
    }
    return clean;
}
