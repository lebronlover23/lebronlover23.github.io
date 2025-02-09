
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
// Select necessary elements
const oxygenCheckboxes = document.querySelectorAll('#blackScreen1 .task-checkbox');
const oxygenCompleteButton = document.querySelector('#blackScreen1 .complete-task-btn');
const oxygenTaskScreen = document.getElementById("blackScreen1");
const oxygenButton = document.getElementById("ringButton1");
const oxygenInfoModal = document.getElementById("oxygenInfoModal");
const closeOxygenInfo = document.getElementById("closeOxygenInfo");

// Function to check if all checkboxes are checked
function checkOxygenTaskCompletion() {
    const allChecked = [...oxygenCheckboxes].every(checkbox => checkbox.checked);
    oxygenCompleteButton.disabled = !allChecked; // Enable button only if all tasks are checked
}

// Add event listeners to all checkboxes
oxygenCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', checkOxygenTaskCompletion);
});

// Function to complete the oxygen maintenance task
function completeOxygenTask() {
    if (!oxygenCompleteButton.disabled) { // Ensure button is enabled before executing
        // Hide the oxygen maintenance screen
        oxygenTaskScreen.style.display = "none";

        // Redirect user back to the control room/dashboard
        document.getElementById("controlRoomScreen").style.display = "flex";

        // Fill the oxygen task button to signify completion
        oxygenButton.style.backgroundColor = "#00ff00"; // Green to show it's completed
        oxygenButton.style.pointerEvents = "none"; // Disable further clicks
        oxygenButton.style.opacity = "0.5"; // Dim it slightly to show it's done
        oxygenButton.classList.add("completed-task");

        // Prevent user from opening the oxygen task again
        oxygenButton.removeEventListener("click", openOxygenTask);

        // Show the Oxygen Filtration Info Modal
        oxygenInfoModal.style.display = "block";
    }
}

// Attach event listener for completing the task
oxygenCompleteButton.addEventListener('click', completeOxygenTask);

// Function to open oxygen task (needed for removal)
function openOxygenTask() {
    document.getElementById("blackScreen1").style.display = "block";
}

// Attach event listener for oxygen button click
oxygenButton.addEventListener("click", openOxygenTask);

// Close modal when user clicks "Understood"
closeOxygenInfo.addEventListener("click", function () {
    oxygenInfoModal.style.display = "none";
});

// Establish Communications
// Select elements
const satelliteButtons = document.querySelectorAll('#blackScreen2 .freq-button');
const restoreCommButton = document.getElementById("restoreCommButton");
const commTaskScreen = document.getElementById("blackScreen2");
const commButton = document.getElementById("ringButton2");
const commInfoModal = document.getElementById("commInfoModal");
const closeCommInfo = document.getElementById("closeCommInfo");

// Possible frequencies for each satellite
const frequencies = ["100 MHz", "200 MHz", "300 MHz", "400 MHz"];
const correctFrequencies = ["300 MHz", "200 MHz", "100 MHz"]; // Correct order

// Function to cycle frequencies
satelliteButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
        let currentFreq = frequencies.indexOf(button.textContent);
        let newFreqIndex = (currentFreq + 1) % frequencies.length;
        button.textContent = frequencies[newFreqIndex];

        checkSatelliteAlignment();
    });
});

// Function to check if satellites are aligned correctly
function checkSatelliteAlignment() {
    let allCorrect = true;
    satelliteButtons.forEach((button, index) => {
        if (button.textContent !== correctFrequencies[index]) {
            allCorrect = false;
        }
    });

    if (allCorrect) {
        restoreCommButton.classList.remove("hidden"); // Show "Restore Communications" button
    } else {
        restoreCommButton.classList.add("hidden"); // Hide it if not correct
    }
}

// Function to complete the communication restoration task
function completeCommTask() {
    if (!restoreCommButton.classList.contains("hidden")) { // Ensure button is visible before execution
        // Hide the communication task screen
        commTaskScreen.style.display = "none";

        // Redirect user back to the control room/dashboard
        document.getElementById("controlRoomScreen").style.display = "flex";

        // Fill the communication task button to signify completion
        commButton.style.backgroundColor = "#00ff00"; // Green to show it's completed
        commButton.style.pointerEvents = "none"; // Disable further clicks
        commButton.style.opacity = "0.5"; // Dim it slightly to show it's done
        commButton.classList.add("completed-task");

        // Prevent user from opening the communication task again
        commButton.removeEventListener("click", openCommTask);

        // Show the Communications Info Modal
        commInfoModal.style.display = "block";
    }
}

// Attach event listener for restoring communications
restoreCommButton.addEventListener("click", completeCommTask);

// Function to open communication task (needed for removal)
function openCommTask() {
    document.getElementById("blackScreen2").style.display = "block";
}

// Attach event listener for communication button click
commButton.addEventListener("click", openCommTask);

// Close modal when user clicks "Understood"
closeCommInfo.addEventListener("click", function () {
    commInfoModal.style.display = "none";
});


// Navigation Calibration Task
const sensorPoints = document.querySelectorAll('#blackScreen4 .sensor-point');
let activatedPoints = 0;
const calibrationCompleteButton = document.querySelector('#blackScreen4 .complete-task-btn');
const calibrationTaskScreen = document.getElementById("blackScreen4");
const navigationButton = document.getElementById("ringButton4");
const dashboardScreen = document.getElementById("controlRoomScreen");

// Function to handle sensor clicks
sensorPoints.forEach(point => {
    point.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            this.classList.add('active'); // Mark the sensor point as clicked
            activatedPoints++;

            // Enable the completion button when all points are activated
            if (activatedPoints === sensorPoints.length) {
                calibrationCompleteButton.disabled = false; // Enable button
            }
        }
    });
});

// Function to complete the navigation task
function completeNavigationTask() {
    if (!calibrationCompleteButton.disabled) {  // Ensure button is enabled before proceeding
        // Hide the navigation calibration screen
        calibrationTaskScreen.style.display = "none";

        // Return to the dashboard
        dashboardScreen.style.display = "flex";

        // Fill the navigation task button to signify completion
        navigationButton.style.backgroundColor = "#00ff00"; // Green to show it's completed
        navigationButton.style.pointerEvents = "none"; // Disable further clicks
        navigationButton.style.opacity = "0.5"; // Dim it slightly to show it's done
        navigationButton.classList.add("completed-task"); // Add class for visual feedback

        // Display a prompt about the task completion
        const prompt = document.createElement('p');
        prompt.textContent = "Navigation Calibration completed successfully. The spacecraft's course is now aligned.";
        prompt.style.textAlign = "center";
        prompt.style.fontSize = "20px";
        prompt.style.color = "#00ff00";
        dashboardScreen.appendChild(prompt);
    }
}

// Attach the event listener for the completion button
calibrationCompleteButton.addEventListener('click', completeNavigationTask);

// After completing the tasks and triggering the final screen, handle the "Continue to Next Phase" button
document.getElementById("continueButton").addEventListener("click", function () {
    window.location.href = "index1.html"; // Redirect to index1.html
  });
  
document.getElementById("redirectToIndex1").addEventListener("click", function() {
    window.location.href = "index1.html"; // Redirect to index1.html
});

document.getElementById("redirectToIndex1").addEventListener("click", function() {
    window.location.href = "index1.html"; // Redirect to index1.html
});
// Declare task completion variables
let oxygenCompleted = false;
let commsCompleted = false;
let navigationCompleted = false;

// Function to check if all tasks are completed
function checkAllTasksCompleted() {
    if (oxygenCompleted && commsCompleted && navigationCompleted) {
        // Remove the "hidden" class to show the "Go to Next Phase" button
        document.getElementById("redirectToIndex1").classList.remove("hidden");
    }
}

// Oxygen Task Completion
function completeOxygenTask() {
    oxygenCompleted = true;
    checkAllTasksCompleted(); // Check if all tasks are completed
}

// Communication Task Completion
function completeCommTask() {
    commsCompleted = true;
    checkAllTasksCompleted(); // Check if all tasks are completed
}

// Navigation Task Completion
function completeNavigationTask() {
    navigationCompleted = true;
    checkAllTasksCompleted(); // Check if all tasks are completed
}

// Event listener for the "Go to Next Phase" button
document.getElementById("redirectToIndex1").addEventListener("click", function() {
    window.location.href = "index1.html"; // Redirect to index1.html
});

// Oxygen System Task completion check (use when task is completed)
function completeOxygenTask() {
    if (!oxygenCompleteButton.disabled) { // Ensure button is enabled before executing
        // Hide the oxygen maintenance screen
        oxygenTaskScreen.style.display = "none";

        // Mark the task as completed
        oxygenCompleted = true;
        checkAllTasksCompleted(); // Check if all tasks are completed
        
        // Redirect user back to the control room/dashboard
        document.getElementById("controlRoomScreen").style.display = "flex";
    }
}

// Communication Task completion check
function completeCommTask() {
    if (!restoreCommButton.classList.contains("hidden")) { // Ensure button is visible before execution
        // Hide the communication task screen
        commTaskScreen.style.display = "none";

        // Mark the task as completed
        commsCompleted = true;
        checkAllTasksCompleted(); // Check if all tasks are completed
        
        // Redirect user back to the control room/dashboard
        document.getElementById("controlRoomScreen").style.display = "flex";
    }
}

// Navigation Task completion check
function completeNavigationTask() {
    if (!calibrationCompleteButton.disabled) {  // Ensure button is enabled before proceeding
        // Hide the navigation calibration screen
        calibrationTaskScreen.style.display = "none";

        // Mark the task as completed
        navigationCompleted = true;
        checkAllTasksCompleted(); // Check if all tasks are completed
        
        // Return to the dashboard
        dashboardScreen.style.display = "flex";
    }
}