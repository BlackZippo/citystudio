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

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Handle form validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
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
