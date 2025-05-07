// Initialize current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Highlight active section in navigation
const sections = document.querySelectorAll('section');
const navLinks2 = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks2.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Create floating hearts
function createHearts() {
  const container = document.getElementById('hearts-container');
  const screenWidth = window.innerWidth;
  
  // Create 20 hearts
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Random position, size, and delay
    const left = Math.random() * screenWidth;
    const size = Math.random() * 20 + 10;
    const delay = Math.random() * 10;
    const duration = Math.random() * 10 + 10;
    
    heart.style.left = `${left}px`;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.animationDelay = `${delay}s`;
    heart.style.animationDuration = `${duration}s`;
    
    // Different colors for hearts
    const colors = ['#FFC0CB', '#FF69B4', '#B22222', '#FFD700'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    heart.style.backgroundColor = randomColor;
    
    // Before and after pseudo-elements inherit the color
    heart.style.setProperty('--heart-color', randomColor);
    
    container.appendChild(heart);
  }
}

// Initialize hearts
createHearts();

// Make hearts continuous by recreating them periodically
setInterval(() => {
  const container = document.getElementById('hearts-container');
  // Remove a few hearts
  const hearts = container.querySelectorAll('.heart');
  for (let i = 0; i < 5; i++) {
    if (hearts[i]) {
      hearts[i].remove();
    }
  }
  // Add new hearts
  for (let i = 0; i < 5; i++) {
    createHearts();
  }
}, 10000);

// Love letter flip effect
const loveLetter = document.querySelector('.love-letter');
loveLetter.addEventListener('click', () => {
  loveLetter.classList.toggle('flipped');
  
  // If flipped, animate the list items and message
  if (loveLetter.classList.contains('flipped')) {
    const listItems = document.querySelectorAll('#reasons-list li');
    listItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = 1;
      }, 500 + (index * 200));
    });
    
    // Show special message after all list items
    setTimeout(() => {
      document.getElementById('special-message').style.opacity = 1;
    }, 500 + (listItems.length * 200));
  } else {
    // Reset animations if closed
    const listItems = document.querySelectorAll('#reasons-list li');
    listItems.forEach(item => {
      item.style.opacity = 0;
    });
    document.getElementById('special-message').style.opacity = 0;
  }
});

// Gift box opening animation
const giftBox = document.querySelector('.gift-box');
const giftLid = document.querySelector('.gift-lid');
const giftText = document.getElementById('gift-text');

let isGiftOpen = false;

giftBox.addEventListener('click', () => {
  if (!isGiftOpen) {
    // Open the gift
    giftLid.style.transform = 'rotateX(-110deg)';
    
    // Change the message
    setTimeout(() => {
      giftText.innerHTML = `
        Você é o maior presente que eu poderia receber. 
        <br><br>
        <span class="surprise-emoji">❤️</span> <strong>Eu te amo!</strong> <span class="surprise-emoji">❤️</span>
      `;
      
      // Add some animation to the text
      giftText.style.animation = 'fadeInUp 1s forwards';
    }, 500);
    
    isGiftOpen = true;
  } else {
    // Close the gift
    giftLid.style.transform = 'rotateX(0)';
    
    // Reset the message
    setTimeout(() => {
      giftText.innerHTML = 'Clique para revelar uma surpresa especial';
      giftText.style.animation = 'none';
    }, 500);
    
    isGiftOpen = false;
  }
});

// Update active navigation link on page load
window.addEventListener('DOMContentLoaded', () => {
  // Set welcome as the default active section
  const welcomeLink = document.querySelector('a[href="#welcome"]');
  if (welcomeLink) {
    welcomeLink.classList.add('active');
  }
});