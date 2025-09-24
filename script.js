document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (your existing hamburger menu and smooth scroll code) ...

    // Animation for Client Logos on Scroll
    const clientSection = document.querySelector('#clients');
    const clientLogos = document.querySelectorAll('.client-logo-item');

    const observerOptions = {
        root: null, // use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5 // trigger when 50% of the section is visible
    };

    const clientObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                clientLogos.forEach((logo, index) => {
                    // Add the 'animated' class to trigger the CSS animation
                    logo.classList.add('animated');
                });
                // Stop observing after the animation has been triggered once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (clientSection) {
        clientObserver.observe(clientSection);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (Your existing hamburger menu and smooth scroll code) ...

    // Video Gallery Thumbnail Behavior
    const videos = document.querySelectorAll('#videos video');

    videos.forEach(video => {
        // Event listener for when the video metadata has loaded
        video.addEventListener('loadedmetadata', () => {
            // Set the video's current time to 0.1 seconds
            video.currentTime = 0.1;
        });

        // Event listener for when the video has jumped to the desired time
        video.addEventListener('seeked', () => {
            // Immediately pause the video to show the thumbnail
            video.pause();
        });
    });

    // ... (Your existing scroll animation code) ...
});