import loadImageAsync from "./utils/loadImageAsync";
import delay from "./utils/delay";

import Swiper from 'swiper';

import {
  Navigation,
  Pagination,
  EffectFlip,
  EffectCoverflow,
  EffectCards,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';

const $preloaderVisual = document.querySelector(".preloader__visual");

let numImagesLoaded = 0;
let totalImages = 0;

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import SplitType from 'split-type'
import './styles/style.css'


gsap.registerPlugin(ScrollTrigger,TextPlugin);

const gsapHero = () => {

const headerTl = gsap.timeline();

const intro = new SplitType('.header_intro', { types: 'words' })
const desc = new SplitType('.header_desc', { types: 'words' })

headerTl.from(".word1", {
    x: "-200%", // Move the word up from the bottom
    duration: 0.8,
    ease: "expo.out",
    delay: 0.5, // Delay the start of the animation
  })
  .from(
    ".word2",
    {
      x: "-200%",
      duration: 0.8,
      ease: "expo.out",
    },
    "-=0.4"
  )
  .from(
    ".word3",
    {
      x: "-200%",
      duration: 0.8,
      ease: "expo.out",
    },
    "-=0.4"
  )
  .from(intro.words, {
    opacity: 0,
    y: 20,
    x:-20,
    duration: 1,
    stagger: { amount: 0.6 },
  })
  .from(desc.words, {
    opacity: 0,
    y: 20,
    x:-20,
    duration: 1,
    stagger: { amount: 0.9 },
  })
};

const gsapScroll = () => {

const exp1 = new SplitType('#exp1', { types: 'words' })
const exp2 = new SplitType('#exp2', { types: 'words' })
const exp3 = new SplitType('#exp3', { types: 'words' })

  const tlRoughStart = gsap.timeline({
    scrollTrigger: {
      trigger: '#roughstart', 
      start: 'top 10%', 
      end: 'bottom 20%', 
      scrub: 2, 
      pin:true,
    },
    
  });
  tlRoughStart.from('#roughstart h2', {
    opacity: 0,
    x: -200,
  })
    .from(
      exp1.words,
      {
        opacity: 0,
        y: 10,
        stagger: 0.1, 
      },
    )
    .from(
      exp2.words,
      {
        opacity: 0,
        y: 10,
      stagger: 0.1, 
      },
    )
    .from(
      exp3.words,
      {
        opacity: 0,
        y: 10,
        stagger: 0.1, 
      },
    )
    .from(
      '.metaltype',
      {
        x: "-100%",
        duration:2,
      },
      "-=2"
    )
    .from(
      '.exploremap',
      {
        opacity:0,
      },
      "-=2"
)


    const mapdesc1 = new SplitType('.map-desc', { types: 'words' })
    const mapdesc2 = new SplitType('.map-desc-desk', { types: 'words' })

    
    const tlAntwerp = gsap.timeline({
      scrollTrigger: {
        trigger: '.map-desc-container', 
        start: 'top center', 
        end: 'bottom center', 
        scrub: 1, 
      },    
    })
    tlAntwerp.from(
      mapdesc1.words,{
        opacity: 0,
        y: 10,
        duration: 2,
        stagger: 0.1, 
      },
    )
    .from(
      mapdesc2.words, {
        opacity: 0,
        y: 10,
        duration: 2,
        stagger: 0.1, 
      },
      "-=0.5"
    )

    const headerWS = new SplitType('.header-with-svg', { types: 'words' })

    const tlWorkshopheader = gsap.timeline({
      scrollTrigger: {
        trigger: '.header-with-svg', 
        start: 'top center', 
        end: 'bottom center', 
        scrub: 1, 
      },    
    })
    tlWorkshopheader.from(
      headerWS.words,{
        y:"10%",
        opacity:0,
        duration: 0.1,
        stagger: 0.1, 
      },
    )
    .from(
      ".svg-container-ws",{
        opacity:0,
        y:"100%"
      }
    )

    const desc1 = new SplitType('.workshop-desc1 p', { types: 'words' })
    const desc2 = new SplitType('.workshop-desc2 p', { types: 'words' })
    const desc3 = new SplitType('.workshop-desc3p', { types: 'words' })

    const tlWorkshop = gsap.timeline({
      scrollTrigger: {
        trigger: '.workshop-container', 
        start: 'top center', 
        end: '50% center', 
        scrub: 1, 
      },    
    })
    tlWorkshop.from(
      desc1.words,{
        y:"100%",
        duration: 0.1,
        opacity:0,
        stagger: 0.1, 
      },
    )
    .from(
      ".stat2", {
        y:100,
        opacity:0,
      },
      "-1"
    )
    .from(
      ".stat3", {
        y:100,
        opacity:0,
      },
      "-0.8"
    )
    .from(
      ".stat1", {
        y:100,
        opacity:0,
      },
      "-0.5"
    )
    .from(
      desc2.words,{
        y:"100%",
        duration: 0.1,
        opacity:0,
        stagger: 0.1, 
      },
    )
    .from(
      desc3.words,{
        y:"100%",
        duration: 0.1,
        opacity:0,
        stagger: 0.1, 
      },
    )
    .from(
      ".stat5", {
        y:100,
        opacity:0,
      },
    )
    .from(
      ".stat6", {
        y:100,
        opacity:0,
      },
    )
    .from(
      ".stat4", {
        y:100,
        opacity:0,
      },
    )

    const bibleTitle = new SplitType('#bible h2', { types: 'words'})
    const bibledesc = new SplitType('#bible p', { types: 'words'})

    const bible = gsap.timeline({
      scrollTrigger: {
        trigger: '#bible', 
        start: 'top center', 
        end: '50% center', 
        scrub: 1, 
      },    
    })
    bible.from(
      bibleTitle.words,{
        y:"10%",
        opacity:0,
        duration: 0.1,
        stagger: 0.05, 
      },
      "+=0.2"
    )
    .from(
      bibledesc.words,{
        opacity:0,
        duration: 0.1,
        stagger: 0.05, 
      },
      "-=0.3"
    )
    .from(
      ".bible-img",{
        x:"-200%",
      },
    )
    .from(
      ".bible-learn", {
        opacity:0,
        y:"200%",
        stagger:0.5,
      }
    )
    .from(
      ".bible-cta", {
        opacity:0,
        y:"200%",
        stagger:0.5,
      }
    )


    const connectionTitle = new SplitType('.connections-title', { types: 'words'})
    const connectionDesc = new SplitType('.connections-desc', { types: 'words'})


    const connection = gsap.timeline({
      scrollTrigger: {
        trigger: '#connections', 
        start: 'top center', 
        end: '50% center', 
        scrub: 1, 
      },    
    })
    connection.from(
      connectionTitle.words,{
        y:"10%",
        opacity:0,
        duration: 0.1,
        stagger: 0.05, 
      },
    )
    .from(
      ".svg-container",{
        y:"100%",
        opacity:0,
        duration: 0.1,
      },
      "-=0.2"
    )
    .from(
      connectionDesc.words,{
        opacity:0,
        duration: 0.1,
        stagger: 0.05, 
      },
    )
    .from(
      "#letter-container",{
        x:"-100%",
        opacity:0,
        duration: 0.1,
        stagger:1,
      }
    )

    const legacyTitle = new SplitType('#legacy h2', { types: 'words'})
    const legacyIntro = new SplitType('.legacy-intro', { types: 'words'})
    const legacyDesc = new SplitType('.legacy-desc', { types: 'words'})


    const legacy = gsap.timeline({
      scrollTrigger: {
        trigger: '#legacy', 
        start: 'top center', 
        end: '80% center', 
        scrub: 1, 
      },    
    })
    legacy.from(
      legacyTitle.words,{
      y:"10%",
      opacity:0,
      duration: 0.1,
      stagger: 0.05, 
    },
  )
  legacy.from(
    legacyIntro.words,{
    y:"10%",
    opacity:0,
    duration: 0.5,
    stagger: 0.05, 
  },
)
.from(
  ".legacy-stats1",{
  y:"-120%",
  duration: 0.5,
},
"-=0.2"
)
.from(
  ".legacy-stats2",{
  y:"120%",
  duration: 0.5,
},
"-=0.3"
)
.from(
  ".legacy-stats3",{
  y:"-120%",
  duration: 0.5,
},
"-=0.4"
)
.from(
  ".legacy-stats4",{
  y:"120%",
  duration: 0.5,
},
"-=0.5"
)
legacy.from(
  legacyDesc.words,{
  y:"10%",
  opacity:0,
  duration: 0.5,
  stagger: 0.05, 
},
)

const storyTitle = new SplitType('#stories h2', { types: 'words'})
const storyDesc = new SplitType('#stories p', { types: 'words'})


const story = gsap.timeline({
  scrollTrigger: {
    trigger: '#stories', 
    start: 'top center', 
    end: '40% center', 
    scrub: 1, 
  },    
})
story.from(
  storyTitle.words,{
  y:"10%",
  opacity:0,
  duration: 0.1,
  stagger: 0.05, 
},
)
.from(
  storyDesc.words,{
  y:"10%",
  opacity:0,
  duration: 0.1,
  stagger: 0.05, 
},
)


  }

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
  $preloaderVisual.style.transform = `scale3d(1, ${relativeProgress}, 1)`;
};

const preloadComplete = async () => {
  await delay(5300); 
  gsapHero();
  document.querySelector("body").classList.remove("overflow-y-hidden");
  const lottiePlayer = document.getElementById("header-lottie");
  lottiePlayer.play();
  gsap.to("#loading", {
    duration: 0.5,
    autoAlpha: 0,
    onComplete: () => {
      document.documentElement.classList.remove("is-loading");
    },
  });
};

const coverflowCards = () => {

fetch('./data/roles.JSON')
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
  const flipContainer = document.querySelector('.workshop-container');

  fetch('/plantin/data/roles.JSON')
    .then((response) => response.json())
    .then((roles) => {
      roles.forEach((role) => {
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
          flipContainer.appendChild(flipCard);
        
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

const setupMusicToggle = () => {
  const musicButton = document.getElementById('musicButton');
    const soundIcon = document.getElementById('soundIcon');
    const backgroundMusic = document.getElementById('backgroundMusic');

    musicButton.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            soundIcon.src = './soundon.svg';
            soundIcon.alt = 'Sound On';
        } else {
            backgroundMusic.pause();
            soundIcon.src = './soundoff.svg';
            soundIcon.alt = 'Sound Off';
        }
    });
};

const LettersInteraction = () => {
  let resizeListener = null;

  const fetchData = async () => {
    try {
      const response = await fetch('data/letters.JSON');
      const letters = await response.json();

      // Initialize interaction based on screen width
      initializeInteraction(letters);

      // Reinitialize on window resize
      if (resizeListener) window.removeEventListener('resize', resizeListener);
      resizeListener = () => initializeInteraction(letters);
      window.addEventListener('resize', resizeListener);
    } catch (error) {
      console.error('Error fetching letters:', error);
    }
  };

  const initializeInteraction = (letters) => {
    const container = document.getElementById('letter-container');
    container.innerHTML = ''; // Clear existing content

    const dropZone = document.getElementById('drop-zone');
    if (window.innerWidth >= 840) {
      if (dropZone) setupDropZone(); // Create drop zone for desktop
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
      letterDiv.addEventListener('click', () => {
        const isDetailActive = letterDiv.classList.contains('active');
        renderDetailView(letterDiv, letter, !isDetailActive);
        letterDiv.classList.toggle('active');
      });
    });
  };

  const initDesktopInteraction = (letters) => {
    const container = document.getElementById('letter-container');
    letters.forEach((letter, index) => {
      const letterDiv = createLetterDiv(letter);
      letterDiv.setAttribute('draggable', 'true'); // Enable drag-and-drop
      container.appendChild(letterDiv);

        const offset = index * 55; // Adjust the offset value as needed
        letterDiv.style.transform = `translate(0, ${offset}px)`;

      // Add drag-and-drop behavior
      letterDiv.addEventListener('dragstart', (e) => handleDragStart(e, letter));
      letterDiv.addEventListener('dragend', handleDragEnd);
    });
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
      renderDetailView(dropZone, draggedLetter, true);
      draggedLetter = null;
    }
  };

  const renderDetailView = (container, letter, isDetail = true) => {
    container.innerHTML = ''; // Clear content
  
    if (isDetail) {
      // Generate the HTML for the detail view
      const detailViewHTML = `
        <div class="detail-view">
        <div class="detail-about">
          <img class="detailview-img" src="${letter.img}" alt="${letter.title}" />
        <div class="detail-namedesc">
          <h2>${letter.title}</h2>
          <p>${letter.who}</p>
          </div>
        </div>
          <ul class="detail-fact">
            ${letter.connection.map((conn) => `<li>${conn}</li>`).join('')}
          </ul>
          <p class="notable-detail">${letter.notableDetail}</p>
        </div>
      `;
  
      // Insert the HTML into the container
      container.innerHTML = detailViewHTML;

       // Select the newly created `.detail-view`
    const detailView = container.querySelector('.detail-view');

    // Initialize SplitType for the current detail view
    const nameAndDesc = new SplitType(detailView.querySelector('.detail-namedesc'), { types: 'words' });
    const detailFact = new SplitType(detailView.querySelector('.detail-fact'), { types: 'words' });

    // GSAP animation scoped to the current detail view
    const connectionDetail = gsap.timeline();

    connectionDetail
      .from(detailView, {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        ease: 'power2.out',
      })
      .from(
        nameAndDesc.words,
        {
          opacity: 0,
          y: 10,
          duration: 1,
          stagger: 0.1,
        },
        "-=0.8"
      )
      .from(
        detailView.querySelector('.detailview-img'),
        {
          opacity: 0,
          y: 100,
          duration: 1.2,
          ease: 'ease.in',
        },
        "-=0.5")
      .from(
        detailFact.words,
        {
          opacity: 0,
          y: 10,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=1.8"
      )
      .from(
        detailView.querySelector('.notable-detail'),
        {
          opacity: 0,
        },
        "-=1.2"
      );

  } else {
    fetchAndInjectSVG(container, letter);
  }
};

  const createLetterDiv = (letter) => {
    const letterDiv = document.createElement('div');
    letterDiv.classList.add('letter');
    fetchAndInjectSVG(letterDiv, letter);
    return letterDiv;
  };

  const fetchAndInjectSVG = (container, letter) => {
    const svgContainer = document.createElement('div');
    svgContainer.classList.add('letter-svg');

    fetch('./letter.svg')
      .then((res) => res.text())
      .then((svg) => {
        svgContainer.innerHTML = svg;

        const svgElement = svgContainer.querySelector('svg');
        const textElement = svgElement.querySelector('#title-text');
        if (textElement) {
          textElement.textContent = letter.title;
        }

        container.appendChild(svgContainer);
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
  <div class="panel-top">
        <p class="panel-year">${data.year}</p>
        <h2 class="panel-title">${data.title}</h2>
        <p class="panel-location">${data.location}</p>
      </div>
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

    const tlpanel = gsap.timeline();

    const panelyear = new SplitType('.panel-year', { types: 'words, chars' })
    const paneltitle = new SplitType('.panel-title', { types: 'words, chars' })
    const panelloc = new SplitType('.panel-location', { types: 'words, chars' })
    const paneldesc = new SplitType('.panel-desc', { types: 'words, chars' })

    tlpanel.from(
      ".info-panel",
      {
        opacity: 0, 
        duration:"0.1",
      },
      )
    .from(
      ".panel-container", {
        y:"200%",
        duration: 1, 
        ease: "ease.inOut",
      }
    )
    .from(
      ".panel-imgcontainer", {
        x:"200%",
        duration: 1, 
        ease: "ease.inOut",
      },
      "-=0.5",
    )
    .from(
      panelyear.chars, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger:0.1,
      },
      "-=0.5",
    )
    .from(
      paneltitle.words, {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger:0.1,
      },
      "-=0.5",
    )
    .from(
      panelloc.words, {
        opacity: 0,
        x: 20,
        duration: 0.5,
        stagger:0.1,
      },
      "-=0.5",
    )
    .from(
      paneldesc.words, {
        opacity: 0,
        y: 5,
        duration: 0.5,
        stagger:0.05,
      },
      "-=0.5",
    )
};


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
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const shouldAnimate = !prefersReducedMotion.matches;

  if (window.innerWidth >= 1200) {
    flipCards();
    desktopMap();
    if (shouldAnimate) gsapScroll();
  } else if (window.innerWidth >= 840) {
    desktopMap();
    coverflowCards();
    nav();
    if (shouldAnimate) gsapScroll();
  } else if (window.innerWidth < 840) {
    expandableText();
    nav();
    coverflowCards();
    mobileMap();
  }
  LettersInteraction();
  setupMusicToggle();
  loader();
};

init();