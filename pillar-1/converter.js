const cityClimateMap = {
    "seoul": "continental",
    "new york": "continental",
    "tokyo": "continental",
    "berlin": "continental",
    "london": "continental",
    "paris": "continental",
    "los angeles": "mediterranean",
    "rome": "mediterranean",
    "sydney": "mediterranean",
    "singapore": "tropical",
    "bangkok": "tropical",
    "miami": "tropical",
    "oslo": "arctic",
    "toronto": "continental"
};

function determineClimateZone(cityName) {
    if (!cityName) return "continental";
    if (cityClimateMap[cityName]) {
        return cityClimateMap[cityName];
    }
    return "continental";
}

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
    let capitalizedCity = rawCity.charAt(0).toUpperCase() + rawCity.slice(1);
    let recommendation = '';

    switch(region) {
        case 'continental':
            recommendation = `
                <p><strong>Destination Profile (${capitalizedCity}) — Humid Continental / Four Seasons:</strong></p>
                <ul>
                    <li><strong>Base:</strong> Breathable, moisture-managing blends</li>
                    <li><strong>Mid:</strong> Versatile wool cardigan, fleece, or layer</li>
                    <li><strong>Outer:</strong> Water-resistant windbreaker or trench</li>
                </ul>`;
            break;
        case 'mediterranean':
            recommendation = `
                <p><strong>Destination Profile (${capitalizedCity}) — Mediterranean:</strong></p>
                <ul>
                    <li><strong>Base:</strong> Lightweight linen and organic cotton</li>
                    <li><strong>Mid:</strong> Minimal layering; light knitwear</li>
                    <li><strong>Outer:</strong> Packable rain shell</li>
                </ul>`;
            break;
        case 'tropical':
            recommendation = `
                <p><strong>Destination Profile (${capitalizedCity}) — Tropical & Equatorial:</strong></p>
                <ul>
                    <li><strong>Base:</strong> Ultra-lightweight technical fibers</li>
                    <li><strong>Mid:</strong> None required</li>
                    <li><strong>Outer:</strong> Lightweight breathable poncho</li>
                </ul>`;
            break;
        case 'arctic':
            recommendation = `
                <p><strong>Destination Profile (${capitalizedCity}) — Sub-Arctic & Tundra:</strong></p>
                <ul>
                    <li><strong>Base:</strong> Thermal merino wool</li>
                    <li><strong>Mid:</strong> Expedition down insulation</li>
                    <li><strong>Outer:</strong> Heavyweight waterproof shell</li>
                </ul>`;
            break;
    }

    outputContent.innerHTML = recommendation;
    resultsBox.classList.remove('hidden');
});
