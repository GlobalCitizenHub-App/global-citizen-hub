// ==========================================
// PILLAR 1: LOCATION RESOLUTION & CONVERTER LOGIC
// Bulletproof Global Country Catching & "City in Country" Format
// ==========================================

const globalLocationMap = {
    // === CITIES IN DATABASE ===
    "cairo": { country: "Egypt", zone: "mediterranean", hemi: "north", type: "city" },
    "cape town": { country: "South Africa", zone: "mediterranean", hemi: "south", type: "city" },
    "ho": { country: "Ghana", zone: "tropical", hemi: "north", type: "city" },
    "lagos": { country: "Nigeria", zone: "tropical", hemi: "north", type: "city" },
    "nairobi": { country: "Kenya", zone: "tropical", hemi: "south", type: "city" },

    "bangkok": { country: "Thailand", zone: "tropical", hemi: "north", type: "city" },
    "beijing": { country: "China", zone: "continental", hemi: "north", type: "city" },
    "delhi": { country: "India", zone: "tropical", hemi: "north", type: "city" },
    "ho chi minh city": { country: "Vietnam", zone: "tropical", hemi: "north", type: "city" },
    "incheon": { country: "South Korea", zone: "continental", hemi: "north", type: "city" },
    "jeju": { country: "South Korea", zone: "subtropical", hemi: "north", type: "city" },
    "manila": { country: "Philippines", zone: "tropical", hemi: "north", type: "city" },
    "mumbai": { country: "India", zone: "tropical", hemi: "north", type: "city" },
    "osaka": { country: "Japan", zone: "continental", hemi: "north", type: "city" },
    "seoul": { country: "South Korea", zone: "continental", hemi: "north", type: "city" },
    "singapore": { country: "Singapore", zone: "tropical", hemi: "north", type: "city" },
    "tokyo": { country: "Japan", zone: "continental", hemi: "north", type: "city" },

    "berlin": { country: "Germany", zone: "continental", hemi: "north", type: "city" },
    "kyiv": { country: "Ukraine", zone: "continental", hemi: "north", type: "city" },
    "lisbon": { country: "Portugal", zone: "mediterranean", hemi: "north", type: "city" },
    "london": { country: "United Kingdom", zone: "continental", hemi: "north", type: "city" },
    "lviv": { country: "Ukraine", zone: "continental", hemi: "north", type: "city" },
    "madrid": { country: "Spain", zone: "mediterranean", hemi: "north", type: "city" },
    "milan": { country: "Italy", zone: "continental", hemi: "north", type: "city" },
    "moscow": { country: "Russia", zone: "arctic", hemi: "north", type: "city" },
    "oslo": { country: "Norway", zone: "arctic", hemi: "north", type: "city" },
    "paris": { country: "France", zone: "continental", hemi: "north", type: "city" },
    "reykjavik": { country: "Iceland", zone: "arctic", hemi: "north", type: "city" },
    "rome": { country: "Italy", zone: "mediterranean", hemi: "north", type: "city" },

    "anchorage": { country: "United States", zone: "arctic", hemi: "north", type: "city" },
    "boston": { country: "United States", zone: "continental", hemi: "north", type: "city" },
    "chicago": { country: "United States", zone: "continental", hemi: "north", type: "city" },
    "denver": { country: "United States", zone: "continental", hemi: "north", type: "city" },
    "honolulu": { country: "United States", zone: "tropical", hemi: "north", type: "city" },
    "houston": { country: "United States", zone: "tropical", hemi: "north", type: "city" },
    "los angeles": { country: "United States", zone: "mediterranean", hemi: "north", type: "city" },
    "mexico city": { country: "Mexico", zone: "mediterranean", hemi: "north", type: "city" },
    "miami": { country: "United States", zone: "tropical", hemi: "north", type: "city" },
    "new york": { country: "United States", zone: "continental", hemi: "north", type: "city" },
    "san francisco": { country: "United States", zone: "mediterranean", hemi: "north", type: "city" },
    "seattle": { country: "United States", zone: "continental", hemi: "north", type: "city" },
    "toronto": { country: "Canada", zone: "continental", hemi: "north", type: "city" },

    "auckland": { country: "New Zealand", zone: "mediterranean", hemi: "south", type: "city" },
    "melbourne": { country: "Australia", zone: "mediterranean", hemi: "south", type: "city" },
    "sydney": { country: "Australia", zone: "mediterranean", hemi: "south", type: "city" },

    "bogota": { country: "Colombia", zone: "tropical", hemi: "south", type: "city" },
    "buenos aires": { country: "Argentina", zone: "continental", hemi: "south", type: "city" },
    "lima": { country: "Peru", zone: "mediterranean", hemi: "south", type: "city" },
    "rio de janeiro": { country: "Brazil", zone: "tropical", hemi: "south", type: "city" },
    "sao paulo": { country: "Brazil", zone: "continental", hemi: "south", type: "city" },

    "dubai": { country: "United Arab Emirates", zone: "tropical", hemi: "north", type: "city" }
};

// Massive dictionary to ensure NO country fails, even if a city isn't mapped above
const globalCountryDictionary = {
    "afghanistan": "Kabul", "albania": "Tirana", "algeria": "Algiers", "andorra": "Andorra la Vella",
    "angola": "Luanda", "argentina": "Buenos Aires", "armenia": "Yerevan", "australia": "Sydney",
    "austria": "Vienna", "azerbaijan": "Baku", "bahamas": "Nassau", "bahrain": "Manama",
    "bangladesh": "Dhaka", "belarus": "Minsk", "belgium": "Brussels", "bolivia": "La Paz",
    "brazil": "Rio de Janeiro", "bulgaria": "Sofia", "cambodia": "Phnom Penh", "cameroon": "Yaounde",
    "canada": "Toronto", "chile": "Santiago", "china": "Beijing", "colombia": "Bogota",
    "costa rica": "San Jose", "croatia": "Zagreb", "cuba": "Havana", "cyprus": "Nicosia",
    "czech republic": "Prague", "denmark": "Copenhagen", "ecuador": "Quito", "egypt": "Cairo",
    "el salvador": "San Salvador", "estonia": "Tallinn", "ethiopia": "Addis Ababa", "fiji": "Suva",
    "finland": "Helsinki", "france": "Paris", "georgia": "Tbilisi", "germany": "Berlin",
    "ghana": "Accra", "greece": "Athens", "guatemala": "Guatemala City", "honduras": "Tegucigalpa",
    "hungary": "Budapest", "iceland": "Reykjavik", "india": "New Delhi", "indonesia": "Jakarta",
    "iran": "Tehran", "iraq": "Baghdad", "ireland": "Dublin", "israel": "Jerusalem",
    "italy": "Rome", "jamaica": "Kingston", "japan": "Tokyo", "jordan": "Amman",
    "kazakhstan": "Astana", "kenya": "Nairobi", "kuwait": "Kuwait City", "lebanon": "Beirut",
    "libya": "Tripoli", "lithuania": "Vilnius", "luxembourg": "Luxembourg", "madagascar": "Antananarivo",
    "malaysia": "Kuala Lumpur", "mexico": "Mexico City", "monaco": "Monaco", "mongolia": "Ulaanbaatar",
    "morocco": "Rabat", "nepal": "Kathmandu", "netherlands": "Amsterdam", "new zealand": "Auckland",
    "nicaragua": "Managua", "nigeria": "Lagos", "north korea": "Pyongyang", "norway": "Oslo",
    "oman": "Muscat", "pakistan": "Islamabad", "panama": "Panama City", "paraguay": "Asuncion",
    "peru": "Lima", "philippines": "Manila", "poland": "Warsaw", "portugal": "Lisbon",
    "qatar": "Doha", "romania": "Bucharest", "russia": "Moscow", "saudi arabia": "Riyadh",
    "senegal": "Dakar", "serbia": "Belgrade", "singapore": "Singapore", "slovakia": "Bratislava",
    "south africa": "Cape Town", "south korea": "Seoul", "spain": "Madrid", "sri lanka": "Colombo",
    "sweden": "Stockholm", "switzerland": "Zurich", "syria": "Damascus", "taiwan": "Taipei",
    "tanzania": "Dodoma", "thailand": "Bangkok", "tunisia": "Tunis", "turkey": "Istanbul",
    "uganda": "Kampala", "ukraine": "Kyiv", "united arab emirates": "Dubai", "united kingdom": "London",
    "united states": "New York", "uruguay": "Montevideo", "uzbekistan": "Tashkent", "venezuela": "Caracas",
    "vietnam": "Ho Chi Minh City", "zimbabwe": "Harare",
    
    // Aliases
    "uk": "London", "usa": "New York", "us": "New York", "korea": "Seoul"
};

let verifiedLocationKey = null;

function resolveBestMatch(input) {
    let cleanInput = input.trim().toLowerCase();
    
    // 1. Direct city match in database
    if (verifiedLocationKey && verifiedLocationKey === cleanInput) {
        return { key: cleanInput, data: globalLocationMap[cleanInput], isTypo: false };
    }
    if (globalLocationMap[cleanInput]) {
        return { key: cleanInput, data: globalLocationMap[cleanInput], isTypo: false };
    }
    
    // 2. Fixed specific abbreviations (No sloppy .includes)
    if (cleanInput === "hochimin" || cleanInput === "ho chi minh") {
        return { key: "ho chi minh city", data: globalLocationMap["ho chi minh city"], isTypo: false };
    }
    if (cleanInput === "ny" || cleanInput === "nyc" || cleanInput === "new york city") {
        return { key: "new york", data: globalLocationMap["new york"], isTypo: false };
    }

    // 3. BULLETPROOF COUNTRY MATCHER 
    // Uses the massive dictionary above so Austria, Ukraine, etc. never fail
    if (globalCountryDictionary[cleanInput]) {
        let countryFormal = cleanInput.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        // Hardcode capitalization fixes for US/UK
        if (cleanInput === "us" || cleanInput === "usa") countryFormal = "United States";
        if (cleanInput === "uk") countryFormal = "United Kingdom";
        if (cleanInput === "korea") countryFormal = "South Korea";

        return {
            key: cleanInput,
            data: { type: "country", country: countryFormal, capital: globalCountryDictionary[cleanInput] },
            isTypo: false
        };
    }

    // 4. Truly Unknown
    return { key: cleanInput, data: { country: "Unknown", type: "unknown" }, isTypo: true };
}

function determineSeasonalMatrix(locData, month) {
    const m = parseInt(month);
    let zone = locData.zone || "continental";
    let hemi = locData.hemi || "north";

    if (zone === "subtropical") {
        if (m >= 6 && m <= 8) return "summer_heat";
        if (m === 12 || m === 1 || m === 2) return "winter_mild";
        return "temperate_transition";
    }
    if (hemi === "south") {
        if (m >= 6 && m <= 8) return "winter_cold";
        if (m === 12 || m === 1 || m === 2) return "summer_heat";
        return "temperate_transition";
    }
    if (hemi === "north") {
        if (m >= 6 && m <= 8) return "summer_heat";
        if (m === 12 || m === 1 || m === 2) return "winter_cold";
    }
    return zone;
}

function getWardrobeMatrix(matrixType) {
    const wardrobeDb = {
        "summer_heat": "Lightweight breathable fabrics (linen/cotton), UV protection, moisture-wicking layers, open footwear.",
        "winter_cold": "Thermal base layers, insulating mid-layers (fleece/wool), windproof/waterproof outer shell, insulated boots, beanie/gloves.",
        "winter_mild": "Medium-weight jacket, layered sweaters, comfortable walking shoes, light scarf.",
        "temperate_transition": "Versatile layering system (cardigans, light jackets), convertible trousers, transitional footwear."
    };
    return wardrobeDb[matrixType] || "Standard multi-climate layering system.";
}

document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById('cityInput');
    const calculateBtn = document.getElementById('calculateBtn');
    
    if (cityInput) {
        cityInput.addEventListener('input', function() {
            const rawInput = this.value.trim();
            const detectedZoneDiv = document.getElementById('detectedZone');
            verifiedLocationKey = null; 
            
            if (rawInput.length > 0) {
                let match = resolveBestMatch(rawInput);
                
                if (match.isTypo) {
                    detectedZoneDiv.innerHTML = `<span style="color: #e67e22;">⚠ Location not recognized. Please check your spelling.</span>`;
                } else if (match.data.type === "country") {
                    let countryFormal = match.data.country;
                    let capitalExample = match.data.capital || "a specific city";
                    
                    // FIXED COUNTRY FORMAT
                    detectedZoneDiv.innerHTML = `<span style="color: #e67e22;">Did you mean ${countryFormal}? Please type a specific city name (e.g., ${capitalExample}).</span>`;
                    
                } else {
                    let formalCity = match.key.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                    let countryName = match.data.country || "Global Region";
                    
                    // FIXED CITY FORMAT: "City in Country"
                    detectedZoneDiv.innerHTML = `
                        <span style="color: #2980b9;">Did you mean <strong>${formalCity} in ${countryName}</strong>? 
                        <button type="button" id="confirmLocationBtn" style="margin-left: 6px; padding: 3px 10px; background: #27ae60; color: white; border: none; border-radius: 3px; cursor: pointer; font-weight: bold;">Confirm</button>
                        </span>`;
                    
                    setTimeout(() => {
                        const confirmBtn = document.getElementById('confirmLocationBtn');
                        if (confirmBtn) {
                            confirmBtn.onclick = function() {
                                document.getElementById('cityInput').value = formalCity;
                                verifiedLocationKey = match.key;
                                detectedZoneDiv.innerHTML = `<span style="color: #27ae60;">✓ Confirmed: <strong>${formalCity} in ${countryName}</strong>. Ready to generate!</span>`;
                            };
                        }
                    }, 100);
                }
            } else {
                detectedZoneDiv.textContent = "";
            }
        });
    }

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const rawInput = document.getElementById('cityInput').value.trim();
            const termDuration = document.getElementById('termDuration').value;
            const travelMonth = document.getElementById('travelMonth').value;
            const resultsBox = document.getElementById('results');
            const outputContent = document.getElementById('outputContent');

            if (!rawInput || !termDuration || !travelMonth) {
                alert('Please enter a destination, select a travel month, and select a term duration.');
                return;
            }

            let match = resolveBestMatch(rawInput);
            if (match.isTypo || match.data.type === "country") {
                alert('Please enter and confirm a specific city name before generating.');
                return;
            }
            
            if (!verifiedLocationKey) {
                verifiedLocationKey = match.key;
            }

            let matrixType = determineSeasonalMatrix(match.data, travelMonth);
            let formattedLocation = match.key.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            let countryName = match.data.country || "Global Region";
            
            let electricalInfo = GlobalStandards.getElectricalStandard(countryName);
            let wardrobeAdvice = getWardrobeMatrix(matrixType);
            const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            
            let recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation} in ${countryName} (${monthNames[travelMonth]})</strong></p>
                <ul>
                    <li><strong>Electrical Standard:</strong> ${electricalInfo.volts}, ${electricalInfo.hz} (Plugs: ${electricalInfo.plugs.join(', ')})</li>
                    <li><strong>Climate Profile Type:</strong> ${matrixType.toUpperCase().replace('_', ' ')}</li>
                    <li><strong>Wardrobe Matrix Strategy:</strong> ${wardrobeAdvice}</li>
                    <li><strong>Term Duration:</strong> Optimized for ${termDuration} engagement framework.</li>
                </ul>`;

            outputContent.innerHTML = recommendation;
            resultsBox.classList.remove('hidden');
        });
    }
});
