// --- Smooth Scroll Logic ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Correctly calculates the scroll position based on the new fixed header height
        const headerHeight = document.querySelector('.header').offsetHeight || 80;

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation (Hamburger Menu) Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a menu item
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                // Delay closing the menu for external links or if it's already closed
                if (mainMenu.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    mainMenu.classList.remove('active');
                }
            });
        });
    }


    // 2. Video Gallery Thumbnail Behavior (Preview at 0.1s)
    const videos = document.querySelectorAll('#videos video');

    videos.forEach(video => {
        // Mute the video for better compatibility with this method, if not already done in HTML
        video.muted = true;
        
        // When video metadata is loaded, jump to 0.1s
        video.addEventListener('loadedmetadata', () => {
            video.currentTime = 0.1;
        });

        // Once the video has jumped (seeked), pause it to display the frame
        video.addEventListener('seeked', () => {
            video.pause();
        });
    });


    // 3. Image Modal/Lightbox Functionality (NEW)
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".close-btn");
    
    // Function to open the modal
    document.querySelectorAll(".gallery-trigger").forEach(img => {
        img.onclick = function(){
            modal.style.display = "flex"; // Changed to flex to center the content
            modalImg.src = this.src;
            
            // This line still sets the text, but the CSS keeps it hidden.
            let captionSource = this.closest('.product-card')?.querySelector('h3')?.textContent || this.alt;

            captionText.textContent = captionSource;
            // captionText.style.opacity = '1'; <-- REMOVED THIS LINE
        }
    });

    // Function to close the modal
    closeBtn.onclick = function() { 
        modal.style.display = "none";
    }

    // Close the modal if the user clicks anywhere outside of the image (on the dark background)
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // Close the modal with the Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            modal.style.display = "none";
        }
    });

});
// 5. Product Card Slider Functionality (New)
    const productSliders = document.querySelectorAll('.product-slider');

    productSliders.forEach(slider => {
        const slidesContainer = slider.querySelector('.slides-container');
        const slides = slider.querySelectorAll('.slide-image');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        const totalSlides = slides.length;

        // Function to update the slide view
        const updateSlide = (index) => {
            // Update the data-card-index attribute
            slider.setAttribute('data-card-index', index); 
            // Calculate the required horizontal movement
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        };

        // Attach listeners to buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the click from triggering the modal/lightbox
                let currentIndex = parseInt(slider.getAttribute('data-card-index'));
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateSlide(currentIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the click from triggering the modal/lightbox
                let currentIndex = parseInt(slider.getAttribute('data-card-index'));
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlide(currentIndex);
            });
        }
    });