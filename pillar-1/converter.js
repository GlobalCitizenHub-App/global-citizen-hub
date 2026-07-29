// ==========================================
// PILLAR 1: LOCATION RESOLUTION & CONVERTER LOGIC
// Dynamic Country Catching & "City in Country" Format
// ==========================================

const globalLocationMap = {
    // === CITIES ===
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

    "dubai": { country: "United Arab Emirates", zone: "tropical", hemi: "north", type: "city" },

    // === COUNTRY ALIASES (For common alternate spellings) ===
    "south korea": { country: "South Korea", type: "country", capital: "Seoul" },
    "korea": { country: "South Korea", type: "country", capital: "Seoul" },
    "japan": { country: "Japan", type: "country", capital: "Tokyo" },
    "united states": { country: "United States", type: "country", capital: "New York" },
    "us": { country: "United States", type: "country", capital: "New York" },
    "usa": { country: "United States", type: "country", capital: "New York" },
    "united kingdom": { country: "United Kingdom", type: "country", capital: "London" },
    "uk": { country: "United Kingdom", type: "country", capital: "London" },
    "mexico": { country: "Mexico", type: "country", capital: "Mexico City" }
};

let verifiedLocationKey = null;

function resolveBestMatch(input) {
    let cleanInput = input.trim().toLowerCase();
    
    // 1. Direct match
    if (verifiedLocationKey && verifiedLocationKey === cleanInput) {
        return { key: cleanInput, data: globalLocationMap[cleanInput], isTypo: false };
    }
    if (globalLocationMap[cleanInput]) {
        return { key: cleanInput, data: globalLocationMap[cleanInput], isTypo: false };
    }
    
    // 2. Fuzzy matches for cities
    if (cleanInput === "ho") return { key: "ho", data: globalLocationMap["ho"], isTypo: false };
    if (cleanInput.includes("hochimin") || cleanInput.includes("ho chi minh")) return { key: "ho chi minh city", data: globalLocationMap["ho chi minh city"], isTypo: false };
    if (cleanInput.includes("york") || cleanInput.includes("ny")) return { key: "new york", data: globalLocationMap["new york"], isTypo: false };
    if (cleanInput.includes("dubai")) return { key: "dubai", data: globalLocationMap["dubai"], isTypo: false };
    if (cleanInput.includes("seoul")) return { key: "seoul", data: globalLocationMap["seoul"], isTypo: false };
    if (cleanInput.includes("tokyo")) return { key: "tokyo", data: globalLocationMap["tokyo"], isTypo: false };
    if (cleanInput.includes("sydney")) return { key: "sydney", data: globalLocationMap["sydney"], isTypo: false };
    if (cleanInput.includes("london")) return { key: "london", data: globalLocationMap["london"], isTypo: false };
    if (cleanInput.includes("paris")) return { key: "paris", data: globalLocationMap["paris"], isTypo: false };
    if (cleanInput.includes("mexico city")) return { key: "mexico city", data: globalLocationMap["mexico city"], isTypo: false };

    // 3. DYNAMIC COUNTRY MATCHER
    for (const key in globalLocationMap) {
        if (globalLocationMap[key].type === "city" && globalLocationMap[key].country.toLowerCase() === cleanInput) {
            let exampleCity = key.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            return {
                key: cleanInput,
                data: { type: "country", country: globalLocationMap[key].country, capital: exampleCity },
                isTypo: false
            };
        }
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
                    let capitalExample = match.data.capital || "Seoul";
                    
                    // FEEDBACK PROMPT FOR COUNTRIES
                    detectedZoneDiv.innerHTML = `<span style="color: #e67e22;">Did you mean ${countryFormal}? Please type a specific city name (e.g., ${capitalExample}).</span>`;
                    
                } else {
                    let formalCity = match.key.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                    let countryName = match.data.country || "Global Region";
                    
                    // FEEDBACK PROMPT FOR CITIES (Format: "City in Country")
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
