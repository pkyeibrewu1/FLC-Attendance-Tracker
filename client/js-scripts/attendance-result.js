// Retrieve the attendance message saved from the attendance page
const message = localStorage.getItem("attendanceMessage");

// Result page elements
const resultMessage = document.getElementById("result-message");
const resultIcon = document.getElementById("result-icon");
const description = document.getElementById("result-description");
const doneButton = document.getElementById("done-btn");

// Return to the Attendance page
doneButton.addEventListener("click", () => {
    window.location.href = "attendance.html";
});

// Guard against null/missing localStorage data to prevent runtime crashes
if (!message) {
    resultIcon.textContent = "ℹ️";
    resultMessage.textContent = "Status Unknown";
    description.textContent = "No recent attendance check-in record was found.";
} 
// Check if the attendance has already been recorded
else if (message.includes("already")) {
    resultMessage.textContent = message;
    resultIcon.textContent = "⚠️";
    description.textContent = "We have already recorded your attendance today.";
} 
// Attendance was successfully recorded
else {
    resultMessage.textContent = message;
    resultIcon.textContent = "✓";
    description.textContent = "Your attendance has been successfully recorded.";
}