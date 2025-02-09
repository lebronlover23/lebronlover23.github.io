// Ensure Three.js is loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Scene Setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3; // Adjust zoom

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("mars-container").appendChild(renderer.domElement);

    // Load Mars Texture
    const textureLoader = new THREE.TextureLoader();
    const marsTexture = textureLoader.load('8k_mars.jpg');

    // Create Mars Sphere
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({ map: marsTexture });
    const mars = new THREE.Mesh(geometry, material);
    scene.add(mars);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 3, 5);
    scene.add(light);

    // Orbit Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;

    // Convert Lat/Lon to 3D Vector
    function latLonToVector3(lat, lon, radius) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);

        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        return new THREE.Vector3(x, y, z);
    }

    // Create Groups for Rovers, Landmarks, and Bases (Attach to Mars)
    const markersGroup = new THREE.Group();
    const roverGroup = new THREE.Group();
    const landmarkGroup = new THREE.Group();
    const baseGroup = new THREE.Group();
    mars.add(markersGroup);
    markersGroup.add(roverGroup, landmarkGroup, baseGroup);

    // Rover Data (Red Markers)
    const rovers = [
        { name: "Curiosity", lat: -4.59, lon: 137.44 },
        { name: "Perseverance", lat: 18.4, lon: 77.5 }
    ];

    // Landmark Data (Blue Markers)
    const landmarks = [
        { name: "Olympus Mons", lat: 18.65, lon: -133.8, info: "Largest volcano in the solar system, standing about 22 km high." },
        { name: "Valles Marineris", lat: -14, lon: -60, info: "Massive canyon system over 4,000 km long and up to 7 km deep." },
        { name: "Gale Crater", lat: -5.4, lon: 137.8, info: "Landing site of NASA's Curiosity rover, with Mount Sharp in the center." },
        { name: "Hellas Basin", lat: -42.4, lon: 70.5, info: "One of the largest impact craters in the solar system, 2,300 km wide." },
        { name: "Tharsis Montes", lat: 0, lon: -105, info: "A volcanic plateau home to some of the tallest volcanoes on Mars." }
    ];

    // Landing Sites/Bases (Green Markers)
    const bases = [
        { name: "Viking 1", year: 1976, lat: 22.697, lon: -48.222 },
        { name: "Viking 2", year: 1976, lat: 47.968, lon: 225.74 },
        { name: "Pathfinder (Sojourner)", year: 1997, lat: 19.13, lon: 33.22 },
        { name: "Phoenix Lander", year: 2008, lat: 68.22, lon: -125.7 }
    ];

    // Create Markers
    function createMarkers(data, group, color) {
        const geometry = new THREE.SphereGeometry(0.03, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: color });

        data.forEach(item => {
            const position = latLonToVector3(item.lat, item.lon, 1.01);
            const marker = new THREE.Mesh(geometry, material);
            marker.position.copy(position);
            marker.userData = item;
            group.add(marker);
        });
    }

    createMarkers(rovers, roverGroup, 0xff0000);
    createMarkers(landmarks, landmarkGroup, 0x0000ff);
    createMarkers(bases, baseGroup, 0x00ff00);

    // Raycaster for Click Detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(markersGroup.children, true);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object.userData;
            let message = `📍 ${clickedObject.name}\n📍 Latitude: ${clickedObject.lat}\n📍 Longitude: ${clickedObject.lon}`;
            if (clickedObject.info) message += `\nℹ️ ${clickedObject.info}`;
            if (clickedObject.year) message += `\n📅 Year: ${clickedObject.year}`;
            alert(message);
        } else {
            // Calculate clicked coordinates
            const marsPoint = raycaster.intersectObject(mars, true);
            if (marsPoint.length > 0) {
                const point = marsPoint[0].point;
                const lat = 90 - (Math.acos(point.y / 1) * (180 / Math.PI));
                const lon = (Math.atan2(point.z, point.x) * (180 / Math.PI)) - 180;

                document.getElementById("coordinate-display").innerText = `📍 Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
            }
        }
    }

    window.addEventListener('click', onClick);

    // Toggle Markers
    function toggleMarkers(group, checkbox) {
        group.visible = checkbox.checked;
    }

    document.getElementById("toggleRovers").addEventListener("change", function() {
        toggleMarkers(roverGroup, this);
    });
    document.getElementById("toggleLandmarks").addEventListener("change", function() {
        toggleMarkers(landmarkGroup, this);
    });
    document.getElementById("toggleBases").addEventListener("change", function() {
        toggleMarkers(baseGroup, this);
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        mars.rotation.y += 0.002;
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
});
