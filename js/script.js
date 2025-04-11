/**
 * Script principal para ElectroSoluciones
 * Incluye funcionalidades generales del sitio
 */

document.addEventListener('DOMContentLoaded', function() {
    // === Navegación móvil ===
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animación de las barras del menú hamburguesa
            const bars = document.querySelectorAll('.bar');
            if (navMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // Cerrar menú móvil al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                mobileMenu.click();
            }
        });
    });
    
    // === Slider de testimonios ===
    const testimonioSlides = document.querySelectorAll('.testimonio-slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    
    if (testimonioSlides.length > 0) {
        let currentSlide = 0;
        
        // Función para mostrar un slide específico
        function showSlide(index) {
            // Ocultar todos los slides
            testimonioSlides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Desactivar todos los dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Mostrar el slide actual
            testimonioSlides[index].classList.add('active');
            
            // Activar el dot correspondiente
            if (dots.length > 0) {
                dots[index].classList.add('active');
            }
        }
        
        // Función para ir al siguiente slide
        function nextSlide() {
            currentSlide++;
            if (currentSlide >= testimonioSlides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }
        
        // Función para ir al slide anterior
        function prevSlide() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = testimonioSlides.length - 1;
            }
            showSlide(currentSlide);
        }
        
        // Event listeners para los botones de navegación
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        
        // Event listeners para los dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Cambiar slide automáticamente cada 5 segundos
        setInterval(nextSlide, 5000);
    }
    
    // === Modal de proyectos ===
    const proyectoLinks = document.querySelectorAll('.proyecto-link');
    const modal = document.getElementById('proyecto-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalContentContainer = document.getElementById('modal-content-container');
    
    if (proyectoLinks.length > 0 && modal && modalContentContainer) {
        // Función para abrir el modal
        function openModal(proyectoId) {
            // Obtener datos del proyecto desde el objeto proyectosData (definido en index.html)
            // CORRECCIÓN: Acceder a proyectosData directamente sin window
            const proyecto = proyectosData[proyectoId];
            
            if (proyecto) {
                // Construir contenido HTML del modal
                let modalHTML = `
                    <div class="proyecto-modal-content">
                        <h2>${proyecto.titulo}</h2>
                        <p class="proyecto-ubicacion"><i class="fas fa-map-marker-alt"></i> ${proyecto.ubicacion}</p>
                        <div class="proyecto-descripcion">
                            <p>${proyecto.descripcion}</p>
                        </div>
                        <div class="proyecto-detalles">
                            <h3>Detalles del Proyecto</h3>
                            <ul>
                `;
                
                // Agregar los detalles del proyecto
                proyecto.detalles.forEach(detalle => {
                    modalHTML += `<li><i class="fas fa-check"></i> ${detalle}</li>`;
                });
                
                modalHTML += `
                            </ul>
                        </div>
                        <div class="proyecto-galeria">
                            <h3>Galería</h3>
                            <div class="galeria-grid">
                `;
                
                // Agregar las imágenes
                proyecto.imagenes.forEach(imagen => {
                    modalHTML += `
                        <div class="galeria-item">
                            <img src="${imagen}" alt="${proyecto.titulo}">
                        </div>
                    `;
                });
                
                modalHTML += `
                            </div>
                        </div>
                    </div>
                `;
                
                // Insertar el HTML en el contenedor del modal
                modalContentContainer.innerHTML = modalHTML;
                
                // Mostrar el modal
                modal.style.display = 'block';
                
                // Evitar scroll en el body
                document.body.style.overflow = 'hidden';
            }
        }
        
        // Event listeners para abrir el modal
        proyectoLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const proyectoId = this.getAttribute('data-id');
                openModal(proyectoId);
            });
        });
        
        // Event listener para cerrar el modal
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Cerrar modal al hacer clic fuera del contenido
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Añadir cierre con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // === Animación al hacer scroll ===
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    // Ejecutar la animación al cargar la página
    animateOnScroll();
    
    // Ejecutar la animación al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // === Newsletter Form ===
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Aquí se implementaría la lógica para enviar el email al servidor
            // Por ahora, solo simulamos el éxito
            
            // Mostrar mensaje de éxito
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>¡Gracias por suscribirte!</p>
            `;
            
            // Reemplazar el formulario con el mensaje de éxito
            this.innerHTML = '';
            this.appendChild(successMessage);
            
            // Restaurar el formulario después de 3 segundos (opcional)
            setTimeout(() => {
                newsletterForm.innerHTML = `
                    <input type="email" placeholder="Tu email" required>
                    <button type="submit" class="btn-submit">Suscribirse</button>
                `;
            }, 3000);
        });
    }
    
    // === Navegación Activa ===
    // Marcar el enlace activo según la sección visible
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // === Inicialización ===
    // Marcar enlaces activos en carga inicial
    setActiveNavLink();
    
    // Animación suave al hacer clic en enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== "#") {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});