document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.getElementById('main-header');
    const navWrapper = mainHeader.querySelector('.nav-wrapper');
    const nav = navWrapper.querySelector('nav');
    const mobileNavToggle = mainHeader.querySelector('.mobile-nav-toggle');
    const themeToggleButton = document.getElementById('theme-toggle');
    const languageToggleButton = document.getElementById('language-toggle');
    const langIndicator = document.getElementById('lang-indicator');
    const currentYearSpan = document.getElementById('current-year');
    const sections = document.querySelectorAll('.section:not(.stats-bar-section)');
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
            heroCta: "Get a Quote (tailored to you)",
            stat1Val: "20+",
            stat1Desc: "Completed Projects",
            stat2Val: "30+",
            stat2Desc: "Happy Clients",
            stat3Val: "5000+",
            stat3Desc: "Hours of Code",
            stat4Val: "100K+",
            stat4Desc: "Lines of Code",
            servicesTitle: "<i class=\"fas fa-cogs\"></i> Our Services",
            servicesIntro: "We offer a complete range of digital solutions to transform your ideas into reality. Discover how we can help you.",
            serviceCard1Title: "Custom Web Development",
            serviceCard1Desc: "We create robust websites and applications, from intuitive portals to complex platforms, tailored to your needs.",
            serviceLearnMore: "Learn More <i class=\"fas fa-arrow-right\"></i>",
            serviceCard2Title: "API & Integrations",
            serviceCard2Desc: "We connect your systems. We develop secure APIs to integrate payment gateways, CRMs, and third-party services.",
            serviceCard3Title: "Software Solutions",
            serviceCard3Desc: "We transform your ideas into functional software. We develop desktop and enterprise solutions to optimize your operations.",
            serviceCard4Title: "Optimization & Maintenance",
            serviceCard4Desc: "We ensure your applications and databases run optimally, securely, and scalably over time.",
            projectsTitle: "<i class=\"fas fa-tasks\"></i> Our Projects",
            projectsIntro: "Here are some of the projects we're proud of. (More coming soon!)",
            project1Title: "Project Alpha",
            project1Desc: "An innovative web application to streamline internal workflows and boost productivity.",
            project2Title: "Project Beta",
            project2Desc: "Custom e-commerce platform with product and cart management, and secure payments via Mercado Pago API.",
            aboutTitle: "<i class=\"fas fa-users-cog\"></i> About Us",
            aboutIntro: "We are a dynamic team of passionate developers, designers, and strategists committed to delivering cutting-edge digital solutions. With years of experience and a collaborative approach, we transform ideas into impactful realities.",
            aboutFeature1Title: "Innovation",
            aboutFeature1Desc: "We constantly explore new technologies to provide innovative solutions.",
            aboutFeature2Title: "Quality",
            aboutFeature2Desc: "Our commitment to quality ensures robust and reliable products.",
            aboutFeature3Title: "Collaboration",
            aboutFeature3Desc: "We work closely with our clients to achieve shared success.",
            techTitle: "Technologies We Use",
            contactFormName: "Your Name",
            contactFormEmail: "Your Email",
            contactFormMessage: "Your Message",
            contactFormSubmit: "Send Message",
            contactFormNamePlaceholder: ["John Doe", "Jane Smith", "Peter Jones"],
            contactFormEmailPlaceholder: ["john.doe@example.com", "jane.smith@example.com", "peter.jones@example.com"],
            contactFormMessagePlaceholder: ["Hello, I'm interested in learning more about your services...", "Hi, I have a question about pricing.", "I'd like to request a quote for a new project."],
            languageIndicator: "EN",
            footerAboutText: "Crafting digital excellence through innovative code and dedicated support. Let's build the future together.",
            footerQuickLinks: "Quick Links",
            footerContactUs: "Contact Us",
            footerAddress: "Av. Siempreviva 123, Sprinfield",
            footerPhone: "+1 234 567 890",
            footerEmail: "info@codeMateAR.com",
            footerRights: "All Rights Reserved.",
            footerPrivacy: "Privacy Policy",
            footerTerms: "Terms of Service",
            formSuccessMessage: "Your message has been sent successfully!",
            contactTitle: "<i class=\"fas fa-envelope-open-text\"></i> Get in Touch",
            contactIntro: "Ready to start your next project or have a question? We\'d love to hear from you!",
            contactLocation: "Location",
            contactEmailLabel: "Email",
            contactPhoneLabel: "Phone",
            contactGithubLabel: "GitHub",
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
            heroCta: "Obtén una Cotización (diseñada a tu medida)",
            stat1Val: "20+",
            stat1Desc: "Proyectos Completados",
            stat2Val: "30+",
            stat2Desc: "Clientes Satisfechos",
            stat3Val: "5000+",
            stat3Desc: "Horas de Código",
            stat4Val: "100K+",
            stat4Desc: "Líneas de Código",
            servicesTitle: "<i class=\"fas fa-cogs\"></i> Nuestros Servicios",
            servicesIntro: "Ofrecemos una gama completa de soluciones digitales para transformar tus ideas en realidad. Descubre cómo podemos ayudarte.",
            serviceCard1Title: "Desarrollo Web a Medida",
            serviceCard1Desc: "Creamos sitios y aplicaciones web robustas, desde portales intuitivos hasta plataformas complejas, adaptadas a tus necesidades.",
            serviceLearnMore: "Aprende Más <i class=\"fas fa-arrow-right\"></i>",
            serviceCard2Title: "API & Integraciones",
            serviceCard2Desc: "Conectamos tus sistemas. Desarrollamos APIs seguras para integrar pasarelas de pago, CRMs y servicios de terceros.",
            serviceCard3Title: "Soluciones de Software",
            serviceCard3Desc: "Transformamos tus ideas en software funcional. Desarrollamos soluciones de escritorio y empresariales para optimizar tus operaciones.",
            serviceCard4Title: "Optimización & Mantenimiento",
            serviceCard4Desc: "Aseguramos que tus aplicaciones y bases de datos funcionen de manera óptima, segura y escalable en el tiempo.",
            projectsTitle: "<i class=\"fas fa-tasks\"></i> Nuestros Proyectos",
            projectsIntro: "Aquí hay algunos de los proyectos de los que estamos orgullosos. (¡Más muy pronto!)",
            project1Title: "Proyecto Alfa",
            project1Desc: "Una aplicación web innovadora para optimizar los flujos de trabajo internos y aumentar la productividad.",
            project2Title: "Proyecto Beta",
            project2Desc: "Plataforma de e-commerce con gestión de productos y carrito, y pagos seguros a través de la API de Mercado Pago.",
            aboutTitle: "<i class=\"fas fa-users-cog\"></i> Sobre Nosotros",
            aboutIntro: "Somos un equipo dinámico de desarrolladores, diseñadores y estrategas apasionados y comprometidos con la entrega de soluciones digitales de vanguardia. Con años de experiencia y un enfoque colaborativo, transformamos las ideas en realidades impactantes.",
            aboutFeature1Title: "Innovación",
            aboutFeature1Desc: "Exploramos constantemente nuevas tecnologías para ofrecer soluciones innovadoras.",
            aboutFeature2Title: "Calidad",
            aboutFeature2Desc: "Nuestro compromiso con la calidad garantiza productos robustos y fiables.",
            aboutFeature3Title: "Colaboración",
            aboutFeature3Desc: "Trabajamos en estrecha colaboración con nuestros clientes para lograr el éxito compartido.",
            techTitle: "Tecnologías que Utilizamos",
            contactTitle: "<i class=\"fas fa-envelope-open-text\"></i> Ponte en Contacto",
            contactIntro: "¿Listo para comenzar tu próximo proyecto o tienes una pregunta? ¡Nos encantaría saber de ti!",
            contactLocation: "Ubicación",
            contactEmailLabel: "Correo Electrónico",
            contactPhoneLabel: "Teléfono",
            contactGithubLabel: "GitHub",
            contactFormName: "Tu Nombre",
            contactFormEmail: "Tu Correo Electrónico",
            contactFormMessage: "Tu Mensaje",
            contactFormSubmit: "Enviar Mensaje",
            contactFormNamePlaceholder: ["Juan Pérez", "María García", "Carlos Rodríguez"],
            contactFormEmailPlaceholder: ["juan.perez@example.com", "maria.garcia@example.com", "carlos.rodriguez@example.com"],
            contactFormMessagePlaceholder: ["Hola, estoy interesado en contactarlos para obtener información sobre...", "Hola, tengo una pregunta sobre los precios.", "Me gustaría solicitar una cotización para un nuevo proyecto."],
            languageIndicator: "ES",
            footerAboutText: "Creando excelencia digital a través de código innovador y soporte dedicado. Construyamos el futuro juntos.",
            footerQuickLinks: "Enlaces Rápidos",
            footerContactUs: "Contáctanos",
            footerAddress: "Av. Siempreviva 123, Sprinfield",
            footerPhone: "+1 234 567 890",
            footerEmail: "info@codeMateAR.com",
            footerRights: "Todos los Derechos Reservados.",
            footerPrivacy: "Política de Privacidad",
                        footerTerms: "Términos de Servicio",
            formSuccessMessage: "¡Tu mensaje ha sido enviado con éxito!",
            contactTitle: "<i class=\"fas fa-envelope-open-text\"></i> Ponte en Contacto",
            contactIntro: "¿Listo para comenzar tu próximo proyecto o tienes una pregunta? ¡Nos encantaría saber de ti!",
            contactLocation: "Ubicación",
            contactEmailLabel: "Correo Electrónico",
            contactPhoneLabel: "Teléfono",
            contactGithubLabel: "GitHub",
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
        // Remove 'visible' class from all sections to re-trigger animation
        sections.forEach(section => {
            section.classList.remove('visible');
        });

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
        languageToggleButton.setAttribute('aria-label', lang === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés');
        localStorage.setItem('language', lang);

        // Re-trigger reveal animation after language change
        revealSections();
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
            const sectionBottom = section.getBoundingClientRect().bottom;

            if (sectionTop < triggerBottom && sectionBottom > 0) {
                // Section is in view, add visible class
                section.classList.add('visible');
            } else {
                // Section is out of view, remove visible class to allow re-animation
                section.classList.remove('visible');
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

                // Remove 'visible' class from all sections to re-trigger animation
                sections.forEach(section => {
                    section.classList.remove('visible');
                });

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Re-trigger reveal animation after smooth scroll
                setTimeout(() => {
                    // If navigating to the hero section, force re-animation
                    if (href === '#hero') {
                        const heroSection = document.getElementById('hero');
                        heroSection.classList.remove('visible');
                        // Force reflow to ensure animation restarts
                        void heroSection.offsetWidth;
                        heroSection.classList.add('visible');
                    } else {
                        revealSections();
                    }
                }, 100); // Small delay to ensure scroll completes
            }
        });
    });

    // --- Contact Form Submission (Professional) ---
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const formMessage = document.getElementById('form-message');

            // --- Loading State ---
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            formMessage.style.display = 'none';

            // --- Simulate API Call ---
            setTimeout(() => {
                // --- Reset Button ---
                submitButton.classList.remove('loading');
                submitButton.disabled = false;

                // --- Show Success Message ---
                formMessage.textContent = translations[document.documentElement.lang].formSuccessMessage || 'Your message has been sent successfully!';
                formMessage.className = 'success';
                formMessage.style.display = 'block';

                // --- Reset Form ---
                contactForm.reset();
                formInputs.forEach(input => {
                    input.parentElement.classList.remove('active');
                });

                // --- Hide Message After 5s ---
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);

            }, 2000);
        });
    }

    // --- Typing Simulation for Contact Form Placeholders ---
    const formInputs = document.querySelectorAll('.form-input');
    const typingStates = new Map(); // To store the state of each input's animation

    const simulatePlaceholderTyping = (element, texts, delay = 80, eraseDelay = 1500) => {
        if (typingStates.get(element)?.isTyping) return;

        typingStates.set(element, { isTyping: true, isDone: false, timeoutId: null, textIndex: 0 });
        element.placeholder = '';
        element.parentElement.classList.add('active');

        let i = 0;
        let erasing = false;

        const type = () => {
            const state = typingStates.get(element);
            if (!state.isTyping) return;

            const currentText = texts[state.textIndex];

            if (erasing) {
                if (element.placeholder.length > 0) {
                    element.placeholder = element.placeholder.slice(0, -1);
                    state.timeoutId = setTimeout(type, delay / 2);
                } else {
                    erasing = false;
                    i = 0;
                    state.textIndex = (state.textIndex + 1) % texts.length;
                    state.timeoutId = setTimeout(type, delay);
                }
            } else {
                if (i < currentText.length) {
                    element.placeholder += currentText.charAt(i);
                    i++;
                    state.timeoutId = setTimeout(type, delay);
                } else {
                    erasing = true;
                    state.timeoutId = setTimeout(type, eraseDelay);
                }
            }
            typingStates.set(element, state);
        };

        type();
    };

    const stopTypingAnimation = (element) => {
        const state = typingStates.get(element);
        if (state?.isTyping && state?.timeoutId) {
            clearTimeout(state.timeoutId);
            typingStates.set(element, { isTyping: false, isDone: false, timeoutId: null });
        }
    };

    const startTypingAnimation = () => {
        const currentLang = document.documentElement.lang;
        const namePlaceholders = translations[currentLang]?.contactFormNamePlaceholder || ["John Doe"];
        const emailPlaceholders = translations[currentLang]?.contactFormEmailPlaceholder || ["john.doe@example.com"];
        const messagePlaceholders = translations[currentLang]?.contactFormMessagePlaceholder || ["Hello, I'm interested in learning more about your services..."];

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageTextarea = document.getElementById('message');

        if (nameInput) simulatePlaceholderTyping(nameInput, namePlaceholders);
        if (emailInput) simulatePlaceholderTyping(emailInput, emailPlaceholders);
        if (messageTextarea) simulatePlaceholderTyping(messageTextarea, messagePlaceholders);
    };

    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            // Stop animation and reveal the full placeholder for editing
            stopTypingAnimation(input);
            const currentLang = document.documentElement.lang;
            const key = input.id; // Assuming id matches the key pattern
            let placeholderText = '';
            if (key === 'name') placeholderText = translations[currentLang]?.contactFormNamePlaceholder;
            if (key === 'email') placeholderText = translations[currentLang]?.contactFormEmailPlaceholder;
            if (key === 'message') placeholderText = translations[currentLang]?.contactFormMessagePlaceholder;
            input.placeholder = placeholderText || '';
        });

        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('active');
                // Reset and restart animation if the field is empty
                typingStates.set(input, { isTyping: false, isDone: false, timeoutId: null });
                startTypingAnimation();
            }
        });
    });

    // --- Initial Load Settings ---
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    const savedLanguage = localStorage.getItem('language') || 'es';
    applyLanguage(savedLanguage);

    fetchWeatherAndDate();

    // Ensure hero section is visible on load
    document.getElementById('hero').classList.add('visible');

    revealSections();

    startTypingAnimation();

    // --- Staggered Animation for Tech Logos ---
    const techLogos = document.querySelectorAll('.tech-logos i, .tech-logos .tech-logo-img');
    techLogos.forEach((logo, index) => {
        logo.style.animationDelay = `${index * 0.2}s`;
    });
});