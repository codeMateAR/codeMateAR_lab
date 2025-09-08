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

    // --- Translations Data (CORREGIDO para incluir HTML de iconos fas fa-user) ---
    const translations = {
        en: {
            pageTitle: "codeMate AR - Custom Web Solutions",
            topBarClientArea: "<i class=\"fas fa-user-circle\"></i> Client Area", // Icono incluido
            navHome: "Home",
            navServices: "Services",
            navProjects: "Projects",
            navAbout: "About",
            navContact: "Contact",
            heroTitle: "Innovative Web & Software Development",
            heroSubtitle: "We create customized digital solutions to boost your projects and achieve your goals.",
            heroCta: "Get a Free Quote (customized to your needs)",
            stat1Val: "20+",
            stat1Desc: "Completed and In Development Projects",
            stat2Val: "10+",
            stat2Desc: "Happy Clients",
            stat3Val: "1000+",
            stat3Desc: "Working Hours",
            stat4Val: "1M+",
            stat4Desc: "Lines of Code",
            servicesTitle: "<i class=\"fas fa-cogs\"></i> Our Services",
            servicesIntro: "We offer a complete range of digital solutions to transform your ideas into reality. Discover how we can help you.",
            serviceCard1Title: "Custom Web Development",
            serviceCard1Desc: "We create robust websites and applications, from intuitive portals to complex platforms, tailored to your needs.",
            serviceCard2Title: "API & Integrations",
            serviceCard2Desc: "We connect your systems. We develop secure APIs to integrate payment gateways, CRMs, and third-party services.",
            serviceCard3Title: "Software Solutions",
            serviceCard3Desc: "We transform your ideas into functional software. We develop desktop and enterprise solutions to optimize your operations.",
            serviceCard4Title: "Optimization & Maintenance",
            serviceCard4Desc: "We ensure your applications and databases run optimally, securely, and scalably over time.",
            serviceLearnMore: "Learn More <i class=\"fas fa-arrow-right\"></i>",
            techTitle: "Technologies We Use",
            projectsTitle: "<i class=\"fas fa-tasks\"></i> Our Projects", // Icono incluido
            projectsIntro: "A showcase of our craftsmanship. Each project reflects our dedication to building robust, scalable, and user-centric applications.",
            project1Title: "Industrial Digitalization 4.0",
            project1Desc: "Innovative web application to optimize internal workflows and boost productivity in Industry 4.0.",
            project2Title: "Custom E-commerce Store",
            project2Desc: "E-commerce platform with product management, shopping cart, and secure payments via Mercado Pago API.",
            project3Title: "Project Gamma",
            project3Desc: "Database optimization and migration for a large e-commerce platform, improving performance by 60%.",
            projectLinkView: "View Project <i class=\"fas fa-external-link-alt\"></i>",
            aboutTitle: "<i class=\"fas fa-users-cog\"></i> About Us", // Icono incluido
            aboutIntro: "We are a dynamic team of passionate developers, designers, and strategists committed to delivering cutting-edge digital solutions. With years of experience and a collaborative approach, we transform ideas into impactful realities.",
            aboutFeature1Title: "Innovation",
            aboutFeature1Desc: "We constantly explore new technologies to provide innovative solutions.",
            aboutFeature2Title: "Quality",
            aboutFeature2Desc: "Our commitment to quality ensures robust and reliable products.",
            aboutFeature3Title: "Collaboration",
            aboutFeature3Desc: "We work closely with our clients to achieve shared success.",
            contactTitle: "<i class=\"fas fa-envelope-open-text\"></i> Get in Touch", // Icono incluido
            contactIntro: "Ready to start your next project or have a question? We'd love to hear from you!",
            contactFormName: "Your Name", // Placeholder, no necesita ícono aquí
            contactFormEmail: "Your Email", // Placeholder
            contactFormMessage: "Your Message", // Placeholder
            contactFormSubmit: "Send Message",
            contactLocation: "Location",
            contactEmailLabel: "Email",
            contactPhoneLabel: "Phone",
            contactGithubLabel: "GitHub",
            footerAboutText: "Crafting digital excellence through innovative code and dedicated support. Let's build the future together.",
            footerQuickLinks: "Quick Links",
            footerContactUs: "Contact Us",
            footerAddress: "Av. Siempreviva 123, Sprinfield", // Icono está en el HTML, no aquí
            footerPhone: "+1 234 567 890", // Icono está en el HTML, no aquí
            footerEmail: "info@codeMateAR.com", // Icono está en el HTML, no aquí
            footerRights: "All Rights Reserved.",
            footerPrivacy: "Privacy Policy",
            footerTerms: "Terms of Service",
            socialFacebook: "Facebook", // aria-label
            socialTwitter: "Twitter",   // aria-label
            socialGithub: "GitHub",     // aria-label
            socialLinkedIn: "LinkedIn", // aria-label
        },
        es: {
            pageTitle: "codeMate AR - Soluciones Web Personalizadas",
            topBarClientArea: "<i class=\"fas fa-user-circle\"></i> Área de Cliente", // Icono incluido
            navHome: "Inicio",
            navServices: "Servicios",
            navProjects: "Proyectos",
            navAbout: "Nosotros",
            navContact: "Contacto",
            heroTitle: "Desarrollo Web y Software Innovador",
            heroSubtitle: "Creamos soluciones digitales personalizadas para impulsar tus proyectos y alcanzar tus metas.",
            heroCta: "Obtén una cotización gratis (personalizada a tus necesidades)",
            stat1Val: "20+",
            stat1Desc: "Proyectos finalizados y en desarrollo",
            stat2Val: "10+",
            stat2Desc: "Clientes Satisfechos",
            stat3Val: "1000+",
            stat3Desc: "Horas de trabajo",
            stat4Val: "1M+",
            stat4Desc: "Líneas de Código",
            servicesTitle: "<i class=\"fas fa-cogs\"></i> Nuestros Servicios",
            servicesIntro: "Ofrecemos una gama completa de soluciones digitales para transformar tus ideas en realidad. Descubre cómo podemos ayudarte.",
            serviceCard1Title: "Desarrollo Web a Medida",
            serviceCard1Desc: "Creamos sitios y aplicaciones web robustas, desde portales intuitivos hasta plataformas complejas, adaptadas a tus necesidades.",
            serviceCard2Title: "API e Integraciones",
            serviceCard2Desc: "Conectamos tus sistemas. Desarrollamos APIs seguras para integrar pasarelas de pago, CRMs y servicios de terceros.",
            serviceCard3Title: "Soluciones de Software",
            serviceCard3Desc: "Transformamos tus ideas en software funcional. Desarrollamos soluciones de escritorio y empresariales para optimizar tus operaciones.",
            serviceCard4Title: "Optimización y Mantenimiento",
            serviceCard4Desc: "Aseguramos que tus aplicaciones y bases de datos funcionen de manera óptima, segura y escalable a través del tiempo.",
            serviceLearnMore: "Saber Más <i class=\"fas fa-arrow-right\"></i>",
            techTitle: "Tecnologías que Usamos",
            projectsTitle: "<i class=\"fas fa-tasks\"></i> Nuestros Proyectos", // Icono incluido
            projectsIntro: "Una muestra de nuestro trabajo. Cada proyecto refleja nuestra dedicación para construir aplicaciones robustas, escalables y centradas en el usuario.",
            project1Title: "Digitalización Industrial 4.0",
            project1Desc: "Aplicación web innovadora para optimizar flujos de trabajo internos y aumentar la productividad en la Industria 4.0.",
            project2Title: "Tienda E-commerce a Medida",
            project2Desc: "Plataforma e-commerce con gestión de productos, carrito de compras y pagos seguros a través de la API de Mercado Pago.",
            project3Title: "Proyecto Gamma",
            project3Desc: "Optimización y migración de bases de datos para una gran plataforma de comercio electrónico, mejorando el rendimiento en un 60%.",
            projectLinkView: "Ver Proyecto <i class=\"fas fa-external-link-alt\"></i>",
            aboutTitle: "<i class=\"fas fa-users-cog\"></i> Sobre Nosotros", // Icono incluido
            aboutIntro: "Somos un equipo dinámico de desarrolladores, diseñadores y estrategas apasionados, comprometidos con la entrega de soluciones digitales de vanguardia. Con años de experiencia y un enfoque colaborativo, transformamos ideas en realidades impactantes.",
            aboutFeature1Title: "Innovación",
            aboutFeature1Desc: "Exploramos constantemente nuevas tecnologías para ofrecer soluciones innovadoras.",
            aboutFeature2Title: "Calidad",
            aboutFeature2Desc: "Nuestro compromiso con la calidad garantiza productos robustos y confiables.",
            aboutFeature3Title: "Colaboración",
            aboutFeature3Desc: "Trabajamos en estrecha colaboración con nuestros clientes para lograr el éxito compartido.",
            contactTitle: "<i class=\"fas fa-envelope-open-text\"></i> Ponte en Contacto", // Icono incluido
            contactIntro: "¿Listo para comenzar tu próximo proyecto o tienes alguna pregunta? ¡Nos encantaría saber de ti!",
            contactFormName: "Tu Nombre", // Placeholder
            contactFormEmail: "Tu Correo Electrónico", // Placeholder
            contactFormMessage: "Tu Mensaje", // Placeholder
            contactFormSubmit: "Enviar Mensaje",
            contactLocation: "Ubicación",
            contactEmailLabel: "Correo Electrónico",
            contactPhoneLabel: "Teléfono",
            contactGithubLabel: "GitHub",
            footerAboutText: "Creando excelencia digital a través de código innovador y soporte dedicado. Construyamos el futuro juntos.",
            footerQuickLinks: "Enlaces Rápidos",
            footerContactUs: "Contáctanos",
            footerAddress: "Av. Siempreviva 123, Sprinfield", // Icono está en el HTML
            footerPhone: "+1 234 567 890", // Icono está en el HTML
            footerEmail: "info@codeMateAR.com", // Icono está en el HTML
            footerRights: "Todos los Derechos Reservados.",
            footerPrivacy: "Política de Privacidad",
            footerTerms: "Términos de Servicio",
            socialFacebook: "Facebook", // aria-label
            socialTwitter: "Twitter",   // aria-label
            socialGithub: "GitHub",     // aria-label
            socialLinkedIn: "LinkedIn", // aria-label
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

    // --- Language Switcher (CORREGIDO) ---
    const applyLanguage = (lang) => {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key] !== undefined) {
                const translationText = translations[lang][key];

                if (key === 'pageTitle') {
                    document.title = translationText; // Título de la página
                } else if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = translationText; // Placeholders son siempre texto plano
                } else if (element.tagName === 'TEXTAREA' && element.hasAttribute('placeholder')) {
                    element.placeholder = translationText; // Placeholders son siempre texto plano
                } else if (element.hasAttribute('aria-label') && (key.startsWith('social') || key === 'navToggle')) {
                     element.setAttribute('aria-label', translationText); // Aria-labels son texto plano
                } else {
                    // Si la traducción contiene HTML (ej. un ícono), usar innerHTML.
                    // De lo contrario, usar textContent para seguridad y eficiencia.
                    if (translationText.includes('<i') || translationText.includes('<span')) {
                        element.innerHTML = translationText;
                    } else {
                        element.textContent = translationText;
                    }
                }
            }
        });
        if (langIndicator) langIndicator.textContent = lang.toUpperCase();
        languageToggleButton.setAttribute('aria-label', lang === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés');
        localStorage.setItem('language', lang);

        // Actualizar aria-label del botón de navegación móvil si existe
        if (mobileNavToggle) {
            const isExpanded = nav.classList.contains('active');
             if (isExpanded) {
                mobileNavToggle.setAttribute('aria-label', lang === 'es' ? 'Cerrar navegación' : 'Close navigation');
            } else {
                mobileNavToggle.setAttribute('aria-label', lang === 'es' ? 'Abrir navegación' : 'Open navigation');
            }
        }
    };


    languageToggleButton.addEventListener('click', () => {
        const currentLang = document.documentElement.lang === 'es' ? 'en' : 'es';
        applyLanguage(currentLang);
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

            // Si es solo un "#", previene el salto a la parte superior de la página.
            if (href === '#') {
                e.preventDefault();
                return;
            }

            // Intenta encontrar el elemento en la página actual.
            const targetElement = document.querySelector(href);
            if (targetElement) { // Si el elemento existe, realiza el scroll suave.
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

    // --- Initial Load Settings ---
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    const savedLanguage = localStorage.getItem('language') || 'en'; // 'en' por defecto
    applyLanguage(savedLanguage);

    revealSections(); // Initial check for visible sections

});
