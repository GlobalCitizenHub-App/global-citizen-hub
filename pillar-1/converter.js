// Comprehensive location database mapping cities and countries to base climate zones
const globalLocationMap = {
    // US & Americas
    "new york": "continental", "chicago": "continental", "boston": "continental",
    "los angeles": "mediterranean", "san francisco": "mediterranean", "miami": "tropical", "honolulu": "tropical",
    "anchorage": "arctic", "seattle": "continental", "denver": "continental", "houston": "tropical", "mexico city": "mediterranean",
    
    // Middle East & Africa
    "dubai": "tropical", "cairo": "mediterranean", "cape town": "mediterranean", "nairobi": "tropical", "kenya": "tropical", "lagos": "tropical",

    // Europe
    "paris": "continental", "london": "continental", "berlin": "continental", "moscow": "arctic",
    "rome": "mediterranean", "madrid": "mediterranean", "lisbon": "mediterranean", "oslo": "arctic", "reykjavik": "arctic",

    // Asia & Oceania
    "seoul": "continental", "tokyo": "continental", "beijing": "continental",
    "singapore": "tropical", "bangkok": "tropical", "manila": "tropical", "delhi": "tropical", "mumbai": "tropical",
    "sydney": "mediterranean", "melbourne": "mediterranean", "auckland": "mediterranean",

    // South America
    "rio de janeiro": "tropical", "sao paulo": "tropical", "bogota": "tropical", "buenos aires": "continental", "lima": "mediterranean",

    // Country Fallbacks
    "united states": "continental", "usa": "continental", "south korea": "continental", "korea": "continental",
    "japan": "continental", "china": "continental", "united kingdom": "continental", "uk": "continental",
    "france": "continental", "germany": "continental", "italy": "mediterranean", "spain": "mediterranean",
    "canada": "arctic", "australia": "mediterranean", "brazil": "tropical", "egypt": "mediterranean", "mexico": "mediterranean"
};

// Smart typo-tolerant matching function
function resolveLocation(input) {
    let cleanInput = input.trim().toLowerCase();
    
    // Exact match
    if (globalLocationMap[cleanInput]) {
        return { zone: globalLocationMap[cleanInput], name: cleanInput };
    }

    // Fuzzy typo matching based on keywords
    if (cleanInput.includes("york")) return { zone: "continental", name: "new york" };
    if (cleanInput.includes("dubai")) return { zone: "tropical", name: "dubai" };
    if (cleanInput.includes("kenya") || cleanInput.includes("nairobi")) return { zone: "tropical", name: "nairobi (kenya)" };
    if (cleanInput.includes("mexico")) return { zone: "mediterranean", name: "mexico city" };
    if (cleanInput.includes("paris")) return { zone: "continental", name: "paris" };
    if (cleanInput.includes("seoul")) return { zone: "continental", name: "seoul" };
    if (cleanInput.includes("sydney")) return { zone: "mediterranean", name: "sydney" };
    if (cleanInput.includes("tokyo")) return { zone: "continental", name: "tokyo" };
    if (cleanInput.includes("london")) return { zone: "continental", name: "london" };

    // Default fallback if typo is completely unrecognized
    return { zone: "continental", name: cleanInput };
}

function determineSeasonalMatrix(zone, month) {
    const m = parseInt(month);

    // Northern Hemisphere Summer (June, July, August) -> Summer heat profile
    if (m >= 6 && m <= 8) {
        if (zone === "continental" || zone === "mediterranean" || zone === "arctic") {
            return "summer_heat";
        }
        return "tropical";
    }

    // Northern Hemisphere Winter (December, January, February) -> Winter cold profile
    if (m === 12 || m === 1 || m === 2) {
        if (zone === "continental" || zone === "mediterranean") {
            return "winter_cold";
        }
        if (zone === "arctic") return "arctic";
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

    let resolved = resolveLocation(rawInput);
    let matrixType = determineSeasonalMatrix(resolved.zone, travelMonth);
    let formattedLocation = resolved.name.charAt(0).toUpperCase() + resolved.name.slice(1);
    
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
        case 'arctic':
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation} (${seasonContext}) — Sub-Arctic & Extreme Tundra</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Heavyweight expedition merino wool</li>
                    <li><strong>Mid Layer:</strong> High-loft fleece and heavy down insulation layers</li>
                    <li><strong>Outer Shell:</strong> Waterproof, windproof arctic expedition parka</li>
                    <li><strong>Strategic Utility:</strong> Maximizes thermal-to-weight ratio to combat extreme sub-zero temperatures.</li>
                </ul>`;
            break;
        default:
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation} (${seasonContext}) — Temperate Transition</strong></p>
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
