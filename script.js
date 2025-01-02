// Page configuration and content
const pages = {
  home: {
    id: 'homeContent',
    title: 'About Us',
    text: `Modern Code develops innovative and user-friendly apps for the App Store.

We are dedicated to creating high-quality applications that enhance the mobile experience for our users.`,
  },
  privacy: {
    id: 'privacyContent',
    title: 'Privacy Policy',
    text: `The developer of this app respects your privacy with a strict zero data collection policy.

This app does not:
- transmit any data
- connect to any server
- connect to the internet
- collect any information
- track you
- collect any data whatsoever
- collect personal data
- collect aggregate data
- collect anonymous data

Simply put, you can use the app with 100% privacy.

> Contact Developer
jake@moderncode.ai`,
  },
  contact: {
    id: 'contactContent',
    title: 'Contact Us',
    text: `If you have any questions, comments, or concerns, please feel free to reach out to us:

> Email: jake@moderncode.ai

We value your feedback and will do our best to respond to your inquiries in a timely manner.`,
  },
};

// Track animation state
let isAnimating = false;
let currentPage = '';

// Typing animation function
function typeText(element, text, speed = 10) {
  return new Promise((resolve) => {
    let i = 0;
    element.innerHTML = '';
    element.style.visibility = 'visible';

    // Create cursor element once
    const cursor = document.createElement('span');
    cursor.className = 'cursor';

    function type() {
      if (i < text.length) {
        // Remove cursor before adding new character
        if (element.contains(cursor)) {
          element.removeChild(cursor);
        }

        if (text.charAt(i) === '\n') {
          element.appendChild(document.createElement('br'));
        } else {
          const char = document.createTextNode(text.charAt(i));
          element.appendChild(char);
        }

        // Add cursor after current text
        element.appendChild(cursor);
        i++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }

    type();
  });
}

// Content switching function
async function showContent(pageName) {
  // Don't switch if we're on the current page or animating
  if (pageName === currentPage || isAnimating) {
    return;
  }

  isAnimating = true;
  const currentContent = document.getElementById(pages[currentPage].id);
  const newContent = document.getElementById(pages[pageName].id);

  // Update menu styles
  document.querySelectorAll('.menu a').forEach((link) => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === pageName) {
      link.classList.add('active');
      link.style.pointerEvents = 'none';
    } else {
      link.classList.remove('active');
      link.style.pointerEvents = 'auto';
    }
  });

  // Fade out current content
  currentContent.style.opacity = '0';

  await new Promise((resolve) => setTimeout(resolve, 300));

  // Switch content
  currentContent.classList.remove('active');
  newContent.classList.add('active');
  newContent.style.opacity = '1';

  // Update current page
  currentPage = pageName;

  // Start typing animation
  const textElement = newContent.querySelector('.terminal-text');
  const originalText = pages[pageName].text;

  await typeText(textElement, originalText);
  isAnimating = false;
}

// Initialize terminal
document.addEventListener('DOMContentLoaded', async () => {
  // Find active page by checking active content
  const activeContent = document.querySelector('.terminal-content.active');
  currentPage = Object.keys(pages).find(
    (page) => pages[page].id === activeContent.id
  );

  // Initialize all content sections
  Object.entries(pages).forEach(([pageName, pageData]) => {
    const section = document.getElementById(pageData.id);
    const title = section.querySelector('.terminal-title');
    title.innerHTML = `> ${pageData.title}`;
  });

  // Set up menu items
  document.querySelectorAll('.menu a').forEach((link) => {
    const pageName = link.getAttribute('onclick').match(/'([^']+)'/)[1];
    link.setAttribute('data-page', pageName);
    if (pageName === currentPage) {
      link.classList.add('active');
      link.style.pointerEvents = 'none';
    }
  });

  const terminal = document.querySelector('.glass-effect');
  terminal.classList.add('expanded');

  // Start initial typing animation
  const initialText = document.querySelector(
    '.terminal-content.active .terminal-text'
  );
  await typeText(initialText, pages[currentPage].text);
  isAnimating = false;
});

// Grid animation setup
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let gridSize = 40;
const speed = 1;
let offset = 0;

const horizon = () => canvas.height * 0.4;
const perspective = () => canvas.height * 1.5;
const aspectRatio = () => canvas.width / canvas.height;
const spreadFactor = () => 2.0 * aspectRatio(); // Changed from 3.2 to 2.0
const numLines = () => Math.ceil((canvas.width / gridSize) * 2); // Adjusted multiplier

function getVerticalLineOpacity(x, centerX) {
  const distance = Math.abs(x - centerX);
  const maxDistance = canvas.width / 2;
  return Math.max(0.15, Math.min(1, 1 - Math.pow(distance / maxDistance, 1.5)));
}

function getHorizontalLineOpacity(y, horizonY) {
  const distance = y - horizonY;
  const maxDistance = canvas.height - horizonY;
  const normalizedDistance = distance / maxDistance;
  return Math.max(0.2, Math.min(1, Math.pow(normalizedDistance, 1.5)));
}

function drawVignettes() {
  const maxDimension = Math.max(canvas.width, canvas.height);
  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    maxDimension * 0.6
  );
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(0.4, 'rgba(0,0,0,0.1)');
  gradient.addColorStop(0.6, 'rgba(0,0,0,0.4)');
  gradient.addColorStop(0.8, 'rgba(0,0,0,0.8)');
  gradient.addColorStop(1, 'rgba(0,0,0,0.95)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const topGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  topGradient.addColorStop(0, 'rgba(0,0,0,1)');
  topGradient.addColorStop(0.33, 'rgba(0,0,0,1)');
  topGradient.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = topGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  gridSize = Math.max(20, Math.min(40, canvas.width / 25));

  const currentHorizon = horizon();
  const currentPerspective = perspective();
  const currentAspectRatio = aspectRatio();
  const currentSpreadFactor = spreadFactor();
  const currentNumLines = numLines();

  // Draw vertical lines
  for (let x = -currentNumLines; x <= currentNumLines; x++) {
    const spacing = gridSize;

    let startX = canvas.width / 2 + x * spacing * currentSpreadFactor;
    let startY = canvas.height * 1.5;

    let endX = canvas.width / 2 + x * (spacing / 3); // Changed from /6 to /3
    let endY = currentHorizon;

    startX =
      canvas.width / 2 +
      (startX - canvas.width / 2) /
        (1 + (canvas.height - startY) / currentPerspective);

    const opacity = getVerticalLineOpacity(endX, canvas.width / 2);
    ctx.strokeStyle = `rgba(180, 190, 220, ${opacity * 0.5})`;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  // Draw horizontal lines
  const numHorizontalLines = Math.ceil(canvas.height / gridSize) * 1.5;
  for (let z = 0; z < numHorizontalLines; z++) {
    const y = currentHorizon + z * gridSize + offset;
    if (y > canvas.height * 1.5) continue;

    const perspectiveFactor = 1 + (y - currentHorizon) / currentPerspective;
    const width = canvas.width * perspectiveFactor * currentSpreadFactor;

    const opacity = getHorizontalLineOpacity(y, currentHorizon);
    ctx.strokeStyle = `rgba(180, 190, 220, ${opacity * 0.5})`;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - width / 2, y);
    ctx.lineTo(canvas.width / 2 + width / 2, y);
    ctx.stroke();
  }

  drawVignettes();

  offset = (offset + speed) % gridSize;

  requestAnimationFrame(drawGrid);
}

drawGrid();
