// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'white';
        navbar.style.boxShadow = 'none';
    }
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    try {
        // Send form data to the backend
        const response = await fetch('https://portfolio-harshit-2.onrender.com//api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });

        // Check if the request was successful
        if (response.ok) {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset(); // Reset the form
        } else {
            // Handle server errors (e.g., validation failed)
            const errorData = await response.json();
            alert(`Error: ${errorData.error || 'Something went wrong.'}`);
        }
    } catch (error) {
        // Handle network errors
        console.error('Submission error:', error);
        alert('Could not send message. Please check your connection and try again.');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Portfolio hover effect
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.portfolio-info').style.transform = 'translateY(0)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.querySelector('.portfolio-info').style.transform = 'translateY(100%)';
    });
});