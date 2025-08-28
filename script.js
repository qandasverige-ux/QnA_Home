// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect with blur and shadow
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Form option switching (contact vs calendar)
    const formOptions = document.querySelectorAll('.form-option');
    const contactForm = document.getElementById('contact-form');
    const calendarEmbed = document.getElementById('calendar-embed');

    formOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            formOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');

            const selectedOption = this.getAttribute('data-option');
            
            if (selectedOption === 'contact') {
                contactForm.style.display = 'block';
                calendarEmbed.style.display = 'none';
            } else {
                contactForm.style.display = 'none';
                calendarEmbed.style.display = 'block';
            }
        });
    });

    // Contact form handling with Formspree integration
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const honeypot = this.querySelector('input[name="_gotcha"]').value;

            // Honeypot validation - if filled, it's likely a bot
            if (honeypot) {
                showFormMessage('Spam detected. Please try again.', 'error');
                return;
            }

            // Validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Submit to Formspree
            const formData = new FormData(this);
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    showFormMessage('Thank you for your message! We\'ll respond within 24 hours.', 'success');
                    this.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwnProperty.call(data, 'errors')) {
                            showFormMessage(data["errors"].map(error => error["message"]).join(", "), 'error');
                        } else {
                            showFormMessage('Oops! There was a problem submitting your form', 'error');
                        }
                    });
                }
            }).catch(error => {
                showFormMessage('Oops! There was a problem submitting your form', 'error');
            }).finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Form message display function
    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        
        // Add styles
        messageEl.style.cssText = `
            margin-top: 1rem;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            font-weight: 500;
            ${type === 'success' ? 
                'background: rgba(6, 182, 212, 0.1); color: #06b6d4; border: 1px solid rgba(6, 182, 212, 0.3);' : 
                'background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);'
            }
        `;
        
        // Insert after the form
        contactForm.parentNode.insertBefore(messageEl, contactForm.nextSibling);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }


    // New Services Matrix Filtering
    const servicesFilterButtons = document.querySelectorAll('.services-filter-btn');
    const serviceCardsMatrix = document.querySelectorAll('.service-card-matrix');
    const servicesEmptyState = document.querySelector('.services-empty-state');

    function filterServicesMatrix(category) {
        let visibleCards = 0;
        const servicesMatrix = document.querySelector('.services-matrix');
        
        // Add skeleton loading
        showSkeletonLoader();
        
        setTimeout(() => {
            hideSkeletonLoader();
            
            serviceCardsMatrix.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.classList.remove('filtering-out');
                    // Stagger animations
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                    visibleCards++;
                } else {
                    card.classList.add('filtering-out');
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.remove('filtering-out');
                    }, 300);
                }
            });
            
            // Show/hide empty state
            if (visibleCards === 0) {
                servicesEmptyState.style.display = 'block';
                servicesMatrix.style.display = 'none';
            } else {
                servicesEmptyState.style.display = 'none';
                servicesMatrix.style.display = 'grid';
            }
        }, 400);
    }

    function showSkeletonLoader() {
        const servicesMatrix = document.querySelector('.services-matrix');
        servicesMatrix.innerHTML = '';
        
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'service-card-skeleton';
            skeleton.innerHTML = `
                <div class="skeleton-icon"></div>
                <div class="skeleton-text title"></div>
                <div class="skeleton-text desc"></div>
                <div class="skeleton-text desc"></div>
            `;
            servicesMatrix.appendChild(skeleton);
        }
    }

    function hideSkeletonLoader() {
        const servicesMatrix = document.querySelector('.services-matrix');
        const skeletons = servicesMatrix.querySelectorAll('.service-card-skeleton');
        skeletons.forEach(skeleton => skeleton.remove());
        
        // Restore original cards
        serviceCardsMatrix.forEach(card => {
            servicesMatrix.appendChild(card);
        });
    }

    servicesFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            servicesFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            filterServicesMatrix(filterValue);
        });

        // Keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Service CTA handlers
    const serviceCTAs = document.querySelectorAll('.service-cta');
    serviceCTAs.forEach(cta => {
        cta.addEventListener('click', function(e) {
            e.stopPropagation();
            const serviceTitle = this.closest('.service-card-matrix').querySelector('h3').textContent;
            
            if (this.textContent === 'See Example') {
                // Scroll to case studies section
                document.querySelector('#cases').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Scroll to contact form
                document.querySelector('#consultation').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card-new, .case-highlight, .timeline-step, .benefit-item, .paper-showcase');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Active section highlighting in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-section');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active-section');
            }
        });
    });

    // Add loading state for service cards
    const serviceCardsNew = document.querySelectorAll('.service-card-new');
    serviceCardsNew.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu (if implemented)
        if (e.key === 'Escape') {
            // Close any open modals or menus
        }
        
        // Enter key on form options
        if (e.key === 'Enter' && e.target.classList.contains('form-option')) {
            e.target.click();
        }
    });

});

// CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .nav-link.active-section {
        color: #06b6d4 !important;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(animationStyles);