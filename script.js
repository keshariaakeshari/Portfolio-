
        // Mobile menu toggle
        document.getElementById('menu-btn').addEventListener('click', function() {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', function() {
                document.getElementById('mobile-menu').classList.add('hidden');
            });
        });
        
        // Form validation and submission
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error states
            resetFormErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            let isValid = true;
            
            if (!name) {
                showError('name', 'Please enter your name');
                isValid = false;
            }
            
            if (!email) {
                showError('email', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!subject) {
                showError('subject', 'Please enter a subject');
                isValid = false;
            }
            
            if (!message) {
                showError('message', 'Please enter your message');
                isValid = false;
            }
            
            if (!isValid) {
                return;
            }
            
            // Show loading state
            const submitBtn = document.querySelector('#contact-form button[type="submit"]');
            const submitText = document.getElementById('submit-text');
            const submitSpinner = document.getElementById('submit-spinner');
            
            submitText.textContent = 'Sending...';
            submitSpinner.classList.remove('hidden');
            submitBtn.disabled = true;
            
            // Simulate form submission (in a real app, you would use fetch or axios here)
            setTimeout(() => {
                // Hide loading state
                submitText.textContent = 'Send Message';
                submitSpinner.classList.add('hidden');
                submitBtn.disabled = false;
                
                // Show success message
                document.getElementById('success-message').style.display = 'block';
                
                // Reset form
                this.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    document.getElementById('success-message').style.display = 'none';
                }, 5000);
                
                console.log('Form submitted:', {name, email, subject, message});
            }, 1500);
        });
        
        // Helper functions for form validation
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(`${fieldId}-error`);
            
            field.classList.add('form-error');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        function resetFormErrors() {
            const errorMessages = document.querySelectorAll('.error-message');
            const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
            
            errorMessages.forEach(el => {
                el.style.display = 'none';
            });
            
            formInputs.forEach(input => {
                input.classList.remove('form-error');
            });
        }
        
        // Add active class to navigation links based on scroll position
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 300) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Intersection Observer for animations
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });