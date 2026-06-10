// CURSOR
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});
function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();
document.querySelectorAll('a, button, .service-card, .faq-question').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursorRing.style.width = '50px';
        cursorRing.style.height = '50px';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursorRing.style.width = '36px';
        cursorRing.style.height = '36px';
    });
});

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// BURGER
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
let menuOpen = false;
burger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileNav.classList.toggle('open', menuOpen);
    burger.querySelectorAll('span')[0].style.transform = menuOpen ? 'rotate(45deg) translate(5px,5px)' : '';
    burger.querySelectorAll('span')[1].style.opacity = menuOpen ? '0' : '1';
    burger.querySelectorAll('span')[2].style.transform = menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
function closeMobile() {
    menuOpen = false;
    mobileNav.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
}

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// FAQ
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// TESTIMONIAL DOTS
const track = document.getElementById('testiTrack');
const cards = track.querySelectorAll('.testi-card');
const navEl = document.getElementById('testiNav');
cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
        cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
    navEl.appendChild(dot);
});
track.addEventListener('scroll', () => {
    const dots = navEl.querySelectorAll('.testi-dot');
    const idx = Math.round(track.scrollLeft / (cards[0].offsetWidth + 24));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
});

// FORM SUBMIT
function handleSubmit() {
    const btn = document.getElementById('submitBtn');
    const nama = document.getElementById('nama').value;
    const phone = document.getElementById('phone').value;
    const unit = document.getElementById('unit').value;
    if (!nama || !phone || !unit) {
        alert('Mohon isi Nama, WhatsApp, dan Unit terlebih dahulu.');
        return;
    }
    btn.textContent = 'MENGIRIM...';
    btn.disabled = true;
    setTimeout(() => {
        btn.classList.add('sent');
        btn.textContent = 'TERKIRIM ✓';
        setTimeout(() => {
            btn.textContent = 'KIRIM BOOKING REQUEST →';
            btn.classList.remove('sent');
            btn.disabled = false;
            document.getElementById('contactForm').reset();
        }, 3000);
    }, 1200);
}

// PARALLAX HERO GLOW
window.addEventListener('mousemove', e => {
    const glow = document.querySelector('.hero-glow');
    if (glow) {
        const x = (e.clientX / window.innerWidth) * 10 - 5;
        const y = (e.clientY / window.innerHeight) * 10 - 5;
        glow.style.transform = `translate(${x}px, ${y}px)`;
    }
});