const nasaHorizonsAPI = "https://ssd.jpl.nasa.gov/api/horizons.api";


const satellites = [
    { name: "Mars Reconnaissance Orbiter", id: "MRO" },
    { name: "Mars Odyssey", id: "ODY" },
    { name: "MAVEN", id: "MAVEN" },
    { name: "ExoMars TGO", id: "TGO" }
];


var satelliteMap = L.map('mars-satellite-map', {
    minZoom: 1,
    maxZoom: 5,
    center: [0, 0],
    zoom: 2,
    crs: L.CRS.Simple,
    zoomControl: true
});


var imageUrl = 'mars.jpg';
var imageBounds = [[-90, -180], [90, 180]];
L.imageOverlay(imageUrl, imageBounds).addTo(satelliteMap);
satelliteMap.fitBounds(imageBounds);


let satelliteMarkers = {};


async function fetchSatellitePositions() {
    try {
        console.log("Fetching satellite data...");
        let satelliteList = document.getElementById("satellite-list");
        satelliteList.innerHTML = ""; 

        for (let sat of satellites) {
            let url = `${nasaHorizonsAPI}?format=text&COMMAND='${sat.id}'&CENTER='500@499'&MAKE_EPHEM='YES'&EPHEM_TYPE='VECTORS'&START_TIME='NOW'&STOP_TIME='NOW'&STEP_SIZE='1 d'`;

            let response = await fetch(url, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });

            let data = await response.text(); 

            console.log(`Raw Response for ${sat.name}:`, data);

          
            let latMatch = data.match(/Y =\s+([-0-9.]+)/);
            let lngMatch = data.match(/X =\s+([-0-9.]+)/);

            if (!latMatch || !lngMatch) {
                console.error(`No coordinate data found for ${sat.name}`);
                continue;
            }

            let lat = parseFloat(latMatch[1]);
            let lng = parseFloat(lngMatch[1]);

            console.log(`Satellite ${sat.name} -> Lat: ${lat}, Lng: ${lng}`);

            let satInfo = `${sat.name} - Lat: ${lat.toFixed(2)}, Lng: ${lng.toFixed(2)}`;
            let listItem = document.createElement("li");
            listItem.textContent = satInfo;
            satelliteList.appendChild(listItem);

            
            if (satelliteMarkers[sat.id]) {
                satelliteMap.removeLayer(satelliteMarkers[sat.id]);
            }

            
            satelliteMarkers[sat.id] = L.marker([lat, lng])
                .addTo(satelliteMap)
                .bindPopup(`<b>${sat.name}</b><br>Latitude: ${lat.toFixed(2)}, Longitude: ${lng.toFixed(2)}`);
        }
    } catch (error) {
        console.error("Error fetching satellite data:", error);
    }
}


fetchSatellitePositions();
setInterval(fetchSatellitePositions, 60000);
