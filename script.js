const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});


function scrollToForm() {
  document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
}


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // one-time animation
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


const eventDate = new Date('March 27, 2026 10:00:00').getTime();

const elements = {
  d: document.getElementById('cd-d'),
  h: document.getElementById('cd-h'),
  m: document.getElementById('cd-m'),
  s: document.getElementById('cd-s')
};

let previousValues = { d: '', h: '', m: '', s: '' };

function updateCountdown() {
  const now = Date.now();
  const diff = eventDate - now;

  if (diff <= 0) {
    Object.values(elements).forEach(el => el.textContent = "00");
    return;
  }

  const values = {
    d: String(Math.floor(diff / 86400000)).padStart(2, '0'),
    h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
    m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
    s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
  };

  Object.keys(values).forEach(key => {
    if (values[key] !== previousValues[key]) {
      const el = elements[key];
      el.classList.remove('flip');
      void el.offsetWidth; // restart animation
      el.classList.add('flip');
      el.textContent = values[key];
      previousValues[key] = values[key];
    }
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);


const images = [
  'https://images.unsplash.com/photo-1610189844947-c5b55c97e54b?w=400&q=70',
  'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=70',
  'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&q=70',
  'https://images.unsplash.com/photo-1600508773957-05f7c9f4e73b?w=400&q=70',
  'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=400&q=70',
  'https://images.unsplash.com/photo-1619380061814-58f03707f082?w=400&q=70',
];

const track = document.getElementById('galleryTrack');

if (track) {
  [...images, ...images].forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'gallery-img';
    track.appendChild(img);
  });
}


const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzrrNY5ga4_AqwVEai1szg83p1_BwSRZ32WFgiL_Ppqu_Cs8khl59nLHO_gc7NQpYdSRg/exec';

const form = document.getElementById('formData');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type=submit]');
  btn.innerHTML = "Processing...";
  btn.disabled = true;

  const data = {
    name: document.getElementById('inp-name').value.trim(),
    email: document.getElementById('inp-email').value.trim(),
    phone: document.getElementById('inp-phone').value.trim(),
    message: document.getElementById('inp-msg').value.trim(),
  };

  if (!data.name || !data.email || !data.phone) {
    showStatus("Please fill all required fields", true);
    resetBtn(btn);
    return;
  }

  try {
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    showStatus("Registered successfully 🎉");
    form.reset();
    openPopup();

  } catch (err) {
    showStatus("Submission failed. Try again.", true);
  }

  resetBtn(btn);
});


function showStatus(msg, isError = false) {
  status.textContent = msg;
  status.style.color = isError ? "#e06c75" : "#c9a84c";
}


function resetBtn(btn) {
  btn.innerHTML = `Confirm Registration`;
  btn.disabled = false;
}


const popupOverlay = document.getElementById('popupOverlay');

function openPopup() {
  popupOverlay.classList.add('show');
}

function closePopup() {
  popupOverlay.classList.remove('show');
}

popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) closePopup();
});

setTimeout(() => {
  if (popupOverlay.classList.contains('show')) closePopup();
}, 6000);


const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.height = '3px';
progressBar.style.background = 'linear-gradient(90deg,#c9a84c,#e8cc80)';
progressBar.style.zIndex = '9999';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  const height = document.body.scrollHeight - window.innerHeight;
  const progress = (scroll / height) * 100;
  progressBar.style.width = progress + '%';
});