document.getElementById('calculateBtn').addEventListener('click', function() {
    const region = document.getElementById('region').value;
    const duration = document.getElementById('duration').value;
    const resultsBox = document.getElementById('results');
    const outputContent = document.getElementById('outputContent');

    if (!region || !duration) {
        alert('Please select both a climate zone and a duration.');
        return;
    }

    let recommendation = '';

    switch(region) {
        let base = 'Merino wool or synthetic moisture-wicking base layer.';
        let mid = 'Insulating fleece or lightweight down mid-layer.';
        let outer = 'Gore-Tex or windproof, waterproof shell.';
        
        case 'arctic':
            recommendation = `
                <p><strong>Climate Profile:</strong> Extreme cold and sub-zero thermal baseline.</p>
                <ul>
                    <li><strong>Base:</strong> Heavyweight thermal merino wool (${base})</li>
                    <li><strong>Mid:</strong> High-loft fleece and expedition down jacket</li>
                    <li><strong>Outer:</strong> Heavyweight windproof and waterproof insulated shell</li>
                    <li><strong>Lifecycle Strategy:</strong> Focus on high thermal-to-weight ratios to minimize luggage bulk.</li>
                </ul>`;
            break;
        case 'temperate':
            recommendation = `
                <p><strong>Climate Profile:</strong> Moderate variance across seasonal transitions.</p>
                <ul>
                    <li><strong>Base:</strong> Standard breathable cotton-alternative blends</li>
                    <li><strong>Mid:</strong> Versatile wool cardigan or breathable fleece</li>
                    <li><strong>Outer:</strong> Water-resistant trench or modular windbreaker</li>
                    <li><strong>Lifecycle Strategy:</strong> Emphasize mix-and-match modular capsule pieces for multi-season utility.</li>
                </ul>`;
            break;
        case 'mediterranean':
            recommendation = `
                <p><strong>Climate Profile:</strong> Warm, dry summers and mild, wet winters.</p>
                <ul>
                    <li><strong>Base:</strong> Lightweight linen and breathable organic cotton</li>
                    <li><strong>Mid:</strong> Minimal layering; lightweight knitwear for evenings</li>
                    <li><strong>Outer:</strong> Compact packable rain shell</li>
                    <li><strong>Lifecycle Strategy:</strong> Prioritize UV protection and fast-drying fabrics to reduce laundry frequency.</li>
                </ul>`;
            break;
        case 'tropical':
            recommendation = `
                <p><strong>Climate Profile:</strong> High humidity, elevated temperatures, and seasonal monsoons.</p>
                <ul>
                    <li><strong>Base:</strong> Ultra-lightweight, moisture-wicking technical fibers</li>
                    <li><strong>Mid:</strong> None required; optional UV-shielding long sleeve</li>
                    <li><strong>Outer:</strong> Lightweight breathable poncho or quick-dry shell</li>
                    <li><strong>Lifecycle Strategy:</strong> High rotation frequency requires wrinkle-resistant, anti-microbial textiles.</li>
                </ul>`;
            break;
    }

    outputContent.innerHTML = recommendation;
    resultsBox.classList.remove('hidden');
});
