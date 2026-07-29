// Comprehensive database including major US cities, international hubs, and countries
const globalLocationMap = {
    // US Cities & Regions
    "new york": "continental", "chicago": "continental", "boston": "continental",
    "los angeles": "mediterranean", "san francisco": "mediterranean", "miami": "tropical", "honolulu": "tropical",
    "anchorage": "arctic", "seattle": "continental", "denver": "continental", "houston": "tropical",

    // Asia (International)
    "seoul": "continental", "tokyo": "continental", "beijing": "continental",
    "singapore": "tropical", "bangkok": "tropical", "manila": "tropical", "delhi": "tropical", "mumbai": "tropical",

    // Europe (International)
    "london": "continental", "paris": "continental", "berlin": "continental", "moscow": "arctic",
    "rome": "mediterranean", "madrid": "mediterranean", "lisbon": "mediterranean", "oslo": "arctic", "reykjavik": "arctic",

    // South America (International)
    "rio de janeiro": "tropical", "sao paulo": "tropical", "bogota": "tropical", "buenos aires": "continental", "lima": "mediterranean",

    // Africa (International)
    "cairo": "mediterranean", "cape town": "mediterranean", "nairobi": "tropical", "lagos": "tropical", "johannesburg": "continental",

    // Oceania (International)
    "sydney": "mediterranean", "melbourne": "mediterranean", "auckland": "mediterranean",

    // Country Fallbacks (if user types country name instead of city)
    "united states": "continental", "usa": "continental", "south korea": "continental", "korea": "continental",
    "japan": "continental", "china": "continental", "united kingdom": "continental", "uk": "continental",
    "france": "continental", "germany": "continental", "italy": "mediterranean", "spain": "mediterranean",
    "canada": "arctic", "australia": "mediterranean", "brazil": "tropical", "singapore": "tropical",
    "egypt": "mediterranean", "south africa": "mediterranean", "kenya": "tropical", "argentina": "continental"
};

function determineZoneAndSeason(locationName, month) {
    if (!locationName) return "continental";
    
    let baseZone = globalLocationMap[locationName] || "continental";

    // Seasonality Adjustment based on Travel Month
    // Months: 1=Jan, 2=Feb, 6=Jun, 7=Jul, 12=Dec
    const m = parseInt(month);
    const isNorthernHemisphereWinter = (m === 12 || m === 1 || m === 2);
    const isNorthernHemisphereSummer = (m === 6 || m === 7 || m === 8);

    // If visiting a normally mild/temperate place in peak winter, lean toward cooler layers
    if (baseZone === "mediterranean" && isNorthernHemisphereWinter && (locationName.includes("rome") || locationName.includes("madrid") || locationName.includes("italy") || locationName.includes("spain"))) {
        return "continental"; // requires heavier coat/layers in winter
    }

    return baseZone;
}

document.getElementById('calculateBtn').addEventListener('click', function() {
    const rawInput = document.getElementById('cityInput').value.trim().toLowerCase();
    const duration = document.getElementById('duration').value;
    const travelMonth = document.getElementById('travelMonth').value;
    const resultsBox = document.getElementById('results');
    const outputContent = document.getElementById('outputContent');

    if (!rawInput || !duration || !travelMonth) {
        alert('Please enter a destination (city or country), select a travel month, and duration.');
        return;
    }

    let region = determineZoneAndSeason(rawInput, travelMonth);
    let formattedLocation = rawInput.charAt(0).toUpperCase() + rawInput.slice(1);
    let recommendation = '';

    // Month name lookup for title display
    const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let seasonContext = `${monthNames[travelMonth]} Travel`;

    switch(region) {
        case 'continental':
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation} (${seasonContext}) — Humid Continental / Four Seasons</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Breathable moisture-wicking fabrics</li>
                    <li><strong>Mid Layer:</strong> Versatile wool knit, fleece, or tailored blazer</li>
                    <li><strong>Outer Shell:</strong> Wind-resistant trench or mid-weight insulation</li>
                    <li><strong>Strategic Utility:</strong> Optimized for variable seasonal temperature shifts.</li>
                </ul>`;
            break;
        case 'mediterranean':
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation} (${seasonContext}) — Mediterranean / Mild & Dry</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Lightweight organic cotton or linen blends</li>
                    <li><strong>Mid Layer:</strong> Minimal layering; light cardigan for evening breeze</li>
                    <li><strong>Outer Shell:</strong> Packable water-resistant shell</li>
                    <li><strong>Strategic Utility:</strong> Tailored for warm solar exposure and cooler night transitions.</li>
                </ul>`;
            break;
        case 'tropical':
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation} (${seasonContext}) — Tropical & Equatorial</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Ultra-lightweight technical fibers with high evaporation rates</li>
                    <li><strong>Mid Layer:</strong> Optional UV-shielding long sleeve</li>
                    <li><strong>Outer Shell:</strong> Lightweight breathable rain poncho</li>
                    <li><strong>Strategic Utility:</strong> Built for high humidity and rapid drying cycles.</li>
                </ul>`;
            break;
        case 'arctic':
            recommendation = `
                <p><strong>Precision Matrix: ${formattedLocation} (${seasonContext}) — Sub-Arctic & Tundra</strong></p>
                <ul>
                    <li><strong>Base Layer:</strong> Heavyweight thermal merino wool</li>
                    <li><strong>Mid Layer:</strong> High-loft fleece and expedition down insulation</li>
                    <li><strong>Outer Shell:</strong> Heavyweight windproof/waterproof parkas</li>
                    <li><strong>Strategic Utility:</strong> Engineered for maximum thermal retention per gram.</li>
                </ul>`;
            break;
    }

    outputContent.innerHTML = recommendation;
    resultsBox.classList.remove('hidden');
});
