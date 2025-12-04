// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animaciones a elementos
const animatedElements = document.querySelectorAll('.fase-card, .team-member, .problema-matematico, .conclusion-card, .stat-card, .timeline-item');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Animación de números en stats
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Para números con porcentaje o guiones
        if (element.textContent.includes('%')) {
            element.textContent = Math.floor(progress * (end - start) + start) + '%';
        } else if (element.textContent.includes('-')) {
            element.textContent = Math.floor(progress * (end - start) + start) + '-' + (end + 15);
        } else {
            element.textContent = Math.floor(progress * (end - start) + start);
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Observer para stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const finalValue = parseInt(statNumber.textContent);
            
            if (!isNaN(finalValue)) {
                animateValue(statNumber, 0, finalValue, 2000);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// Efecto parallax suave en hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Resaltar código Python con sintaxis coloreada
const highlightCode = () => {
    const codeBlock = document.querySelector('.codigo-container code');
    
    if (codeBlock) {
        let code = codeBlock.innerHTML;
        
        // Keywords de Python
        const keywords = ['from', 'import', 'def', 'return', 'if', 'else', 'for', 'while', 'class', 'print'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            code = code.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
        
        // Strings
        code = code.replace(/("[^"]*"|'[^']*')/g, '<span class="string">$1</span>');
        
        // Numbers
        code = code.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');
        
        // Comments
        code = code.replace(/(#[^\n]*)/g, '<span class="comment">$1</span>');
        
        // Function names
        code = code.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="function">$1</span>(');
        
        codeBlock.innerHTML = code;
    }
};

// Ejecutar highlight cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', highlightCode);

// Botón scroll to top (opcional)
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-top-btn';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        transition: all 0.3s;
        z-index: 999;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.5)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.4)';
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
};

// Crear botón scroll to top
createScrollTopButton();

// Console log con información del proyecto
console.log('%c Optimización Logística - Zona Libre de Colón ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Martec Enterprise S.A. ', 'background: #0066cc; color: white; font-size: 14px; padding: 5px; border-radius: 3px;');
console.log('Universidad de Panamá - Centro Regional Universitario de Colón');
console.log('Proyecto desarrollado por estudiantes de Administración de Empresas Marítimas');
console.log('Asignatura: Cálculo Matemático | Profesora: Jessica Jonas');
console.log('Fecha: 5 de Diciembre de 2025');

// Prevenir clic derecho (opcional, puedes comentar si no lo quieres)
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// Mensaje de bienvenida en consola
console.log('%c¡Bienvenido al proyecto de Optimización Logística!', 'color: #667eea; font-size: 18px; font-weight: bold;');
console.log('Este sitio web presenta una investigación sobre la mejora de procesos logísticos en la Zona Libre de Colón.');

// Efecto hover en cards
document.querySelectorAll('.fase-card, .team-member, .conclusion-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Lazy loading para imágenes (si quieres agregar más imágenes)
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

lazyLoadImages();

// Prevenir zoom en mobile (opcional)
document.addEventListener('touchmove', (e) => {
    if (e.scale !== 1) {
        e.preventDefault();
    }
}, { passive: false });

// Performance: Debounce para scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Aplicar debounce a eventos de scroll pesados
const handleScroll = debounce(() => {
    // Aquí puedes agregar más funciones que necesiten optimización
    console.log('Scroll optimizado');
}, 100);

window.addEventListener('scroll', handleScroll);