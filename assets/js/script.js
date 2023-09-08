/*
 * ---------------------- Nav Bar Functionality (Desktop) 
*/

// Function for getting active link ID
function getActiveLinkId() {
    let activeLinkId = null;
    if (window.scrollY <= 80) {
        activeLinkId = links[0].getAttribute('href').substring(1);
    } else if (window.scrollY >= document.getElementById('contact').offsetTop - 2 * (window.innerHeight / 3)) {
        activeLinkId = links[links.length - 1].getAttribute('href').substring(1);
    } else {
        links.forEach(link => {
            const linkTargetId = link.getAttribute('href').substring(1);
            const linkSection = document.getElementById(linkTargetId);
            const linkPosition = linkSection.offsetTop;
            const linkBottomPosition = linkPosition + linkSection.offsetHeight;
            if (window.scrollY >= linkPosition - 2 * (window.innerHeight / 7) && window.scrollY < linkBottomPosition) {
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

let contactClicks = 0;

// Function to handle smooth scrolling when a link is clicked
function scrollToSection(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Get the target section's ID from the href attribute of the clicked link
    const targetId = this.getAttribute('href').substring(1); // Remove the '#' symbol

    // Find the target section by its ID
    const targetSection = document.getElementById(targetId);

    if (targetId == 'hero') {
        window.scrollTo({top: 0});
    } else if (targetId == 'contact') {
        window.scrollTo({top: document.getElementById(targetId).offsetTop});
        if (contactClicks === 0) {
            contactClicks++;
            setTimeout( function() {
                window.scrollTo({top: document.getElementById(targetId).offsetTop});
            }, 200);
        }
    } else if (targetSection) {
        // Calculate the position to scroll to
        const targetPosition = targetSection.offsetTop - 80;

        // Scroll to section
        window.scrollTo({
            top: targetPosition
        });
    }
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

// Get menu button
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu')

// Function for controlling mobile menu
function toggleMobileMenu(event) {
    event.preventDefault(); // Stop redirect

    // Stop scrolling animation
    window.removeEventListener('scroll', updateNavScroll);
    navElement.classList.remove('scroll');

    // Close or open the menu
    if (mobileMenu.style.display === 'block') {
        mobileToggle.textContent = '≡';
        mobileMenu.style.display = 'none';
        updateNavScroll();
        window.addEventListener('scroll', updateNavScroll);
    } else {
        setTimeout(function() {
            mobileToggle.textContent = '✕';
            mobileMenu.style.display = 'block';    
        }, 80)
    }
    navElement.style.transition = '0.3s';
}

// Function to close mobile menu when clicking outside the menu
function closeMobileMenuOnClickOutside(event) {
    if (
        mobileMenu.style.display === 'block' &&
        !mobileMenu.contains(event.target) &&
        event.target !== mobileToggle
    ) {
        mobileToggle.textContent = '≡';
        mobileMenu.style.display = 'none';
        updateNavScroll();
        window.addEventListener('scroll', updateNavScroll);
    }
}

// Add event listener to the document to detect clicks outside the menu
document.addEventListener('click', closeMobileMenuOnClickOutside);

// Function to close mobile menu when scrolling occurs
function closeMobileMenuOnScroll() {
    if (mobileMenu.style.display === 'block') {
        setTimeout(function () { 
            mobileToggle.textContent = '≡';
            mobileMenu.style.display = 'none';
            updateNavScroll();
            window.addEventListener('scroll', updateNavScroll);
        }, 560);
    }
}

// Event listener for window scroll
window.addEventListener('scroll', closeMobileMenuOnScroll);

// Add eventlistener to mobile menu button
mobileToggle.addEventListener('click', toggleMobileMenu);

// Function to remove mobile menu on resize
function menuResizeDetection() {
    if (mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
        navElement.style.transition = '0.3s';
        updateNavScroll();
        window.addEventListener('scroll', updateNavScroll);
    }
}

// Event listener for window resize
window.addEventListener('resize', menuResizeDetection);

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
const closeButton = document.getElementById('close-popup');

// Get socials button
const socialsTrigger = document.getElementById('socials-button');

// Function for opening popup
function openPopup() {
    popup.classList.add('popup');
    popup.classList.remove('popup-closed');
    closeButton.addEventListener('click', closePopup);
}

// Function to close the popup
function closePopup(event) {
    if ((popup.classList.contains('popup') &&
        !popup.contains(event.target) &&
        event.target !== socialsTrigger) ||
        event.target === closeButton
    ) {
        popup.classList.add('popup-closed');
        popup.classList.remove('popup');
    }
}

// Event listeners to open and close
socialsTrigger.addEventListener('click', openPopup);
document.addEventListener('click', closePopup)
