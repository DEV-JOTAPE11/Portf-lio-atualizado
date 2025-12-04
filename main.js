/* --- INÍCIO DO ARQUIVO MAIN.JS --- */

// 1. Definição dos elementos de navegação
const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80, 
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

// 2. Definição e Configuração da Animação (Reveal)
// IMPORTANTE: Definimos isso ANTES de usar no scroll
const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');

// Adiciona a classe inicial invisível
revealElements.forEach(el => el.classList.add('reveal'));

// Função que verifica se deve mostrar o elemento
function checkReveal() {
  const windowHeight = window.innerHeight;
  const revealPoint = 150;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    
    // Se o elemento estiver na tela, mostra ele
    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active-reveal');
    }
  });
}

// 3. Botão Voltar ao Topo
const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #474af0;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

// 4. Evento de Scroll Unificado
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  // Lógica do Menu Ativo
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  // Mostra/Esconde botão topo
  if(window.scrollY > 500){
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  // CHAMA A ANIMAÇÃO AO ROLAR
  checkReveal();
});

// 5. Efeitos dos Cards
const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

// 6. Efeito de Digitação
const typingElement = document.querySelector('.info-home h3'); 
const words = ["Desenvolvedor front-end", "Especialista em landing pages", "UI/UX Designer", "Desenvolvedor Web"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    
    if(typingElement) {
        typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';
    }

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

document.addEventListener('DOMContentLoaded', type);

// 7. Tela de Carregamento (Loading Screen)
// 7. Tela de Carregamento (Loading Screen)
document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay=0){
    if(element) {
        setTimeout(() => {
        element.classList.remove("hidden");
        element.classList.add("fall");
        }, delay);
    }
  }

  // Sequência de animação da tela de loading
  showElement(loadingText, 0);          
  showElement(mainIcon, 800);         
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx*400);  
  });
  showElement(designerText, 2800);    

  // Fim do loading e entrada do site
  setTimeout(() => {
    loadingScreen.style.opacity = '0'; // Começa a sumir a tela preta
    
    setTimeout(() => {
        loadingScreen.style.display='none';
    }, 500);

    mainPage.classList.add("visible"); // O site começa a aparecer suavemente

    // --- A MUDANÇA ESTÁ AQUI ---
    // Adicionamos um atraso de 500ms. 
    // Isso espera o site ficar visível antes de iniciar a animação dos elementos subindo.
    setTimeout(() => {
        checkReveal(); 
    }, 500); 
    // ---------------------------

  }, 4000);
});

// 8. Lógica do Formulário WhatsApp
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.user_name.value;
    const email = this.user_email.value;
    const message = this.message.value;
    const fullMessage = `Olá! Meu nome é *${name}*.\nMeu email é: ${email}\n\n*Mensagem:* ${message}`;
    const phoneNumber = "5538998304003"; 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, '_blank');
    this.reset();
  });
}

// 9. Lógica do Menu Mobile (Hambúrguer)
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".ul-list");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".ul-list li a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}
/* --- FIM DO ARQUIVO MAIN.JS --- */