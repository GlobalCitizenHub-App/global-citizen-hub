// Comprehensive location database mapping major hubs and countries
const globalLocationMap = {
    // US & Americas
    "new york": { zone: "continental", hemi: "north" },
    "chicago": { zone: "continental", hemi: "north" },
    "boston": { zone: "continental", hemi: "north" },
    "los angeles": { zone: "mediterranean", hemi: "north" },
    "san francisco": { zone: "mediterranean", hemi: "north" },
    "miami": { zone: "tropical", hemi: "north" },
    "honolulu": { zone: "tropical", hemi: "north" },
    "anchorage": { zone: "arctic", hemi: "north" },
    "seattle": { zone: "continental", hemi: "north" },
    "denver": { zone: "continental", hemi: "north" },
    "houston": { zone: "tropical", hemi: "north" },
    "mexico city": { zone: "mediterranean", hemi: "north" },
    
    // Middle East & Africa
    "dubai": { zone: "tropical", hemi: "north" },
    "cairo": { zone: "mediterranean", hemi: "north" },
    "cape town": { zone: "mediterranean", hemi: "south" },
    "nairobi": { zone: "tropical", hemi: "south" },
    "lagos": { zone: "tropical", hemi: "north" },

    // Europe
    "paris": { zone: "continental", hemi: "north" },
    "london": { zone: "continental", hemi: "north" },
    "berlin": { zone: "continental", hemi: "north" },
    "moscow": { zone: "arctic", hemi: "north" },
    "rome": { zone: "mediterranean", hemi: "north" },
    "madrid": { zone: "mediterranean", hemi: "north" },
    "lisbon": { zone: "mediterranean", hemi: "north" },
    "oslo": { zone: "arctic", hemi: "north" },
    "reykjavik": { zone: "arctic", hemi: "north" },
    "toronto": { zone: "continental", hemi: "north" },

    // Asia & Oceania
    "seoul": { zone: "continental", hemi: "north" },
    "incheon": { zone: "continental", hemi: "north" },
    "busan": { zone: "continental", hemi: "north" },
    "jeju": { zone: "subtropical", hemi: "north" },
    "jeju island": { zone: "subtropical", hemi: "north" },
    "tokyo": { zone: "continental", hemi: "north" },
    "osaka": { zone: "continental", hemi: "north" },
    "beijing": { zone: "continental", hemi: "north" },
    "singapore": { zone: "tropical", hemi: "north" },
    "bangkok": { zone: "tropical", hemi: "north" },
    "manila": { zone: "tropical", hemi: "north" },
    "delhi": { zone: "tropical", hemi: "north" },
    "mumbai": { zone: "tropical", hemi: "north" },
    "sydney": { zone: "mediterranean", hemi: "south" },
    "melbourne": { zone: "mediterranean", hemi: "south" },
    "auckland": { zone: "mediterranean", hemi: "south" },

    // South America
    "rio de janeiro": { zone: "tropical", hemi: "south" },
    "sao paulo": { zone: "continental", hemi: "south" },
    "bogota": { zone: "tropical", hemi: "south" },
    "buenos aires": { zone: "continental", hemi: "south" },
    "lima": { zone: "mediterranean", hemi: "south" },

    // Country Fallbacks
    "united states": { zone: "continental", hemi: "north" },
    "usa": { zone: "continental", hemi: "north" },
    "south korea": { zone: "continental", hemi: "north" },
    "korea": { zone: "continental", hemi: "north" },
    "japan": { zone: "continental", hemi: "north" },
    "china": { zone: "continental", hemi: "north" },
    "united kingdom": { zone: "continental", hemi: "north" },
    "uk": { zone: "continental", hemi: "north" },
    "france": { zone: "continental", hemi: "north" },
    "germany": { zone: "continental", hemi: "north" },
    "italy": { zone: "mediterranean", hemi: "north" },
    "spain": { zone: "mediterranean", hemi: "north" },
    "canada": { zone: "arctic", hemi: "north" },
    "australia": { zone: "mediterranean", hemi: "south" },
    "brazil": { zone: "continental", hemi: "south" },
    "egypt": { zone: "mediterranean", hemi: "north" },
    "mexico": { zone: "mediterranean", hemi: "north" },
    "kenya": { zone: "tropical", hemi: "south" }
};

// Simple Levenshtein distance algorithm to find the closest matching city name for typos
function findClosestMatch(input) {
    let keys = Object.keys(globalLocationMap);
    let closest = keys[0];
    let minDistance = Infinity;

    for (let key of keys) {
        let distance = levenshtein(input, key);
        if (distance < minDistance) {
            minDistance = distance;
            closest = key;
        }
    }

    // Only suggest if the typo is reasonably close (e.g. distance <= 3)
    if (minDistance <= 3) {
        return closest;
    }
    return null;
}

function levenshtein(a, b) {
    let matrix = [];
    for (let i = 0; i <= b.length; i++) { matrix[i] = [i]; }
    for (let j = 0; j <= a.length; j++) { matrix[0][j] = [j]; }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
}

let confirmedLocation = null;

// Live typing feedback with interactive typo suggestion
document.getElementById('cityInput').addEventListener('input', function() {
    const rawInput = this.value.trim().toLowerCase();
    const detectedZoneDiv = document.getElementById('detectedZone');
    confirmedLocation = null; // Reset confirmation on new typing

    if (rawInput.length > 1) {
        if (globalLocationMap[rawInput]) {
            confirmedLocation = rawInput;
            detectedZoneDiv.innerHTML = `<span style="color: #2980b9;">✓ Location registered successfully.</span>`;
        } else {
            let suggestion = findClosestMatch(rawInput);
            if (suggestion) {
                let formattedSuggestion = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
                detectedZoneDiv.innerHTML = `
                    <span style="color: #e67e22;">Did you mean <strong>${formattedSuggestion}</strong>? 
                    <button type="button" id="acceptSuggestion" style="margin-left: 8px; padding: 2px 8px; background: #2980b9; color: white; border: none; border-radius: 3px; cursor: pointer;">Yes</button>
                    </span>`;
                
                // Attach event listener to the dynamically created confirmation button
                setTimeout(() => {
                    const acceptBtn = document.getElementById('acceptSuggestion');
                    if (acceptBtn) {
                        acceptBtn.onclick = function() {
                            document.getElementById('cityInput').value = formattedSuggestion;
                            confirmedLocation = suggestion;
                            detectedZoneDiv.innerHTML = `<span style="color: #27ae60;">✓ Updated to ${formattedSuggestion}!</span>`;
                        };
                    }
                }, 100);
            } else {
                detectedZoneDiv.innerHTML = `<span style="color: #7f8c8d;">✓ Custom location baseline applied.</span>`;
            }
        }
    } else {
        detectedZoneDiv.textContent = "";
    }
});

function determineSeasonalMatrix(locKey, month) {
    const m = parseInt(month);
    let locData = globalLocationMap[locKey] || { zone: "continental", hemi: "north" };
    let zone = locData.zone;
    let hemi = locData.hemi;

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

    let lookupKey = confirmedLocation ? confirmedLocation : rawInput.toLowerCase();
    let matrixType = determineSeasonalMatrix(lookupKey, travelMonth);
    let formattedLocation = rawInput.charAt(0).toUpperCase() + rawInput.slice(1);
    
    const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let seasonContext = `${monthNames[travelMonth]} Travel`;
    let recommendation = '';

    switch(matrixType) {
        case 'summer_heat':
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation} (${seasonContext}) — High Heat & Summer Profile</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Featherweight linen, organic cotton tees, and high-breathability tanks</li>
                    <li><strong>Mid Layer:</strong> None required; optional light linen button-down for sun protection</li>
                    <li><strong>Outer Shell:</strong> Ultra-light packable rain poncho for summer downpours</li>
                    <li><strong>Strategic Utility:</strong> Optimized for high ambient temperatures, UV defense, and rapid sweat evaporation.</li>
                </ul>`;
            break;
        case 'winter_cold':
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation} (${seasonContext}) — Winter Freeze Profile</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Thermal moisture-wicking undergarments or merino wool tops</li>
                    <li><strong>Mid Layer:</strong> Heavy fleece, wool knit sweaters, or insulated cardigans</li>
                    <li><strong>Outer Shell:</strong> Windproof down jacket or heavy winter overcoat</li>
                    <li><strong>Strategic Utility:</strong> Engineered for sub-zero wind chills, thermal retention, and layer stacking.</li>
                </ul>`;
            break;
        case 'winter_mild':
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation} (${seasonContext}) — Subtropical Mild Winter Profile</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Comfortable cotton-alternative layers and long-sleeve tees</li>
                    <li><strong>Mid Layer:</strong> Lightweight windbreaker, fleece, or cozy cardigan</li>
                    <li><strong>Outer Shell:</strong> Moderate water-resistant jacket (coastal breezes)</li>
                    <li><strong>Strategic Utility:</strong> Tailored for mild coastal winters with moderate winds and minimal freezing.</li>
                </ul>`;
            break;
        case 'temperate_transition':
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation} (${seasonContext}) — Transitional Climate Profile</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Breathable cotton blends and layered long-sleeve tees</li>
                    <li><strong>Mid Layer:</strong> Lightweight cardigan, fleece, or versatile denim jacket</li>
                    <li><strong>Outer Shell:</strong> Packable wind-resistant shell or trench</li>
                    <li><strong>Strategic Utility:</strong> Tailored for seasonal shifts with warm daytime peaks and crisp evening drops.</li>
                </ul>`;
            break;
        case 'tropical':
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation} (${seasonContext}) — Tropical & Equatorial</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Ultra-lightweight technical fibers with rapid-dry capacity</li>
                    <li><strong>Mid Layer:</strong> UV-shielding long-sleeve barrier against intense sun</li>
                    <li><strong>Outer Shell:</strong> Lightweight breathable rain shell</li>
                    <li><strong>Strategic Utility:</strong> Built for continuous humidity, high heat, and frequent washing cycles.</li>
                </ul>`;
            break;
        default:
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation} (${seasonContext}) — Standard Temperate</strong></p>
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
