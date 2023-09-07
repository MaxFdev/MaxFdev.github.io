/*
 * ---------------------- Nav Bar Functionality (Desktop) 
*/

// TODO: Make this track with scrolling

// Function to handle smooth scrolling when a link is clicked
function scrollToSection(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Get the target section's ID from the href attribute of the clicked link
    const targetId = this.getAttribute('href').substring(1); // Remove the '#' symbol

    // Find the target section by its ID
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
        // Calculate the position to scroll to
        const targetPosition = targetSection.offsetTop - 80;

        // Scroll to section
        window.scrollTo({
            top: targetPosition
        });
    }

    // Remove the "active" class from all links
    links.forEach(link => {
        link.classList.remove('active');
    });

    // Add the "active" class to the clicked link
    this.classList.add('active');
}

// Attach the scrollToSection function to all links with class "scroll-link"
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
    link.addEventListener('click', scrollToSection);
});

/*
 * ---------------------- Nav Bar Functionality (Mobile) 
*/

// TODO: Make mobile nav menu

/*
 * ---------------------- Nav Bar style 
*/

// Nav bar style change after scrolling
const navElement = document.querySelector('nav');

// Function for switching scroll state
function updateNavScroll() {
    if (window.scrollY > 0) {
        navElement.classList.add('scroll');
    } else {
        navElement.classList.remove('scroll');
    }
}

// Add event listener to scroll event
window.addEventListener('scroll', updateNavScroll);

/*
 * ---------------------- Socials Popup
*/

// Get popup and close button
const popup = document.getElementById('social-popup');

// Get socials button
const socialsTrigger = document.getElementById('socials-button');

// Function for opening popup
function openPopup() {
    popup.classList.add('popup');
    popup.classList.remove('popup-closed');
    const closeButton = document.getElementById('close-popup');
    closeButton.addEventListener('click', closePopup);
}

// Function to close the popup
function closePopup() {
    popup.classList.add('popup-closed');
    popup.classList.remove('popup');
}

// Event listeners to open and close
socialsTrigger.addEventListener('click', openPopup);
