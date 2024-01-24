const games = [
  {
    id: "axieBrawl",
    name: "Axie Brawl",
    description:
      "Multiplayer real-time arena brawler, two teams of three players each, fight in the arena until only one remains. Each player controls an Axie and its unique skills. This game has a complex system build for the skills, where each skill is composed of many actions, each affecting independent targets with different effects, with condition at each step. This allows for easier creation of new skills once implemented.",
    images: [
      "axieBrawl.jpg",
      "axieBrawl1.png",
      "axieBrawl2.png",
      "axieBrawl3.png",
      "axieBrawl4.jpg",
      "axieBrawl5.jpg",
      "axieBrawl6.jpg"
    ],
    updateLink: "https://x.com/AxieBrawl/status/1681337311835963401",
    trailerLink: "https://www.youtube.com/watch?v=dsdNM6c5QJc"
  },
  {
    id: "memograms",
    name: "MemoGrams",
    description:
      "Simple memory game where you have a set of images, and have to guess how many times an image appeared since the game began.",
    playLink: "https://leandromagonza.github.io/MemoryGame/",
    codeLink: "https://github.com/LeandroMagonza/MemoryGame",
    images: [
      "memoGrams.png",
      "memoGrams2.png",
      "memoGrams3.png",
      "memoGrams4.png"
    ]
  },
  {
    id: "secretChess",
    name: "Secret Chess",
    description:
      "Chess-based game, but with simultaneous action selection, so you don't know what the opponent moved on your turn, and then resolves automatically.",
    playLink: "https://leandromagonza.github.io/SecretChess/",
    codeLink: "https://github.com/LeandroMagonza/SecretChess",
    images: ["secretChess.png", "secretChess2.png", "secretChess3.png"] // Replace with actual image links
  },
  {
    id: "rootKnight",
    name: "Root Knight (Game Jam)",
    description:
      "The forest of Glasir is in danger. A thousand years have passed and the powers of the spiritual tree have started to wane once more. Amidst the imminent invasion of a foreign species, a mysterious hero will fight to protect his home and become a member of the Root Knights. Root Knight: defense of the spiritual tree tells the story of a small protector with great aspirations. From SevenTeam Studios, with attractive graphics and a retro soundtrack, we bring to life this exciting tale.",
    playLink: "https://leandromagonza.github.io/RootKnight/",
    codeLink: "https://github.com/LeandroMagonza/RootKnight",
    updateLink:
      "https://v3.globalgamejam.org/2023/games/root-knight-defense-spiritual-tree-8",
    images: [
      "rootKnight.png",
      "rootKnight1.png",
      "rootKnight2.png",
      "rootKnight3.png",
      "rootKnight4.png"
    ]
  },
  {
    id: "mathHallway",
    name: "MathHallway",
    description:
      "Small game based on ads where you control a bunch of arrows and choose to make them go through screens with mathematical operations. Usually, the objective is just to maximize the amount of arrows, but in this game, you have to aim for specific numbers, making decisions more interesting. Next would be to add sounds, fence pooling, and VFX.",
    playLink: "https://leandromagonza.github.io/MathHallway/",
    codeLink: "https://github.com/LeandroMagonza/MathHallway",
    images: ["mathHallway.png", "mathHallway1.png"]
  },
  {
    id: "tictactoeOnSteroids",
    name: "TicTacToe on Steroids",
    description:
      "Online two player game based on tic tac toe, made with Unity and Photon. Players take turns  placing one of their pieces on the board or moving an already placed piece orthogonally, to either an empty space, or a space occupied by a piece with a lower rank. After each match, the colors rotate. Select the piece to move and then select the place.",
    playLink: "https://leandromagonza.github.io/TicTacTotem/",
    codeLink: "https://github.com/LeandroMagonza/TicTacTotem",
    images: [
      "ticTacToeOnSteroids1.png",
      "ticTacToeOnSteroids2.png",
      "ticTacToeOnSteroids3.png",
      "ticTacToeOnSteroids4.png",
      "ticTacToeOnSteroids5.png"
    ] // Replace with actual image links
  },
  {
    id: "cardCrawler",
    name: "Card Crawler",
    description:
      "Deckbuilder Roguelike inspired by Slay The Spire, but with board and movement. Features a complex system architecture for the cards that allows many effect and target combinations.",
    playLink: "https://leandromagonza.github.io/cardCrawler/",
    codeLink: "https://github.com/LeandroMagonza/cardCrawler",
    images: [
      "cardCrawler.png",
      "cardCrawler1.png",
      "cardCrawler2.png",
      "cardCrawler3.png"
    ]
  }
];

/*  function setupCarousel(images) {
      const carouselInner = document.getElementById("carouselInner");
      carouselInner.innerHTML = images
        .map(
          (image) =>
            `<img src="${image}" class="carousel-image" style="max-width: 100%; display: none;">`
        )
        .join("");
    
      // Show the first image
      console.log("setting carrousel on slide"+currentSlide);
      showSlides(currentSlide);
    }
    */

function scrollSlide(n) {
  const slides = document.getElementsByClassName("carousel-image");
  let currentSlideIndex = -1;

  // Find the index of the currently displayed slide
  for (let i = 0; i < slides.length; i++) {
    if (!slides[i].classList.contains("hide")) {
      currentSlideIndex = i;
      break;
    }
  }

  // If no slide is currently visible, default to the first slide
  if (currentSlideIndex === -1) {
    currentSlideIndex = 0;
  }

  // Calculate the new index
  let newSlideIndex = (currentSlideIndex + n + slides.length) % slides.length;

  // Hide the current slide by adding the 'hide' class
  slides[currentSlideIndex].classList.add("hide");

  // Show the new slide by removing the 'hide' class
  slides[newSlideIndex].classList.remove("hide");

  console.log("Displaying slide number " + newSlideIndex);
}

function hideSlides() {
  const slides = document.getElementsByClassName("carousel-image");

  for (let slide of slides) {
    if (!slide.classList.contains("hide")) {
      slide.classList.add("hide");
    }
  }
}

function loadGames() {
  const gamesContainer = document.getElementById("games-container");
  gamesContainer.innerHTML = ""; // Clear the container
  games.forEach((game, index) => {
    // Create the card HTML

    const cardHtml = `
          <article class="postcard dark ${getCardColor(index)}">
                    <a class="postcard__img_link" onclick="openModal('${
                      game.id
                    }')">
                        <img class="postcard__img" 
                        src="https://leandromagonza.github.io/portfolioImages/${
                          game.images[0]
                        }"
                        alt="${game.name}" />
                    </a>
                    <div class="postcard__text">
                        <h1 class="postcard__title red"><a href="#">${
                          game.name
                        }</a></h1>
                        
                        <div class="postcard__bar"></div>
                        <div class="postcard__preview-txt">${
                          game.description
                        }</div>
                        ${CreateTagboxList(game)}
                        </div>
                    </div>
                </article>
                `;

    // Append the card to the container
    gamesContainer.innerHTML += cardHtml;
  });
}
function CreateTagboxList(game) {
  const cardTagbox = `
    <ul class="postcard__tagbox">
          <li class="tag__item play  ${
            !game.hasOwnProperty("trailerLink") ? "hide" : ""
          }" id="modalPlayTrailerItem">
            <a id="modalPlayTrailer" href="${
              game.trailerLink
            }"><i class="fas fa-play mr-2"></i>View Trailer</a>
          <li class="tag__item play  ${
            !game.hasOwnProperty("playLink") ? "hide" : ""
          }" id="modalPlayLinkItem">
            <a id="modalPlayLink" href="${
              game.playLink
            }"><i class="fas fa-gamepad mr-2"></i>Play Demo</a>
          </li>
          <li class="tag__item play ${
            !game.hasOwnProperty("codeLink") ? "hide" : ""
          }" id="modalCodeLinkItem">
            <a id="modalCodeLink" href="${
              game.codeLink
            }"><i class="fas fa-code mr-2"></i>View Code</a>
          </li>
          <li class="tag__item play ${
            !game.hasOwnProperty("updateLink") ? "hide" : ""
          }" id="modalViewUpdateItem">
            <a id="modalViewUpdate" href="${
              game.updateLink
            }"><i class="fas fa-exclamation mr-2"></i>Last Update</a>
          </li>
  
        </ul>`;
  return cardTagbox;
}
function openModal(gameId) {
  const game = games.find((g) => g.id === gameId);
  if (!game) return;

  // Set the content for the modal
  document.getElementById("modalTitle").textContent = game.name;
  document.getElementById("modalDescription").textContent = game.description;
  document.getElementById("modal-links").innerHTML = CreateTagboxList(game);

  // Set up the carousel images
  const carouselInner = document.getElementById("carouselInner");
  carouselInner.innerHTML = game.images
    .map(
      (image) =>
        `<img class="carousel-image" src="https://leandromagonza.github.io/portfolioImages/${image}" alt="${game.name}">`
    )
    .join("");

  // Display the modal
  document.getElementById("gameModal").style.display = "block";
  hideSlides();
  scrollSlide(1);
}

function closeModal() {
  var modal = document.getElementById("gameModal");
  modal.style.display = "none";
  hideSlides();
}

// Close modal when clicking anywhere outside the modal content
window.onclick = function (event) {
  if (event.target === document.getElementById("gameModal")) {
    closeModal();
  }
};

/*
    function getCurrentTransform(element) {
      var style = window.getComputedStyle(element);
      var matrix = new WebKitCSSMatrix(style.transform);
      return matrix.m41;
    }
      
      function setupCarousel(images, gameId) {
      const carouselInner = document.getElementById("carouselInner");
      carouselInner.innerHTML = images
        .map(
          (image, index) =>
            `<img src="https://leandromagonza.github.io/portfolioImages/${image}" class="carousel-image" style="${
              index === 0 ? "display: block;" : "display: none;"
            }" alt="Image">`
        )
        .join("");
    
      // Set current slide index
      currentSlideIndex[gameId] = 0;
    }
    */

function getCardColor(index) {
  console.log("called get card color with index " + index);
  const colorIndex = index % 4;

  switch (colorIndex) {
    case 0:
      console.log("RED " + colorIndex);
      return "red";
    case 1:
      console.log("GREEN " + colorIndex);
      return "green";
    case 2:
      console.log("BLUE " + colorIndex);
      return "blue";
    case 3:
      console.log("YELLOW " + colorIndex);
      return "yellow";
    default:
      console.log("RED DEFAULT" + colorIndex);
      return "red";
  }
}

function hideElement(element) {
  if (!element.classList.contains("hide")) {
    element.classList.add("hide");
  }
}
function showElement(element) {
  if (element.classList.contains("hide")) {
    element.classList.remove("hide");
  }
}
window.onload = loadGames;
