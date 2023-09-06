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

        // Smoothly scroll to the target position
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
