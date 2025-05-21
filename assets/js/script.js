document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.getElementById('main-header');
    const nav = mainHeader.querySelector('nav');
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
            pageTitle: "Dev Vision X1 - Custom Web Solutions",
            topBarPhone: "+1 234 567 890",
            topBarEmail: "info@DevVisionx1.com",
            topBarClientArea: "<i class=\"fas fa-user-circle\"></i> Client Area", // Icono incluido
            navHome: "Home",
            navServices: "Services",
            navProjects: "Projects",
            navAbout: "About",
            navContact: "Contact",
            heroTitle: "Innovative Web & Software Development",
            heroSubtitle: "We craft custom digital solutions to elevate your business and achieve your goals.",
            heroCta: "Get a Free Quote (customized to your needs)",
            stat1Val: "20+",
            stat1Desc: "Completed and In Development Projects",
            stat2Val: "10+",
            stat2Desc: "Happy Clients",
            stat3Val: "1000+",
            stat3Desc: "Working Hours",
            stat4Val: "10k+",
            stat4Desc: "Lines of Code",
            service1Title: "Custom Web Applications",
            service1Desc1: "We design and develop robust web applications tailored to your specific business needs. From complex enterprise platforms to intuitive user portals, we deliver scalable and secure solutions.",
            service1Desc2: "Utilizing modern technologies like .NET Core, React, and more, we ensure high performance and maintainability.",
            service1Cta: "Learn More <i class=\"fas fa-arrow-right\"></i>",
            service2Title: "Software Development & Integration",
            service2Desc1: "Our team develops powerful and secure software solutions that enable seamless communication between your applications and third-party services. We focus on efficient data exchange.",
            service2Desc2: "Plus, whether you need to integrate with payment gateways, social networks, or internal systems, we offer reliable API solutions.",
            service2Cta: "Discuss Your IDEA <i class=\"fas fa-arrow-right\"></i>",
            service3Title: "Database Solutions & Optimization",
            service3Desc1: "We offer expert database administration for Microsoft SQL Server, including design, optimization, and maintenance. Ensure your data is secure, accessible, and performing optimally.",
            service3Desc2: "From schema design to query tuning and backup strategies, we cover all aspects of database management.",
            service3Cta: "Optimize Your Database <i class=\"fas fa-arrow-right\"></i>",
            techTitle: "Technologies We Use",
            projectsTitle: "<i class=\"fas fa-tasks\"></i> Our Projects", // Icono incluido
            projectsIntro: "Here are some of the projects we're proud of. (More coming soon!)",
            project1Title: "Project Digitalization 4.0",
            project1Desc: "An innovative web application to optimize internal workflows and increase productivity \"Industrial Digitalization 4.0.\"",
            project2Title: "Personalized Online Store Project + e-commerce",
            project2Desc: "Custom e-commerce platform that enables comprehensive product management, intuitive shopping cart management, and secure payment processing through the Mercado Pago API. The system includes user authentication and detailed order tracking.",
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
            contactOrConnect: "Or connect with us directly:",
            contactGithub: "<i class=\"fab fa-github\"></i> Our GitHub",
            contactEmail: "<i class=\"fas fa-envelope\"></i> Email Us",
            footerAboutText: "Crafting digital excellence through innovative code and dedicated support. Let's build the future together.",
            footerQuickLinks: "Quick Links",
            footerBlog: "Blog",
            footerContactUs: "Contact Us",
            footerAddress: "", // Icono está en el HTML, no aquí
            footerPhone: "+1 234 567 890", // Icono está en el HTML, no aquí
            footerEmail: "info@devvisionx1.com", // Icono está en el HTML, no aquí
            footerRights: "All Rights Reserved.",
            footerPrivacy: "Privacy Policy",
            footerTerms: "Terms of Service",
            socialFacebook: "Facebook", // aria-label
            socialTwitter: "Twitter",   // aria-label
            socialGithub: "GitHub",     // aria-label
            socialLinkedIn: "LinkedIn", // aria-label
        },
        es: {
            pageTitle: "Dev Vision X1 - Soluciones Web Personalizadas",
            topBarPhone: "+1 234 567 890",
            topBarEmail: "info@devvisionx1.com",
            topBarClientArea: "<i class=\"fas fa-user-circle\"></i> Área de Cliente", // Icono incluido
            navHome: "Inicio",
            navServices: "Servicios",
            navProjects: "Proyectos",
            navAbout: "Nosotros",
            navContact: "Contacto",
            heroTitle: "Desarrollo Web y Software Innovador",
            heroSubtitle: "Creamos soluciones digitales personalizadas para impulsar tu negocio y alcanzar tus metas.",
            heroCta: "Obtén una cotización gratis (personalizada a tus necesidades)",
            stat1Val: "50+",
            stat1Desc: "Proyectos finalizados y en desarrollo",
            stat2Val: "10+",
            stat2Desc: "Clientes Satisfechos",
            stat3Val: "1000+",
            stat3Desc: "Horas de trabajo",
            stat4Val: "10k+",
            stat4Desc: "Líneas de Código",
            service1Title: "Aplicaciones Web Personalizadas",
            service1Desc1: "Diseñamos y desarrollamos aplicaciones web robustas adaptadas a tus necesidades específicas. Desde plataformas empresariales complejas hasta portales de usuario intuitivos, entregamos soluciones escalables y seguras.",
            service1Desc2: "Utilizando tecnologías modernas como .NET Core, React y más, aseguramos alto rendimiento y mantenibilidad.",
            service1Cta: "Saber Más <i class=\"fas fa-arrow-right\"></i>",
            service2Title: "Desarrollo e Integración de Software",
            service2Desc1: "Nuestro equipo desarrolla soluciones de software potentes y seguras que facilitan una comunicación fluida entre sus aplicaciones y servicios de terceros. Nos centramos en el intercambio eficiente de datos.",
            service2Desc2: "Ademas, ya sea que necesite integrarse con pasarelas de pago, redes sociales o sistemas internos, ofrecemos soluciones API confiables.",
            service2Cta: "Discute tu IDEA <i class=\"fas fa-arrow-right\"></i>",
            service3Title: "Soluciones y Optimización de Bases de Datos",
            service3Desc1: "Ofrecemos administración experta de bases de datos para Microsoft SQL Server, incluyendo diseño, optimización y mantenimiento. Asegura que tus datos estén seguros, accesibles y con un rendimiento óptimo.",
            service3Desc2: "Desde el diseño de esquemas hasta la optimización de consultas y estrategias de respaldo, cubrimos todos los aspectos de la gestión de bases de datos.",
            service3Cta: "Optimiza tu Base de Datos <i class=\"fas fa-arrow-right\"></i>",
            techTitle: "Tecnologías que Usamos",
            projectsTitle: "<i class=\"fas fa-tasks\"></i> Nuestros Proyectos", // Icono incluido
            projectsIntro: "Aquí algunos de los proyectos de los que estamos orgullosos. (¡Más próximamente!)",
            project1Title: "Proyecto Digitalización 4.0",
            project1Desc: "Una aplicación web innovadora para optimizar los flujos de trabajo internos y aumentar la productividad \"digitalización industrial 4.0\"",
            project2Title: "Proyecto Tienda Online Personalizada + comercio electrónico",
            project2Desc: "Plataforma de comercio electrónico personalizada que permite una gestión integral de productos, una gestión intuitiva del carrito de compra y un procesamiento seguro de pagos a través de la API de Mercado Pago. El sistema incorpora autenticación de usuarios y seguimiento detallado de pedidos.",
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
            contactOrConnect: "O conéctate con nosotros directamente:",
            contactGithub: "<i class=\"fab fa-github\"></i> Nuestro GitHub",
            contactEmail: "<i class=\"fas fa-envelope\"></i> Escríbenos",
            footerAboutText: "Creando excelencia digital a través de código innovador y soporte dedicado. Construyamos el futuro juntos.",
            footerQuickLinks: "Enlaces Rápidos",
            footerBlog: "Blog",
            footerContactUs: "Contáctanos",
            footerAddress: "", // Icono está en el HTML
            footerPhone: "+1 234 567 890", // Icono está en el HTML
            footerEmail: "info@devvisionx1.com", // Icono está en el HTML
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
            const isExpanded = nav.classList.toggle('active');
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

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                    mobileNavToggle.querySelector('i').className = 'fas fa-bars';
                    const currentLang = document.documentElement.lang;
                    mobileNavToggle.setAttribute('aria-label', currentLang === 'es' ? 'Abrir navegación' : 'Open navigation');
                }
            });
        });
    }

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
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === "#" || targetId.startsWith("#") && !document.querySelector(targetId)) { // Prevent error for invalid selectors
                // Allow normal behavior for external links or links to other pages that might start with #
                if (targetId.startsWith("#") && document.querySelector(targetId)) {
                    e.preventDefault(); // Only prevent default if it's a valid internal anchor
                } else if (targetId === "#"){
                    e.preventDefault(); // Prevent jump to top for href="#"
                    return;
                } else {
                    return; // Allow navigation to other pages
                }
            }
            
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault(); // Prevent default only if targetElement is found for internal scroll
                let headerOffset = mainHeader.offsetHeight;
                const topBar = document.getElementById('top-bar');
                if (topBar && getComputedStyle(topBar).display !== 'none') {
                    headerOffset += topBar.offsetHeight;
                }
                
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
