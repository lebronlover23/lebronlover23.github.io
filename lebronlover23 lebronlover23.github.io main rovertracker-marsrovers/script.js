
var map = L.map('mars-map', {
    minZoom: 1,
    maxZoom: 5,
    center: [0, 0], 
    zoom: 2,
    crs: L.CRS.Simple,
    zoomControl: true
});


var imageUrl = 'mars.png'; 
var imageBounds = [[-90, -180], [90, 180]];
L.imageOverlay(imageUrl, imageBounds).addTo(map);
map.fitBounds(imageBounds);


var roverIcon = L.icon({
    iconUrl: 'rover-marker.png', 
    iconSize: [35, 35],
    iconAnchor: [17, 35]
});


var curiosityMarker = null;
var perseveranceMarker = null;
var curiosityPath = [[-4.5895, 137.4417]];
var perseverancePath = [[18.4, 77.5]];


var curiosityPolyline = L.polyline(curiosityPath, { color: 'yellow', weight: 3 }).addTo(map);
var perseverancePolyline = L.polyline(perseverancePath, { color: 'red', weight: 3 }).addTo(map);


const apiKey = "oyIAqOFFEKcUBtrkqbDI0PTD2I8NMultuw7jCcco";


async function fetchRoverPath(roverName, pathArray, polylineLayer, markerRef, defaultLat, defaultLng) {
    try {
        console.log(`Fetching latest ${roverName} data...`);

        let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/latest_photos?api_key=${apiKey}`);
        let data = await response.json();

        if (data.latest_photos.length > 0) {
            let latestPhoto = data.latest_photos[0];

            
            let roverLat = defaultLat + (Math.random() * 0.02 - 0.01);
            let roverLng = defaultLng + (Math.random() * 0.02 - 0.01);

            console.log(`${roverName} New Position: ${roverLat}, ${roverLng}`);

           
            if (pathArray.length === 0 || (roverLat !== pathArray[pathArray.length - 1][0] && roverLng !== pathArray[pathArray.length - 1][1])) {
                pathArray.push([roverLat, roverLng]);

                
                if (pathArray.length > 50) {
                    pathArray.shift();
                }

                
                polylineLayer.setLatLngs(pathArray);
                map.addLayer(polylineLayer);
            }

            
            if (markerRef) map.removeLayer(markerRef);

            
            markerRef = L.marker([roverLat, roverLng], { icon: roverIcon })
                .addTo(map)
                .bindPopup(`
                    <b>${roverName.toUpperCase()} Rover 🚀</b><br>
                    📍 <b>Current Location:</b> Lat: ${roverLat}, Lng: ${roverLng}<br>
                    📸 <b>Latest Image:</b><br>
                    <img src="${latestPhoto.img_src}" width="250"><br>
                    🗓 Taken on: ${latestPhoto.earth_date}
                `);
        }
    } catch (error) {
        console.error(`Error fetching ${roverName} data:`, error);
    }
}


function updateRoverPaths() {
    fetchRoverPath("curiosity", curiosityPath, curiosityPolyline, curiosityMarker, -4.5895, 137.4417);
    fetchRoverPath("perseverance", perseverancePath, perseverancePolyline, perseveranceMarker, 18.4, 77.5);
}


updateRoverPaths();
setInterval(updateRoverPaths, 60000);


map.on('click', function(e) {
    document.getElementById('coords').innerText = `Latitude: ${e.latlng.lat.toFixed(2)}, Longitude: ${e.latlng.lng.toFixed(2)}`;
});


async function fetchMarsPhotos() {
    try {
        console.log("Fetching Mars satellite photos...");
        
        let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${apiKey}`);
        let data = await response.json();
        
        let photoGallery = document.getElementById("mars-photos");
        if (!photoGallery) {
            console.error("Photo gallery element not found!");
            return;
        }

        photoGallery.innerHTML = ""; 

        if (!data.latest_photos || data.latest_photos.length === 0) {
            photoGallery.innerHTML = "<p>No recent photos available.</p>";
            return;
        }

        
        data.latest_photos.slice(0, 6).forEach(photo => {
            let imgElement = document.createElement("img");
            imgElement.src = photo.img_src;
            imgElement.alt = "Mars Satellite Image";
            imgElement.classList.add("mars-photo");
            photoGallery.appendChild(imgElement);
        });

        console.log("Photos loaded successfully.");
    } catch (error) {
        console.error("Error fetching Mars photos:", error);
    }
}


document.addEventListener("DOMContentLoaded", function() {
    let photoButton = document.getElementById("togglePhotos");
    let photoGallery = document.getElementById("photoGallery");

    if (!photoButton || !photoGallery) {
        console.error("Photo button or gallery not found.");
        return;
    }

    photoButton.addEventListener("click", function() {
        console.log("Toggling Mars photos tab...");
        photoGallery.classList.toggle("hidden");

        if (!photoGallery.classList.contains("hidden")) {
            fetchMarsPhotos();
        }
    });
});
