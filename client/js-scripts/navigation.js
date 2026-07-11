
// Get the mobile menu button
const menuBtn = document.getElementById("menu-btn");

// Get the mobile navigation menu
const mobileNav = document.getElementById("mobile-nav");

// Show or hide the mobile navigation menu
menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("show");}
);