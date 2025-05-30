document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Portfolio items scroll animation
    const projectItems = document.querySelectorAll('.project-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    projectItems.forEach(item => {
        observer.observe(item);
    });

    // Service content scroll animation
    const serviceContents = document.querySelectorAll('.service-content');
    
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                serviceObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    });

    serviceContents.forEach(content => {
        serviceObserver.observe(content);
    });

    // Prostor services animation
    const prostorServiceItems = document.querySelectorAll('.prostor-services .service-item');

    if (prostorServiceItems.length > 0) {
        const prostorObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    prostorObserver.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        });

        prostorServiceItems.forEach(item => {
            prostorObserver.observe(item);
        });
    }

    // Dual images animation
    const dualImagesContainer = document.querySelector('.image-container');
    if (dualImagesContainer) {
        const dualImagesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    dualImagesObserver.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        });

        dualImagesObserver.observe(dualImagesContainer);
    }

    // Why Us section animation
    const whyUsSection = document.querySelector('.why-us');
    if (whyUsSection) {
        const whyUsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    whyUsObserver.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        });

        whyUsObserver.observe(whyUsSection);
    }
});

// Handle form validation
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const errorElement = document.getElementById('formError');
    
    // Check if required fields are empty
    if (!name || !email || !message) {
        errorElement.textContent = 'Molim Vas popunite sva polja.';
        errorElement.classList.add('show');
        return;
    }
    
    // If all required fields are filled, remove error message
    errorElement.textContent = '';
    errorElement.classList.remove('show');
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
});

// Page transition handling
document.addEventListener('DOMContentLoaded', () => {
    // Add fade out effect before page unload
    document.querySelectorAll('a').forEach(link => {
        // Only handle internal links
        if (link.href.startsWith(window.location.origin)) {
            link.addEventListener('click', e => {
                // Don't handle hash links
                if (link.hash) return;
                
                e.preventDefault();
                document.body.style.opacity = '0';
                document.body.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            });
        }
    });
});

// Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.hero-image .slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds

    function nextSlide() {
        // Remove previous class from all slides
        slides.forEach(slide => slide.classList.remove('previous'));
        
        // Add previous class to current slide
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('previous');
        
        // Update current slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Activate next slide
        slides[currentSlide].classList.remove('previous');
        slides[currentSlide].classList.add('active');
    }

    // Start the slideshow
    setInterval(nextSlide, slideInterval);
}

// Initialize slideshow when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSlideshow();
    // ... existing code ...
});
