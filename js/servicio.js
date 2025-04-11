/**
 * Script específico para la página de servicios
 */

document.addEventListener('DOMContentLoaded', function() {
    // === Navegación de servicios ===
    const servicioLinks = document.querySelectorAll('.servicio-link');
    const servicioSections = document.querySelectorAll('.servicio-detail');
    
    // Función para activar un servicio
    function activateService(id) {
        // Desactivar todos los enlaces y secciones
        servicioLinks.forEach(link => link.classList.remove('active'));
        servicioSections.forEach(section => {
            section.style.display = 'none';
            section.style.opacity = '0';
        });
        
        // Activar el enlace correspondiente
        const activeLink = document.querySelector(`.servicio-link[href="#${id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Mostrar la sección correspondiente con animación
        const activeSection = document.getElementById(id);
        if (activeSection) {
            activeSection.style.display = 'block';
            
            // Forzar un reflow antes de agregar la transición
            void activeSection.offsetWidth;
            
            activeSection.style.opacity = '1';
            
            // Desplazarse a la sección
            window.scrollTo({
                top: activeSection.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }
    
    // Event listeners para los enlaces de servicio
    servicioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            activateService(targetId);
            
            // Actualizar la URL sin recargar la página
            history.pushState(null, null, `#${targetId}`);
        });
    });
    
    // Activar el servicio correspondiente al cargar la página
    function activateFromHash() {
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.substring(1);
            activateService(targetId);
        } else {
            // Si no hay hash, activar el primer servicio
            const firstServiceId = servicioSections[0]?.id;
            if (firstServiceId) {
                activateService(firstServiceId);
            }
        }
    }
    
    // Activar al cargar la página
    activateFromHash();
    
    // Activar al cambiar el hash
    window.addEventListener('hashchange', activateFromHash);
    
    // === FAQ Accordion ===
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon i');
        
        // Por defecto, ocultar todas las respuestas excepto la primera
        if (item !== faqItems[0]) {
            answer.style.maxHeight = '0px';
            answer.style.opacity = '0';
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.opacity = '1';
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
            item.classList.add('active');
        }
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Cerrar todas las respuestas
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-icon i');
                
                if (otherItem !== item) {
                    otherAnswer.style.maxHeight = '0px';
                    otherAnswer.style.opacity = '0';
                    otherItem.classList.remove('active');
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                }
            });
            
            // Abrir o cerrar la respuesta actual
            if (!isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                item.classList.add('active');
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                answer.style.maxHeight = '0px';
                answer.style.opacity = '0';
                item.classList.remove('active');
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });
    
    // === Animación al hacer scroll ===
    const animateOnScroll = function() {
        const servicioCards = document.querySelectorAll('.servicio-detail');
        
        servicioCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.classList.add('animated');
            }
        });
    };
    
    // Ejecutar la animación al cargar la página
    animateOnScroll();
    
    // Ejecutar la animación al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
});