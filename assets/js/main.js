// Main JavaScript for Voiro Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // Change icon based on menu state
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // FAQ Toggle Functionality
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle answer visibility
            answer.classList.toggle('hidden');
            
            // Toggle icon
            if (answer.classList.contains('hidden')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
    
    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            const consent = document.getElementById('consent').checked;
            
            let isValid = true;
            let errorMessage = '';
            
            // Validation checks
            if (!name) {
                isValid = false;
                errorMessage += 'Please enter your name.\n';
            }
            
            if (!email || !isValidEmail(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }
            
            if (!phone) {
                isValid = false;
                errorMessage += 'Please enter your phone number.\n';
            }
            
            if (!service) {
                isValid = false;
                errorMessage += 'Please select a service you\'re interested in.\n';
            }
            
            if (!message) {
                isValid = false;
                errorMessage += 'Please enter your message.\n';
            }
            
            if (!consent) {
                isValid = false;
                errorMessage += 'Please agree to receive communications.\n';
            }
            
            if (!isValid) {
                alert('Please fix the following errors:\n\n' + errorMessage);
                return;
            }
            
            // Show success modal
            showSuccessModal();
            
            // In a real application, you would send the form data to a server here
            // For demo purposes, we'll just log the data
            console.log('Form submitted:', {
                name: name,
                email: email,
                phone: phone,
                company: document.getElementById('company').value.trim(),
                service: service,
                message: message
            });
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Success Modal Functionality
    const successModal = document.getElementById('success-modal');
    const closeModalButton = document.getElementById('close-modal');
    
    if (successModal && closeModalButton) {
        closeModalButton.addEventListener('click', function() {
            successModal.classList.add('hidden');
        });
        
        // Close modal when clicking outside
        successModal.addEventListener('click', function(event) {
            if (event.target === successModal) {
                successModal.classList.add('hidden');
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && !successModal.classList.contains('hidden')) {
                successModal.classList.add('hidden');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage) {
        document.querySelectorAll('nav a').forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('text-blue-900', 'font-semibold');
            }
        });
    }
    
    // Helper Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showSuccessModal() {
        const successModal = document.getElementById('success-modal');
        if (successModal) {
            successModal.classList.remove('hidden');
        }
    }
    
    // Initialize any other components
    initDropdowns();
});

// Dropdown menu functionality for desktop and mobile navigation
function initDropdowns() {
    // Mobile submenu toggle functionality
    const mobileSubmenuToggles = document.querySelectorAll('#mobile-menu .py-2.border-b > .font-medium');
    
    mobileSubmenuToggles.forEach(toggle => {
        // Make it clickable
        toggle.style.cursor = 'pointer';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('role', 'button');
        toggle.setAttribute('tabindex', '0');
        
        // Add chevron icon if not present
        if (!toggle.querySelector('i')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-chevron-down ml-2 text-sm';
            toggle.appendChild(icon);
        }
        
        // Get the submenu (next sibling element)
        const submenu = toggle.nextElementSibling;
        if (submenu && (submenu.classList.contains('pl-4') || submenu.querySelector('a'))) {
            // Initially hide submenu on mobile
            submenu.classList.add('hidden');
            
            toggle.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                
                // Toggle submenu visibility
                submenu.classList.toggle('hidden');
                
                // Update icon
                const icon = this.querySelector('i');
                if (icon) {
                    if (isExpanded) {
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    } else {
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    }
                }
            });
            
            // Keyboard support
            toggle.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.click();
                }
                if (event.key === 'Escape' && this.getAttribute('aria-expanded') === 'true') {
                    this.click();
                }
            });
        }
    });
    
    // Desktop dropdown keyboard navigation and accessibility
    const dropdownButtons = document.querySelectorAll('nav .relative.group > button');
    
    dropdownButtons.forEach(button => {
        button.setAttribute('aria-haspopup', 'true');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('tabindex', '0');
        
        const dropdown = button.nextElementSibling;
        if (dropdown && dropdown.classList.contains('absolute')) {
            // Add role and accessibility attributes to dropdown
            dropdown.setAttribute('role', 'menu');
            dropdown.setAttribute('aria-labelledby', button.id || `dropdown-button-${Math.random().toString(36).substr(2, 9)}`);
            
            // Add IDs to dropdown links for better accessibility
            const dropdownLinks = dropdown.querySelectorAll('a');
            dropdownLinks.forEach((link, index) => {
                if (!link.id) {
                    link.id = `dropdown-link-${index}-${Math.random().toString(36).substr(2, 5)}`;
                }
                link.setAttribute('role', 'menuitem');
                link.setAttribute('tabindex', '-1');
            });
            
            // Toggle dropdown on button click (for touch devices)
            button.addEventListener('click', function(event) {
                event.stopPropagation();
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                dropdown.classList.toggle('force-open');
            });
            
            // Keyboard navigation
            button.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
                    event.preventDefault();
                    this.setAttribute('aria-expanded', 'true');
                    dropdown.classList.add('force-open');
                    
                    // Focus first dropdown item
                    const firstLink = dropdown.querySelector('a');
                    if (firstLink) {
                        firstLink.focus();
                    }
                }
                if (event.key === 'Escape' && this.getAttribute('aria-expanded') === 'true') {
                    dropdown.classList.remove('force-open');
                    this.setAttribute('aria-expanded', 'false');
                    this.focus();
                }
            });
            
            // Keyboard navigation within dropdown
            dropdown.addEventListener('keydown', function(event) {
                const links = Array.from(this.querySelectorAll('a'));
                const currentIndex = links.findIndex(link => link === document.activeElement);
                
                if (event.key === 'Escape') {
                    dropdown.classList.remove('force-open');
                    button.setAttribute('aria-expanded', 'false');
                    button.focus();
                } else if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    const nextIndex = (currentIndex + 1) % links.length;
                    links[nextIndex].focus();
                } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    const prevIndex = (currentIndex - 1 + links.length) % links.length;
                    links[prevIndex].focus();
                } else if (event.key === 'Tab' && !event.shiftKey) {
                    // Close dropdown on Tab out
                    if (currentIndex === links.length - 1) {
                        dropdown.classList.remove('force-open');
                        button.setAttribute('aria-expanded', 'false');
                    }
                } else if (event.key === 'Tab' && event.shiftKey) {
                    // Close dropdown on Shift+Tab out from first item
                    if (currentIndex === 0) {
                        dropdown.classList.remove('force-open');
                        button.setAttribute('aria-expanded', 'false');
                        button.focus();
                        event.preventDefault();
                    }
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(event) {
                if (!button.contains(event.target) && !dropdown.contains(event.target)) {
                    dropdown.classList.remove('force-open');
                    button.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Close dropdown when focus leaves
            dropdown.addEventListener('focusout', function(event) {
                setTimeout(() => {
                    if (!dropdown.contains(document.activeElement) && !button.contains(document.activeElement)) {
                        dropdown.classList.remove('force-open');
                        button.setAttribute('aria-expanded', 'false');
                    }
                }, 10);
            });
        }
    });
    
    // Add CSS for force-open class to override Tailwind's hidden class
    if (!document.querySelector('#dropdown-force-open-style')) {
        const style = document.createElement('style');
        style.id = 'dropdown-force-open-style';
        style.textContent = `
            .force-open {
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                transform: translateY(0) !important;
            }
            .force-open + .force-open {
                display: block !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Add some basic animations on scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Add shadow to header on scroll
    const header = document.querySelector('header');
    if (header) {
        if (scrollPosition > 10) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    }
});