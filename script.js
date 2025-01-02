// Typing animation function
function typeText(element, text, speed = 10) {
  // Split text into lines and store as array
  const lines = text.split('\n');
  element.innerHTML = '';
  element.classList.add('typing');

  let lineIndex = 0;
  let charIndex = 0;

  // Create a container div for the text
  const textContainer = document.createElement('div');
  element.appendChild(textContainer);

  // Current line element
  let currentLineElement = document.createElement('span');
  textContainer.appendChild(currentLineElement);

  function type() {
    if (lineIndex < lines.length) {
      // If we're starting a new line
      if (charIndex === 0) {
        // Create new line element
        currentLineElement = document.createElement('span');
        textContainer.appendChild(currentLineElement);

        // Add explicit line break before new line (except for first line)
        if (lineIndex > 0) {
          textContainer.insertBefore(
            document.createElement('br'),
            currentLineElement
          );
        }
      }

      if (charIndex < lines[lineIndex].length) {
        // Add character to current line
        const char = lines[lineIndex][charIndex];
        currentLineElement.textContent += char;
        charIndex++;
        setTimeout(type, speed);
      } else {
        // Move to next line
        lineIndex++;
        charIndex = 0;
        setTimeout(type, speed);
      }
    }
  }

  type();
}

// Content switching function
function showContent(section) {
  const contentMap = {
    home: 'homeContent',
    privacy: 'privacyContent',
    contact: 'contactContent',
  };

  // Get current and new content elements
  const currentContent = document.querySelector('.terminal-content.active');
  const newContent = document.getElementById(contentMap[section]);

  if (currentContent === newContent) {
    // If clicking the same section, reset the typing animation
    const textElement = newContent.querySelector('.terminal-text');
    const originalText = textElement.textContent.trim();
    textElement.style.opacity = '0';

    setTimeout(() => {
      textElement.style.opacity = '1';
      typeText(textElement, originalText);
    }, 300);

    return;
  }

  // Fade out current content
  currentContent.style.opacity = '0';

  // After fade out, switch content and start typing
  setTimeout(() => {
    currentContent.classList.remove('active');
    newContent.classList.add('active');
    newContent.style.opacity = '1';

    // Get text content and start typing animation
    const textElement = newContent.querySelector('.terminal-text');
    const originalText = textElement.textContent.trim();
    typeText(textElement, originalText);
  }, 300);
}

// Initialize terminal
document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.querySelector('.glass-effect');
  terminal.classList.add('expanded');

  // Start initial typing animation
  const initialText = document.querySelector(
    '.terminal-content.active .terminal-text'
  );
  const originalText = initialText.textContent;
  typeText(initialText, originalText);
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
const spreadFactor = () => 3.2 * aspectRatio();
const numLines = () => Math.ceil((canvas.width / gridSize) * 2.5);

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

  const horizonY = horizon();
  ctx.save();

  ctx.beginPath();
  ctx.ellipse(
    canvas.width / 2,
    horizonY,
    canvas.width * 1.2,
    canvas.height * 0.35,
    0,
    0,
    Math.PI * 2
  );

  const ovalGradient = ctx.createRadialGradient(
    canvas.width / 2,
    horizonY,
    0,
    canvas.width / 2,
    horizonY,
    canvas.width * 0.8
  );
  ovalGradient.addColorStop(0, 'rgba(0,0,0,0)');
  ovalGradient.addColorStop(0.2, 'rgba(0,0,0,0.1)');
  ovalGradient.addColorStop(0.4, 'rgba(0,0,0,0.4)');
  ovalGradient.addColorStop(0.7, 'rgba(0,0,0,0.7)');
  ovalGradient.addColorStop(1, 'rgba(0,0,0,0.9)');

  ctx.fillStyle = ovalGradient;
  ctx.fill();
  ctx.restore();

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

    let endX = canvas.width / 2 + x * (spacing / 6);
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
