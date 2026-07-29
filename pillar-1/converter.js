// Comprehensive location database mapping cities and countries to base climate zones and hemispheres
const globalLocationMap = {
    // US & Americas
    "new york": { zone: "continental", hemi: "north", type: "city" },
    "chicago": { zone: "continental", hemi: "north", type: "city" },
    "boston": { zone: "continental", hemi: "north", type: "city" },
    "los angeles": { zone: "mediterranean", hemi: "north", type: "city" },
    "san francisco": { zone: "mediterranean", hemi: "north", type: "city" },
    "miami": { zone: "tropical", hemi: "north", type: "city" },
    "honolulu": { zone: "tropical", hemi: "north", type: "city" },
    "anchorage": { zone: "arctic", hemi: "north", type: "city" },
    "seattle": { zone: "continental", hemi: "north", type: "city" },
    "denver": { zone: "continental", hemi: "north", type: "city" },
    "houston": { zone: "tropical", hemi: "north", type: "city" },
    "mexico city": { zone: "mediterranean", hemi: "north", type: "city" },
    
    // Middle East & Africa
    "dubai": { zone: "tropical", hemi: "north", type: "city" },
    "cairo": { zone: "mediterranean", hemi: "north", type: "city" },
    "cape town": { zone: "mediterranean", hemi: "south", type: "city" },
    "nairobi": { zone: "tropical", hemi: "south", type: "city" },
    "lagos": { zone: "tropical", hemi: "north", type: "city" },

    // Europe
    "paris": { zone: "continental", hemi: "north", type: "city" },
    "london": { zone: "continental", hemi: "north", type: "city" },
    "berlin": { zone: "continental", hemi: "north", type: "city" },
    "moscow": { zone: "arctic", hemi: "north", type: "city" },
    "rome": { zone: "mediterranean", hemi: "north", type: "city" },
    "madrid": { zone: "mediterranean", hemi: "north", type: "city" },
    "lisbon": { zone: "mediterranean", hemi: "north", type: "city" },
    "oslo": { zone: "arctic", hemi: "north", type: "city" },
    "reykjavik": { zone: "arctic", hemi: "north", type: "city" },

    // Asia & Oceania
    "seoul": { zone: "continental", hemi: "north", type: "city" },
    "tokyo": { zone: "continental", hemi: "north", type: "city" },
    "beijing": { zone: "continental", hemi: "north", type: "city" },
    "singapore": { zone: "tropical", hemi: "north", type: "city" },
    "bangkok": { zone: "tropical", hemi: "north", type: "city" },
    "manila": { zone: "tropical", hemi: "north", type: "city" },
    "delhi": { zone: "tropical", hemi: "north", type: "city" },
    "mumbai": { zone: "tropical", hemi: "north", type: "city" },
    "sydney": { zone: "mediterranean", hemi: "south", type: "city" },
    "melbourne": { zone: "mediterranean", hemi: "south", type: "city" },
    "auckland": { zone: "mediterranean", hemi: "south", type: "city" },

    // South America
    "rio de janeiro": { zone: "tropical", hemi: "south", type: "city" },
    "sao paulo": { zone: "continental", hemi: "south", type: "city" },
    "bogota": { zone: "tropical", hemi: "south", type: "city" },
    "buenos aires": { zone: "continental", hemi: "south", type: "city" },
    "lima": { zone: "mediterranean", hemi: "south", type: "city" },

    // Country Fallbacks (flagged as 'country' to trigger the specific UX feedback nudge)
    "united states": { zone: "continental", hemi: "north", type: "country" },
    "usa": { zone: "continental", hemi: "north", type: "country" },
    "south korea": { zone: "continental", hemi: "north", type: "country" },
    "korea": { zone: "continental", hemi: "north", type: "country" },
    "japan": { zone: "continental", hemi: "north", type: "country" },
    "china": { zone: "continental", hemi: "north", type: "country" },
    "united kingdom": { zone: "continental", hemi: "north", type: "country" },
    "uk": { zone: "continental", hemi: "north", type: "country" },
    "france": { zone: "continental", hemi: "north", type: "country" },
    "germany": { zone: "continental", hemi: "north", type: "country" },
    "italy": { zone: "mediterranean", hemi: "north", type: "country" },
    "spain": { zone: "mediterranean", hemi: "north", type: "country" },
    "canada": { zone: "arctic", hemi: "north", type: "country" },
    "australia": { zone: "mediterranean", hemi: "south", type: "country" },
    "brazil": { zone: "continental", hemi: "south", type: "country" },
    "egypt": { zone: "mediterranean", hemi: "north", type: "country" },
    "mexico": { zone: "mediterranean", hemi: "north", type: "country" },
    "kenya": { zone: "tropical", hemi: "south", type: "country" }
};

function resolveLocation(input) {
    let cleanInput = input.trim().toLowerCase();
    
    if (globalLocationMap[cleanInput]) {
        return globalLocationMap[cleanInput];
    }

    // Fuzzy matching keywords
    if (cleanInput.includes("york")) return { zone: "continental", hemi: "north", type: "city" };
    if (cleanInput.includes("dubai")) return { zone: "tropical", hemi: "north", type: "city" };
    if (cleanInput.includes("nairobi")) return { zone: "tropical", hemi: "south", type: "city" };
    if (cleanInput.includes("kenya")) return { zone: "tropical", hemi: "south", type: "country" };
    if (cleanInput.includes("mexico")) return { zone: "mediterranean", hemi: "north", type: "country" };
    if (cleanInput.includes("paris")) return { zone: "continental", hemi: "north", type: "city" };
    if (cleanInput.includes("seoul")) return { zone: "continental", hemi: "north", type: "city" };
    if (cleanInput.includes("sydney")) return { zone: "mediterranean", hemi: "south", type: "city" };
    if (cleanInput.includes("brazil")) return { zone: "continental", hemi: "south", type: "country" };
    if (cleanInput.includes("australia")) return { zone: "mediterranean", hemi: "south", type: "country" };

    // Default fallback if unrecognized
    return { zone: "continental", hemi: "north", type: "city" };
}

function determineSeasonalMatrix(locData, month) {
    const m = parseInt(month);
    let zone = locData.zone;
    let hemi = locData.hemi;

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

// Live typing feedback with country nudge
document.getElementById('cityInput').addEventListener('input', function() {
    const rawInput = this.value.trim().toLowerCase();
    const detectedZoneDiv = document.getElementById('detectedZone');
    
    if (rawInput.length > 1) {
        let locData = resolveLocation(rawInput);
        if (locData.type === 'country') {
            detectedZoneDiv.innerHTML = `<span style="color: #e67e22;">ℹ Country detected. Tip: Enter a specific city (e.g., São Paulo, Rio) for enhanced precision!</span>`;
        } else {
            detectedZoneDiv.innerHTML = `<span style="color: #2980b9;">✓ City profile loaded successfully.</span>`;
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

    let locData = resolveLocation(rawInput);
    let matrixType = determineSeasonalMatrix(locData, travelMonth);
    let formattedLocation = rawInput.charAt(0).toUpperCase() + rawInput.slice(1);
    
    const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let seasonContext = `${monthNames[travelMonth]} Travel`;
    let recommendation = '';

    // Add country-specific advisory note if a country name was typed
    let advisoryNote = locData.type === 'country' ? `<p style="font-size: 0.85rem; color: #7f8c8d; font-style: italic; margin-bottom: 10px;">Note: Displaying generalized baseline for ${formattedLocation}. For micro-climate accuracy, try searching your specific destination city.</p>` : '';

    switch(matrixType) {
        case 'summer_heat':
            recommendation = `
                ${advisoryNote}
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
                ${advisoryNote}
                <p><strong>Precision Matrix: ${formattedLocation} (${seasonContext}) — Winter Freeze Profile</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Thermal moisture-wicking undergarments or merino wool tops</li>
                    <li><strong>Mid Layer:</strong> Heavy fleece, wool knit sweaters, or insulated cardigans</li>
                    <li><strong>Outer Shell:</strong> Windproof down jacket or heavy winter overcoat</li>
                    <li><strong>Strategic Utility:</strong> Engineered for sub-zero wind chills, thermal retention, and layer stacking.</li>
                </ul>`;
            break;
        case 'temperate_transition':
            recommendation = `
                ${advisoryNote}
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
                ${advisoryNote}
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
                ${advisoryNote}
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
