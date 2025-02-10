
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


document.getElementById("glowingButton").addEventListener("click", function() {
});


document.getElementById("acknowledgeButton").addEventListener("click", function() {
    document.getElementById("blackScreen").style.display = "none";
    
   
    const taskButtons = document.querySelectorAll('.ring-buttons-container .task-button');
    taskButtons.forEach(button => {
        button.style.display = "block";
    });
});


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


function enterControlRoom() {
    document.getElementById("spaceScreen").classList.add("hidden");
    document.getElementById("controlRoomScreen").classList.remove("hidden");
    document.getElementById("controlRoomScreen").style.display = "flex";
    document.getElementById("glowingButton").style.display = "block";
    
    typeWriterEffect("Welcome aboard the Endurance! According to NASA, we will land on Mars in approximately 28 hours. In the meantime, make sure to complete the tasks and routine maintenance checks to ensure you arrive safely. Good luck!", 30);
}


document.getElementById("glowingButton").addEventListener("click", function() {
    document.getElementById("blackScreen").style.display = "block";
});


document.getElementById("acknowledgeButton").addEventListener("click", function() {
    document.getElementById("blackScreen").style.display = "none";
    document.getElementById("ringButton1").style.display = "block";
    document.getElementById("ringButton2").style.display = "block";
    document.getElementById("ringButton3").style.display = "block";
    document.getElementById("ringButton4").style.display = "block";
});


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


document.querySelectorAll(".closeButton").forEach(button => {
    button.addEventListener("click", function() {
        this.parentElement.style.display = "none";
    });
});


const oxygenCheckboxes = document.querySelectorAll('#blackScreen1 .task-checkbox');
const oxygenCompleteButton = document.querySelector('#blackScreen1 .complete-task-btn');
const oxygenTaskScreen = document.getElementById("blackScreen1");
const oxygenButton = document.getElementById("ringButton1");
const oxygenInfoModal = document.getElementById("oxygenInfoModal");
const closeOxygenInfo = document.getElementById("closeOxygenInfo");


function checkOxygenTaskCompletion() {
    const allChecked = [...oxygenCheckboxes].every(checkbox => checkbox.checked);
    oxygenCompleteButton.disabled = !allChecked; 
}


oxygenCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', checkOxygenTaskCompletion);
});


function completeOxygenTask() {
    if (!oxygenCompleteButton.disabled) { 
        
        oxygenTaskScreen.style.display = "none";

       
        document.getElementById("controlRoomScreen").style.display = "flex";

        
        oxygenButton.style.backgroundColor = "#00ff00"; 
        oxygenButton.style.pointerEvents = "none"; 
        oxygenButton.style.opacity = "0.5"; 
        oxygenButton.classList.add("completed-task");

        
        oxygenButton.removeEventListener("click", openOxygenTask);

        
        oxygenInfoModal.style.display = "block";
    }
}


oxygenCompleteButton.addEventListener('click', completeOxygenTask);


function openOxygenTask() {
    document.getElementById("blackScreen1").style.display = "block";
}


oxygenButton.addEventListener("click", openOxygenTask);


closeOxygenInfo.addEventListener("click", function () {
    oxygenInfoModal.style.display = "none";
});


const satelliteButtons = document.querySelectorAll('#blackScreen2 .freq-button');
const restoreCommButton = document.getElementById("restoreCommButton");
const commTaskScreen = document.getElementById("blackScreen2");
const commButton = document.getElementById("ringButton2");
const commInfoModal = document.getElementById("commInfoModal");
const closeCommInfo = document.getElementById("closeCommInfo");


const frequencies = ["100 MHz", "200 MHz", "300 MHz", "400 MHz"];
const correctFrequencies = ["300 MHz", "200 MHz", "100 MHz"]; 


satelliteButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
        let currentFreq = frequencies.indexOf(button.textContent);
        let newFreqIndex = (currentFreq + 1) % frequencies.length;
        button.textContent = frequencies[newFreqIndex];

        checkSatelliteAlignment();
    });
});


function checkSatelliteAlignment() {
    let allCorrect = true;
    satelliteButtons.forEach((button, index) => {
        if (button.textContent !== correctFrequencies[index]) {
            allCorrect = false;
        }
    });

    if (allCorrect) {
        restoreCommButton.classList.remove("hidden"); 
    } else {
        restoreCommButton.classList.add("hidden"); 
    }
}


function completeCommTask() {
    if (!restoreCommButton.classList.contains("hidden")) { 
        
        commTaskScreen.style.display = "none";

        
        document.getElementById("controlRoomScreen").style.display = "flex";

        
        commButton.style.backgroundColor = "#00ff00"; 
        commButton.style.pointerEvents = "none"; 
        commButton.style.opacity = "0.5"; 
        commButton.classList.add("completed-task");

        
        commButton.removeEventListener("click", openCommTask);

        
        commInfoModal.style.display = "block";
    }
}


restoreCommButton.addEventListener("click", completeCommTask);


function openCommTask() {
    document.getElementById("blackScreen2").style.display = "block";
}


commButton.addEventListener("click", openCommTask);


closeCommInfo.addEventListener("click", function () {
    commInfoModal.style.display = "none";
});



const sensorPoints = document.querySelectorAll('#blackScreen4 .sensor-point');
let activatedPoints = 0;
const calibrationCompleteButton = document.querySelector('#blackScreen4 .complete-task-btn');
const calibrationTaskScreen = document.getElementById("blackScreen4");
const navigationButton = document.getElementById("ringButton4");
const dashboardScreen = document.getElementById("controlRoomScreen");


sensorPoints.forEach(point => {
    point.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            this.classList.add('active'); 
            activatedPoints++;

            
            if (activatedPoints === sensorPoints.length) {
                calibrationCompleteButton.disabled = false; 
            }
        }
    });
});


function completeNavigationTask() {
    if (!calibrationCompleteButton.disabled) {  
        
        calibrationTaskScreen.style.display = "none";

        
        dashboardScreen.style.display = "flex";

        
        navigationButton.style.backgroundColor = "#00ff00"; 
        navigationButton.style.pointerEvents = "none"; 
        navigationButton.style.opacity = "0.5"; 
        navigationButton.classList.add("completed-task"); 

       
        const prompt = document.createElement('p');
        prompt.textContent = "Navigation Calibration completed successfully. The spacecraft's course is now aligned.";
        prompt.style.textAlign = "center";
        prompt.style.fontSize = "20px";
        prompt.style.color = "#00ff00";
        dashboardScreen.appendChild(prompt);
    }
}


calibrationCompleteButton.addEventListener('click', completeNavigationTask);


document.getElementById("continueButton").addEventListener("click", function () {
    window.location.href = "index1.html"; 
  });
  
document.getElementById("redirectToIndex1").addEventListener("click", function() {
    window.location.href = "index1.html"; 
});

document.getElementById("redirectToIndex1").addEventListener("click", function() {
    window.location.href = "index1.html"; 
});

let oxygenCompleted = false;
let commsCompleted = false;
let navigationCompleted = false;


function checkAllTasksCompleted() {
    if (oxygenCompleted && commsCompleted && navigationCompleted) {
        
        document.getElementById("redirectToIndex1").classList.remove("hidden");
    }
}


function completeOxygenTask() {
    oxygenCompleted = true;
    checkAllTasksCompleted(); 
}


function completeCommTask() {
    commsCompleted = true;
    checkAllTasksCompleted(); 
}


function completeNavigationTask() {
    navigationCompleted = true;
    checkAllTasksCompleted(); 
}


document.getElementById("redirectToIndex1").addEventListener("click", function() {
    window.location.href = "index1.html"; 
});


function completeOxygenTask() {
    if (!oxygenCompleteButton.disabled) { 
        
        oxygenTaskScreen.style.display = "none";

        
        oxygenCompleted = true;
        checkAllTasksCompleted(); 
        
        
        document.getElementById("controlRoomScreen").style.display = "flex";
    }
}


function completeCommTask() {
    if (!restoreCommButton.classList.contains("hidden")) { 
        
        commTaskScreen.style.display = "none";

     
        commsCompleted = true;
        checkAllTasksCompleted(); 
        
        
        document.getElementById("controlRoomScreen").style.display = "flex";
    }
}


function completeNavigationTask() {
    if (!calibrationCompleteButton.disabled) {  
        
        calibrationTaskScreen.style.display = "none";

        
        navigationCompleted = true;
        checkAllTasksCompleted(); 
        
        
        dashboardScreen.style.display = "flex";
    }
}
