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
    card.addEventListener('mouseenter', function () {
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

// ============================================
// MENÚ MÓVIL FUNCIONAL
// ============================================

const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinksMenu = document.getElementById('nav-links');

if (mobileMenuBtn && navLinksMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinksMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !navLinksMenu.contains(e.target)) {
            navLinksMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// ============================================
// DESCARGA DE PDF
// ============================================

function downloadPDF() {
    // Opción 1: Si tienes el PDF listo
    const link = document.createElement('a');
    link.href = 'Investigacion_Logistica_Martec.pdf'; // Nombre de tu archivo PDF
    link.download = 'Optimizacion_Logistica_ZLC_Martec_Enterprise.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Opción 2: Generar PDF desde la página (requiere jsPDF)
    // Descomenta si instalas la librería jsPDF
    /*
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Optimización Logística - Martec Enterprise', 20, 20);
    doc.setFontSize(12);
    doc.text('Zona Libre de Colón, Panamá', 20, 30);
    doc.text('Investigación completa disponible en:', 20, 40);
    doc.text(window.location.href, 20, 50);
    
    doc.save('Investigacion_Martec.pdf');
    */

    // Feedback visual
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> ¡Descargando!';
    btn.style.background = '#10b981';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 2000);
}

// ============================================
// GRÁFICOS CON CHART.JS
// ============================================

// Asegúrate de incluir Chart.js en tu HTML:
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

function initCharts() {
    // Gráfico de Tiempos por Etapa
    const timelineChart = document.getElementById('timelineChart');

    if (timelineChart) {
        new Chart(timelineChart, {
            type: 'bar',
            data: {
                labels: ['Tránsito Terrestre', 'Tránsito Marítimo', 'Espera Puerto', 'Salida Puerto', 'Descarga'],
                datasets: [{
                    label: 'Tiempo Actual (horas)',
                    data: [166.67, 745.28, 72, 10.35, 5],
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2
                }, {
                    label: 'Tiempo Optimizado (horas)',
                    data: [153.33, 745.28, 72, 7.2, 3.75],
                    backgroundColor: 'rgba(100, 255, 218, 0.6)',
                    borderColor: 'rgba(100, 255, 218, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ccd6f6',
                            font: { size: 14 }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Comparación de Tiempos por Etapa',
                        color: '#e6f1ff',
                        font: { size: 18, weight: 'bold' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#8892b0' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        ticks: { color: '#8892b0' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
    }

    // Gráfico de ROI
    const roiChart = document.getElementById('roiChart');

    if (roiChart) {
        new Chart(roiChart, {
            type: 'doughnut',
            data: {
                labels: ['Ahorro en Mano de Obra', 'Ahorro en Tiempo', 'Incremento de Capacidad', 'Costos Adicionales'],
                datasets: [{
                    data: [3000, 2500, 4000, 1500],
                    backgroundColor: [
                        'rgba(100, 255, 218, 0.8)',
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(34, 211, 238, 0.8)',
                        'rgba(248, 113, 113, 0.8)'
                    ],
                    borderColor: [
                        'rgba(100, 255, 218, 1)',
                        'rgba(102, 126, 234, 1)',
                        'rgba(34, 211, 238, 1)',
                        'rgba(248, 113, 113, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ccd6f6',
                            font: { size: 12 },
                            padding: 15
                        }
                    },
                    title: {
                        display: true,
                        text: 'Distribución de Beneficios Mensuales ($)',
                        color: '#e6f1ff',
                        font: { size: 18, weight: 'bold' }
                    }
                }
            }
        });
    }

    // Gráfico de Línea - Proyección Anual
    const projectionChart = document.getElementById('projectionChart');

    if (projectionChart) {
        new Chart(projectionChart, {
            type: 'line',
            data: {
                labels: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6', 'Mes 7', 'Mes 8', 'Mes 9', 'Mes 10', 'Mes 11', 'Mes 12'],
                datasets: [{
                    label: 'Ahorro Acumulado ($)',
                    data: [8000, 16000, 24000, 32000, 40000, 48000, 56000, 64000, 72000, 80000, 88000, 96000],
                    borderColor: 'rgba(100, 255, 218, 1)',
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgba(100, 255, 218, 1)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ccd6f6',
                            font: { size: 14 }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Proyección de Ahorro Anual',
                        color: '#e6f1ff',
                        font: { size: 18, weight: 'bold' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#8892b0',
                            callback: function (value) {
                                return '$' + value.toLocaleString();
                            }
                        },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        ticks: { color: '#8892b0' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
    }
}

// Inicializar gráficos cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharts);
} else {
    initCharts();
}

// ============================================
// ANIMACIÓN DE CONTADORES
// ============================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Activar contadores cuando sean visibles
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(counter => {
    counterObserver.observe(counter);
});

// ============================================
// SMOOTH SCROLL MEJORADO
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// LOADING SCREEN (OPCIONAL)
// ============================================

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

console.log('%c✅ Todos los módulos cargados correctamente', 'color: #64ffda; font-size: 14px; font-weight: bold;');