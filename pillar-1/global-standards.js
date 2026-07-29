// ==========================================
// PILLAR 1: LOCATION RESOLUTION & CONVERTER LOGIC
// ==========================================
const globalLocationMap = {
    "new york": { country: "United States", zone: "continental", hemi: "north", type: "city" },
    "chicago": { country: "United States", zone: "continental", hemi: "north", type: "city" },
    "london": { country: "United Kingdom", zone: "continental", hemi: "north", type: "city" },
    "seoul": { country: "South Korea", zone: "continental", hemi: "north", type: "city" },
    "tokyo": { country: "Japan", zone: "continental", hemi: "north", type: "city" },
    "mexico city": { country: "Mexico", zone: "mediterranean", hemi: "north", type: "city" },
    
    // Countries with Capital Mappings
    "korea": { country: "South Korea", type: "country", capital: "Seoul" },
    "south korea": { country: "South Korea", type: "country", capital: "Seoul" },
    "mexico": { country: "Mexico", type: "country", capital: "Mexico City" },
    "japan": { country: "Japan", type: "country", capital: "Tokyo" },
    "ukraine": { country: "Ukraine", type: "country", capital: "Kyiv" }
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
    if (cleanInput.includes("seoul")) return { key: "seoul", data: globalLocationMap["seoul"], isTypo: false };
    if (cleanInput.includes("tokyo")) return { key: "tokyo", data: globalLocationMap["tokyo"], isTypo: false };
    if (cleanInput.includes("mexico city")) return { key: "mexico city", data: globalLocationMap["mexico city"], isTypo: false };
    if (cleanInput === "mexico") return { key: "mexico", data: globalLocationMap["mexico"], isTypo: false };
    if (cleanInput.includes("korea")) return { key: "korea", data: globalLocationMap["korea"], isTypo: false };
    if (cleanInput.includes("japan") || cleanInput.includes("japay")) return { key: "japan", data: globalLocationMap["japan"], isTypo: false };

    return { key: cleanInput, data: { country: "Unknown", type: "unknown" }, isTypo: true };
}

function determineSeasonalMatrix(locData, month) {
    const m = parseInt(month);
    let zone = locData.zone || "continental";
    if (locData.type === "country") {
        if (m >= 6 && m <= 8) return "summer_heat";
        return "temperate_transition";
    }
    if (m >= 6 && m <= 8) return "summer_heat";
    if (m === 12 || m === 1 || m === 2) return "winter_cold";
    return zone;
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
                    let countryFormal = match.key.charAt(0).toUpperCase() + match.key.slice(1);
                    if (countryFormal.toLowerCase() === "korea" || countryFormal.toLowerCase() === "south korea") countryFormal = "South Korea";
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
    }

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
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
            
            let electricalInfo = GlobalStandards.getElectricalStandard(countryName);
            const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            
            let recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation}, ${countryName} (${monthNames[travelMonth]})</strong></p>
                <ul>
                    <li><strong>Electrical Standard:</strong> ${electricalInfo.volts}, ${electricalInfo.hz} (Plugs: ${electricalInfo.plugs.join(', ')})</li>
                    <li><strong>Climate Profile Type:</strong> ${matrixType.toUpperCase().replace('_', ' ')}</li>
                    <li><strong>Duration Strategy:</strong> Optimized for ${duration}-day travel endurance.</li>
                </ul>`;

            outputContent.innerHTML = recommendation;
            resultsBox.classList.remove('hidden');
        });
    }
});
