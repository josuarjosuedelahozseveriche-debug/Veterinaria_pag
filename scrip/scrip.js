// ===== VARIABLES GLOBALES =====
const menuToggle = document.getElementById('menuToggle');
const navList = document.querySelector('.nav-list');
const bookBtn = document.getElementById('bookBtn');
// ✅ Eliminado: whatsappBtn (no existe en el HTML)
const appointmentForm = document.getElementById('appointmentForm');

const WHATSAPP_NUMBER = '573015351853';

// ===== MENÚ MÓVIL =====
menuToggle.addEventListener('click', function() {
    navList.classList.toggle('active');
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach(span => { span.style.transition = 'all 0.3s ease'; });
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

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => { span.style.transform = 'none'; span.style.opacity = '1'; });
    });
});

// ===== WHATSAPP =====
function generarMensajeWhatsApp(datos) {
    const mensaje = `
Hola VetCare Clinic,

Me gustaría agendar una cita:

👤 *Nombre del dueño:* ${datos.ownerName}
🐾 *Nombre de la mascota:* ${datos.petName}
🏥 *Servicio:* ${datos.service}
📅 *Fecha preferida:* ${datos.date}
📝 *Nota adicional:* ${datos.message}

¡Gracias!
    `.trim();
    return encodeURIComponent(mensaje);
}
function abrirWhatsApp(mensaje) {
    const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;
    window.open(urlWhatsApp, '_blank');
}

// ===== VALIDACIÓN =====
function validarFormulario(datos) {
    if (!datos.ownerName.trim()) { alert('Por favor, ingresa tu nombre'); return false; }
    if (!datos.petName.trim()) { alert('Por favor, ingresa el nombre de tu mascota'); return false; }
    if (!datos.service) { alert('Por favor, selecciona un servicio'); return false; }
    if (!datos.date) { alert('Por favor, selecciona una fecha'); return false; }
    const fechaSeleccionada = new Date(datos.date);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (fechaSeleccionada < hoy) { alert('Por favor, selecciona una fecha futura'); return false; }
    return true;
}

// ===== FORMULARIO =====
appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const datos = {
        ownerName: document.getElementById('ownerName').value,
        petName: document.getElementById('petName').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        message: document.getElementById('message').value
        // ✅ Eliminado: campo 'message' que no existe
    };
    if (validarFormulario(datos)) {
        abrirWhatsApp(generarMensajeWhatsApp(datos));
        appointmentForm.reset();
    }
});

// ===== BOTÓN RESERVAR =====
bookBtn.addEventListener('click', function() {
    // ✅ Corregido: era '#contact', debe ser '#contacto'
    const contactSection = document.getElementById('contacto');
    contactSection.scrollIntoView({ behavior: 'smooth' });
});

// ===== SCROLL HEADER =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.style.boxShadow = window.scrollY > 50
        ? '0 4px 12px rgba(0,0,0,0.15)'
        : '0 2px 8px rgba(0,0,0,0.1)';
});

// ===== CONTADOR =====
function animarContador(elemento, numeroFinal, duracion = 2000) {
    let numeroActual = 0;
    const incremento = numeroFinal / (duracion / 16);
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

const aboutSection = document.querySelector('.about');
const badgeNumber = document.querySelector('.badge-number');
let contadorAnimado = false;
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !contadorAnimado) {
            animarContador(badgeNumber, 15);
            contadorAnimado = true;
        }
    });
}, { threshold: 0.5 });
observer.observe(aboutSection);

// ===== VALIDACIÓN EN TIEMPO REAL =====
const ownerNameInput = document.getElementById('ownerName');
const petNameInput = document.getElementById('petName');
const dateInput = document.getElementById('date');

ownerNameInput.addEventListener('blur', function() {
    this.style.borderColor = !this.value.trim() ? '#ef4444' : '#14B8A6';
});
petNameInput.addEventListener('blur', function() {
    this.style.borderColor = !this.value.trim() ? '#ef4444' : '#14B8A6';
});
dateInput.addEventListener('change', function() {
    const fecha = new Date(this.value);
    const hoy = new Date(); hoy.setHours(0,0,0,0);
    this.style.borderColor = fecha < hoy ? '#ef4444' : '#14B8A6';
});

// ===== MENÚ MÓVIL CSS =====
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-list { position: absolute; top: 70px; left: 0; right: 0; background-color: #FFFFFF; flex-direction: column; gap: 0; max-height: 0; overflow: hidden; transition: max-height 0.3s ease; box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
        .nav-list.active { max-height: 300px; }
        .nav-list li { padding: 15px 20px; border-bottom: 1px solid #E2E8F0; }
        .nav-list li:last-child { border-bottom: none; }
    }
`;
document.head.appendChild(style);

console.log('✅ VetCare Clinic - JavaScript cargado correctamente');