document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.getElementById('main-header');
    const navWrapper = mainHeader.querySelector('.nav-wrapper');
    const nav = navWrapper.querySelector('nav');
    const mobileNavToggle = mainHeader.querySelector('.mobile-nav-toggle');
    const themeToggleButton = document.getElementById('theme-toggle');
    const languageToggleButton = document.getElementById('language-toggle');
    const langIndicator = document.getElementById('lang-indicator');
    const currentYearSpan = document.getElementById('current-year');
    const sections = document.querySelectorAll('.section:not(.hero-section):not(.stats-bar-section)');
    const contactForm = document.getElementById('contact-form');

    // --- Date and Temperature Display ---
    const dateTempDisplay = document.getElementById('date-temp-display');

    const fetchWeatherAndDate = () => {
        // Get and format the date
        const now = new Date();
        const dateString = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

        // Get location and fetch weather
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.current_weather) {
                            const temp = data.current_weather.temperature;
                            dateTempDisplay.innerHTML = `<i class="fas fa-calendar-alt"></i> ${dateString} | <i class="fas fa-thermometer-half"></i> ${temp}°C`;
                        } else {
                            dateTempDisplay.innerHTML = `<i class="fas fa-calendar-alt"></i> ${dateString}`;
                        }
                    })
                    .catch(() => {
                        dateTempDisplay.innerHTML = `<i class="fas fa-calendar-alt"></i> ${dateString}`; // Show only date on API error
                    });
            }, () => {
                // Geolocation denied or failed
                dateTempDisplay.innerHTML = `<i class="fas fa-calendar-alt"></i> ${dateString}`;
            });
        } else {
            // Geolocation not supported
            dateTempDisplay.innerHTML = `<i class="fas fa-calendar-alt"></i> ${dateString}`;
        }
    };

    // --- Translations Data ---
    const translations = {
        en: {
            pageTitle: "codeMate AR - Custom Web Solutions",
            navHome: "Home",
            navServices: "Services",
            navProjects: "Projects",
            navAbout: "About",
            navContact: "Contact",
            heroTitle: "Innovative Web & Software Development",
            heroSubtitle: "We create customized digital solutions to boost your projects and achieve your goals.",
            heroCta: "Get a Free Quote",
            contactFormName: "Your Name",
            contactFormEmail: "Your Email",
            contactFormMessage: "Your Message",
            contactFormSubmit: "Send Message",
            contactFormNamePlaceholder: "John Doe",
            contactFormEmailPlaceholder: "john.doe@example.com",
            contactFormMessagePlaceholder: "Hello, I'm interested in learning more about your services...",
            // ... other translations
        },
        es: {
            pageTitle: "codeMate AR - Soluciones Web Personalizadas",
            navHome: "Inicio",
            navServices: "Servicios",
            navProjects: "Proyectos",
            navAbout: "Nosotros",
            navContact: "Contacto",
            heroTitle: "Desarrollo Web y Software Innovador",
            heroSubtitle: "Creamos soluciones digitales personalizadas para impulsar tus proyectos y alcanzar tus metas.",
            heroCta: "Obtén una cotización gratis",
            contactFormName: "Tu Nombre",
            contactFormEmail: "Tu Correo Electrónico",
            contactFormMessage: "Tu Mensaje",
            contactFormSubmit: "Enviar Mensaje",
            contactFormNamePlaceholder: "Juan Pérez",
            contactFormEmailPlaceholder: "juan.perez@example.com",
            contactFormMessagePlaceholder: "Hola, estoy interesado en contactarlos para obtener información sobre...",
            // ... other translations
        }
    };

    // --- Footer Year ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Theme Switcher ---
    const sunIcon = themeToggleButton.querySelector('.fa-sun');
    const moonIcon = themeToggleButton.querySelector('.fa-moon');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'inline-block';
            themeToggleButton.setAttribute('aria-label', 'Switch to light theme');
        } else {
            document.body.classList.remove('dark-mode');
            if (sunIcon) sunIcon.style.display = 'inline-block';
            if (moonIcon) moonIcon.style.display = 'none';
            themeToggleButton.setAttribute('aria-label', 'Switch to dark theme');
        }
    };

    themeToggleButton.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });

    // --- Language Switcher ---
    const applyLanguage = (lang) => {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key] !== undefined) {
                const translationText = translations[lang][key];

                if (key === 'pageTitle') {
                    document.title = translationText;
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if(element.hasAttribute('placeholder')) {
                        // This will be handled by the typing animation
                    } else {
                        element.textContent = translationText;
                    }
                } else {
                    element.innerHTML = translationText;
                }
            }
        });
        if (langIndicator) langIndicator.textContent = lang.toUpperCase();
        languageToggleButton.setAttribute('aria-label', lang === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés');
        localStorage.setItem('language', lang);
    };


    languageToggleButton.addEventListener('click', () => {
        const currentLang = document.documentElement.lang === 'es' ? 'en' : 'es';
        applyLanguage(currentLang);
        startTypingAnimation(); // Re-start animation with new language
        fetchWeatherAndDate();
    });


    // --- Mobile Navigation ---
    if (mobileNavToggle && nav) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = navWrapper.classList.toggle('active');
            mobileNavToggle.setAttribute('aria-expanded', isExpanded);
            const icon = mobileNavToggle.querySelector('i');
            const currentLang = document.documentElement.lang;
            if (isExpanded) {
                icon.className = 'fas fa-times';
                mobileNavToggle.setAttribute('aria-label', currentLang === 'es' ? 'Cerrar navegación' : 'Close navigation');
            } else {
                icon.className = 'fas fa-bars';
                mobileNavToggle.setAttribute('aria-label', currentLang === 'es' ? 'Abrir navegación' : 'Open navigation');
            }
        });

        navWrapper.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navWrapper.classList.contains('active')) {
                    navWrapper.classList.remove('active');
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                    mobileNavToggle.querySelector('i').className = 'fas fa-bars';
                    const currentLang = document.documentElement.lang;
                    mobileNavToggle.setAttribute('aria-label', currentLang === 'es' ? 'Abrir navegación' : 'Open navigation');
                }
            });
        });
    }

    // --- Header Scroll Effect ---
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Initial check

    // --- Scroll Reveal ---
    const revealSections = () => {
        const triggerBottom = window.innerHeight * 0.85;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', revealSections, { passive: true });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = mainHeader.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Contact Form Submission (Basic Example) ---
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            console.log("Form Data Submitted:");
            for (let [key, value] of formData.entries()) {
                console.log(key + ": " + value);
            }
            const currentLang = document.documentElement.lang;
            const message = currentLang === 'es' ? "¡Gracias por tu mensaje! Nos pondremos en contacto pronto." : "Thank you for your message! We'll be in touch soon.";
            alert(message);
            contactForm.reset();
        });
    }

    // --- Typing Simulation for Contact Form Placeholders ---
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageTextarea = document.getElementById('message');

    const simulatePlaceholderTyping = (element, text, delay = 100, eraseDelay = 1500) => {
        let i = 0;
        let erasing = false;
        element.parentElement.classList.add('active');

        const type = () => {
            if (erasing) {
                if (element.placeholder.length > 0) {
                    element.placeholder = element.placeholder.slice(0, -1);
                    setTimeout(type, delay / 2);
                } else {
                    erasing = false;
                    i = 0;
                    // Restart typing with a short pause
                    setTimeout(type, delay);
                }
            } else {
                if (i < text.length) {
                    element.placeholder += text.charAt(i);
                    i++;
                    setTimeout(type, delay);
                } else {
                    // Finished typing, wait before erasing
                    erasing = true;
                    setTimeout(type, eraseDelay);
                }
            }
        };
        type();
    };

    const startTypingAnimation = () => {
        const currentLang = document.documentElement.lang;
        const namePlaceholder = translations[currentLang]?.contactFormNamePlaceholder || "John Doe";
        const emailPlaceholder = translations[currentLang]?.contactFormEmailPlaceholder || "john.doe@example.com";
        const messagePlaceholder = translations[currentLang]?.contactFormMessagePlaceholder || "Hello, I'm interested in learning more about your services...";

        if(nameInput) simulatePlaceholderTyping(nameInput, namePlaceholder);
        if(emailInput) simulatePlaceholderTyping(emailInput, emailPlaceholder);
        if(messageTextarea) simulatePlaceholderTyping(messageTextarea, messagePlaceholder);
    };

    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('active');
        });

        input.addEventListener('blur', () => {
            if (input.value === '' && input.placeholder === '') {
                input.parentElement.classList.remove('active');
            }
        });
    });

    // --- Initial Load Settings ---
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    const savedLanguage = localStorage.getItem('language') || 'en';
    applyLanguage(savedLanguage);

    fetchWeatherAndDate();

    revealSections();

    startTypingAnimation();

});