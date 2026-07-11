// Get elements
const continueButton = document.getElementById("continue-btn");
const selectedBranchMessage = document.getElementById("selected-branch-message");
const branchOptions = document.querySelectorAll('input[name="school"]');
const menuBtn = document.getElementById("menu-btn");
const mobileNav = document.getElementById("mobile-nav");

// 1. Continue button logic (with safety check)
if (continueButton) {
    continueButton.addEventListener("click", () => {
        let selectedBranch = document.querySelector('input[name="school"]:checked');
        
        if (!selectedBranch) {
            alert("Please select a branch.");
            return;
        }
        
        localStorage.setItem("selectedBranch", selectedBranch.value);
        window.location.href = "attendance.html";
    });
}

// 2. Branch selection logic (with safety check)
if (branchOptions.length > 0) {
    branchOptions.forEach((option) => {
        option.addEventListener("change", () => {
            // Remove highlight from all cards
            document.querySelectorAll(".school-option").forEach((card) => {
                card.classList.remove("selected");
            });

            // Highlight parent card
            if (option.parentElement) {
                option.parentElement.classList.add("selected");
            }

            // Update text message safely
            if (selectedBranchMessage) {
                selectedBranchMessage.textContent = "Selected Branch: " + option.value;
            }
        });
    });
}

// 3. Mobile menu logic (with safety check)
if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
        mobileNav.classList.toggle("show");
    });
}