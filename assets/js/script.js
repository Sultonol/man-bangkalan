/**
 * MAN Bangkalan - JavaScript
 * Website interaktif dengan animasi, validasi, dan fitur responsive
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavbar();
    initScrollEffects();
    initCounterAnimation();
    initSmoothScroll();
    initMobileMenu();
    initScrollToTop();
    initFilter();
    initLightbox();
    initFormValidation();
    initModal();
});

/**
 * Navbar - Efek saat scroll
 */
function initNavbar() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/**
 * Scroll Effects - Animasi fade-in saat elemen terlihat
 */
function initScrollEffects() {
    const fadeElements = document.querySelectorAll('.section, .profil-card, .program-card, .fasilitas-item, .prestasi-card, .berita-card, .galeri-item, .testimoni-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/**
 * Counter Animation - Animasi angka统计
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Smooth Scroll untuk anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (toggle && navMenu) {
        toggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            toggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                toggle.classList.remove('active');
            }
        });

        // Close menu when window is resized
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                toggle.classList.remove('active');
            }
        });
    }
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Filter untuk Berita dan Galeri
 */
function initFilter() {
    // Filter Berita
    const filterBtns = document.querySelectorAll('.filter-btn');
    const beritaCards = document.querySelectorAll('.berita-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            beritaCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Filter Galeri
    const filterBtnsGaleri = document.querySelectorAll('.filter-btn-galeri');
    const galeriItems = document.querySelectorAll('.galeri-item');

    filterBtnsGaleri.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active button
            filterBtnsGaleri.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            galeriItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * Lightbox untuk Galeri
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const galeriItems = document.querySelectorAll('.galeri-item');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxCaption = document.querySelector('.lightbox-caption');

    if (!lightbox) return;

    galeriItems.forEach(item => {
        item.addEventListener('click', () => {
            const overlay = item.querySelector('.galeri-overlay span');
            const caption = overlay ? overlay.textContent : 'Gambar';
            
            lightbox.classList.add('active');
            lightboxCaption.textContent = caption;
            document.body.style.overflow = 'hidden';
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Form Validation - Validasi formulir PPDB dan Kontak
 */
function initFormValidation() {
    // PPDB Form
    const ppdbForm = document.getElementById('ppdbForm');
    if (ppdbForm) {
        ppdbForm.addEventListener('submit', handlePPDBSubmit);
        
        // Real-time validation
        const inputs = ppdbForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    }

    // Kontak Form
    const kontakForm = document.getElementById('kontakForm');
    if (kontakForm) {
        kontakForm.addEventListener('submit', handleKontakSubmit);
    }
}

function validateField(input) {
    const fieldName = input.name;
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove previous error
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.textContent = '';
    }
    input.classList.remove('error');

    // Validation rules
    switch(fieldName) {
        case 'nama':
            if (!value) {
                isValid = false;
                errorMessage = 'Nama wajib diisi';
            } else if (value.length < 3) {
                isValid = false;
                errorMessage = 'Nama minimal 3 karakter';
            }
            break;
            
        case 'nik':
            if (!value) {
                isValid = false;
                errorMessage = 'NIK wajib diisi';
            } else if (!/^\d{16}$/.test(value)) {
                isValid = false;
                errorMessage = 'NIK harus 16 digit angka';
            }
            break;
            
        case 'no_hp':
            if (!value) {
                isValid = false;
                errorMessage = 'No. HP wajib diisi';
            } else if (!/^[\d\s\-+()]{10,}$/.test(value)) {
                isValid = false;
                errorMessage = 'Format no. HP tidak valid';
            }
            break;
            
        case 'email':
            if (!value) {
                isValid = false;
                errorMessage = 'Email wajib diisi';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Format email tidak valid';
            }
            break;
    }

    if (!isValid) {
        input.classList.add('error');
        const errorEl = document.getElementById(fieldName + 'Error');
        if (errorEl) {
            errorEl.textContent = errorMessage;
        }
    }

    return isValid;
}

function handlePPDBSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    // Validate all required fields
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (!isValid) {
        showModal('error', 'Mohon lengkapi semua data dengan benar!');
        return;
    }

    // Show loading (simulated)
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        showModal('success', 'Pendaftaran PPDB berhasil submitted! Kami akan menghubungi Anda melalui email.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function handleKontakSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const nama = form.querySelector('#nama_pengirim').value.trim();
    const email = form.querySelector('#email_pengirim').value.trim();
    const subjek = form.querySelector('#subjek').value.trim();
    const pesan = form.querySelector('#pesan').value.trim();

    if (!nama || !email || !subjek || !pesan) {
        showModal('error', 'Mohon lengkapi semua field!');
        return;
    }

    // Show loading
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        showModal('success', 'Pesan berhasil dikirim! Tim kami akan merespons dalam 1x24 jam.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

/**
 * Modal - Alert/Confirmation Modal
 */
function initModal() {
    const modal = document.getElementById('alertModal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.getElementById('alertBody');

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function showModal(type, message) {
    const modal = document.getElementById('alertModal');
    const modalBody = document.getElementById('alertBody');
    const icon = type === 'success' ? '✅' : '❌';

    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 16px;">${icon}</div>
        <h3 style="margin-bottom: 12px;">${type === 'success' ? 'Berhasil!' : 'Gagal!'}</h3>
        <p style="color: var(--gray);">${message}</p>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}