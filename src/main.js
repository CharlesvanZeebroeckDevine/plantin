
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

fetch('data/roles.JSON')
  .then(response => response.json())
  .then(data => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = data
      .map(
        role => `
          <div class="swiper-slide">
            <div class="role-card">
              <img src="${role.svg}" alt="${role.role}">
              <h3>${role.role}</h3>
              <p>${role.description}</p>
              ${role.salary ? `<p><strong>Salary:</strong> ${role.salary}</p>` : ''}
            </div>
          </div>
        `
      )
      .join('');

      const swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination, EffectFlip, EffectCoverflow, EffectCards],
        loop: true, // Enable infinite looping
        centeredSlides: true, // Center the active slide
        slidesPerView: 1.5, // Slightly show the next/previous slides
        spaceBetween: 10, // Space between slides
        effect: 'coverflow',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        },
      });
  });
};

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

const fetchData = async () => {
  try {
    const response = await fetch('data/letters.JSON');
    const letters = await response.json();
    renderLetters(letters);
  } catch (error) {
    console.error('Error fetching letters:', error);
  }
};

const renderLetters = (letters) => {
  const container = document.getElementById('letter-container');
  container.innerHTML = ''; // Clear content

  letters.forEach((letter) => {
    const letterDiv = document.createElement('div');
    letterDiv.classList.add('letter');

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

    container.appendChild(letterDiv);

    letterDiv.addEventListener('click', () => toggleDetail(letterDiv, letter));
  });
};

const toggleDetail = (letterDiv, letter) => {
  const isDetailActive = letterDiv.classList.contains('active');

  if (isDetailActive) {
    // If already active, revert back to the letter view
    renderLetterContent(letterDiv, letter);
    letterDiv.classList.remove('active');
  } else {
    // Otherwise, render the detail view
    renderDetailContent(letterDiv, letter);
    letterDiv.classList.add('active');
  }
};

const renderLetterContent = (letterDiv, letter) => {
  letterDiv.innerHTML = ''; // Clear content

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

const renderDetailContent = (letterDiv, letter) => {
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


  letterDiv.innerHTML = ''; // Clear the original content
  letterDiv.appendChild(detailView);
};

// Initialize the app
fetchData();


const init = () => {
  nav();
  expandableText();
  mobileMap();
  coverflowCards();
};

init();