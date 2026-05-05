async function loadData() {
    const url = 'https://currentuvindex.com/api/v1/uvi?latitude=40.6943&longitude=-73.9249'; // mit korrekter API-URL ersetzen
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
const data = await loadData();
console.log(data); // gibt die Daten der API oder false in der Konsole ausconsole.log('hoi')