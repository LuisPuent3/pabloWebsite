/**
 * Script específico para la página de contacto
 */

document.addEventListener('DOMContentLoaded', function() {
    // === Formulario de contacto ===
    const contactForm = document.getElementById('contact-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const closeConfirmation = document.getElementById('close-confirmation');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Recoger los datos del formulario
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Aquí se implementaría la lógica para enviar los datos al servidor
            // Por ahora, simulamos el envío con un timeout
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                // Mostrar mensaje de confirmación
                if (confirmationMessage) {
                    confirmationMessage.style.display = 'flex';
                }
                
                // Resetear el formulario
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = 'Enviar Mensaje';
            }, 1500);
        });
    }
    
    // Cerrar mensaje de confirmación
    if (closeConfirmation && confirmationMessage) {
        closeConfirmation.addEventListener('click', function() {
            confirmationMessage.style.display = 'none';
        });
        
        // También cerrar al hacer clic fuera del mensaje
        confirmationMessage.addEventListener('click', function(e) {
            if (e.target === confirmationMessage) {
                confirmationMessage.style.display = 'none';
            }
        });
    }
    
    // === Validación del formulario ===
    function validateForm() {
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateInput(this);
            });
            
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateInput(input) {
        const errorClass = 'error';
        let isValid = true;
        
        // Eliminar mensaje de error anterior
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Validar según el tipo de input
        if (input.hasAttribute('required') && !input.value.trim()) {
            addError(input, 'Este campo es obligatorio');
            isValid = false;
        } else if (input.type === 'email' && input.value.trim() && !isValidEmail(input.value)) {
            addError(input, 'Email no válido');
            isValid = false;
        } else if (input.type === 'tel' && input.value.trim() && !isValidPhone(input.value)) {
            addError(input, 'Teléfono no válido');
            isValid = false;
        }
        
        // Agregar o quitar clase de error
        if (!isValid) {
            input.classList.add(errorClass);
        } else {
            input.classList.remove(errorClass);
        }
        
        return isValid;
    }
    
    function addError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function isValidPhone(phone) {
        const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return re.test(String(phone));
    }
    
    // Validar antes de enviar
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
            }
        });
    }
    
    // Inicializar la validación del formulario
    validateForm();
});