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

    // Gallery functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryGrid = document.querySelector('.gallery-grid');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        // Show photo-studio items by default and hide others
        galleryItems.forEach(item => {
            if (item.classList.contains('photo-studio')) {
                item.classList.add('show');
            } else {
                item.classList.remove('show');
            }
        });

        // Filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                try {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    button.classList.add('active');

                    const filterValue = button.getAttribute('data-filter');
                    console.log('Filtering gallery items for:', filterValue);

                    galleryItems.forEach(item => {
                        if (item.classList.contains(filterValue)) {
                            item.classList.add('show');
                        } else {
                            item.classList.remove('show');
                        }
                    });
                } catch (error) {
                    console.error('Error in gallery filtering:', error);
                }
            });
        });
    }

    // Gallery Slider functionality
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {  // Only run slider code if slider exists
        const slides = document.querySelectorAll('.gallery-slider .slide');
        const prevBtn = document.querySelector('.slider-nav.prev');
        const nextBtn = document.querySelector('.slider-nav.next');
        const dotsContainer = document.querySelector('.slider-dots');
        let currentSlide = 0;
        let autoSlideInterval;

        if (slides.length > 0) {
            // Create dots
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });

            // Update dots
            function updateDots() {
                document.querySelectorAll('.dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }

            // Go to specific slide
            function goToSlide(index) {
                slides[currentSlide].classList.remove('active');
                currentSlide = index;
                if (currentSlide >= slides.length) currentSlide = 0;
                if (currentSlide < 0) currentSlide = slides.length - 1;
                slides[currentSlide].classList.add('active');
                updateDots();
            }

            // Next slide
            function nextSlide() {
                goToSlide(currentSlide + 1);
            }

            // Previous slide
            function prevSlide() {
                goToSlide(currentSlide - 1);
            }

            // Add click events to navigation buttons
            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', () => {
                    prevSlide();
                    resetAutoSlide();
                });

                nextBtn.addEventListener('click', () => {
                    nextSlide();
                    resetAutoSlide();
                });
            }

            // Auto slide functionality
            function startAutoSlide() {
                autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
            }

            function resetAutoSlide() {
                clearInterval(autoSlideInterval);
                startAutoSlide();
            }

            // Start auto slide
            startAutoSlide();

            // Pause auto slide on hover
            sliderWrapper?.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            sliderWrapper?.addEventListener('mouseleave', startAutoSlide);

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                    resetAutoSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                    resetAutoSlide();
                }
            });

            // Touch support
            let touchStartX = 0;
            let touchEndX = 0;

            sliderWrapper?.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            sliderWrapper?.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                    resetAutoSlide();
                }
            }
        }
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.getElementById('formError');

    // Set the _next parameter to the current page URL
    if (contactForm) {
        const currentURL = window.location.href.split('?')[0]; // Remove any existing query parameters
        const nextInput = contactForm.querySelector('input[name="_next"]');
        if (nextInput) {
            nextInput.value = currentURL + '?submitted=true';
        }
    }

    // Check if we're returning from a form submission
    if (window.location.search.includes('submitted=true')) {
        successMessage.textContent = 'Poruka je poslata';
        successMessage.style.display = 'block';
        // Remove the query parameter from URL without refreshing
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            try {
                errorMessage.style.display = 'none';
                errorMessage.textContent = '';
            } catch (error) {
                console.error('Error in form submission:', error);
            }
        });
    }
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
    if (slides.length > 0) {  // Only initialize if slides exist
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
}

// Initialize slideshow when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSlideshow();
    // ... existing code ...
});
