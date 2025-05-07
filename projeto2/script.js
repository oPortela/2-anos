
// Initialize date range in the footer
function initDateRange() {
    const today = new Date();
    const startDate = new Date();
    startDate.setFullYear(today.getFullYear() - 2);
    
    const startDateFormatted = startDate.toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    
    const todayFormatted = today.toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    
    const dateElements = document.querySelectorAll('#date-range');
    dateElements.forEach(element => {
      element.textContent = `${startDateFormatted} - ${todayFormatted}`;
    });
    
    // Also update days count on homepage if available
    const daysCount = document.getElementById('days-count');
    if (daysCount) {
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      daysCount.textContent = diffDays;
    }
  }
  
  // Navigation for mobile select
  function navigateTo(url) {
    window.location.href = url;
  }
  
  // Handle poem read more button
  function initPoem() {
    const readMoreBtn = document.getElementById('read-more');
    const poemContent = document.getElementById('poem-content');
    const fadeOverlay = document.getElementById('fade-overlay');
    
    if (readMoreBtn && poemContent && fadeOverlay) {
      readMoreBtn.addEventListener('click', function() {
        poemContent.classList.toggle('expanded');
        fadeOverlay.classList.toggle('hidden');
        
        if (poemContent.classList.contains('expanded')) {
          readMoreBtn.textContent = 'Mostrar menos';
        } else {
          readMoreBtn.textContent = 'Ler o poema completo';
        }
      });
    }
  }
  
  // Initialize photo gallery
  function initGallery() {
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const closeButton = document.querySelector('.close-button');
    
    if (!gallery) return;
    
    const photos = [
      {
        url: "../imagens/primeiro.jpg",
        title: "Nosso primeiro encontro",
        date: "Maio 2023"
      },
      {
        url: "../imagens/IMG-20250507-WA0074.jpg",
        title: "Aquele dia na praia",
        date: "Julho 2023"
      },
      {
        url: "../imagens/IMG-20250507-WA0077.jpg",
        title: "Nosso café favorito",
        date: "Outubro 2023"
      },
      {
        url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
        title: "Nosso futuro apartamento",
        date: "Janeiro 2024"
      },
      {
        url: "../imagens/IMG-20250507-WA0076.jpg",
        title: "Treino juntos",
        date: "Março 2024"
      },
      {
        url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
        title: "Férias inesquecíveis",
        date: "Abril 2024"
      },
      {
        url: "../imagens/IMG-20250507-WA0057.jpg",
        title: "Sob as estrelas",
        date: "Maio 2024"
      },
      {
        url: "../imagens/IMG-20250507-WA0059.jpg",
        title: "Jantar romântico",
        date: "Janeiro 2025"
      },
      {
        url: "../imagens/IMG-20250507-WA0075.jpg",
        title: "Celebrando conquistas",
        date: "Março 2025"
      }
    ];
    
    // Create gallery items
    photos.forEach((photo, index) => {
      const delay = index * 0.1;
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.style.animationDelay = `${delay}s`;
      item.innerHTML = `
        <img src="${photo.url}" alt="${photo.title}">
        <div class="gallery-caption">
          <h3>${photo.title}</h3>
          <p>${photo.date}</p>
        </div>
      `;
      
      item.addEventListener('click', () => {
        modalImg.src = photo.url;
        modalTitle.textContent = photo.title;
        modalDate.textContent = photo.date;
        modal.style.display = 'block';
      });
      
      gallery.appendChild(item);
    });
    
    // Close modal when clicking the X
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
    
    // Close modal when clicking outside the content
    if (modal) {
      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  }
  
  // Special page functionality
  function initSpecialPage() {
    const heartsContainer = document.getElementById('hearts-container');
    const revealBtn = document.getElementById('reveal-btn');
    const nextBtn = document.getElementById('next-btn');
    const initialMessage = document.getElementById('initial-message');
    const specialMessage = document.getElementById('special-message');
    const messageText = document.getElementById('message-text');
    
    if (!heartsContainer) return;
    
    // Special messages
    const messages = [
      "Você é a pessoa mais incrível que já conheci.",
      "Seu sorriso ilumina meus dias mais escuros.",
      "Amo seu jeito único de ver o mundo.",
      "Você me faz querer ser uma pessoa melhor.",
      "Sonho com um futuro onde envelheceremos juntos.",
      "Você é meu porto seguro em meio às tempestades.",
      "Seu coração é o maior tesouro que já encontrei.",
      "Cada momento com você é um presente na minha vida.",
      "Meu amor por você cresce a cada dia que passa.",
      "Você é a melhor parte da minha história.",
      "Quero construir milhares de memórias ao seu lado.",
      "Obrigado por me escolher todos os dias."
    ];
    
    let currentMessageIndex = 0;
    
    // Create floating hearts
    function createHeart() {
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.className = 'floating-heart';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
      
      heartsContainer.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 5000);
    }
    
    // Start creating hearts
    const heartInterval = setInterval(createHeart, 500);
    
    // Type message effect
    function typeMessage(text) {
      messageText.textContent = '';
      let i = 0;
      
      function type() {
        if (i < text.length) {
          messageText.textContent += text.charAt(i);
          i++;
          setTimeout(type, 50);
        }
      }
      
      type();
    }
    
    // Handle reveal button
    if (revealBtn) {
      revealBtn.addEventListener('click', () => {
        initialMessage.classList.add('hidden');
        specialMessage.classList.remove('hidden');
        typeMessage(messages[currentMessageIndex]);
      });
    }
    
    // Handle next button
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentMessageIndex++;
        
        if (currentMessageIndex < messages.length) {
          typeMessage(messages[currentMessageIndex]);
        } else {
          messageText.textContent = "Estas são todas as mensagens por enquanto... Mas meu amor por você é infinito! ❤️";
          nextBtn.textContent = "Ver Novamente";
          currentMessageIndex = 0;
        }
      });
    }
  }
  
  // Initialize everything when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    initDateRange();
    initPoem();
    initGallery();
    initSpecialPage();
  });
  