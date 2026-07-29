// Comprehensive location database mapping cities to countries and climate zones
const globalLocationMap = {
    // US & Americas
    "new york": { country: "United States", zone: "continental", hemi: "north", type: "city" },
    "chicago": { country: "United States", zone: "continental", hemi: "north", type: "city" },
    "boston": { country: "United States", zone: "continental", hemi: "north", type: "city" },
    "los angeles": { country: "United States", zone: "mediterranean", hemi: "north", type: "city" },
    "san francisco": { country: "United States", zone: "mediterranean", hemi: "north", type: "city" },
    "miami": { country: "United States", zone: "tropical", hemi: "north", type: "city" },
    "honolulu": { country: "United States", zone: "tropical", hemi: "north", type: "city" },
    "anchorage": { country: "United States", zone: "arctic", hemi: "north", type: "city" },
    "seattle": { country: "United States", zone: "continental", hemi: "north", type: "city" },
    "denver": { country: "United States", zone: "continental", hemi: "north", type: "city" },
    "houston": { country: "United States", zone: "tropical", hemi: "north", type: "city" },
    "mexico city": { country: "Mexico", zone: "mediterranean", hemi: "north", type: "city" },
    
    // Middle East & Africa
    "dubai": { country: "United Arab Emirates", zone: "tropical", hemi: "north", type: "city" },
    "cairo": { country: "Egypt", zone: "mediterranean", hemi: "north", type: "city" },
    "cape town": { country: "South Africa", zone: "mediterranean", hemi: "south", type: "city" },
    "nairobi": { country: "Kenya", zone: "tropical", hemi: "south", type: "city" },
    "lagos": { country: "Nigeria", zone: "tropical", hemi: "north", type: "city" },
    "ho": { country: "Ghana", zone: "tropical", hemi: "north", type: "city" },

    // Europe
    "paris": { country: "France", zone: "continental", hemi: "north", type: "city" },
    "london": { country: "United Kingdom", zone: "continental", hemi: "north", type: "city" },
    "berlin": { country: "Germany", zone: "continental", hemi: "north", type: "city" },
    "moscow": { country: "Russia", zone: "arctic", hemi: "north", type: "city" },
    "kyiv": { country: "Ukraine", zone: "continental", hemi: "north", type: "city" },
    "lviv": { country: "Ukraine", zone: "continental", hemi: "north", type: "city" },
    "rome": { country: "Italy", zone: "mediterranean", hemi: "north", type: "city" },
    "milan": { country: "Italy", zone: "continental", hemi: "north", type: "city" },
    "madrid": { country: "Spain", zone: "mediterranean", hemi: "north", type: "city" },
    "lisbon": { country: "Portugal", zone: "mediterranean", hemi: "north", type: "city" },
    "oslo": { country: "Norway", zone: "arctic", hemi: "north", type: "city" },
    "reykjavik": { country: "Iceland", zone: "arctic", hemi: "north", type: "city" },
    "toronto": { country: "Canada", zone: "continental", hemi: "north", type: "city" },

    // Asia & Oceania
    "seoul": { country: "South Korea", zone: "continental", hemi: "north", type: "city" },
    "incheon": { country: "South Korea", zone: "continental", hemi: "north", type: "city" },
    "busan": { country: "South Korea", zone: "continental", hemi: "north", type: "city" },
    "jeju": { country: "South Korea", zone: "subtropical", hemi: "north", type: "city" },
    "jeju island": { country: "South Korea", zone: "subtropical", hemi: "north", type: "city" },
    "tokyo": { country: "Japan", zone: "continental", hemi: "north", type: "city" },
    "osaka": { country: "Japan", zone: "continental", hemi: "north", type: "city" },
    "beijing": { country: "China", zone: "continental", hemi: "north", type: "city" },
    "ho chi minh city": { country: "Vietnam", zone: "tropical", hemi: "north", type: "city" },
    "singapore": { country: "Singapore", zone: "tropical", hemi: "north", type: "city" },
    "bangkok": { country: "Thailand", zone: "tropical", hemi: "north", type: "city" },
    "manila": { country: "Philippines", zone: "tropical", hemi: "north", type: "city" },
    "delhi": { country: "India", zone: "tropical", hemi: "north", type: "city" },
    "mumbai": { country: "India", zone: "tropical", hemi: "north", type: "city" },
    "sydney": { country: "Australia", zone: "mediterranean", hemi: "south", type: "city" },
    "melbourne": { country: "Australia", zone: "mediterranean", hemi: "south", type: "city" },
    "auckland": { country: "New Zealand", zone: "mediterranean", hemi: "south", type: "city" },

    // South America
    "rio de janeiro": { country: "Brazil", zone: "tropical", hemi: "south", type: "city" },
    "sao paulo": { country: "Brazil", zone: "continental", hemi: "south", type: "city" },
    "bogota": { country: "Colombia", zone: "tropical", hemi: "south", type: "city" },
    "buenos aires": { country: "Argentina", zone: "continental", hemi: "south", type: "city" },
    "lima": { country: "Peru", zone: "mediterranean", hemi: "south", type: "city" },

    // Explicit Countries with Designated Capital Examples
    "korea": { country: "South Korea", type: "country", capital: "Seoul" },
    "south korea": { country: "South Korea", type: "country", capital: "Seoul" },
    "mexico": { country: "Mexico", type: "country", capital: "Mexico City" },
    "brazil": { country: "Brazil", type: "country", capital: "Brasília" },
    "ukraine": { country: "Ukraine", type: "country", capital: "Kyiv" },
    "vietnam": { country: "Vietnam", type: "country", capital: "Hanoi" },
    "italy": { country: "Italy", type: "country", capital: "Rome" },
    "japan": { country: "Japan", type: "country", capital: "Tokyo" }
};

let verifiedLocationKey = null;

function resolveBestMatch(input) {
    let cleanInput = input.trim().toLowerCase();
    
    if (verifiedLocationKey && verifiedLocationKey === cleanInput) {
        return { key: cleanInput, data: globalLocationMap[cleanInput], isTypo: false };
    }

    if (globalLocationMap[cleanInput]) {
        return { key: cleanInput, data: globalLocationMap[cleanInput], isTypo: false };
    }

    if (cleanInput === "ho") {
        return { key: "ho", data: globalLocationMap["ho"], isTypo: false };
    }

    // Substring and alias mappings
    if (cleanInput.includes("hochimin") || cleanInput.includes("ho chi minh") || cleanInput.includes("ho chi")) {
        return { key: "ho chi minh city", data: globalLocationMap["ho chi minh city"], isTypo: false };
    }
    if (cleanInput.includes("york") || cleanInput.includes("ny")) return { key: "new york", data: globalLocationMap["new york"], isTypo: false };
    if (cleanInput.includes("dubai")) return { key: "dubai", data: globalLocationMap["dubai"], isTypo: false };
    if (cleanInput.includes("seoul")) return { key: "seoul", data: globalLocationMap["seoul"], isTypo: false };
    if (cleanInput.includes("tokyo")) return { key: "tokyo", data: globalLocationMap["tokyo"], isTypo: false };
    if (cleanInput.includes("sydney")) return { key: "sydney", data: globalLocationMap["sydney"], isTypo: false };
    if (cleanInput.includes("brazi") && cleanInput.length > 5) return { key: "brazil", data: globalLocationMap["brazil"], isTypo: false };
    if (cleanInput.includes("ital") && cleanInput.length > 4) return { key: "italy", data: globalLocationMap["italy"], isTypo: false };
    if (cleanInput.includes("vietnam") && cleanInput.length > 6) return { key: "vietnam", data: globalLocationMap["vietnam"], isTypo: false };
    if (cleanInput.includes("ukrain")) return { key: "ukraine", data: globalLocationMap["ukraine"], isTypo: false };
    if (cleanInput.includes("kyiv") || cleanInput.includes("kiev")) return { key: "kyiv", data: globalLocationMap["kyiv"], isTypo: false };
    if (cleanInput.includes("mexico city")) return { key: "mexico city", data: globalLocationMap["mexico city"], isTypo: false };
    if (cleanInput === "mexico") return { key: "mexico", data: globalLocationMap["mexico"], isTypo: false };
    if (cleanInput.includes("korea")) return { key: "korea", data: globalLocationMap["korea"], isTypo: false };
    if (cleanInput.includes("japan") || cleanInput.includes("japay")) return { key: "japan", data: globalLocationMap["japan"], isTypo: false };
    if (cleanInput.includes("paris")) return { key: "paris", data: globalLocationMap["paris"], isTypo: false };
    if (cleanInput.includes("london")) return { key: "london", data: globalLocationMap["london"], isTypo: false };
    if (cleanInput.includes("jeji") || cleanInput.includes("zeju")) return { key: "jeju", data: globalLocationMap["jeju"], isTypo: false };

    return { key: cleanInput, data: { country: "Unknown", type: "unknown" }, isTypo: true };
}

function determineSeasonalMatrix(locData, month) {
    const m = parseInt(month);
    let zone = locData.zone || "continental";
    let hemi = locData.hemi || "north";

    if (locData.type === "country") {
        if (m >= 6 && m <= 8) return "summer_heat";
        return "temperate_transition";
    }

    if (zone === "subtropical") {
        if (m >= 6 && m <= 8) return "summer_heat";
        if (m === 12 || m === 1 || m === 2) return "winter_mild";
        return "temperate_transition";
    }

    if (hemi === "south") {
        if (m === 3 || m === 4) return "temperate_transition";
        if (m === 10 || m === 11) return "temperate_transition";
        if (m >= 6 && m <= 8) return "winter_cold";
        if (m === 12 || m === 1 || m === 2) return "summer_heat";
    }

    if (hemi === "north") {
        if (m >= 6 && m <= 8) {
            if (zone === "continental" || zone === "mediterranean" || zone === "arctic") return "summer_heat";
            return "tropical";
        }
        if (m === 12 || m === 1 || m === 2) {
            if (zone === "continental" || zone === "mediterranean") return "winter_cold";
            if (zone === "arctic") return "arctic";
        }
    }

    return zone;
}

document.getElementById('cityInput').addEventListener('input', function() {
    const rawInput = this.value.trim();
    const detectedZoneDiv = document.getElementById('detectedZone');
    verifiedLocationKey = null; 
    
    if (rawInput.length > 0) {
        let match = resolveBestMatch(rawInput);
        
        if (match.isTypo) {
            detectedZoneDiv.innerHTML = `<span style="color: #e67e22;">⚠ Location not recognized. Please check your spelling.</span>`;
        } else if (match.data.type === "country") {
            let countryFormal = match.key.charAt(0).toUpperCase() + match.key.slice(1);
            if (countryFormal.toLowerCase() === "korea" || countryFormal.toLowerCase() === "south korea") {
                countryFormal = "South Korea";
            }
            
            let capitalExample = match.data.capital || "a major city";
            
            detectedZoneDiv.innerHTML = `<span style="color: #e67e22;">Did you mean ${countryFormal}? Please type a specific city name (e.g., ${capitalExample}).</span>`;
        } else {
            let formalCity = match.key.charAt(0).toUpperCase() + match.key.slice(1);
            let countryName = match.data.country || "Global Region";
            
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
                        detectedZoneDiv.innerHTML = `<span style="color: #27ae60;">✓ Confirmed: <strong>${formalCity} (${countryName})</strong>. Ready to generate!</span>`;
                    };
                }
            }, 100);
        }
    } else {
        detectedZoneDiv.textContent = "";
    }
});

document.getElementById('calculateBtn').addEventListener('click', function() {
    const rawInput = document.getElementById('cityInput').value.trim();
    const duration = document.getElementById('duration').value;
    const travelMonth = document.getElementById('travelMonth').value;
    const resultsBox = document.getElementById('results');
    const outputContent = document.getElementById('outputContent');

    if (!rawInput || !duration || !travelMonth) {
        alert('Please enter a destination, select a travel month, and duration.');
        return;
    }

    let match = resolveBestMatch(rawInput);
    if (match.isTypo || match.data.type === "country") {
        alert('Please enter and confirm a specific city name before generating the matrix.');
        return;
    }

    if (!verifiedLocationKey) {
        alert('Please click "Confirm" on your selected city before generating.');
        return;
    }

    let matrixType = determineSeasonalMatrix(match.data, travelMonth);
    let formattedLocation = match.key.charAt(0).toUpperCase() + match.key.slice(1);
    let countryName = match.data.country || "Global Region";
    
    const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let seasonContext = `${monthNames[travelMonth]} Travel`;
    let recommendation = '';

    switch(matrixType) {
        case 'summer_heat':
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation}, ${countryName} (${seasonContext}) — High Heat & Summer Profile</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Featherweight linen, organic cotton tees, and high-breathability tanks</li>
                    <li><strong>Mid Layer:</strong> None required; optional light linen button-down for sun protection</li>
                    <li><strong>Outer Shell:</strong> Ultra-light packable rain poncho for summer downpours</li>
                    <li><strong>Strategic Utility:</strong> Optimized for high ambient temperatures, UV defense, and rapid sweat evaporation.</li>
                </ul>`;
            break;
        case 'winter_cold':
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation}, ${countryName} (${seasonContext}) — Winter Freeze Profile</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Thermal moisture-wicking undergarments or merino wool tops</li>
                    <li><strong>Mid Layer:</strong> Heavy fleece, wool knit sweaters, or insulated cardigans</li>
                    <li><strong>Outer Shell:</strong> Windproof down jacket or heavy winter overcoat</li>
                    <li><strong>Strategic Utility:</strong> Engineered for sub-zero wind chills, thermal retention, and layer stacking.</li>
                </ul>`;
            break;
        case 'winter_mild':
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation}, ${countryName} (${seasonContext}) — Subtropical Mild Winter Profile</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Comfortable cotton-alternative layers and long-sleeve tees</li>
                    <li><strong>Mid Layer:</strong> Lightweight windbreaker, fleece, or cozy cardigan</li>
                    <li><strong>Outer Shell:</strong> Moderate water-resistant jacket (coastal breezes)</li>
                    <li><strong>Strategic Utility:</strong> Tailored for mild coastal winters with moderate winds and minimal freezing.</li>
                </ul>`;
            break;
        case 'temperate_transition':
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation}, ${countryName} (${seasonContext}) — Transitional Climate Profile</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Breathable cotton blends and layered long-sleeve tees</li>
                    <li><strong>Mid Layer:</strong> Lightweight cardigan, fleece, or versatile denim jacket</li>
                    <li><strong>Outer Shell:</strong> Packable wind-resistant shell or trench</li>
                    <li><strong>Strategic Utility:</strong> Tailored for seasonal shifts with warm daytime peaks and crisp evening drops.</li>
                </ul>`;
            break;
        case 'tropical':
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation}, ${countryName} (${seasonContext}) — Tropical & Equatorial</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Ultra-lightweight technical fibers with rapid-dry capacity</li>
                    <li><strong>Mid Layer:</strong> UV-shielding long-sleeve barrier against intense sun</li>
                    <li><strong>Outer Shell:</strong> Lightweight breathable rain shell</li>
                    <li><strong>Strategic Utility:</strong> Built for continuous humidity, high heat, and frequent washing cycles.</li>
                </ul>`;
            break;
        default:
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation}, ${countryName} (${seasonContext}) — Standard Temperate</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Standard breathable cotton-alternative blends</li>
                    <li><strong>Mid Layer:</strong> Moderate wool cardigan or transitional jacket</li>
                    <li><strong>Outer Shell:</strong> Water-resistant windbreaker</li>
                    <li><strong>Strategic Utility:</strong> Balanced for mild, changing seasonal conditions.</li>
                </ul>`;
            break;
    }

    outputContent.innerHTML = recommendation;
    resultsBox.classList.remove('hidden');
});
