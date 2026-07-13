// Buttons
const addMemberButton = document.getElementById("add-member-btn");
const saveMember = document.getElementById("save-member");
const cancelMember = document.getElementById("cancel-member");

// Modal window
const memberModal = document.getElementById("member-modal");

// Table and search elements
const memberBody = document.getElementById("member-body");
const memberSearch = document.getElementById("member-search");

// Form input fields
const firstNameInput = document.getElementById("member-first-name");
const lastNameInput = document.getElementById("member-last-name");
const branchInput = document.getElementById("member-branch");
const phoneInput = document.getElementById("member-phone");
const emailInput = document.getElementById("member-email");
const dobInput = document.getElementById("member-dob");

// Retrieve saved member profiles
let memberProfiles = [];

// Display all saved members when the page loads
async function loadMembers() {
    try {
        const response = await fetch("https://flc-attendance-tracker.onrender.com/members");
        memberProfiles = await response.json();
        displayMembers(memberProfiles);
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

// Initial Load
loadMembers();

// Open the Add Member popup window safely
if (addMemberButton && memberModal) {
    addMemberButton.addEventListener("click", () => {
        memberModal.style.display = "flex";
    });
}

// Close the Add Member popup window safely
if (cancelMember && memberModal) {
    cancelMember.addEventListener("click", () => {
        memberModal.style.display = "none";
    });
}

// Save Member functionality
if (saveMember) {
    saveMember.addEventListener("click", () => {
        // Get the user's input
        let firstName = firstNameInput.value.trim();
        let lastName = lastNameInput.value.trim();
        let branch = branchInput.value.trim();
        let phone = phoneInput.value.trim();
        let email = emailInput.value.trim();
        let dob = dobInput.value;

        // Ensure all required fields are completed
        if (firstName === "" || lastName === "" || branch === "") {
            alert("Please complete all required fields.");
            return;
        }

        // Create a new member profile
        let member = {
            firstName: firstName,
            lastName: lastName,
            branch: branch,
            phoneNumber: phone,
            email: email,
            dateOfBirth: dob
        };

        fetch("https://flc-attendance-tracker.onrender.com/members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(member)
        })
        .then(response => response.json())
        .then(() => {
            loadMembers();

            // Clear inputs
            firstNameInput.value = "";
            lastNameInput.value = "";
            branchInput.value = "";
            phoneInput.value = "";
            emailInput.value = "";
            dobInput.value = "";

            if (memberModal) memberModal.style.display = "none";
        });
    });
}

function displayMembers(members) {
    if (!memberBody) return;
    
    // Clear the existing table
    memberBody.innerHTML = "";
    
    members.forEach(member => {
        // Hide sensitive information safely before displaying it
        let hiddenPhone = member.phoneNumber ? "(***) ***-" + member.phoneNumber.slice(-4) : "N/A";
        
        // Dynamic check to ensure email formatting contains '@'
        let hiddenEmail = "N/A";
        if (member.email && member.email.includes("@")) {
            const parts = member.email.split("@");
            hiddenEmail = member.email.charAt(0) + "*****@" + parts[1];
        } else if (member.email) {
            hiddenEmail = member.email.charAt(0) + "*****";
        }
        
        let hiddenDob = member.dateOfBirth ? "****" + member.dateOfBirth.slice(4) : "N/A";

        // Create a new table row
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><a href="administration.html">${member.firstName || ''}</a></td>
            <td>${member.lastName || ''}</td>
            <td>${member.branch || ''}</td>
            <td>${hiddenPhone}</td>
            <td>${hiddenEmail}</td>
            <td>${hiddenDob}</td>
        `;
        
        // Add the row to the table
        memberBody.appendChild(row);
    });
}

// Filter members safely using optional chaining (?.)
if (memberSearch) {
    memberSearch.addEventListener("input", () => {
        let searchText = memberSearch.value.toLowerCase();
        let filteredMembers = memberProfiles.filter(member => 
            member.firstName?.toLowerCase().includes(searchText) || 
            member.lastName?.toLowerCase().includes(searchText) || 
            member.branch?.toLowerCase().includes(searchText)
        );
        
        // Display matching members
        displayMembers(filteredMembers);
    });
}

// Mobile menu elements safety check
const menuBtn = document.getElementById("menu-btn");
const mobileNav = document.getElementById("mobile-nav");

if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
        mobileNav.classList.toggle("show");
    });
}