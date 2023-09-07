/*
 * ---------------------- Nav Bar Functionality (Desktop) 
*/

// TODO: Make this track with scrolling

// Function for getting active link ID
function getActiveLinkId() {
    let activeLinkId = null;
    if (window.scrollY <= 80) {
        activeLinkId = links[0].getAttribute('href').substring(1);
    } else if (window.scrollY === document.documentElement.scrollHeight) {
        activeLinkId = links[links.length].getAttribute('href').substring(1);
    } else {
        links.forEach(link => {
            const linkTargetId = link.getAttribute('href').substring(1);
            const linkSection = document.getElementById(linkTargetId);
            const linkPosition = linkSection.offsetTop;
            const linkBottomPosition = linkPosition + linkSection.offsetHeight;
            if (window.scrollY >= linkPosition - 80 && window.scrollY < linkBottomPosition) {
                activeLinkId = linkTargetId;
            }
        });
    }
    return activeLinkId;
}

// Function to update the "active" class for menu items based on scroll position
function updateMenuActiveState(targetId) {
    links.forEach(link => {
        const linkTargetId = link.getAttribute('href').substring(1);
        if (targetId !== linkTargetId) {
            link.classList.remove('active');
        } else {
            link.classList.add('active');
        }
    });
}

// Function to handle smooth scrolling when a link is clicked
function scrollToSection(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Get the target section's ID from the href attribute of the clicked link
    const targetId = this.getAttribute('href').substring(1); // Remove the '#' symbol

    // Find the target section by its ID
    const targetSection = document.getElementById(targetId);

    if (targetId == 'hero') {
        window.scrollTo({top: 0});
    } else {
        
    }
    if (targetSection) {
        // Calculate the position to scroll to
        const targetPosition = targetSection.offsetTop - 80;

        // Scroll to section
        window.scrollTo({
            top: targetPosition
        });
    }

    updateMenuActiveState(targetId);
}

// Attach the scrollToSection function to all links with class "scroll-link"
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
    link.addEventListener('click', scrollToSection);
});

// Attach an event listener to update the "active" class on scroll
window.addEventListener('scroll', function() {
    const activeLinkId = getActiveLinkId();
    updateMenuActiveState(activeLinkId);
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
