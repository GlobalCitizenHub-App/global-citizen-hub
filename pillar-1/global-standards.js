// ==========================================
// GLOBAL STANDARDS & CONVERSION UTILITY
// ==========================================
const GlobalStandards = {
    temp: {
        toCelsius: (f) => (parseFloat(f) - 32) * (5 / 9),
        toFahrenheit: (c) => (parseFloat(c) * 9 / 5) + 32
    },
    length: {
        inchesToCm: (inch) => parseFloat(inch) * 2.54,
        cmToInches: (cm) => parseFloat(cm) / 2.54,
        feetToMeters: (ft) => parseFloat(ft) * 0.3048,
        metersToFeet: (m) => parseFloat(m) / 0.3048,
        milesToKm: (mi) => parseFloat(mi) * 1.60934,
        kmToMiles: (km) => parseFloat(km) / 1.60934
    },
    weight: {
        gramsToOz: (g) => parseFloat(g) * 0.035274,
        ozToGrams: (oz) => parseFloat(oz) / 0.035274,
        kgToLbs: (kg) => parseFloat(kg) * 2.20462,
        lbsToKg: (lbs) => parseFloat(lbs) / 2.20462
    },
    volume: {
        ozToMl: (oz) => parseFloat(oz) * 29.5735,
        mlToOz: (ml) => parseFloat(ml) / 29.5735,
        litersToGallons: (l) => parseFloat(l) * 0.264172,
        gallonsToLiters: (gal) => parseFloat(gal) / 0.264172,
        cupsToMl: (cups) => parseFloat(cups) * 240,
        mlToCups: (ml) => parseFloat(ml) / 240
    },
    electrical: {
        "South Korea": { volts: "220V", hz: "60Hz", plugs: ["Type C", "Type F"] },
        "Japan": { volts: "100V", hz: "50Hz/60Hz", plugs: ["Type A", "Type B"] },
        "United States": { volts: "120V", hz: "60Hz", plugs: ["Type A", "Type B"] },
        "United Kingdom": { volts: "230V", hz: "50Hz", plugs: ["Type G"] },
        "Mexico": { volts: "127V", hz: "60Hz", plugs: ["Type A", "Type B"] },
        "Brazil": { volts: "127V/220V", hz: "60Hz", plugs: ["Type C", "Type N"] }
    },
    getElectricalStandard(countryName) {
        return this.electrical[countryName] || { volts: "Standard varies", hz: "50/60Hz", plugs: ["Check local adapters"] };
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GlobalStandards;
}
