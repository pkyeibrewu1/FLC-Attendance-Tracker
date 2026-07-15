// Login button and status message
const loginButton = document.getElementById("login-btn");
const loginMessage = document.getElementById("login-message");

// Verify the administrator's login credentials
loginButton.addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("adminLoggedIn", "true");
            loginMessage.textContent = "Login successful!";
            loginMessage.style.color = "green";

            setTimeout(() => {
                window.location.href = "administration-dashboard.html";
            }, 1000);
        } else {
            loginMessage.textContent = data.message || "Invalid username or password.";
            loginMessage.style.color = "red";
        }
    } catch (error) {
        loginMessage.textContent = "Unable to reach the server.";
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