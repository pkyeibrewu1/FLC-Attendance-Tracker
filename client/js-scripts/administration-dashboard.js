// Dashboard buttons
const logoutButton = document.getElementById("logout-btn");
const attendanceCard = document.getElementById("attendance-card");
const membersCard = document.getElementById("members-card");

// Log the administrator out and return to the attendance page
logoutButton.addEventListener("click", () => {
    // Remove the administrator's login session
    localStorage.removeItem("adminLoggedIn");
    // Redirect to the login page (or attendance.html depending on your preference)
    window.location.href = "attendance.html";
});

// Open the Attendance Records page
attendanceCard.addEventListener("click", () => {
    window.location.href = "attendance-records.html";
});

// Open the Member Management page
membersCard.addEventListener("click", () => {
    window.location.href = "member-management.html";
});