// Core database for major global hubs
const cityClimateMap = {
    "seoul": "continental", "new york": "continental", "tokyo": "continental", "berlin": "continental",
    "chicago": "continental", "beijing": "continental", "toronto": "continental", "boston": "continental",
    "paris": "continental", "london": "continental", "montreal": "continental", "moscow": "arctic",
    "los angeles": "mediterranean", "rome": "mediterranean", "san francisco": "mediterranean",
    "cape town": "mediterranean", "sydney": "mediterranean", "athens": "mediterranean",
    "singapore": "tropical", "bangkok": "tropical", "miami": "tropical", "honolulu": "tropical",
    "manila": "tropical", "rio de janeiro": "tropical", "oslo": "arctic", "reykjavik": "arctic"
};

// Smart heuristic function to handle any unlisted global city
function determineClimateZone(cityName) {
    if (cityClimateMap[cityName]) {
        return cityClimateMap[cityName];
    }

    // Heuristic rules for global regions and common naming patterns
    const arcticKeywords = ["anchorage", "helsinki", "stockholm", "reykjavik", "nuuk", "sapporo", "moscow", "ottawa"];
    const tropicalKeywords = ["jakarta", "kuala lumpur", "mumbai", "delhi", "lagos", "nairobi", "bogota", "havana", "caracas", "sao paulo"];
    const medKeywords = ["madrid", "lisbon", "valencia", "perth", "melbourne", "auckland", "cairo", "tel aviv", "beirut"];

    if (arcticKeywords.some(k => cityName.includes(k)) || cityName.includes("north") || cityName.includes("alaska")) {
        return "arctic";
    }
    if (tropicalKeywords.some(k => cityName.includes(k)) || cityName.includes("island") || cityName.includes("beach") || cityName.includes("bay")) {
        return "tropical";
    }
    if (medKeywords.some(k => cityName.includes(k))) {
        return "mediterranean";
    }

    // Default fallback for general temperate/continental global cities
    return "continental";
}

// Real-time feedback as user types any city
document.getElementById('cityInput').addEventListener('input', function() {
    const cityName = this.value.trim().toLowerCase();
    const detectedZoneDiv = document.getElementById('detectedZone');
    
    if (cityName.length > 2) {
        let zoneKey = determineClimateZone(cityName);
        let zoneNames = {
            'continental': 'Humid Continental / Four Seasons',
            'mediterranean': 'Mediterranean / Mild & Dry',
            'tropical': 'Tropical & Equatorial / High Humidity',
            'arctic': 'Sub-Arctic & Tundra / Extreme Cold'
        };
        detectedZoneDiv.textContent = `✓ Mapped Classification: ${zoneNames[zoneKey]}`;
    } else {
        detectedZoneDiv.textContent = "";
    }
});

document.getElementById('calculateBtn').addEventListener('click', function() {
    const rawCity = document.getElementById('cityInput').value.trim().toLowerCase();
    const duration = document.getElementById('duration').value;
    const resultsBox = document.getElementById('results');
    const outputContent = document.getElementById('outputContent');

    if (!rawCity || !duration) {
        alert('Please enter a destination city and select a duration.');
        return;
    }

    let region = determineClimateZone(rawCity);
    let recommendation = '';
    let capitalizedCity = rawCity.charAt(0).toUpperCase() + rawCity.slice(1);

    switch(region) {
        case 'continental':
            recommendation = `
                <p><strong>Destination Profile (${capitalizedCity}) — Humid Continental / Four Seasons:</strong> Characterized by distinct seasonal shifts and moderate precipitation baselines.</p>
                <ul>
                    <li><strong>Base:</strong> Breathable, moisture-managing synthetic or cotton-alternative blends</li>
                    <li><strong>Mid:</strong> Versatile wool cardigan, fleece, or mid-weight insulating layer</li>
                    <li><strong>Outer:</strong> Water-resistant windbreaker or modular trench coat</li>
                    <li><strong>Lifecycle Strategy:</strong> Emphasize mix-and-match modular capsule pieces for multi-season utility.</li>
                </ul>`;
            break;
        case 'mediterranean':
            recommendation = `
                <p><strong>Destination Profile (${capitalizedCity}) — Mediterranean:</strong> Warm, dry summers and mild, wet winters.</p>
                <ul>
                    <li><strong>Base:</strong> Lightweight linen, tencel, and breathable organic cotton</li>
                    <li><strong>Mid:</strong> Minimal layering; lightweight knitwear for evening temperature drops</li>
                    <li><strong>Outer:</strong> Compact packable rain shell</li>
                    <li><strong>Lifecycle Strategy:</strong> Prioritize UV protection and fast-drying natural fibers to minimize maintenance frequency.</li>
                </ul>`;
            break;
        case 'tropical':
            recommendation = `
                <p><strong>Destination Profile (${capitalizedCity}) — Tropical & Equatorial:</strong> High year-round humidity and elevated thermal baselines.</p>
                <ul>
                    <li><strong>Base:</strong> Ultra-lightweight technical fibers with high evaporation rates</li>
                    <li><strong>Mid:</strong> None required; optional UV-shielding long-sleeve barrier</li>
                    <li><strong>Outer:</strong> Lightweight breathable poncho or quick-dry water shell</li>
                    <li><strong>Lifecycle Strategy:</strong> High rotation frequency requires wrinkle-resistant, anti-microbial textiles.</li>
                </ul>`;
            break;
        case 'arctic':
            recommendation = `
                <p><strong>Destination Profile (${capitalizedCity}) — Sub-Arctic & Tundra:</strong> Severe cold and sub-zero thermal baselines.</p>
                <ul>
                    <li><strong>Base:</strong> Heavyweight thermal merino wool</li>
                    <li><strong>Mid:</strong> High-loft fleece and expedition-grade down insulation</li>
                    <li><strong>Outer:</strong> Heavyweight windproof and waterproof insulated shell</li>
                    <li><strong>Lifecycle Strategy:</strong> Focus on high thermal-to-weight ratios to minimize travel bulk.</li>
                </ul>`;
            break;
    }

    outputContent.innerHTML = recommendation;
    resultsBox.classList.remove('hidden');
});
