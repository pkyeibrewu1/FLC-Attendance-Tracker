// Scope protection block to guarantee elements exist before executing code
document.addEventListener("DOMContentLoaded", () => {
    // Attendance form elements
    const submitButton = document.getElementById("submit-btn");
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const suggestions = document.getElementById("name-suggestions");
    const responseMessage = document.getElementById("response-message");

    // Mobile menu elements
    const menuBtn = document.getElementById("menu-btn");
    const mobileNav = document.getElementById("mobile-nav");

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Load previously saved attendance records master array variable
    let attendanceInfos = [];

    async function loadAttendance() {
        try {
            const response = await fetch("https://flc-attendance-tracker.onrender.com/attendance");
            attendanceInfos = await response.json();
        } catch (error) {
            console.error("Failed to sync attendance records database:", error);
        }
    }

    // Trigger immediate background sync
    loadAttendance();

    // Track input typing change event to display member auto-suggestions
    firstNameInput.addEventListener("input", () => {
        let searchText = firstNameInput.value.trim().toLowerCase();
        suggestions.innerHTML = "";

        // Stop searching if the input is empty
        if (searchText === "") { return; }

        // Find matching first names across recorded histories
        let matches = attendanceInfos.filter((record) => 
            record.firstName && record.firstName.toLowerCase().includes(searchText)
        );

        // Remove duplicate profile listings from suggestions list
        let uniqueMatches = [];
        matches.forEach((record) => {
            let alreadyExists = uniqueMatches.find((item) => 
                item.firstName === record.firstName && item.lastName === record.lastName
            );
            if (!alreadyExists) { uniqueMatches.push(record); }
        });

        // Display each matching name in the dynamic suggestion container
        uniqueMatches.forEach((record) => {
            let suggestion = document.createElement("div");
            suggestion.textContent = `${record.firstName} ${record.lastName}`;
            suggestion.classList.add("suggestion-item");

            // Fill the form field text boxes upon selection
            suggestion.addEventListener("click", () => {
                firstNameInput.value = record.firstName;
                lastNameInput.value = record.lastName;
                suggestions.innerHTML = ""; // Close suggestion window container layout completely
            });
            suggestions.appendChild(suggestion);
        });
    });

    // Close name suggestions popup dynamically if user clicks anywhere else outside the frame
    document.addEventListener("click", (e) => {
        if (e.target !== firstNameInput && e.target !== suggestions) {
            suggestions.innerHTML = "";
        }
    });

    // Process attendance submissions securely
    submitButton.addEventListener("click", () => {
        // Capture cleansed text inputs
        let firstName = firstNameInput.value.trim();
        let lastName = lastNameInput.value.trim();
        let firstTimer = document.querySelector('input[name="first-timer"]:checked');
        
        // Ensure all required fields are filled out properly before parsing
        if (firstName === "" || lastName === "" || firstTimer === null) {
            responseMessage.textContent = "*** Please complete all fields ***";
            responseMessage.style.color = "red";
            return;
        }

        // Prevent duplicate attendance check-ins within the same calendar day
        let existingRecord = attendanceInfos.find((record) => 
            record.firstName && record.firstName.toLowerCase() === firstName.toLowerCase() && 
            record.lastName && record.lastName.toLowerCase() === lastName.toLowerCase() && 
            record.date === today
        );

        if (existingRecord) {
            localStorage.setItem("attendanceMessage", "You have already checked in today.");
            window.location.href = "attendance-result.html";
            return;
        }

        // Bundle data payload package (supplying fallback values for missing branch states)
        let attendanceInfo = {
            firstName: firstName,
            lastName: lastName,
            firstTimer: firstTimer.value,
            branch: localStorage.getItem("selectedBranch") || "General", 
            date: today
        };

        // Fire post request payload down API pipeline
        fetch("https://flc-attendance-tracker.onrender.com/attendance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(attendanceInfo)
        })
        .then(response => {
            if (!response.ok) throw new Error("Network request database sync error.");
            return response.json();
        })
        .then(() => {
            localStorage.setItem("attendanceMessage", `Welcome ${firstName}!`);
            window.location.href = "attendance-result.html";
        })
        .catch(error => {
            console.error("Submission failed:", error);
            responseMessage.textContent = "Failed to log check-in. Please try again.";
            responseMessage.style.color = "red";
        });
    });

    // Mobile navigation panel toggle behavior
    if (menuBtn && mobileNav) {
        menuBtn.addEventListener("click", () => {
            mobileNav.classList.toggle("show");
        });
    }
});