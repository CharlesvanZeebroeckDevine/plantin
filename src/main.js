import './styles/style.css'
import loadImageAsync from "./utils/loadImageAsync";
import delay from "./utils/delay";

import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";


gsap.registerPlugin(ScrollTrigger,TextPlugin);

const $preloaderPercentage = document.querySelector(".preloader__percentage");
const $preloaderVisual = document.querySelector(".preloader__visual");

let numImagesLoaded = 0;
let totalImages = 0;

const loader = async () => {
  $preloaderVisual.classList.add("preloader__visual--has-transition");
  document.documentElement.classList.add("is-loading");
  document.querySelector("body").classList.add("overflow-y-hidden");

  // Gather all image paths dynamically
  const imageElements = document.querySelectorAll("img");
  const imagePaths = Array.from(imageElements).map((img) => img.src);
  totalImages = imagePaths.length;

  // Preload images and track progress
  await Promise.all(
    imagePaths.map(async (path) => {
      await loadImageAsync(path);
      numImagesLoaded++;
      onProgress();
    })
  );

  preloadComplete();
};

const onProgress = () => {
  const relativeProgress = numImagesLoaded / totalImages;
  const progressPercentage = Math.round(relativeProgress * 100);
  console.log(
    numImagesLoaded,
    totalImages,
    relativeProgress,
    progressPercentage
  );
  $preloaderPercentage.textContent = `${progressPercentage}%`;
  $preloaderVisual.style.transform = `scale3d(1, ${relativeProgress}, 1)`;
};

const preloadComplete = async () => {
  await delay(350); // Add extra time for CSS transition to finish
  document.querySelector("body").classList.remove("overflow-y-hidden");
  gsap.to("#loading", {
    duration: 0.5,
    autoAlpha: 0,
    onComplete: () => {
      document.documentElement.classList.remove("is-loading");
    },
  });
};

import Swiper from 'swiper';

import {
  Navigation,
  Pagination,
  EffectFlip,
  EffectCoverflow,
  EffectCards,
} from 'swiper/modules';
// Import Swiper and module styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';

const coverflowCards = () => {

fetch('/plantin/data/roles.JSON')
  .then(response => response.json())
  .then(data => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = data
      .map(
        role => `
          <div class="swiper-slide">
            <div class="role-card">
            <div class="role-card-top">
              <img src="${role.svg}" alt="${role.role}">
              <h3>${role.role}</h3>
              </div>
              <div class="role-desc">
              <p>${role.description}</p>
              ${role.salary ? `<p><strong>Salary:</strong> ${role.salary}</p>` : ''}
              </div>
            </div>
          </div>
        `
      )
      .join('');

      const swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination, EffectFlip, EffectCoverflow, EffectCards],
        slidesPerView: 1.2,
        spaceBetween: 20,
        loop: true, // Enable infinite looping
        centeredSlides: true, // Center the active slide
        effect: 'coverflow',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          320: {
            slidesPerView: 1.4,
            spaceBetween: 40
          },
          // when window width is >= 480px
          400: {
            slidesPerView: 1.6,
            spaceBetween: 60
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 60
          },
          600: {
            slidesPerView: 2.5,
            spaceBetween: 100
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 140
          },
        },
        coverflowEffect: {
          rotate: 10,
          stretch: 0,
          depth: 100,
          slideShadows: false,
        },
      });
  });
};

const flipCards = () => {
  const flipContainers = [
    document.querySelector('.flip-container'),
    document.querySelector('.flip-container2'),
    document.querySelector('.flip-container3'),
  ];

  fetch('/plantin/data/roles.JSON')
    .then((response) => response.json())
    .then((roles) => {
      roles.forEach((role, index) => {
        const flipCard = document.createElement('div');
        flipCard.classList.add('role-card');

        flipCard.innerHTML = `
          <div class="front">
            <img src="${role.svg}" alt="${role.role}">
            <h2>${role.role}</h2>
          </div>
          <div class="back">
            <p>${role.description}</p>
            <p><strong>Salary:</strong> ${role.salary}</p>
          </div>
        `;

        // Distribute cards evenly across the three containers
        const containerIndex = Math.floor(index / 3); // Determine which container (0, 1, 2)
        if (containerIndex < flipContainers.length) {
          flipContainers[containerIndex].appendChild(flipCard);
        }
      });
    })
    .catch((error) => console.error('Error loading roles:', error));
};

const expandableText = (defaultWidth = '90%') => {
  const expandableSections = document.querySelectorAll('[data-expandable]');

  expandableSections.forEach((section) => {
    const button = section.querySelector('.read-more');
    const paragraph = section.querySelector('p');

    // Set initial width of the paragraph
    paragraph.style.width = defaultWidth;

    button.addEventListener('click', () => {
      section.classList.toggle('expanded');
      button.textContent = section.classList.contains('expanded') 
        ? 'Read less...' 
        : 'Read more...';

      // Optional: Dynamically adjust the width on expansion if needed
      if (section.classList.contains('expanded')) {
        paragraph.style.width = '100%'; // Example of full width when expanded
      } else {
        paragraph.style.width = defaultWidth; // Reset to default when collapsed
      }
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

function setupMusicToggle() {
  let isPlaying = false;

  const musicToggle = document.getElementById("music-toggle");
  const musicIcon = document.getElementById("toggle-icon");
  const backgroundMusic = document.getElementById("background-music");

  musicToggle.addEventListener("click", () => {
    if (!isPlaying) {
      backgroundMusic.play();
      musicIcon.src = "./src/assets/svg/soundon.svg"; // Update to 'Sound Off' icon
      isPlaying = true;
    } else {
      backgroundMusic.pause();
      musicIcon.src = "./src/assets/svg/soundoff.svg"; // Update to 'Sound On' icon
      isPlaying = false;
    }
  });
}

const LettersInteraction = () => {
  const fetchData = async () => {
    try {
      const response = await fetch('/plantin/data/letters.JSON');
      const letters = await response.json();

      // Initialize interaction based on screen width
      initializeInteraction(letters);

      // Reinitialize on window resize
      window.addEventListener('resize', () => initializeInteraction(letters));
    } catch (error) {
      console.error('Error fetching letters:', error);
    }
  };

  const initializeInteraction = (letters) => {
    const container = document.getElementById('letter-container');
    container.innerHTML = ''; // Clear existing content

    const dropZone = document.getElementById('drop-zone');
    if (window.innerWidth >= 840) {
      if (!dropZone); // Create drop zone for desktop
      initDesktopInteraction(letters);
    } else {
      if (dropZone) dropZone.remove(); // Remove drop zone for mobile
      initMobileInteraction(letters);
    }
  };

  const initMobileInteraction = (letters) => {
    const container = document.getElementById('letter-container');

    letters.forEach((letter) => {
      const letterDiv = createLetterDiv(letter);
      container.appendChild(letterDiv);

      // Add click-to-reveal behavior
      letterDiv.addEventListener('click', () => toggleDetail(letterDiv, letter));
    });
  };

  const initDesktopInteraction = (letters) => {
    const container = document.getElementById('letter-container');

    letters.forEach((letter) => {
      const letterDiv = createLetterDiv(letter);
      letterDiv.setAttribute('draggable', 'true'); // Enable drag-and-drop
      letterDiv.dataset.id = letter.id;

      container.appendChild(letterDiv);

      // Add drag-and-drop behavior
      letterDiv.addEventListener('dragstart', (e) => handleDragStart(e, letter));
      letterDiv.addEventListener('dragend', handleDragEnd);
    });

    setupDropZone();
  };

  const createLetterDiv = (letter) => {
    const letterDiv = document.createElement('div');
    letterDiv.classList.add('letter');

    const title = document.createElement('div');
    title.classList.add('letter-title');
    title.innerText = letter.title;

    const svgContainer = document.createElement('div');
    svgContainer.classList.add('letter-svg');
    fetch('plantin/src/assets/svg/letter.svg')
      .then((res) => res.text())
      .then((svg) => {
        svgContainer.innerHTML = svg;
        letterDiv.appendChild(title);
        letterDiv.appendChild(svgContainer);
      })
      .catch((error) => console.error('Error loading SVG:', error));

    return letterDiv;
  };

  const setupDropZone = () => {
    const dropZone = document.getElementById('drop-zone');

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => handleDrop(e, dropZone));
  };

  let draggedLetter = null;

  const handleDragStart = (e, letter) => {
    draggedLetter = letter;
    e.target.classList.add('active');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('active');
  };

  const handleDrop = (e, dropZone) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');

    if (draggedLetter) {
      renderDetailInDropZone(dropZone, draggedLetter);
      draggedLetter = null;
    }
  };

  const renderDetailInDropZone = (dropZone, letter) => {
    dropZone.innerHTML = ''; // Clear the drop zone
    const detailView = document.createElement('div');
    detailView.classList.add('detail-view');

    const img = document.createElement('img');
    img.src = letter.img;
    img.alt = letter.title;
    detailView.appendChild(img);

    const title = document.createElement('h2');
    title.innerText = letter.title;
    detailView.appendChild(title);

    const who = document.createElement('p');
    who.innerText = letter.who;
    detailView.appendChild(who);

    const connections = document.createElement('ul');
    letter.connection.forEach((conn) => {
      const li = document.createElement('li');
      li.innerText = conn;
      connections.appendChild(li);
    });
    detailView.appendChild(connections);

    const notableDetail = document.createElement('p');
    notableDetail.innerHTML = `<strong>Notable Detail:</strong> ${letter.notableDetail}`;
    detailView.appendChild(notableDetail);

    dropZone.appendChild(detailView);

  };

  const toggleDetail = (letterDiv, letter) => {
    const isDetailActive = letterDiv.classList.contains('active');
    if (isDetailActive) {
      renderLetterContent(letterDiv, letter);
      letterDiv.classList.remove('active');
    } else {
      renderDetailContent(letterDiv, letter);
      letterDiv.classList.add('active');
    }
  };

  const renderDetailContent = (letterDiv, letter) => {
    letterDiv.innerHTML = ''; // Clear the content

    const detailView = document.createElement('div');
    detailView.classList.add('detail-view');

    const img = document.createElement('img');
    img.src = letter.img;
    img.alt = letter.title;
    detailView.appendChild(img);

    const title = document.createElement('h2');
    title.innerText = letter.title;
    detailView.appendChild(title);

    const who = document.createElement('p');
    who.innerText = letter.who;
    detailView.appendChild(who);

    const connections = document.createElement('ul');
    letter.connection.forEach((conn) => {
      const li = document.createElement('li');
      li.innerText = conn;
      connections.appendChild(li);
    });
    detailView.appendChild(connections);

    const notableDetail = document.createElement('p');
    notableDetail.innerHTML = `<strong>Notable Detail:</strong> ${letter.notableDetail}`;
    detailView.appendChild(notableDetail);

    letterDiv.appendChild(detailView);
  };

  const renderLetterContent = (letterDiv, letter) => {
    letterDiv.innerHTML = ''; // Reset the original content

    const title = document.createElement('div');
    title.classList.add('letter-title');
    title.innerText = letter.title;

    const svgContainer = document.createElement('div');
    svgContainer.classList.add('letter-svg');
    fetch('./src/assets/svg/letter.svg')
      .then((res) => res.text())
      .then((svg) => {
        svgContainer.innerHTML = svg;
        letterDiv.appendChild(title);
        letterDiv.appendChild(svgContainer);
      })
      .catch((error) => console.error('Error loading SVG:', error));
  };

  fetchData();
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


// Function to create and show the information panel
const showInfoPanel = (data) => {
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
        <p class="panel-year">${data.year}</p>
        <h2 class="panel-title">${data.title}</h2>
        <p class="panel-location">${data.location}</p>
        <p class="panel-desc">${data.description}</p>
        <div class="panel-imgcontainer">
        <img class="panel-img" src="${data.image}" alt="${data.title}" />
        <p class="panel-ref">${data.reference}</p>
  `;



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
      const response = await fetch("/plantin/data/map.JSON");
      const mapData = await response.json();
      const data = mapData.find((item) => item.year === parseInt(year));

      if (data) {
        showInfoPanel(data);
      }
    }
  }
});
};

const desktopMap = () => {
  const interactiveMap = document.getElementById("interactive-map");
  const staticMap = document.getElementById("static-map");
  const markers = document.querySelectorAll(".marker");

  // Show the interactive map directly
  staticMap.style.display = "none";
  interactiveMap.style.display = "block";

  // Define the showInfoPanel function specific to desktop
  const showInfoPanel = (data) => {
    const mapContainer = document.getElementById("antwerp"); // Parent container
    let panel = document.querySelector(".info-panel");

    if (!panel) {
        // Create the panel if it doesn't exist
        panel = document.createElement("div");
        panel.className = "info-panel";

        // Append the panel to the map container
        mapContainer.appendChild(panel);
    }

    // Update the content of the panel
    panel.innerHTML = `
    <div class="panel-container">
        <p class="panel-year">${data.year}</p>
        <h2 class="panel-title">${data.title}</h2>
        <p class="panel-location">${data.location}</p>
        <p class="panel-desc">${data.description}</p>
                <div class="panel-imgcontainer">
        <img class="panel-img" src="${data.image}" alt="${data.title}" />
        <p class="panel-ref">${data.reference}</p>
          </div>
        </div>
    `;
};


  // Attach click event listeners to markers
  markers.forEach((marker) => {
      marker.addEventListener("click", async (event) => {
          const year = event.target.dataset.year;

          try {
              // Fetch the JSON data
              const response = await fetch("/plantin/data/map.JSON");
              const mapData = await response.json();
              const data = mapData.find((item) => item.year === parseInt(year));

              if (data) {
                  showInfoPanel(data); // Display or update the info panel
              } else {
                  console.error(`No data found for year: ${year}`);
              }
          } catch (error) {
              console.error("Error fetching map data:", error);
          }
      });
  });
};

const init = () => {
  if (window.innerWidth >= 1200) {
    flipCards();
    desktopMap();
  }
  else if (window.innerWidth >= 840) {
    desktopMap();
    coverflowCards();
} else if (window.innerWidth < 840){
    expandableText();
    nav();
    coverflowCards();
    mobileMap();
};
  LettersInteraction();
  setupMusicToggle();
  loader();
};

init();