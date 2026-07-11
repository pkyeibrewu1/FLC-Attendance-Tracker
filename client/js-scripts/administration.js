// Login button and status message
const loginButton = document.getElementById("login-btn");
const loginMessage = document.getElementById("login-message");

// Verify the administrator's login credentials
loginButton.addEventListener("click", () => {
    // Get the username and password entered by the user (with whitespace trimmed)
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    
    // Administrator login credentials
    const adminUsername = "FLC Atlanta";
    const adminPassword = "1234@FLC26";
    
    // Check if the login credentials are correct
    if (username === adminUsername && password === adminPassword) {
        // Save the administrator's login status
        localStorage.setItem("adminLoggedIn", "true");
        
        // Display a successful login message
        loginMessage.textContent = "Password Correct!";
        loginMessage.style.color = "green";
        
        // Redirect to the administration dashboard after 1 second
        setTimeout(() => {
            window.location.href = "administration-dashboard.html"; 
        }, 1000);
    } else {
        // Display an error message if the login fails
        loginMessage.textContent = "Invalid username or password.";
        loginMessage.style.color = "red";
    }
});

// Get the password recovery elements
const forgotPassword = document.getElementById("forgot-password");
const forgotMessage = document.getElementById("forgot-message");

// Display password recovery instructions
forgotPassword.addEventListener("click", (event) => {
    // Prevent the anchor tag link behavior from refreshing the page
    event.preventDefault();

    // Display the password recovery message
    forgotMessage.textContent = "For password assistance, please contact the Airport Star Team.";
});

// Get the mobile menu button and navigation layout
const menuBtn = document.getElementById("menu-btn");
const mobileNav = document.getElementById("mobile-nav");

// Show or hide the navigation menu
menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
});