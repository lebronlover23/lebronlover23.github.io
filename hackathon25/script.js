
let firstAcknowledgmentDone = false;
document.getElementById("startJourney").addEventListener("click", startJourney);
document.getElementById("Enter Control Room").addEventListener("click", enterControlRoom);
document.getElementById("closeButton").addEventListener("click", function() {
  document.getElementById("textBox").style.display = "none";
});
document.getElementById("glowingButton").addEventListener("click", function() {
  document.getElementById("blackScreen").style.display = "block";
  this.style.display = "none";
});

function startJourney() {
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("spaceScreen").classList.remove("hidden");
  startWarpAnimation();

  setTimeout(() => {
    document.getElementById("prompt").classList.remove("hidden");
    const destinations = ["Mars", "the Moon"];
    document.getElementById("destination").textContent = destinations[Math.floor(Math.random() * destinations.length)];
  }, 3000);
}

function enterControlRoom() {
  document.getElementById("spaceScreen").classList.add("hidden");
  document.getElementById("controlRoomScreen").classList.remove("hidden");
  document.getElementById("controlRoomScreen").style.display = "flex";
  document.getElementById("glowingButton").style.display = "block";
  
  typeWriterEffect("Welcome aboard the Endurance! According to NASA, we will land on Mars in approximately 3 hours. In the meantime, make sure to complete the tasks and routine maintenance checks to ensure you arrive safely. Good luck!", 50);
}

function typeWriterEffect(text, speed) {
  let index = 0;
  const textElement = document.getElementById("typewriterText");
  textElement.textContent = "";
  
  function type() {
    if (index < text.length) {
      textElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }
  
  type();
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
      speed: Math.random() * 10 + 5,
      length: Math.random() * 15 + 30,
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

    star.x += Math.cos(star.angle) * star.speed;
    star.y += Math.sin(star.angle) * star.speed;

    if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
      star.x = canvas.width / 2;
      star.y = canvas.height / 2;
      star.angle = Math.random() * Math.PI * 2;
      star.speed = Math.random() * 30 + 2;
      star.length = Math.random() * 10 + 20;
    }
  }

  requestAnimationFrame(drawStars);
}

function startWarpAnimation() {
  initCanvas();
  createStars();
  drawStars();
}

window.addEventListener("resize", initCanvas);

// When clicking the glowing ring button
document.getElementById("glowingButton").addEventListener("click", function() {
});

// When Acknowledge is clicked, remove main black screen and show new buttons
document.getElementById("acknowledgeButton").addEventListener("click", function() {
    document.getElementById("blackScreen").style.display = "none";
    
    // Select all buttons in the ring-buttons-container and show them
    const taskButtons = document.querySelectorAll('.ring-buttons-container .task-button');
    taskButtons.forEach(button => {
        button.style.display = "block";
    });
});

// Add event listeners for each ring button to open its respective black screen
document.querySelector('.ring-buttons-container #ringButton1').addEventListener("click", function() {
    document.getElementById("blackScreen1").style.display = "block";
});
document.querySelector('.ring-buttons-container #ringButton2').addEventListener("click", function() {
    document.getElementById("blackScreen2").style.display = "block";
});
document.querySelector('.ring-buttons-container #ringButton3').addEventListener("click", function() {
    document.getElementById("blackScreen3").style.display = "block";
});
document.querySelector('.ring-buttons-container #ringButton4').addEventListener("click", function() {
    document.getElementById("blackScreen4").style.display = "block";
});

// Update the enterControlRoom function to ensure the button is visible
function enterControlRoom() {
    document.getElementById("spaceScreen").classList.add("hidden");
    document.getElementById("controlRoomScreen").classList.remove("hidden");
    document.getElementById("controlRoomScreen").style.display = "flex";
    document.getElementById("glowingButton").style.display = "block";
    
    typeWriterEffect("Welcome aboard the Endurance! According to NASA, we will land on Mars in approximately 28 hours. In the meantime, make sure to complete the tasks and routine maintenance checks to ensure you arrive safely. Good luck!", 30);
}

// Ensure the opening screen and animations remain the same
document.getElementById("glowingButton").addEventListener("click", function() {
    document.getElementById("blackScreen").style.display = "block";
});

// When Acknowledge is clicked, remove main black screen and show new buttons
document.getElementById("acknowledgeButton").addEventListener("click", function() {
    document.getElementById("blackScreen").style.display = "none";
    document.getElementById("ringButton1").style.display = "block";
    document.getElementById("ringButton2").style.display = "block";
    document.getElementById("ringButton3").style.display = "block";
    document.getElementById("ringButton4").style.display = "block";
});

// Add event listeners for each ring button to open its respective black screen
document.getElementById("ringButton1").addEventListener("click", function() {
    document.getElementById("blackScreen1").style.display = "block";
});
document.getElementById("ringButton2").addEventListener("click", function() {
    document.getElementById("blackScreen2").style.display = "block";
});
document.getElementById("ringButton3").addEventListener("click", function() {
    document.getElementById("blackScreen3").style.display = "block";
});
document.getElementById("ringButton4").addEventListener("click", function() {
    document.getElementById("blackScreen4").style.display = "block";
});

// Close buttons functionality for all black screens
document.querySelectorAll(".closeButton").forEach(button => {
    button.addEventListener("click", function() {
        this.parentElement.style.display = "none";
    });
});

// Oxygen System Task
document.querySelectorAll('#blackScreen1 .task-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const allChecked = [...document.querySelectorAll('#blackScreen1 .task-checkbox')]
            .every(box => box.checked);
        document.querySelector('#blackScreen1 .complete-task-btn').disabled = !allChecked;
    });
});

// Fuel Management System
document.querySelectorAll('#blackScreen2 .slider').forEach(slider => {
    slider.addEventListener('input', function() {
        this.nextElementSibling.textContent = this.value + '%';
    });
});

// Life Support Diagnostics
document.querySelector('#blackScreen3 .diagnostic-btn').addEventListener('click', function() {
    const progressBar = document.querySelector('#blackScreen3 .progress');
    const results = document.querySelector('#blackScreen3 .diagnostic-results');
    
    this.disabled = true;
    progressBar.style.width = '0%';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            results.classList.remove('hidden');
            results.innerHTML = `
                <h3>Diagnostic Complete</h3>
                <p>Temperature Control: OK</p>
                <p>Humidity Regulation: OK</p>
                <p>Air Filtration: Maintenance Required</p>
            `;
            this.disabled = false;
        }
    }, 50);
});

// Navigation Calibration
const sensorPoints = document.querySelectorAll('#blackScreen4 .sensor-point');
let activatedPoints = 0;

sensorPoints.forEach(point => {
    point.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            this.classList.add('active');
            activatedPoints++;
            
            if (activatedPoints === sensorPoints.length) {
                document.querySelector('#blackScreen4 .complete-task-btn').disabled = false;
            }
        }
    });
});

// Reset screens when closed
document.querySelectorAll('.closeButton').forEach(button => {
    button.addEventListener('click', function() {
        const screen = this.closest('.maintenance-screen');
        
        // Reset checkboxes
        screen.querySelectorAll('.task-checkbox').forEach(cb => cb.checked = false);
        
        // Reset sliders
        screen.querySelectorAll('.slider').forEach(slider => {
            slider.value = slider.defaultValue;
            slider.nextElementSibling.textContent = slider.value + '%';
        });
        
        // Reset diagnostic results
        const diagnosticResults = screen.querySelector('.diagnostic-results');
        if (diagnosticResults) {
            diagnosticResults.classList.add('hidden');
        }
        
        // Reset sensor points
        screen.querySelectorAll('.sensor-point').forEach(point => {
            point.classList.remove('active');
        });
        activatedPoints = 0;
        
        // Reset buttons
        screen.querySelectorAll('.complete-task-btn').forEach(btn => btn.disabled = true);
        screen.querySelectorAll('.diagnostic-btn').forEach(btn => btn.disabled = false);
    });
});