// script.js
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

// Handle window resize
window.addEventListener('resize', resizeCanvas);

// Grid parameters
const gridSize = 50; // Spacing between grid lines
const gridCount = 40; // Number of lines in each direction
const speed = 200; // Pixels per second
const lines = [];

// Initialize grid lines
for (let i = -gridCount / 2; i <= gridCount / 2; i++) {
  // Vertical lines (parallel to z-axis)
  lines.push({
    type: 'vertical',
    x: i * gridSize,
  });

  // Horizontal lines (parallel to x-axis)
  lines.push({
    type: 'horizontal',
    y: i * gridSize,
  });
}

// Perspective projection function
function project(x, y, z, fov, viewerDistance) {
  // Avoid division by zero and negative scaling
  if (viewerDistance + z === 0) {
    return { x: 0, y: 0, scale: 0 };
  }
  const scale = fov / (viewerDistance + z);
  return {
    x: x * scale + canvas.width / 2,
    y: y * scale + canvas.height / 2,
    scale,
  };
}

let lastTime = null;
let zOffset = 0; // Starting position of the grid

function animate(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const deltaTime = (timestamp - lastTime) / 1000; // Convert to seconds
  lastTime = timestamp;

  // Update the current Z position based on speed and elapsed time
  zOffset += speed * deltaTime;
  if (zOffset > gridSize * gridCount) {
    zOffset = 0; // Reset to loop the grid
  }

  // Clear the canvas
  ctx.fillStyle = '#000'; // Black background
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set grid line style
  ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)'; // Brighter cyan color
  ctx.lineWidth = 1;

  const fov = 500; // Field of view
  const viewerDistance = 1000; // Distance from the viewer to the projection plane

  ctx.beginPath();

  lines.forEach((line) => {
    if (line.type === 'vertical') {
      // Vertical lines: x varies, y from -infty to +infty, z increases
      let x = line.x;
      for (let z = zOffset; z < zOffset + gridSize * gridCount; z += gridSize) {
        const p1 = project(x, -canvas.height, z, fov, viewerDistance);
        const p2 = project(x, canvas.height, z, fov, viewerDistance);
        if (p1.scale > 0 && p2.scale > 0) {
          // Ensure lines are in front of the viewer
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      }
    } else if (line.type === 'horizontal') {
      // Horizontal lines: y varies, x from -infty to +infty, z increases
      let y = line.y;
      for (let z = zOffset; z < zOffset + gridSize * gridCount; z += gridSize) {
        const p1 = project(-canvas.width, y, z, fov, viewerDistance);
        const p2 = project(canvas.width, y, z, fov, viewerDistance);
        if (p1.scale > 0 && p2.scale > 0) {
          // Ensure lines are in front of the viewer
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      }
    }
  });

  ctx.stroke();

  // Reset the animation loop
  requestAnimationFrame(animate);
}

// Start the animation
requestAnimationFrame(animate);
