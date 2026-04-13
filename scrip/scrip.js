// ===== VARIABLES GLOBALES =====
const menuToggle = document.getElementById('menuToggle');
const navList = document.querySelector('.nav-list');
const bookBtn = document.getElementById('bookBtn');
const whatsappBtn = document.getElementById('whatsappBtn');
const appointmentForm = document.getElementById('appointmentForm');

// Número de WhatsApp de la clínica
const WHATSAPP_NUMBER = '+573015351853';

// ===== MENÚ MÓVIL =====
/**
 * Esta función abre/cierra el menú en dispositivos móviles
 * Cuando el usuario hace clic en el botón hamburguesa, el menú se muestra/oculta
 */
menuToggle.addEventListener('click', function() {
    // Alterna la clase 'active' en la lista de navegación
    navList.classList.toggle('active');
    
    // Anima el botón hamburguesa
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach(span => {
        span.style.transition = 'all 0.3s ease';
    });
    
    // Efecto visual: convierte las líneas en una X
    if (navList.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Cerrar menú cuando se hace clic en un enlace
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    });
});

// ===== FUNCIONES DE WHATSAPP =====
/**
 * Genera el mensaje para enviar a WhatsApp
 * Toma los datos del formulario y crea un mensaje formateado
 */
function generarMensajeWhatsApp(datos) {
    const mensaje = `
Hola VetCare Clinic,

Me gustaría agendar una cita:

👤 *Nombre del dueño:* ${datos.ownerName}
🐾 *Nombre de la mascota:* ${datos.petName}
🏥 *Servicio:* ${datos.service}
📅 *Fecha preferida:* ${datos.date}
${datos.message ? `📝 *Notas:* ${datos.message}` : ''}

¡Gracias!
    `.trim();
    
    return encodeURIComponent(mensaje);
}

/**
 * Abre WhatsApp con el mensaje pre-llenado
 * El usuario solo necesita hacer clic en "Enviar"
 */
function abrirWhatsApp(mensaje) {
    const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;
    window.open(urlWhatsApp, '_blank');
}

// ===== VALIDACIÓN DE FORMULARIO =====
/**
 * Valida que todos los campos requeridos estén llenos
 * Devuelve true si es válido, false si hay errores
 */
function validarFormulario(datos) {
    // Validar que no estén vacíos
    if (!datos.ownerName.trim()) {
        alert('Por favor, ingresa tu nombre');
        return false;
    }
    
    if (!datos.petName.trim()) {
        alert('Por favor, ingresa el nombre de tu mascota');
        return false;
    }
    
    if (!datos.service) {
        alert('Por favor, selecciona un servicio');
        return false;
    }
    
    if (!datos.date) {
        alert('Por favor, selecciona una fecha');
        return false;
    }
    
    // Validar que la fecha no sea en el pasado
    const fechaSeleccionada = new Date(datos.date);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Resetear hora para comparar solo fechas
    
    if (fechaSeleccionada < hoy) {
        alert('Por favor, selecciona una fecha futura');
        return false;
    }
    
    return true;
}

// ===== MANEJADOR DEL FORMULARIO =====
/**
 * Se ejecuta cuando el usuario hace clic en "Enviar"
 * Valida los datos y abre WhatsApp
 */
appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Previene que la página se recargue
    
    // Obtener datos del formulario
    const datos = {
        ownerName: document.getElementById('ownerName').value,
        petName: document.getElementById('petName').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        message: document.getElementById('message').value
    };
    
    // Validar datos
    if (validarFormulario(datos)) {
        // Generar mensaje
        const mensaje = generarMensajeWhatsApp(datos);
        
        // Abrir WhatsApp
        abrirWhatsApp(mensaje);
        
        // Opcional: Limpiar el formulario
        appointmentForm.reset();
    }
});

// ===== BOTONES DE ACCIÓN RÁPIDA =====
/**
 * Cuando el usuario hace clic en "Book Now" o "Book via WhatsApp"
 * Se desplaza a la sección de contacto
 */
bookBtn.addEventListener('click', function() {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
});

whatsappBtn.addEventListener('click', function() {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
});

// ===== EFECTO DE SCROLL SUAVE =====
/**
 * Cuando el usuario hace clic en un enlace de navegación,
 * la página se desplaza suavemente a esa sección
 * (Ya configurado en CSS con scroll-behavior: smooth)
 */

// ===== EFECTOS DE SCROLL =====
/**
 * Añade efectos visuales mientras el usuario desplaza la página
 * Por ejemplo: cambiar el estilo del header al hacer scroll
 */
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        // Si el usuario ha desplazado más de 50px, añadir sombra al header
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        // Si está en la parte superior, remover la sombra
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// ===== ANIMACIÓN DE NÚMEROS CONTADOR (OPCIONAL) =====
/**
 * Anima los números cuando se llega a la sección "Sobre Nosotros"
 * Por ejemplo: contar de 0 a 15 para "15+ años"
 */
function animarContador(elemento, numeroFinal, duracion = 2000) {
    let numeroActual = 0;
    const incremento = numeroFinal / (duracion / 16); // 60fps
    
    const intervalo = setInterval(() => {
        numeroActual += incremento;
        if (numeroActual >= numeroFinal) {
            elemento.textContent = numeroFinal + '+';
            clearInterval(intervalo);
        } else {
            elemento.textContent = Math.floor(numeroActual) + '+';
        }
    }, 16);
}

// Detectar cuando la sección "Sobre Nosotros" es visible
const aboutSection = document.querySelector('.about');
const badgeNumber = document.querySelector('.badge-number');
let contadorAnimado = false;

const observerOptions = {
    threshold: 0.5 // Se ejecuta cuando el 50% de la sección es visible
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !contadorAnimado) {
            animarContador(badgeNumber, 15);
            contadorAnimado = true;
        }
    });
}, observerOptions);

observer.observe(aboutSection);

// ===== VALIDACIÓN EN TIEMPO REAL =====
/**
 * Valida el formulario mientras el usuario escribe
 * Muestra mensajes de error en tiempo real
 */
const ownerNameInput = document.getElementById('ownerName');
const petNameInput = document.getElementById('petName');
const dateInput = document.getElementById('date');

// Validar que el nombre no esté vacío
ownerNameInput.addEventListener('blur', function() {
    if (!this.value.trim()) {
        this.style.borderColor = '#ef4444'; // Rojo
    } else {
        this.style.borderColor = '#14B8A6'; // Turquesa
    }
});

// Validar que el nombre de la mascota no esté vacío
petNameInput.addEventListener('blur', function() {
    if (!this.value.trim()) {
        this.style.borderColor = '#ef4444';
    } else {
        this.style.borderColor = '#14B8A6';
    }
});

// Validar que la fecha no sea en el pasado
dateInput.addEventListener('change', function() {
    const fechaSeleccionada = new Date(this.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaSeleccionada < hoy) {
        this.style.borderColor = '#ef4444';
    } else {
        this.style.borderColor = '#14B8A6';
    }
});

// ===== ESTILOS DINÁMICOS PARA MENÚ MÓVIL =====
/**
 * Añade estilos CSS dinámicos para el menú móvil
 * Esto se hace con JavaScript para mayor flexibilidad
 */
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-list {
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background-color: #FFFFFF;
            flex-direction: column;
            gap: 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        
        .nav-list.active {
            max-height: 300px;
        }
        
        .nav-list li {
            padding: 15px 20px;
            border-bottom: 1px solid #E2E8F0;
        }
        
        .nav-list li:last-child {
            border-bottom: none;
        }
    }
`;
document.head.appendChild(style);

// ===== CONSOLE LOG PARA DEBUGGING =====
console.log('✅ VetCare Clinic - JavaScript cargado correctamente');
console.log('📱 Número de WhatsApp:', WHATSAPP_NUMBER);
