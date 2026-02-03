/*========== menu icon navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');


/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

/*========== sticky navbar and active link ==========*/
window.onscroll = () => {
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                const activeLink = document.querySelector('header nav a[href*=' + id + ']');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            });
        }
    });

    /*========== remove toggle icon and navbar when click navbar link (scroll) ==========*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*========== menu icon navbar ==========*/
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*========== swiper ==========*/


/*========== dark light mode ==========*/
let darkModeIcon = document.querySelector('#darkMode-icon');

if (darkModeIcon) {
    darkModeIcon.onclick = () => {
        darkModeIcon.classList.toggle('bx-sun');
        darkModeIcon.classList.toggle('bx-moon');
        document.body.classList.toggle('dark-mode');
        
        // Save theme preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    };
    
    // Load saved theme preference (default to dark mode)
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || savedTheme === null) {
        // Default and saved dark theme
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.remove('bx-moon');
        darkModeIcon.classList.add('bx-sun');
        if (savedTheme === null) {
            localStorage.setItem('theme', 'dark');
        }
    } else {
        // Explicitly saved light theme
        document.body.classList.remove('dark-mode');
        darkModeIcon.classList.remove('bx-sun');
        darkModeIcon.classList.add('bx-moon');
    }
}



/*========== scroll reveal ==========*/
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
    reset: true
});

ScrollReveal().reveal('.heading', { origin: 'top' });
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .about-img img', { origin: 'bottom' });
ScrollReveal().reveal('.education-container .education-box, .about-content h3, .about-content p', { origin: 'left', interval: 200 });
ScrollReveal().reveal('.skills-container .skills-box', { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.projects-container .projects-box', { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.contact form', { origin: 'bottom' });

/*========== form validation & submission animation ==========*/
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    const nameInput = document.querySelector('#fullName');
    const emailInput = document.querySelector('#email');
    const phoneInput = document.querySelector('#phone');
    const subjectInput = document.querySelector('#subject');
    const messageInput = document.querySelector('#message');

    const nameError = document.querySelector('#fullName-error');
    const emailError = document.querySelector('#email-error');
    const phoneError = document.querySelector('#phone-error');
    const subjectError = document.querySelector('#subject-error');
    const messageError = document.querySelector('#message-error');

    function clearErrors() {
        nameError.textContent = '';
        emailError.textContent = '';
        phoneError.textContent = '';
        subjectError.textContent = '';
        messageError.textContent = '';
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function validatePhone(phone) {
        if (!phone) return true; // optional
        const digitsOnly = phone.replace(/\D/g, '');
        return digitsOnly.length >= 7;
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        let isValid = true;

        if (!nameInput.value.trim()) {
            nameError.textContent = 'Please enter your full name.';
            isValid = false;
        }

        if (!emailInput.value.trim()) {
            emailError.textContent = 'Please enter your email address.';
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!validatePhone(phoneInput.value.trim())) {
            phoneError.textContent = 'Please enter a valid mobile number.';
            isValid = false;
        }

        if (!subjectInput.value.trim()) {
            subjectError.textContent = 'Please enter a subject.';
            isValid = false;
        }

        if (!messageInput.value.trim()) {
            messageError.textContent = 'Please enter your message.';
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message should be at least 10 characters.';
            isValid = false;
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.value;

        submitBtn.value = 'Sending...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        // Build params object for EmailJS
        const params = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim(),
            phone: phoneInput.value.trim(),
        };

        // Send email using EmailJS
        emailjs
            .send("service_ckh103b", "template_n3r4gic", params)
            .then(() => {
                submitBtn.value = 'Message Sent!';
                submitBtn.style.background = '#4caf50';

                setTimeout(() => {
                    submitBtn.value = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            })
            .catch((error) => {
                console.error('EmailJS error:', error);
                submitBtn.value = 'Try Again';
                submitBtn.style.background = '#ff4d4f';
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            });
    });
}

/*========== smooth scroll for anchor links ==========*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const header = document.querySelector('.header');

        if (target) {
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            // Default offset so sections sit nicely below the navbar
            let offsetPosition = targetPosition - headerHeight + 10;

            // Fine‑tune About section to sit a bit closer to the navbar
            if (target.id === 'about') {
                offsetPosition = targetPosition - headerHeight;
            }

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});