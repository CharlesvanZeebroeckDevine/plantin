const expandableText = () => {
  const expandableSections = document.querySelectorAll('[data-expandable]');

  expandableSections.forEach((section) => {
    const button = section.querySelector('.read-more');
    const paragraph = section.querySelector('p');

    button.addEventListener('click', () => {
      section.classList.toggle('expanded');
      button.textContent = section.classList.contains('expanded') 
        ? 'Read less...' 
        : 'Read more...';
    });
  });
};

const nav = () => {
  const toggleButton = document.querySelector('.nav__toggle');
  const closeButton = document.querySelector('.nav__close');
  const menu = document.querySelector('.nav__menu');
  const item = document.querySelector('.nav__list');


  toggleButton.addEventListener('click', () => {
    menu.classList.add('active');
  });

  closeButton.addEventListener('click', () => {
    menu.classList.remove('active');
  });

  item.addEventListener('click', () => {
      menu.classList.remove('active');
    });
};

const mobileMap = () => {

const staticMap = document.getElementById("static-map");
const interactiveMap = document.getElementById("interactive-map");

let isPanning = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;

// Set scale and calculate map boundaries
const scale = 1; // Scale up by 2x
const mapWidth = 1716 * scale; // Scaled map width
const mapHeight = 1245 * scale; // Scaled map height

// Show the interactive map on click
staticMap.addEventListener("click", () => {
  staticMap.style.display = "none";
  interactiveMap.style.display = "block";
  interactiveMap.style.width = `${mapWidth}px`;
  interactiveMap.style.height = `${mapHeight}px`;
  interactiveMap.style.transform = `scale(${scale}) translate(0px, 0px)`;

  const exitButton = document.createElement("button");
  exitButton.className = "exit-button";
  exitButton.textContent = "Exit Map";

  // Append the exit button to the body
  document.body.appendChild(exitButton);

  // Handle exit button click
  exitButton.addEventListener("click", () => {
    staticMap.style.display = "block";
    interactiveMap.style.display = "none";
    currentX = 0;
    currentY = 0;
    exitButton.remove();
  });
});


// Handle touch events for panning
interactiveMap.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    isPanning = true;
    const touch = e.touches[0];
    startX = touch.clientX - currentX;
    startY = touch.clientY - currentY;
  }
});

interactiveMap.addEventListener("touchmove", (e) => {
  if (isPanning && e.touches.length === 1) {
    e.preventDefault();
    const touch = e.touches[0];
    let newX = touch.clientX - startX;
    let newY = touch.clientY - startY;

    // Calculate boundaries
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const minX = Math.min(0, viewportWidth - mapWidth); // Left boundary
    const maxX = 0; // Right boundary
    const minY = Math.min(0, viewportHeight - mapHeight); // Top boundary
    const maxY = 0; // Bottom boundary

    // Constrain movement within boundaries
    currentX = Math.max(minX, Math.min(newX, maxX));
    currentY = Math.max(minY, Math.min(newY, maxY));

    // Apply the translation
    interactiveMap.style.transform = `scale(${scale}) translate(${currentX}px, ${currentY}px)`;
  }
});

interactiveMap.addEventListener("touchend", () => {
  isPanning = false;
});
// Handle double-tap to exit fullscreen
interactiveMap.addEventListener("dblclick", () => {
  staticMap.style.display = "block";
  interactiveMap.style.display = "none";
  currentX = 0;
  currentY = 0;
});


// Function to create and show the information panel
function showInfoPanel(data) {
  // Remove any existing panel and overlay
  const existingPanel = document.querySelector(".info-panel");
  const existingOverlay = document.querySelector(".info-overlay");
  if (existingPanel) existingPanel.remove();
  if (existingOverlay) existingOverlay.remove();

  // Create the overlay
  const overlay = document.createElement("div");
  overlay.className = "info-overlay";

  // Create the panel
  const panel = document.createElement("div");
  panel.className = "info-panel";

  // Populate the panel with data
  panel.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.year}</p>
    <p>${data.location}</p>
    <p>${data.description}</p>
    <img src="${data.image}" alt="${data.title}" />
    <p>${data.reference}</p>
  `;

  // Append the panel and overlay to the body
  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  // Add event listener to close panel when tapping the overlay
  overlay.addEventListener("click", () => {
    panel.remove();
    overlay.remove();
  });

  // Trigger the slide-up animation
  setTimeout(() => {
    panel.style.transform = "translateY(0)";
    overlay.style.opacity = "1";
  }, 50);
}

// Handle marker taps to show the info panel
interactiveMap.addEventListener("touchstart", async (e) => {
  if (e.touches.length === 1) {
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);

    if (target && target.classList.contains("marker")) {
      const year = target.dataset.year;

      // Fetch the JSON file and find the relevant data
      const response = await fetch("data/map.JSON");
      const mapData = await response.json();
      const data = mapData.find((item) => item.year === parseInt(year));

      if (data) {
        showInfoPanel(data);
      }
    }
  }
});

};

const init = () => {
  nav();
  expandableText();
  mobileMap();
};

init();