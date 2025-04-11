/**
 * Script específico para la página de presupuesto
 */

document.addEventListener('DOMContentLoaded', function() {
    // === Formulario de presupuesto ===
    const presupuestoForm = document.getElementById('presupuesto-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const closeConfirmation = document.getElementById('close-confirmation');
    const tipoServicio = document.getElementById('tipo-servicio');
    const otroServicioContainer = document.getElementById('otro-servicio-container');
    const fileInput = document.getElementById('adjuntar-foto');
    const fileName = document.getElementById('file-name');
    
    // Mostrar campo "Otro servicio" cuando se seleccione "Otro"
    if (tipoServicio && otroServicioContainer) {
        tipoServicio.addEventListener('change', function() {
            if (this.value === 'otro') {
                otroServicioContainer.style.display = 'block';
                document.getElementById('otro-servicio').setAttribute('required', '');
            } else {
                otroServicioContainer.style.display = 'none';
                document.getElementById('otro-servicio').removeAttribute('required');
            }
        });
    }
    
    // Mostrar nombre del archivo seleccionado
    if (fileInput && fileName) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileName.textContent = this.files[0].name;
            } else {
                fileName.textContent = 'No hay archivo seleccionado';
            }
        });
    }
    
    // Envío del formulario
    if (presupuestoForm) {
        presupuestoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar el formulario
            if (!validateForm()) {
                return;
            }
            
            // Recoger los datos del formulario
            const formData = new FormData(presupuestoForm);
            
            // Aquí se implementaría la lógica para enviar los datos al servidor
            // Por ahora, simulamos el envío con un timeout
            const submitButton = presupuestoForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                // Mostrar mensaje de confirmación
                if (confirmationMessage) {
                    confirmationMessage.style.display = 'flex';
                }
                
                // Resetear el formulario
                presupuestoForm.reset();
                if (fileName) {
                    fileName.textContent = 'No hay archivo seleccionado';
                }
                if (otroServicioContainer) {
                    otroServicioContainer.style.display = 'none';
                }
                
                submitButton.disabled = false;
                submitButton.innerHTML = 'Enviar Solicitud de Presupuesto';
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
        const inputs = presupuestoForm.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
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
    
    // Añadir validación en tiempo real
    const requiredInputs = presupuestoForm.querySelectorAll('input[required], textarea[required], select[required]');
    
    requiredInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
        
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
});