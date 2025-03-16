// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Navigation highlight and mobile menu
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-links');
    const body = document.body;

    // Mobile menu toggle with improved handling
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navContainer.classList.toggle('active');
            menuToggle.classList.toggle('active');
            body.style.overflow = navContainer.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navContainer.contains(e.target) && !menuToggle.contains(e.target) && navContainer.classList.contains('active')) {
                navContainer.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navContainer.classList.contains('active')) {
                navContainer.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Mobile menu toggle with improved handling
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navContainer.classList.toggle('active');
            menuToggle.classList.toggle('active');
            body.style.overflow = navContainer.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navContainer.contains(e.target) && !menuToggle.contains(e.target) && navContainer.classList.contains('active')) {
                navContainer.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navContainer.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navContainer.classList.contains('active')) {
                navContainer.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Smooth scroll for navigation links with offset
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Active section highlight on scroll with throttle
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
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
                    if (link.getAttribute('href').slice(1) === current) {
                        link.classList.add('active');
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // Form handling with improved validation
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authContainer = document.getElementById('authContainer');

    // Show/Hide auth forms with animation
    window.showForm = (formType) => {
        authContainer.style.display = 'flex';
        authContainer.style.animation = 'fadeIn 0.3s ease-out';
        if (formType === 'login') {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
            setTimeout(() => document.getElementById('loginUsername').focus(), 300);
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
            setTimeout(() => document.getElementById('signupUsername').focus(), 300);
        }
    };

    // Close auth forms with animation
    window.closeAuthForm = () => {
        authContainer.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            authContainer.style.display = 'none';
            authContainer.style.animation = '';
        }, 300);
    };

    // Close auth forms when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === authContainer) {
            closeAuthForm();
        }
    });

    // Escape key to close auth forms
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && authContainer.style.display === 'flex') {
            closeAuthForm();
        }
    });

    // Form validation helper
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Login form submission with improved validation
    window.submitLogin = () => {
        const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
        if (!username || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (password.length < 6) {
            showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        // Add your login logic here
        showNotification('Login successful!', 'success');
        setTimeout(() => {
            closeAuthForm();
            window.location.href = 'vehicle-selection.html';
        }, 1500);
    };

    // Signup form submission with improved validation
    window.submitSignup = () => {
        const username = document.getElementById('signupUsername').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        const termsChecked = document.querySelector('#signupForm input[type="checkbox"]').checked;

        if (!username || !email || !password || !confirmPassword) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (password.length < 6) {
            showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }

        if (!termsChecked) {
            showNotification('Please accept the Terms & Conditions', 'error');
            return;
        }

        // Add your signup logic here
        showNotification('Account created successfully!', 'success');
        setTimeout(() => {
            closeAuthForm();
        window.location.href = 'vehicle-selection.html';
        }, 1500);
    };

    // Contact form submission with improved validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[name="name"]').value.trim();
            const email = contactForm.querySelector('input[name="email"]').value.trim();
            const message = contactForm.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Add your contact form submission logic here
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        });
    }

    // Newsletter form submission with improved validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value.trim();

            if (!email) {
                showNotification('Please enter your email', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Add your newsletter subscription logic here
            showNotification('Thank you for subscribing!', 'success');
            newsletterForm.reset();
        });
    }

    // Vehicle filtering functionality
    const vehicleGrid = document.querySelector('.vehicle-grid');
    const filters = {
        type: document.getElementById('vehicle-type'),
        price: document.getElementById('price-range'),
        transmission: document.getElementById('transmission'),
        availability: document.getElementById('availability')
    };

    // Vehicle data with enhanced details
    const vehicles = [
        {
            name: 'Tesla Model 3',
            type: 'sedan',
            price: 'premium',
            transmission: 'automatic',
            availability: 'available',
            pricePerDay: 120,
            image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027',
            seats: 5,
            bags: 4,
            features: ['Electric', 'Autopilot', 'Premium Sound', '0-60 in 3.1s', 'Range: 358mi'],
            description: 'Experience the future of driving with Tesla Model 3. This all-electric sedan combines luxury with sustainability.'
        },
        {
            name: 'BMW 3 Series',
            type: 'sedan',
            price: 'standard',
            transmission: 'automatic',
            availability: 'available',
            pricePerDay: 90,
            image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341',
            seats: 5,
            bags: 3,
            features: ['Sport Mode', 'Leather Seats', 'Navigation', 'Sunroof', 'Premium Audio'],
            description: 'The ultimate driving machine. BMW 3 Series offers the perfect blend of luxury, performance, and comfort.'
        },
        {
            name: 'Range Rover Sport',
            type: 'suv',
            price: 'premium',
            transmission: 'automatic',
            availability: 'available',
            pricePerDay: 150,
            image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741',
            seats: 7,
            bags: 5,
            features: ['4x4', 'Panoramic Roof', 'Premium Audio', 'Air Suspension', 'Terrain Response'],
            description: 'Luxury meets capability. The Range Rover Sport handles any terrain while keeping you in ultimate comfort.'
        },
        {
            name: 'Porsche 911',
            type: 'sports',
            price: 'premium',
            transmission: 'automatic',
            availability: 'available',
            pricePerDay: 200,
            image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
            seats: 4,
            bags: 2,
            features: ['Sport Chrono', 'PDK Transmission', 'Carbon Fiber', 'Launch Control', 'Sport Exhaust'],
            description: 'The iconic sports car. Porsche 911 delivers unmatched performance and driving pleasure.'
        }
    ];

    // Filter change handler with debounce
    let filterTimeout;
    Object.values(filters).forEach(filter => {
        if (filter) {
            filter.addEventListener('change', () => {
                clearTimeout(filterTimeout);
                showLoading();
                filterTimeout = setTimeout(updateVehicleDisplay, 300);
            });
        }
    });

    function showLoading() {
        if (vehicleGrid) {
            vehicleGrid.classList.add('loading');
        }
    }

    function hideLoading() {
        if (vehicleGrid) {
            vehicleGrid.classList.remove('loading');
        }
    }

    function updateVehicleDisplay() {
        const selectedFilters = {
            type: filters.type?.value || 'all',
            price: filters.price?.value || 'all',
            transmission: filters.transmission?.value || 'all',
            availability: filters.availability?.value || 'all'
        };

        const filteredVehicles = vehicles.filter(vehicle => {
            return (selectedFilters.type === 'all' || vehicle.type === selectedFilters.type) &&
                   (selectedFilters.price === 'all' || vehicle.price === selectedFilters.price) &&
                   (selectedFilters.transmission === 'all' || vehicle.transmission === selectedFilters.transmission) &&
                   (selectedFilters.availability === 'all' || vehicle.availability === selectedFilters.availability);
        });

        renderVehicles(filteredVehicles);
    }

    function renderVehicles(vehicles) {
        if (!vehicleGrid) return;

        if (vehicles.length === 0) {
            vehicleGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-car-side"></i>
                    <h2>No vehicles found</h2>
                    <p>Try adjusting your filters to see more options</p>
                </div>
            `;
    } else {
            vehicleGrid.innerHTML = vehicles.map(vehicle => `
                <div class="vehicle-card">
                    <img src="${vehicle.image}" alt="${vehicle.name}" class="vehicle-image">
                    <div class="vehicle-info">
                        <h3 class="vehicle-name">${vehicle.name}</h3>
                        <div class="vehicle-details">
                            <div class="detail-item tooltip" data-tooltip="${vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)} Vehicle">
                                <i class="fas fa-car"></i>
                                <span>${vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}</span>
                            </div>
                            <div class="detail-item tooltip" data-tooltip="${vehicle.transmission.charAt(0).toUpperCase() + vehicle.transmission.slice(1)} Transmission">
                                <i class="fas fa-cog"></i>
                                <span>${vehicle.transmission.charAt(0).toUpperCase() + vehicle.transmission.slice(1)}</span>
                            </div>
                            <div class="detail-item tooltip" data-tooltip="${vehicle.seats} Passenger Capacity">
                                <i class="fas fa-user"></i>
                                <span>${vehicle.seats} Seats</span>
                            </div>
                            <div class="detail-item tooltip" data-tooltip="Luggage Capacity">
                                <i class="fas fa-suitcase"></i>
                                <span>${vehicle.bags} Bags</span>
                            </div>
                        </div>
                        <div class="price-tag tooltip" data-tooltip="Daily Rental Rate">
                            <i class="fas fa-tag"></i>
                            <span>$${vehicle.pricePerDay}/day</span>
                        </div>
                        <div class="vehicle-actions">
                            <button class="btn-primary" onclick="handleBooking('${vehicle.name}')">
                                <i class="fas fa-calendar-check"></i>
                                Book Now
                            </button>
                            <button class="btn-secondary" onclick="showVehicleDetails('${vehicle.name}')">
                                <i class="fas fa-info-circle"></i>
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        hideLoading();
    }

    // Initial render
    renderVehicles(vehicles);

    // Booking handler
    window.handleBooking = (vehicleName) => {
        const vehicle = vehicles.find(v => v.name === vehicleName);
        if (vehicle) {
            showNotification('Booking', `Starting booking process for ${vehicle.name}...`, 'info');
            // TODO: Implement booking form
        }
    };

    // Vehicle details handler with modal
    window.showVehicleDetails = (vehicleName) => {
        const vehicle = vehicles.find(v => v.name === vehicleName);
        if (vehicle) {
            showNotification('Vehicle Details', `
                ${vehicle.name}
                ${vehicle.description}
                
                Features:
                ${vehicle.features.map(feature => `• ${feature}`).join('\n')}
                
                Price: $${vehicle.pricePerDay}/day
                Seats: ${vehicle.seats}
                Luggage: ${vehicle.bags} bags
            `, 'info');
        }
    };

    // Enhanced notification system
    function showNotification(title, message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-header">
                <h4>${title}</h4>
                <button onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="notification-body">
                ${message.replace(/\n/g, '<br>')}
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
});
