//Activating Mobile Menu

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if(toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        })
    }
}

showMenu('nav-toggle', 'nav-menu');



const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
    navLink.forEach(n => n.classList.remove('active'));
    this.classList.add('active');

    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}

navLink.forEach(n => n.addEventListener('click', linkAction));



const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', scrollActive);

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
        }
    })
}



const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})

sr.reveal('.home-title', {});
sr.reveal('.home-scroll', {delay: 200});
sr.reveal('.home-img', {origin: 'right', delay: 400 });

sr.reveal('.about-img', {delay: 500});
sr.reveal('.about-subtitle', {delay: 300});
sr.reveal('.about-profession', {delay: 400});
sr.reveal('.about-text', {delay: 500});
sr.reveal('.about-social-icon', {delay: 600, interval: 200});

sr.reveal('.skills-subtitle', {});
sr.reveal('.skills-name', {distance: '20px', delay: 50, interval: 100});
sr.reveal('.skills-img', {delay: 400});

sr.reveal('.portfolio-img', {interval: 200});

sr.reveal('.contact-subtitle', {});
sr.reveal('.contact-text', {interval: 200});
sr.reveal('.contact-input', {delay: 400});
sr.reveal('.contact-button', {delay: 600});


// Lightbox 
document.querySelectorAll('.portfolio-img').forEach(img => {
    img.addEventListener('click', (e) => {
        e.preventDefault();
        
        const imgElement = img.querySelector('img');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxText = document.getElementById('lightbox-text');
        
        // Cargar contenido
        lightboxImg.src = imgElement.src;
        lightboxImg.alt = imgElement.alt;
        lightboxText.textContent = imgElement.dataset.description || "Descripción no disponible";
        
        // Mostrar lightbox
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
    });
});

// Cerrar lightbox
document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === document.getElementById('lightbox')) {
        closeLightbox();
    }
});

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Cerrar al hacer clic fuera de la imagen
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === document.getElementById('lightbox')) {
        document.getElementById('lightbox').style.display = 'none';
    }
});


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Feedback visual
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    emailjs.sendForm(
        'service_bod4q7b',
        'template_hybgihb',
        this
    )
    .then(() => {
        Swal.fire({
            title: '¡Mensaje enviado!',
            text: 'Gracias por contactarme. Te responderé pronto.',
            icon: 'success'
        });
        this.reset();
    })
    .catch(() => {
        Swal.fire({
            title: 'Error',
            text: 'No se pudo enviar el mensaje. Por favor, inténtalo nuevamente.',
            icon: 'error'
        });
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    });
});
// Lightbox para servicios
document.querySelectorAll('.skills-name').forEach(service => {
    service.addEventListener('click', (e) => {
        e.preventDefault();
        
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxText = document.getElementById('lightbox-text');
        
        // Cargar contenido
        lightboxImg.src = service.dataset.image;
        lightboxImg.alt = service.textContent;
        lightboxText.textContent = service.dataset.description || "Descripción no disponible";
        
        // Mostrar lightbox
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});
// Ocultar el título principal después de 8 segundos
window.addEventListener('DOMContentLoaded', () => {
    const homeTitle = document.querySelector('.home-title');
    if (homeTitle) {
        setTimeout(() => {
            homeTitle.classList.add('oculto');
        }, 8000); // 8000 milisegundos = 8 segundos
    }
});
