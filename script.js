const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle?.addEventListener('click', () => navMenu.classList.toggle('show'));
navMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('show')));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const id = this.getAttribute('href');
    if(id.length>1){ e.preventDefault(); document.querySelector(id)?.scrollIntoView({behavior:'smooth'}); }
  });
});

const counters = document.querySelectorAll('.count');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target; const target = parseInt(el.getAttribute('data-target'),10);
      let current = 0; const step = Math.max(1, Math.floor(target/60));
      const tick = () => { current += step; if(current>=target) current = target; el.textContent = current; if(current<target) requestAnimationFrame(tick); };
      tick(); observer.unobserve(el);
    }
  });
},{threshold:0.6});
counters.forEach(c => observer.observe(c));

const form = document.getElementById('contactForm'); const statusEl = document.getElementById('formStatus');
form?.addEventListener('submit', (e)=>{ e.preventDefault(); const data = new FormData(form); const name = data.get('name')?.toString().trim(); const email = data.get('email')?.toString().trim(); const message = data.get('message')?.toString().trim(); if(!name||!email||!message){ statusEl.textContent='Please complete all fields.'; statusEl.style.color='#d32f2f'; return; } statusEl.textContent='Thanks! We received your message.'; statusEl.style.color='#2e7d32'; form.reset(); });

document.getElementById('year').textContent = new Date().getFullYear();