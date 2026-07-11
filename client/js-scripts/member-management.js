// Member table
const memberBody = document.getElementById("member-body");

// Add Member modal elements
const addMemberButton = document.getElementById("add-member-btn");
const addMemberModal = document.getElementById("add-member-modal");
const cancelAddMember = document.getElementById("cancel-add-member");
const saveMember = document.getElementById("save-member");

// Add Member form fields
const memberFirstName = document.getElementById("member-first-name");
const memberLastName = document.getElementById("member-last-name");
const memberBranch = document.getElementById("member-branch");
const memberPhone = document.getElementById("member-phone");
const memberEmail = document.getElementById("member-email");
const memberDob = document.getElementById("member-dob");

// Edit Member modal elements
const editMemberModal = document.getElementById("edit-member-modal");
const editFirstName = document.getElementById("edit-first-name");
const editLastName = document.getElementById("edit-last-name");
const editBranch = document.getElementById("edit-branch");
const editPhone = document.getElementById("edit-phone");
const editEmail = document.getElementById("edit-email");
const editDob = document.getElementById("edit-dob");
const saveEditMember = document.getElementById("save-edit-member");
const cancelEditMember = document.getElementById("cancel-edit-member");

let currentEditIndex = null;

// Delete Member modal elements
const deleteMemberModal = document.getElementById("delete-member-modal");
const deleteMemberMessage = document.getElementById("delete-member-message");
const cancelDeleteMember = document.getElementById("cancel-delete-member");
const confirmDeleteMember = document.getElementById("confirm-delete-member");

let currentDeleteIndex = null;

// Search bar and Stats
const memberSearch = document.getElementById("member-search");
const totalMembers = document.getElementById("total-members");
const gsuMembers = document.getElementById("gsu-members");
const gtechMembers = document.getElementById("gtech-members");
const backButton = document.getElementById("back-btn");

// View Profile modal elements
const profileModal = document.getElementById("profile-modal");
const profileName = document.getElementById("profile-name");
const profileContent = document.getElementById("profile-content");
const closeProfile = document.getElementById("close-profile");

// Attendance Trend modal elements
const trendModal = document.getElementById("trend-modal");
const trendName = document.getElementById("trend-name");
const trendContent = document.getElementById("trend-content");
const closeTrend = document.getElementById("close-trend");

let memberProfiles = [];
let trackedDisplayList = []; // Track exactly what is shown on screen to prevent index mismatch

async function loadMembers() {
    try {
        const response = await fetch("http://localhost:5000/members");
        memberProfiles = await response.json();
        displayMembers(memberProfiles);
        updateStats();
    } catch (error) {
        console.error("Failed to fetch members:", error);
    }
}

// Display all member profiles in the table
function displayMembers(members) {
    memberBody.innerHTML = "";
    trackedDisplayList = members; // Align current actions to the filtered list

    if (totalMembers) totalMembers.textContent = members.length;

    members.forEach((member, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.firstName || ''}</td>
            <td>${member.lastName || ''}</td>
            <td><span class="branch-badge">${member.branch || ''}</span></td>
            <td>
                <button class="view-btn" onclick="viewProfile(${index})">View</button>
                <button class="edit-btn" onclick="editMember(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteMember(${index})">Delete</button>
                <button class="trend-btn" onclick="viewTrend(${index})">Trend</button>
            </td>`;
        memberBody.appendChild(row);
    });
}

// Update the statistics cards
function updateStats() {
    if (totalMembers) totalMembers.textContent = memberProfiles.length;
    
    if (gsuMembers) {
        gsuMembers.textContent = memberProfiles.filter(m => m.branch?.trim().toLowerCase() === "gsu").length;
    }
    if (gtechMembers) {
        gtechMembers.textContent = memberProfiles.filter(m => m.branch?.trim().toLowerCase() === "georgia tech").length;
    }
}

// Filter the member table safely with optional chaining
memberSearch.addEventListener("input", () => {
    let searchText = memberSearch.value.toLowerCase();
    let filteredMembers = memberProfiles.filter(member => 
        (member.firstName?.toLowerCase().includes(searchText)) || 
        (member.lastName?.toLowerCase().includes(searchText)) || 
        (member.branch?.toLowerCase().includes(searchText))
    );
    displayMembers(filteredMembers);
});

// Navigation
backButton.addEventListener("click", () => {
    window.location.href = "administration-dashboard.html";
});

// Modal Displays (pulling safely from trackedDisplayList)
function viewProfile(index) {
    let member = trackedDisplayList[index];
    profileName.textContent = `${member.firstName} ${member.lastName}`;
    profileContent.innerHTML = `
        <p><strong>Branch:</strong> ${member.branch || ''}</p>
        <p><strong>Phone:</strong> ${member.phoneNumber || ''}</p>
        <p><strong>Email:</strong> ${member.email || ''}</p>
        <p><strong>Date of Birth:</strong> ${member.dateOfBirth || ''}</p>`;
    profileModal.style.display = "flex";
}

function editMember(index) {
    let member = trackedDisplayList[index];
    currentEditIndex = memberProfiles.findIndex(m => m.id === member.id); // Map back to actual core index
    
    editFirstName.value = member.firstName || '';
    editLastName.value = member.lastName || '';
    editBranch.value = member.branch || '';
    editPhone.value = member.phoneNumber || '';
    editEmail.value = member.email || '';
    editDob.value = member.dateOfBirth || '';

    editMemberModal.style.display = "flex";
}

function deleteMember(index) {
    let member = trackedDisplayList[index];
    currentDeleteIndex = memberProfiles.findIndex(m => m.id === member.id); 
    
    deleteMemberMessage.textContent = `Delete ${member.firstName} ${member.lastName}?`;
    deleteMemberModal.style.display = "flex";
}

function viewTrend(index) {
    let member = trackedDisplayList[index];
    let attendanceInfos = JSON.parse(localStorage.getItem("attendanceInfos")) || [];

    let records = attendanceInfos.filter(record => 
        record.firstName?.toLowerCase() === member.firstName?.toLowerCase() && 
        record.lastName?.toLowerCase() === member.lastName?.toLowerCase()
    );

    trendName.textContent = `${member.firstName} ${member.lastName}`;

    if (records.length === 0) {
        trendContent.innerHTML = `<p>No attendance records found.</p>`;
        trendModal.style.display = "flex";
        return;
    }

    records.sort((a, b) => new Date(b.date) - new Date(a.date));
    let lastSeen = records[0].date;
    let allServiceDates = [...new Set(attendanceInfos.map(record => record.date))];

    let servicesHeld = allServiceDates.length;
    let servicesAttended = records.length;
    let servicesMissed = servicesHeld - servicesAttended;
    let attendanceRate = Math.round((servicesAttended / servicesHeld) * 100);

    trendContent.innerHTML = `
        <p><strong>Last Seen:</strong> ${lastSeen}</p>
        <p><strong>Services Attended:</strong> ${servicesAttended}</p>
        <p><strong>Services Missed:</strong> ${servicesMissed}</p>
        <p><strong>Attendance Rate:</strong> ${attendanceRate}%</p>`;

    trendModal.style.display = "flex";
}

// Modal closing logic
closeProfile.addEventListener("click", () => profileModal.style.display = "none");
closeTrend.addEventListener("click", () => trendModal.style.display = "none");
cancelEditMember.addEventListener("click", () => editMemberModal.style.display = "none");
cancelDeleteMember.addEventListener("click", () => deleteMemberModal.style.display = "none");
cancelAddMember.addEventListener("click", () => addMemberModal.style.display = "none");

// Save Edited Member
saveEditMember.addEventListener("click", async () => {
    let member = memberProfiles[currentEditIndex];

    member.firstName = editFirstName.value;
    member.lastName = editLastName.value;
    member.branch = editBranch.value;
    member.phoneNumber = editPhone.value;
    member.email = editEmail.value;
    member.dateOfBirth = editDob.value;

    await fetch(`http://localhost:5000/members/${member.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(member)
    });

    loadMembers();
    editMemberModal.style.display = "none";
});

// Delete Member
confirmDeleteMember.addEventListener("click", async () => {
    const member = memberProfiles[currentDeleteIndex];

    await fetch(`http://localhost:5000/members/${member.id}`, {
        method: "DELETE"
    });

    loadMembers();
    deleteMemberModal.style.display = "none";
});

// Add Member
addMemberButton.addEventListener("click", () => addMemberModal.style.display = "flex");

saveMember.addEventListener("click", () => {
    let member = {
        firstName: memberFirstName.value,
        lastName: memberLastName.value,
        branch: memberBranch.value,
        phoneNumber: memberPhone.value,
        email: memberEmail.value,
        dateOfBirth: memberDob.value
    };
    
    fetch("http://localhost:5000/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(member)
    })
    .then(response => response.json())
    .then(() => {
        loadMembers();
        addMemberModal.style.display = "none";
        // Reset form inputs
        [memberFirstName, memberLastName, memberBranch, memberPhone, memberEmail, memberDob].forEach(i => i.value = "");
    });
});

// Explicitly bind click handlers to the global scope to secure inline HTML onclick performance
window.viewProfile = viewProfile;
window.editMember = editMember;
window.deleteMember = deleteMember;
window.viewTrend = viewTrend;

// Initial execution
loadMembers();