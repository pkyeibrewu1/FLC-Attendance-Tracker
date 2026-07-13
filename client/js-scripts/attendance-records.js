// Delete record modal elements
const deleteModal = document.getElementById("delete-modal");
const deleteMessage = document.getElementById("delete-message");
const cancelDelete = document.getElementById("cancel-delete");
const confirmDelete = document.getElementById("confirm-delete");

// Store the absolute record ID selected for deletion instead of an array index
let recordIdToDelete = null;

// Download report button
const downloadButton = document.getElementById("download-btn");

// Filter controls
const dateFilter = document.getElementById("date-filter");
const branchFilter = document.getElementById("branch-filter");

// Edit record modal elements
const editModal = document.getElementById("edit-modal");
const editFirstName = document.getElementById("edit-first-name");
const editLastName = document.getElementById("edit-last-name");
const editBranch = document.getElementById("edit-branch");
const editFirstTimer = document.getElementById("edit-first-timer");
const saveEdit = document.getElementById("save-edit");
const cancelEdit = document.getElementById("cancel-edit");

// Store the index of the record currently being edited
let currentEditIndex = null;

// Attendance table
const attendanceBody = document.getElementById("attendance-body");

// Statistics cards
const totalAttendance = document.getElementById("total-attendance");
const firstTimers = document.getElementById("first-timers");
const returningMembers = document.getElementById("returning-members");

// Back button
const backButton = document.getElementById("back-btn");

// Set today's date as the default filter
const today = new Date().toISOString().split("T")[0];
if (dateFilter) dateFilter.value = today;

// Attendance state storage
let attendanceInfos = [];

// Retrieve attendance records from local storage API
async function loadAttendance() {
    try {
        const response = await fetch("https://flc-attendance-tracker.onrender.com/attendance");
        attendanceInfos = await response.json();
        loadBranches();
        applyFilters();
    } catch (error) {
        console.error("Error loading attendance data:", error);
    }
}

// Display records that match the selected date and branch
function applyFilters() {
    let selectedDate = dateFilter.value;
    let selectedBranch = branchFilter.value;
    let filteredRecords = attendanceInfos.filter(record => record.date === selectedDate);

    // Apply the selected branch filter if needed
    if (selectedBranch !== "all") {
        filteredRecords = filteredRecords.filter(record => record.branch === selectedBranch);
    }

    // Display the filtered records
    displayRecords(filteredRecords);
}

// Display attendance records in the table
function displayRecords(records) {
    // Clear the existing table
    attendanceBody.innerHTML = "";
    
    records.forEach((record, index) => {
        // Create a new table row
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.firstName}</td>
            <td>${record.lastName}</td>
            <td>${record.branch}</td>
            <td>${record.firstTimer === "yes" ? "Yes" : "No"}</td>
            <td>${record.date}</td>
            <td>
                <button class="edit-btn" onclick="openEditModal(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteRecord(${index})">Delete</button>
            </td>`;

        // Add the row to the table
        attendanceBody.appendChild(row);
    });
    
    // Update the attendance statistics
    updateStats(records);
}

// Update the statistics cards based on the displayed records
function updateStats(records) {
    totalAttendance.textContent = records.length;
    firstTimers.textContent = records.filter(record => record.firstTimer === "yes").length;
    returningMembers.textContent = records.filter(record => record.firstTimer === "no").length;
}

// Populate the branch filter dropdown with all available branches
function loadBranches() {
    // Preserve the default option
    branchFilter.innerHTML = '<option value="all">All Branches</option>';

    // Get a list of unique branch names
    let branches = [...new Set(attendanceInfos.map(record => record.branch).filter(branch => branch && branch.trim() !== ""))];

    // Add each branch to the dropdown menu
    branches.forEach(branch => {
        let option = document.createElement("option");
        option.value = branch;
        option.textContent = branch;
        branchFilter.appendChild(option);
    });
}

// Refresh the attendance table when filter selections alter
branchFilter.addEventListener("change", applyFilters);
dateFilter.addEventListener("change", applyFilters);

// Return to the Administration page
backButton.addEventListener("click", () => {
    window.location.href = "administration.html";
});

// Open the Edit Attendance modal (Exposed to global window)
window.openEditModal = function(index) {
    let filteredRecords = getFilteredRecords();

    // Find the selected record in the original master tracking array
    currentEditIndex = attendanceInfos.indexOf(filteredRecords[index]);
    let record = attendanceInfos[currentEditIndex];

    // Populate the edit form values
    editFirstName.value = record.firstName;
    editLastName.value = record.lastName;
    editBranch.value = record.branch;
    editFirstTimer.value = record.firstTimer;

    // Display modal view
    editModal.style.display = "flex";
};

// Close the Edit Attendance modal without saving changes
cancelEdit.addEventListener("click", () => {
    editModal.style.display = "none";
});

// Save the edited attendance record changes via API
saveEdit.addEventListener("click", async () => {
    if (currentEditIndex === null) return;
    let record = attendanceInfos[currentEditIndex];

    // Harvest changes
    record.firstName = editFirstName.value.trim();
    record.lastName = editLastName.value.trim();
    record.branch = editBranch.value;
    record.firstTimer = editFirstTimer.value;

    try {
        await fetch(`https://flc-attendance-tracker.onrender.com/attendance/${record.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(record)
        });
        loadAttendance();
        editModal.style.display = "none";
    } catch (error) {
        console.error("Failed to update record:", error);
    }
});

// Return attendance records that match the selected filters
function getFilteredRecords() {
    let selectedDate = dateFilter.value;
    let selectedBranch = branchFilter.value;
    let filteredRecords = attendanceInfos.filter(record => record.date === selectedDate);
    
    if (selectedBranch !== "all") {
        filteredRecords = filteredRecords.filter(record => record.branch === selectedBranch);
    }
    return filteredRecords;
}

// Generate and download a professional PDF attendance report
downloadButton.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let records = getFilteredRecords();
    let selectedDate = dateFilter.value;
    let selectedBranch = branchFilter.value === "all" ? "All Branches" : branchFilter.value;

    let firstTimerCount = records.filter(record => record.firstTimer === "yes").length;
    let returningCount = records.filter(record => record.firstTimer === "no").length;

    // Decorative Report Header
    doc.setFillColor(4, 22, 51);
    doc.rect(0, 0, 210, 35, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("FIRST LOVE CHURCH", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text("Attendance Report", 105, 25, { align: "center" });

    // Secondary Meta Details Section
    doc.setTextColor(0, 0, 0);
    let y = 50;
    doc.setFontSize(12);
    doc.text(`Date: ${selectedDate}`, 20, y);
    y += 8;
    doc.text(`Branch: ${selectedBranch}`, 20, y);
    y += 15;

    // Metrics Box Configuration
    doc.setFillColor(212, 175, 55);
    doc.rect(20, y - 5, 170, 25, "F");
    doc.setTextColor(4, 22, 51);
    doc.text(`Total Attendance: ${records.length}`, 25, y + 5);
    doc.text(`First Timers: ${firstTimerCount}`, 90, y + 5);
    doc.text(`Returning Members: ${returningCount}`, 140, y + 5);
    y += 35;
        
    const tableData = records.map(record => [
        record.firstName, 
        record.lastName, 
        record.branch, 
        record.firstTimer === "yes" ? "Yes" : "No"
    ]);

    // Data Table Compilation
    doc.autoTable({
        startY: y,
        head: [["First Name", "Last Name", "Branch", "First Timer"]],
        body: tableData,
        theme: "grid",
        headStyles: { fillColor: [212, 175, 55], textColor: [4, 22, 51], fontStyle: "bold" },
        styles: { fontSize: 10 }
    });

    doc.save(`Attendance-${selectedDate}.pdf`);
});

// Open the Delete Record confirmation modal securely via unique identifier reference
window.deleteRecord = function(index) {
    let filteredRecords = getFilteredRecords();
    let record = filteredRecords[index];

    // Safely cache the targeted unique string identifier database key
    recordIdToDelete = record.id;

    deleteMessage.textContent = `Are you sure you want to delete ${record.firstName} ${record.lastName}?`;
    deleteModal.style.display = "flex";
};

// Close the Delete Record modal without removing anything
cancelDelete.addEventListener("click", () => {
    deleteModal.style.display = "none";
    recordIdToDelete = null;
});

// Confirm and process data removal deletion safely target by ID
confirmDelete.addEventListener("click", async () => {
    if (!recordIdToDelete) return;

    try {
        await fetch(`https://flc-attendance-tracker.onrender.com/attendance/${recordIdToDelete}`, {
            method: "DELETE"
        });
        loadAttendance();
        deleteModal.style.display = "none";
    } catch (error) {
        console.error("Failed to delete record storage:", error);
    } finally {
        recordIdToDelete = null;
    }
});

// Execution Root Trigger Initial Load Sequence
document.addEventListener("DOMContentLoaded", loadAttendance);