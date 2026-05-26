// DOM elements
const seasonFilter = document.querySelector(".seasonfilter"); // dropdown menu
const content = document.querySelector("#content"); // Behälter, dessen Inhalt geändert wird

// API
// const apiUrl = "https://api.sampleapis.com/avatar/episodes";
const apiUrl = "../data.json"; // todo: diese Zeile löschen und URL wieder aktiv machen 

let episodes = []; // hier werden alle Episoden aus der API abgespeichert, nun ist es noch leer, nach dem Laden wird es mit Inhalt gefüllt

const seasonData = {
  seasonOne: {
    number: "BOOK ONE:",
    title: "WATER",
    animation: "animationen/water.json",
    apiSeason: "1"
  },
  seasonTwo: {
    number: "BOOK TWO:",
    title: "EARTH",
    animation: "animationen/earth.json",
    apiSeason: "2"
  },
  seasonThree: {
    number: "BOOK THREE:",
    title: "FIRE",
    animation: "animationen/fire.json",
    apiSeason: "3"
  }
}; // hier werden zusätzliche Informationen gespeichert, die nicht aus der API zu lesen sind

async function loadEpisodes() {
  const response = await fetch(apiUrl);
  episodes = await response.json();

  console.log("API geladen:");
  console.log(episodes);
  console.log("Erste Episode:");
  console.log(episodes[0]);
}

function showStartPage() {
  content.innerHTML = `
    <img src="img/Avatar_Aang.png" alt="Avatar points to dropdown menu">
  `;
} // wenn man "select season" auswählt, wird Startseite wieder angezeigt

// --> Staffel Overview anzeigen
function showSeason(selectedSeason) {
    console.log("Ausgewählte Season:", selectedSeason);

  // passende Staffel holen
  const season = seasonData[selectedSeason];
  console.log("Season-Daten:", season);

  // Episoden filtern
  const filteredEpisodes = episodes.filter(episode => {
    return episode.Season === season.apiSeason;
  });

 console.log("Gefilterte Episoden:", filteredEpisodes);

  // Übertitel, season card und animation card werden eingeblendet
  content.innerHTML = `
    <img src="img/IM2_Uebertitel_Avatar 1.png" alt="Episodes Overview">

    <div class="season-card">
      <p>${season.number}</p>
      <h2>${season.title}</h2>
    </div>

    <div class="animation-card">
      <lottie-player 
        src="${season.animation}" 
        background="transparent" 
        speed="1" 
        loop 
        autoplay>
      </lottie-player>
    </div>

    <div class="episodes-container"></div>
  `;

  // Episoden Overview 
  const episodesContainer = document.querySelector(".episodes-container");

  // mit Schleife episode-cards kreiieren
  filteredEpisodes.forEach(episode => {
    const card = document.createElement("div");
    card.classList.add("episode-card");

  // Karte füllen
    card.innerHTML = `
      <h2>${episode.NumInSeason.toString().padStart(2, "0")}</h2>
      <button>INFOS</button>
    `;

    // Info Button, der Infos Box anzeigt, wenn man darauf klickt
    const button = card.querySelector("button");
    button.addEventListener("click", () => {
      showInfoBox(episode);
    });

    episodesContainer.appendChild(card);
  });
}

// Episoden Daten in Infobox 
function showInfoBox(episode) {
  const infoBox = document.createElement("div");
  infoBox.classList.add("info-overlay"); // Overlay erzeugt dunkle Ebene

  // Infobox im HTML erzeugen
  infoBox.innerHTML = `
    <div class="info-box">
      <button class="close-button">×</button>

      <p>EPISODE ${episode.NumInSeason}</p>

      <h2>TITLE: "${episode.Title}"</h2>
      <p>FIRST AIRED ON: ${episode.OriginalAirDate}</p>

      <p>WRITTEN BY:<br>${episode.WrittenBy}</p>
      <p>DIRECTED BY:<br>${episode.DirectedBy}</p>
      <p>ANIMATED BY:<br>${episode.AnimatedBy}</p>
    </div>
  `;

  // Popup einfügen
  document.body.appendChild(infoBox);

  // wenn man auf das Kreuz drückt, schliesst sich das Popup Fenster wieder
  const closeButton = infoBox.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    infoBox.remove();
  });
}

// überwacht das dropdown menu und reagiert, wenn die Auswahl geändert wird
seasonFilter.addEventListener("change", () => {
  console.log("Dropdown wurde verändert");
  console.log("Wert:", seasonFilter.value);

  const selectedSeason = seasonFilter.value;

  if (selectedSeason === "") {
    showStartPage();
  } else {
    showSeason(selectedSeason);
  }
});

// startet API Anfrage direkt beim Laden der Webseite
loadEpisodes();