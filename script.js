// Page configuration and content
const pages = {
    home: {
        id: 'homeContent',
        title: 'About Us',
        text: `Modern Code develops innovative and user-friendly apps for the App Store.

We are dedicated to creating high-quality applications that enhance the mobile experience for our users.`,
    },
    software: {
        title: 'Software',
        isSubmenu: true,
        items: {
            twoSecond: {
                id: 'twoSecondContent',
                title: 'Two-Second',
                text: `Two-Second: Quick actions for maximum efficiency.

Features:
- Instant accessibility
- Smart automation
- Seamless integration`,
            },
            yeehaw: {
                id: 'yeehawContent',
                title: 'Yeehaw Programming Language',
                text: `<div class="yeehaw-content">
    <h1><span class="emoji">🤠</span> Welcome to Yeehaw, the rootin'-tootin' programming language for Texan developers!</h1>

    <section class="yeehaw-section">
        <h2><span class="emoji">🌵</span> Getting Started</h2>
        <pre class="yeehaw-code">
howdy programName
giddyup
    // Your code here
woahThere</pre>
    </section>

    <section class="yeehaw-section">
        <h2><span class="emoji">🐎</span> Variables (yonder)</h2>
        <pre class="yeehaw-code">yonder message brand "Well, howdy there, world!"</pre>
    </section>

    <section class="yeehaw-section">
        <h2><span class="emoji">🌠</span> Data Types</h2>
        <ul class="yeehaw-list">
            <li><strong>longhorn:</strong> Whole numbers</li>
            <li><strong>tumbleweed:</strong> Decimal numbers</li>
            <li><strong>lasso:</strong> String values</li>
            <li><strong>chuckwagon:</strong> Arrays</li>
        </ul>
    </section>

    <section class="yeehaw-section">
        <h2><span class="emoji">🔥</span> Basic Operators</h2>
        <ul class="yeehaw-list">
            <li><strong>brand:</strong> Assignment</li>
            <li><strong>rope:</strong> String concatenation</li>
            <li><strong>corral:</strong> Grouping</li>
        </ul>
    </section>

    <section class="yeehaw-section">
        <h2><span class="emoji">🤠</span> Functions (rodeos)</h2>
        <pre class="yeehaw-code">
roundup functionName(params)
giddyup
    // Function code
woahThere</pre>
    </section>

    <section class="yeehaw-section">
        <h2><span class="emoji">🐴</span> Control Flow</h2>
        <ul class="yeehaw-list">
            <li><strong>iffen:</strong> Conditional statements</li>
            <li><strong>elsewise:</strong> Alternative paths</li>
            <li><strong>gallop:</strong> Loops</li>
            <li><strong>whoa:</strong> End blocks</li>
        </ul>
    </section>

    <section class="yeehaw-section">
        <h2><span class="emoji">🌄</span> Built-in Wagons</h2>
        <ul class="yeehaw-list">
            <li><strong>sixshooter:</strong> Math operations</li>
            <li><strong>campfire:</strong> Networking tools</li>
        </ul>
    </section>

    <section class="yeehaw-section">
        <h2><span class="emoji">🤖</span> Example Chatbot Program</h2>
        <pre class="yeehaw-code">
howdy chatbotProgram
giddyup
    yonder greetings brand chuckwagon[
        "Howdy!",
        "Well, hello there!",
        "How y'all doin'?"
    ]
    yonder farewell brand "Happy trails, partner!"

    roundup getResponse(question)
    giddyup
        iffen question rope "What's the weather?"
            holler "Sunny with tumbleweeds!"
        elsewise iffen question rope "Tell me a joke."
            holler "Why don't cowboys get sick? They're on the range!"
        elsewise
            holler "Shucks, partner!"
        woahThere
    woahThere

    chatLoop()
woahThere</pre>
    </section>
</div>`,
            },
            graviton: {
                id: 'gravitonContent',
                title: 'Graviton',
                text: `Graviton: Defying the laws of conventional apps.

Features:
- Gravity-defying interface
- Quantum performance
- Space-time optimization`,
            },
        },
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

// Animation state tracking
let currentPage = '';
let currentTypingTimeout = null;
let activeSubmenu = null;
let currentCursor = null;

// URL handling functions
function getPageFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('page');
}

function updateUrl(pageName) {
    const url = new URL(window.location.href);
    url.searchParams.set('page', pageName);
    window.history.pushState({}, '', url);
}


// Enhanced typing animation with HTML support
async function typeText(element, text, speed = 10) {
    return new Promise((resolve) => {
        element.style.visibility = 'visible';

        // Check if content is HTML
        const isHTML = text.trim().startsWith('<');

        if (isHTML) {
            // For HTML content, first set it completely
            element.innerHTML = text;

            // Then animate the sections
            const sections = element.querySelectorAll('.yeehaw-section');
            let delay = 0;

            sections.forEach((section, index) => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(10px)';

                setTimeout(() => {
                    section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, delay);

                delay += 100; // Stagger the animations
            });

            resolve();
        } else {
            // For plain text content, use the original character-by-character typing
            let i = 0;
            element.innerHTML = '';

            // Remove any existing cursors
            if (currentCursor) {
                currentCursor.remove();
                currentCursor = null;
            }

            // Create new cursor element
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            currentCursor = cursor;

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
                    currentTypingTimeout = setTimeout(type, speed);
                } else {
                    // Only keep cursor for main text, not for title
                    if (!element.classList.contains('terminal-title')) {
                        element.appendChild(cursor);
                    } else {
                        cursor.remove();
                    }
                    currentTypingTimeout = null;
                    resolve();
                }
            }

            type();
        }
    });
}

// Submenu toggle function
function toggleSubmenu(menuItem) {
    const submenu = menuItem.querySelector('.submenu');

    // Close any open submenu
    if (activeSubmenu && activeSubmenu !== submenu) {
        activeSubmenu.classList.remove('active');
    }

    submenu.classList.toggle('active');
    activeSubmenu = submenu.classList.contains('active') ? submenu : null;
}

// Content switching function with URL handling
async function showContent(pageName, isSubmenuItem = false, updateHistory = true) {
    if (pageName === currentPage) return;

    let pageData = pages[pageName];
    if (isSubmenuItem) {
        for (const page of Object.values(pages)) {
            if (page.isSubmenu && page.items[pageName]) {
                pageData = page.items[pageName];
                break;
            }
        }
    }

    if (!pageData) {
        console.warn(`Page ${pageName} not found, redirecting to home`);
        pageName = 'home';
        pageData = pages[pageName];
    }

    if (currentTypingTimeout) {
        clearTimeout(currentTypingTimeout);
        currentTypingTimeout = null;
    }

    if (currentCursor) {
        currentCursor.remove();
        currentCursor = null;
    }

    const currentContent = document.querySelector('.terminal-content.active');
    const newContent = document.getElementById(pageData.id);

    // Update menu styles
    document.querySelectorAll('.menu a, .submenu a').forEach((link) => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === pageName) {
            link.classList.add('active');
            link.style.pointerEvents = 'none';
        } else {
            link.classList.remove('active');
            link.style.pointerEvents = 'auto';
        }
    });

    // Update URL if requested
    if (updateHistory) {
        updateUrl(pageName);
    }

    // Switch content immediately
    currentContent.classList.remove('active');
    newContent.classList.add('active');
    currentPage = pageName;

    // Update title and start typing animation for new content
    const titleElement = newContent.querySelector('.terminal-title');
    titleElement.textContent = `> ${pageData.title}`;

    const textElement = newContent.querySelector('.terminal-text');
    await typeText(textElement, pageData.text);
}

// Theme management
function initializeThemeSwitcher() {
    const terminal = document.querySelector('.glass-effect');
    const themeOptions = document.querySelectorAll('.theme-option');

    // Set initial theme
    terminal.setAttribute('data-theme', 'green');
    document.querySelector('[data-theme="green"]').classList.add('active');

    // Handle theme switching
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');

            // Remove active class from all options
            themeOptions.forEach(opt => opt.classList.remove('active'));

            // Add active class to clicked option
            option.classList.add('active');

            // Apply theme
            terminal.setAttribute('data-theme', theme);

            // Store preference
            localStorage.setItem('terminal-theme', theme);
        });
    });

    // Load saved preference
    const savedTheme = localStorage.getItem('terminal-theme');
    if (savedTheme) {
        terminal.setAttribute('data-theme', savedTheme);
        document.querySelector(`[data-theme="${savedTheme}"]`).classList.add('active');
        themeOptions.forEach(opt => {
            if (opt.getAttribute('data-theme') !== savedTheme) {
                opt.classList.remove('active');
            }
        });
    }
}

// Initialize terminal
document.addEventListener('DOMContentLoaded', async () => {
    // Check for deep link parameter
    const deepLinkPage = getPageFromUrl();
    let initialPage = 'home'; // Default page

    if (deepLinkPage) {
        // Verify if the requested page exists
        const isMainPage = pages[deepLinkPage];
        const isSubmenuItem = Object.values(pages).some(page =>
            page.isSubmenu && page.items && page.items[deepLinkPage]
        );

        if (isMainPage || isSubmenuItem) {
            initialPage = deepLinkPage;
        }
    }

    // Initialize all content sections
    Object.entries(pages).forEach(([pageName, pageData]) => {
        if (!pageData.isSubmenu) {
            const section = document.getElementById(pageData.id);
            const title = section.querySelector('.terminal-title');
            title.textContent = `> ${pageData.title}`;
        }
    });

    // Initialize submenu content sections
    Object.values(pages).forEach((page) => {
        if (page.isSubmenu && page.items) {
            Object.values(page.items).forEach((item) => {
                const section = document.getElementById(item.id);
                const title = section.querySelector('.terminal-title');
                title.textContent = `> ${item.title}`;
            });
        }
    });

    // Build menu structure
    const menu = document.querySelector('.menu');
    menu.innerHTML = '';

    const menuOrder = ['home', 'software', 'privacy', 'contact'];

    menuOrder.forEach(pageName => {
        const pageData = pages[pageName];
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';

        const menuLink = document.createElement('a');
        menuLink.textContent = pageData.title;

        if (pageData.isSubmenu) {
            menuLink.addEventListener('click', () => toggleSubmenu(menuItem));

            const submenu = document.createElement('div');
            submenu.className = 'submenu';

            Object.entries(pageData.items).forEach(([itemKey, itemData]) => {
                const subLink = document.createElement('a');
                subLink.textContent = itemData.title;
                subLink.setAttribute('data-page', itemKey);
                subLink.addEventListener('click', () => {
                    showContent(itemKey, true);
                    toggleSubmenu(menuItem);
                });
                submenu.appendChild(subLink);
            });

            menuItem.appendChild(menuLink);
            menuItem.appendChild(submenu);
        } else {
            menuLink.setAttribute('data-page', pageName);
            menuLink.addEventListener('click', () => showContent(pageName));
            menuItem.appendChild(menuLink);
        }

        if (pageName === currentPage) {
            menuLink.classList.add('active');
            menuLink.style.pointerEvents = 'none';
        }

        menu.appendChild(menuItem);
    });

    // Initialize theme switcher
    initializeThemeSwitcher();

    const terminal = document.querySelector('.glass-effect');
    terminal.classList.add('expanded');

    // Handle browser back/forward navigation
    window.addEventListener('popstate', (event) => {
        const newPage = getPageFromUrl() || 'home';
        const isSubmenuItem = Object.values(pages).some(page =>
            page.isSubmenu && page.items && page.items[newPage]
        );
        showContent(newPage, isSubmenuItem, false);
    });

    // Show initial page
    document.querySelector('.terminal-content.active').classList.remove('active');
    const isSubmenuItem = Object.values(pages).some(page =>
        page.isSubmenu && page.items && page.items[initialPage]
    );
    const targetContent = document.getElementById(
        isSubmenuItem ? pages.software.items[initialPage].id : pages[initialPage].id
    );
    targetContent.classList.add('active');
    currentPage = initialPage;

    // Start initial typing animation
    const initialText = document.querySelector(
        '.terminal-content.active .terminal-text'
    );
    await typeText(initialText, isSubmenuItem ?
        pages.software.items[initialPage].text :
        pages[initialPage].text
    );
});

// Grid animation setup
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

// Animation state variables
let gridSize = 40;
const baseSpeed = 2;
let offset = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Grid animation constants
const horizon = () => canvas.height * 0.5;
const perspective = () => canvas.height * 4;
const aspectRatio = () => canvas.width / canvas.height;
const spreadFactor = () => 4 * aspectRatio();
const numLines = () => Math.ceil((canvas.width / gridSize) * 2);

function getVerticalLineOpacity(x, centerX) {
    return Math.max(0.15, Math.min(1, 1 - Math.abs(x - centerX) / (canvas.width / 2)));
}

function getHorizontalLineOpacity(y, horizonY) {
    const normalizedDistance = (y - horizonY) / (canvas.height - horizonY);
    return Math.max(0.2, Math.min(1, Math.pow(normalizedDistance, 0.8)));
}

function drawVignettes() {
    const maxDimension = Math.max(canvas.width, canvas.height);

    // Corner vignette
    const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        maxDimension * 0.7
    );

    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(0.4, 'rgba(0,0,0,0.3)');
    gradient.addColorStop(0.6, 'rgba(0,0,0,0.7)');
    gradient.addColorStop(0.75, 'rgba(0,0,0,0.9)');
    gradient.addColorStop(1, 'rgba(0,0,0,1)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Top gradient
    const topGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    topGradient.addColorStop(0, 'rgba(0,0,0,1)');
    topGradient.addColorStop(0.4, 'rgba(0,0,0,0.8)');
    topGradient.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = topGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Bottom gradient
    const bottomGradient = ctx.createLinearGradient(
        0,
        canvas.height - canvas.height * 0.4,
        0,
        canvas.height
    );
    bottomGradient.addColorStop(0, 'rgba(0,0,0,0)');
    bottomGradient.addColorStop(0.5, 'rgba(0,0,0,0.5)');
    bottomGradient.addColorStop(1, 'rgba(0,0,0,0.95)');

    ctx.fillStyle = bottomGradient;
    ctx.fillRect(
        0,
        canvas.height - canvas.height * 0.4,
        canvas.width,
        canvas.height * 0.4
    );
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  gridSize = Math.max(20, Math.min(40, canvas.width / 25));

  const currentHorizon = horizon();
  const currentPerspective = perspective();
  const currentSpreadFactor = spreadFactor();
  const currentNumLines = numLines();

  // Draw vertical lines
  for (let x = -currentNumLines; x <= currentNumLines; x++) {
    const spacing = gridSize;
    let startX = canvas.width / 2 + x * spacing * 2.5;
    let startY = canvas.height * 1.2;
    let endX = canvas.width / 2 + x * (spacing / 3);
    let endY = currentHorizon;

    // Apply perspective
    startX =
      canvas.width / 2 +
      (startX - canvas.width / 2) /
        (1 + (canvas.height - startY) / currentPerspective);

    const opacity = getVerticalLineOpacity(endX, canvas.width / 2);
    ctx.strokeStyle = `rgba(180, 190, 220, ${opacity * 0.6})`;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  // Draw horizontal lines
  const numHorizontalLines = Math.ceil(canvas.height / gridSize) * 2;
  for (let z = 0; z < numHorizontalLines; z++) {
    const y = currentHorizon + z * gridSize + offset;
    if (y > canvas.height * 1.2) continue;

    const perspectiveFactor = 1 + (y - currentHorizon) / currentPerspective;
    const width = canvas.width * perspectiveFactor * currentSpreadFactor;

    const opacity = getHorizontalLineOpacity(y, currentHorizon);
    ctx.strokeStyle = `rgba(180, 190, 220, ${opacity * 0.8})`;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - width / 2, y);
    ctx.lineTo(canvas.width / 2 + width / 2, y);
    ctx.stroke();
  }

  // Draw vignettes last
  drawVignettes();

  // Update offset for basic forward motion
  offset = (offset + baseSpeed) % gridSize;

  requestAnimationFrame(drawGrid);
}

// Start the grid animation
drawGrid();