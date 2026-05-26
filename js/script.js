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

