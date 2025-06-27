
// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Open mobile menu
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.remove('-translate-x-full');
        menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.add('-translate-x-full');
        menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    closeMenu.addEventListener('click', closeMobileMenu);
    menuOverlay.addEventListener('click', closeMobileMenu);

    // Close menu when clicking on navigation links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
});


// Contact Form and Phone Click Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            // Convert FormData to object
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate required fields
            if (!formObject.name || !formObject.email || !formObject.subject || !formObject.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formObject.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Opening SMS...';
            submitButton.disabled = true;
            
            // Send form data via SMS
            sendFormAsSMS(formObject)
                .then(() => {
                    // Show success message
                    successMessage.classList.remove('hidden');
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                    }, 5000);
                })
                .catch((error) => {
                    console.error('Error opening SMS app:', error);
                    alert('Sorry, there was an error opening the SMS app. Please try calling us directly at +254745542542');
                })
                .finally(() => {
                    // Reset button state
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
        });
    }
    
    // Make phone numbers clickable
    makePhoneNumbersClickable();
});

// Function to send SMS with form details
async function sendFormAsSMS(formData) {
    // Create the SMS message body with all form details
    const smsBody = `Subject: ${formData.subject}\n\n` +
                   `Name: ${formData.name}\n` +
                   `Email: ${formData.email}\n` +
                   `Phone: ${formData.phone || 'Not provided'}\n\n` +
                   `Message:\n${formData.message}`;
    
    // Company phone number to send SMS to
    const companyPhone = '+254745542542'; // Primary company number
    
    // Create SMS URL
    const smsUrl = `sms:${companyPhone}?body=${encodeURIComponent(smsBody)}`;
    
    try {
        // Open SMS app with pre-filled message
        window.location.href = smsUrl;
        return Promise.resolve();
    } catch (error) {
        console.error('Error opening SMS app:', error);
        throw error;
    }
}

// Function to make phone numbers clickable
function makePhoneNumbersClickable() {
    // Find all phone number elements and make them clickable
    const phoneElements = document.querySelectorAll('[class*="text-gray-600"]');
    
    phoneElements.forEach(element => {
        const text = element.textContent.trim();
        
        // Check if the text matches a phone number pattern
        if (text.match(/^\+254\d{9}$/)) {
            // Make the element clickable
            element.style.cursor = 'pointer';
            element.style.textDecoration = 'underline';
            element.style.color = '#d97706'; // amber-600
            
            // Add click event to open phone app
            element.addEventListener('click', function() {
                const phoneNumber = text.replace(/\s+/g, ''); // Remove spaces
                window.location.href = `tel:${phoneNumber}`;
            });
            
            // Add hover effect
            element.addEventListener('mouseenter', function() {
                element.style.color = '#92400e'; // darker amber
            });
            
            element.addEventListener('mouseleave', function() {
                element.style.color = '#d97706'; // back to amber-600
            });
        }
    });
}

// Alternative: More specific phone number handling
function makeSpecificPhoneNumbersClickable() {
    // Target specific phone numbers by their content
    const phoneNumbers = ['+254745542542', '+254115222444'];
    
    phoneNumbers.forEach(phoneNumber => {
        // Find elements containing this phone number
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            if (element.textContent.trim() === phoneNumber && element.children.length === 0) {
                // Make clickable
                element.style.cursor = 'pointer';
                element.style.textDecoration = 'underline';
                element.style.color = '#d97706';
                element.title = `Call ${phoneNumber}`;
                
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = `tel:${phoneNumber}`;
                });
                
                // Hover effects
                element.addEventListener('mouseenter', function() {
                    element.style.color = '#92400e';
                });
                
                element.addEventListener('mouseleave', function() {
                    element.style.color = '#d97706';
                });
            }
        });
    });
}

// Button interaction handlers
document.addEventListener('DOMContentLoaded', function() {
    const viewProductsBtn = document.getElementById('viewProductsBtn');
    
    if (viewProductsBtn) {
        viewProductsBtn.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.4)';
        });
        
        viewProductsBtn.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(59, 130, 246, 0.3)';
        });
    }
});


