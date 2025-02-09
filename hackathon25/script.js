document.getElementById("startJourney").addEventListener("click", startJourney);

function startJourney() {
  // Hide the start screen and show the space screen
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("spaceScreen").classList.remove("hidden");

  // Start starfield animation
  startWarpAnimation();

  // After 3 seconds, show the astronaut message
  setTimeout(() => {
    document.getElementById("prompt").classList.remove("hidden");
    const destinations = ["Mars", "the Moon"];
    document.getElementById("destination").textContent = destinations[Math.floor(Math.random() * destinations.length)];
  }, 3000);
}

// STARFIELD ANIMATION
const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

let stars = [];

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 10 + 5, // Speed varies to simulate depth
      length: Math.random() * 15 + 30, // Different lengths for depth effect
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.lineWidth = 2;

  for (let star of stars) {
    ctx.beginPath();
    let endX = star.x + Math.cos(star.angle) * star.length;
    let endY = star.y + Math.sin(star.angle) * star.length;
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = "white";
    ctx.stroke();

    // Move the star outward in the direction of its angle
    star.x += Math.cos(star.angle) * star.speed;
    star.y += Math.sin(star.angle) * star.speed;

    // Reset stars when they go off-screen
    if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
      star.x = canvas.width / 2;
      star.y = canvas.height / 2;
      star.angle = Math.random() * Math.PI * 2;
      star.speed = Math.random() * 5 + 2;
      star.length = Math.random() * 10 + 10;
    }
  }

  requestAnimationFrame(drawStars);
}

function startWarpAnimation() {
  initCanvas();
  createStars();
  drawStars();
}

// Make sure canvas resizes properly
window.addEventListener("resize", initCanvas);

document.getElementById("Enter Control Room").addEventListener("click", enterControlRoom);

function enterControlRoom() {
    // Hide the space screen and show the control room
    document.getElementById("spaceScreen").classList.add("hidden");
    document.getElementById("controlRoomScreen").classList.remove("hidden");
    document.getElementById("controlRoomScreen").style.display = "flex";
  
    // Start the typewriter effect
    typeWriterEffect("Welcome aboard the Endurance! According to NASA, we will land on Mars in approximately 3 hours. In the meantime, make sure to complete the tasks and routine maintenance checks to ensure you arrive safely. Good luck!", 50);
  }
  
  function typeWriterEffect(text, speed) {
    let index = 0;
    const textElement = document.getElementById("typewriterText");
    textElement.textContent = ""; // Clear previous text
    
    function type() {
      if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }
  
  document.getElementById("closeButton").addEventListener("click", function() {
    document.getElementById("textBox").style.display = "none";
  });
  
  // Function to show the black box when entering the control room
document.getElementById("enterControlRoom").addEventListener("click", function() {
    document.getElementById("blackBox").style.display = "block";
});



// Function to turn the screen black when the glowing button is clicked
document.getElementById("glowingButton").addEventListener("click", function() {
    document.getElementById("blackScreen").style.display = "block";  // Show Full Black Screen
});


document.getElementById("closeButton").addEventListener("click", function() {
    document.getElementById("blackBox").style.display = "none";  
    let glowingBtn = document.getElementById("glowingButton");
    glowingBtn.style.display = "block";  
    glowingBtn.style.visibility = "visible"; // Force visibility
});

document.getElementById("Enter Control Room").addEventListener("click", function() {
    let glowingBtn = document.getElementById("glowingButton");
    glowingBtn.style.display = "block";
});

// Handle glowing button click
document.getElementById("glowingButton").addEventListener("click", function() {
    document.getElementById("blackScreen").style.display = "block";
    this.style.display = "none"; // Hide the button when clicked
});

document.querySelectorAll("#closeButton").forEach(button => {
    button.addEventListener("click", function() {
        document.getElementById("blackBox").style.display = "none";  

        let glowingBtn = document.getElementById("glowingButton");
        glowingBtn.style.display = "inline-block";  
        glowingBtn.style.visibility = "visible"; 
        glowingBtn.style.opacity = "1"; // Ensure opacity is set
    });
});


