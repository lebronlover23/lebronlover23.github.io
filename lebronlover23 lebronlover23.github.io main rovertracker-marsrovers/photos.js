const apiKey = "oyIAqOFFEKcUBtrkqbDI0PTD2I8NMultuw7jCcco";


async function fetchMarsPhotos() {
    try {
        console.log("Fetching latest Mars satellite photos...");

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

        
        data.latest_photos.slice(0, 4).forEach(photo => {
            let photoContainer = document.createElement("div");
            photoContainer.classList.add("photo-container");

            let imgElement = document.createElement("img");
            imgElement.src = photo.img_src;
            imgElement.alt = "Mars Satellite Image";
            imgElement.classList.add("mars-photo");

            
            let earthDate = photo.earth_date || "Unknown Date";
            let roverName = photo.rover?.name || "Unknown Rover";
            let cameraName = photo.camera?.full_name || "Unknown Camera";
            
            
            let latitude = photo.rover?.landing_latitude || "N/A";
            let longitude = photo.rover?.landing_longitude || "N/A";

            let infoElement = document.createElement("p");
            infoElement.innerHTML = `
                📅 <b>Date:</b> ${earthDate} <br>
                🚀 <b>Satellite:</b> ${roverName} <br>
                📡 <b>Camera:</b> ${cameraName} <br>
                📍 <b>Location:</b> Lat: ${latitude}, Lng: ${longitude}
            `;

            photoContainer.appendChild(imgElement);
            photoContainer.appendChild(infoElement);
            photoGallery.appendChild(photoContainer);
        });

        console.log("Photos loaded successfully.");
    } catch (error) {
        console.error("Error fetching Mars photos:", error);
    }
}


document.addEventListener("DOMContentLoaded", fetchMarsPhotos);
