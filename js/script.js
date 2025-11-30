// ---- Carousel ----
const carouselSlides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentSlide = 0;
let carouselTimer;

function showSlide(idx) {
  carouselSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
  currentSlide = idx;
}
function nextSlide() {
  let nextIdx = (currentSlide + 1) % carouselSlides.length;
  showSlide(nextIdx);
}
function prevSlide() {
  let prevIdx = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
  showSlide(prevIdx);
}
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });
  function startAutoplay() {
    carouselTimer = setInterval(nextSlide, 3500);
  }
  function resetAutoplay() {
    clearInterval(carouselTimer);
    startAutoplay();
  }
  showSlide(0);
  startAutoplay();
}

// ---- Smooth Scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---- Back to Top Button ----
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if(window.scrollY > 220) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});
if (backToTopBtn) {
  backToTopBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}

// ---- Contact Form Validation ----
const contactForm = document.getElementById('contactForm');
if(contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    let msg = '';
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    if(!name) {
      valid = false; msg += 'Name is required.\n';
    }
    if(!email) {
      valid = false; msg += 'Email is required.\n';
    } else if(!/^\S+@\S+\.\S+$/.test(email)) {
      valid = false; msg += 'Invalid email address.\n';
    }
    if(!message) {
      valid = false; msg += 'Message is required.\n';
    }
    if(!valid) {
      alert(msg);
      return false;
    }
    alert('Thank you for contacting us, ' + name + '!');
    contactForm.reset();
    return true;
  });
}

