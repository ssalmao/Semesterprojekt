// DOM elements
const container = document.querySelector('#content');

// Daten holen
async function loadEpisodes() {
    const url = 'https://api.sampleapis.com/avatar/episodes'; 
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
const all_episodes = await loadEpisodes();
//console.log(all_episodes); // gibt die Daten der API oder false in der Konsole ausconsole.log('hoi')

//debug print
all_episodes.forEach((episode) => console.log(episode.Season));

function filterEpisodes(season) {
    // extract filter stuff to here
}


// -> daten darstellen
function showEpisodes(season) {
    // container leeren
    container.innerHTML = '';

    console.log(season);

    // daten filtern
    let filtered_episodes;


    filtered_episodes =  all_episodes.filter(episode => {
    return episode.Season == season;
    });
    

    console.log(filtered_episodes);

    filtered_episodes = filterEpisodes(season);

    // daten aufbereiten und in html schreiben
    filtered_episodes.forEach(episode => {


        // Card für Season
        const season_card = document.createElement('div');
        season_card.classList.add = "dsaf";

        console.log(season_card);

        // Card für Animation
        const animation_card = document.createElement('div');  

        // Card für Episode
        const episode_card = document.createElement('div');
           
        // h2 mit name erstellen & befüllen
        const name = document.createElement('h2');
        name.innerText = character.name;
            
        // p mit actor erstellen & befüllen
        const actor = document.createElement('p');
        actor.innerText = character.actor || 'Nichts definiert';

        // p mit house erstellen & befüllen & klasse hinzufügen
        const house = document.createElement('p');
        house.innerText = character.house;
        house.classList.add('house');

       
                
        // card zusammenbauen
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(actor);
        card.appendChild(house);

        // card in den html-container schreiben
        container.appendChild(card);
    })
}

showEpisodes(1);


// event listener auf drpodown
// wenn value == Episode 1 -> showEpisodes(1), 