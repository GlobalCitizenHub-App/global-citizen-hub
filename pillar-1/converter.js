// Comprehensive location database mapping major hubs and countries
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
    "milan": { zone: "continental", hemi: "north", type: "city" },
    "madrid": { zone: "mediterranean", hemi: "north", type: "city" },
    "lisbon": { zone: "mediterranean", hemi: "north", type: "city" },
    "oslo": { zone: "arctic", hemi: "north", type: "city" },
    "reykjavik": { zone: "arctic", hemi: "north", type: "city" },
    "toronto": { zone: "continental", hemi: "north", type: "city" },

    // Asia & Oceania
    "seoul": { zone: "continental", hemi: "north", type: "city" },
    "incheon": { zone: "continental", hemi: "north", type: "city" },
    "busan": { zone: "continental", hemi: "north", type: "city" },
    "jeju": { zone: "subtropical", hemi: "north", type: "city" },
    "jeju island": { zone: "subtropical", hemi: "north", type: "city" },
    "tokyo": { zone: "continental", hemi: "north", type: "city" },
    "osaka": { zone: "continental", hemi: "north", type: "city" },
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

    // Country Fallbacks (Flagged as 'country')
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
        return { data: globalLocationMap[cleanInput], name: cleanInput };
    }

    if (cleanInput.includes("york")) return { data: { zone: "continental", hemi: "north", type: "city" }, name: "new york" };
    if (cleanInput.includes("dubai")) return { data: { zone: "tropical", hemi: "north", type: "city" }, name: "dubai" };
    if (cleanInput.includes("nairobi") || cleanInput.includes("kenya")) return { data: { zone: "tropical", hemi: "south", type: "country" }, name: "kenya" };
    if (cleanInput.includes("mexico")) return { data: { zone: "mediterranean", hemi: "north", type: "country" }, name: "mexico" };
    if (cleanInput.includes("paris")) return { data: { zone: "continental", hemi: "north", type: "city" }, name: "paris" };
    if (cleanInput.includes("seoul") || cleanInput.includes("incheon") || cleanInput.includes("busan") || cleanInput.includes("jeju")) return { data: { zone: "continental", hemi: "north", type: "city" }, name: cleanInput };
    if (cleanInput.includes("sydney") || cleanInput.includes("melbourne")) return { data: { zone: "mediterranean", hemi: "south", type: "city" }, name: cleanInput };
    if (cleanInput.includes("braz")) return { data: { zone: "continental", hemi: "south", type: "country" }, name: "brazil" };
    if (cleanInput.includes("ital")) return { data: { zone: "mediterranean", hemi: "north", type: "country" }, name: "italy" };

    return { data: { zone: "continental", hemi: "north", type: "city" }, name: cleanInput };
}

function determineSeasonalMatrix(locData, month) {
    const m = parseInt(month);
    let zone = locData.zone;
    let hemi = locData.hemi;
    let type = locData.type;

    // Broad country search fallback to balanced transitional profiles to avoid regional distortion
    if (type === "country") {
        if (m >= 6 && m <= 8) return "summer_heat";
        if (m === 12 || m === 1 || m === 2) return "temperate_transition";
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

// Live typing feedback prompting for a specific city if a country is recognized
document.getElementById('cityInput').addEventListener('input', function() {
    const rawInput = this.value.trim().toLowerCase();
    const detectedZoneDiv = document.getElementById('detectedZone');
    
    if (rawInput.length > 1) {
        let resolved = resolveLocation(rawInput);
        if (resolved.data.type === "country") {
            detectedZoneDiv.innerHTML = `<span style="color: #e67e22;">💡 Country detected. For precise micro-climate results, please enter a specific city name (e.g., São Paulo, Rio, Rome).</span>`;
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

    let resolved = resolveLocation(rawInput);
    let matrixType = determineSeasonalMatrix(resolved.data, travelMonth);
    let formattedLocation = resolved.name.charAt(0).toUpperCase() + resolved.name.slice(1);
    
    const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let seasonContext = `${monthNames[travelMonth]} Travel`;
    let recommendation = '';

    // Actionable prompt inside the results box when a country is used
    let countryPromptNotice = resolved.data.type === "country" ? `<p style="font-size: 0.85rem; color: #e67e22; font-style: italic; margin-bottom: 10px;">Notice: Displaying broad baseline for ${formattedLocation}. <strong>Tip: Search a specific destination city (e.g., São Paulo, Rome) to unlock full precision accuracy.</strong></p>` : '';

    switch(matrixType) {
        case 'summer_heat':
            recommendation = `
                ${countryPromptNotice}
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
                ${countryPromptNotice}
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
                ${countryPromptNotice}
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
                ${countryPromptNotice}
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
                ${countryPromptNotice}
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
                ${countryPromptNotice}
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
