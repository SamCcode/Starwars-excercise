const start_URL = "https://swapi.dev/api/people/";
const charsWrapper = document.querySelector(".chars-card__wrapper");
const detailsWrapper = document.querySelector(".details-card__wrapper");
const worldWrapper = document.querySelector(".details-card__worldwrapper")
const pageCounter = document.querySelector(".page-counter");
const leftCounter = document.querySelector(".left-arrow");
const rightCounter = document.querySelector(".right-arrow");
let pageCount = 1;
pageCounter.innerHTML = pageCount + " / 8";

// för att hämta API på starwars
async function fetchStarWars() {
    charsWrapper.innerHTML = "";
    let data = await fetch(start_URL + "?page=" + pageCount);
    data = await data.json();
    let results = await data.results;
    generateStarwarsCharsUi(results);
}
// för att hämta api på world inuti starwars
async function fetchHomeworld(objWorld) {
    let world = await fetch(objWorld);
    world = await world.json();
    generateStarwarsWorldInfo(world)
}
// för att generera starwarsnamnen till HTML samt göra dom klickbara
function generateStarwarsCharsUi(chars) {
    chars.forEach(char => {
        let charEl = document.createElement("p");
        charEl.innerHTML = char.name;
        charsWrapper.appendChild(charEl);
        let charInfo = char;
        charEl.addEventListener("click", (clicked) =>{
            let targetEl = clicked.currentTarget;
            generateDetailsInfo(targetEl, charInfo);
            fetchHomeworld(charInfo.homeworld);
        });
    });
}
// för att få fram informationen som ska användas under details
function generateDetailsInfo(targetEl, charInfo) {
    let detailsList = [];
    console.log(charInfo);
    detailsName = charInfo.name
    for (const [key, value] of Object.entries(charInfo)) {
        detailsList.push(`${key}: ${value}`);
    }
    generateDetailsUi(detailsList)
}
// för att få fram informationen som ska användas under world
function generateStarwarsWorldInfo(world) {
    let worldList = []
    let worldName = world.name
    for (const [key, value] of Object.entries(world)) {
        worldList.push(`${key}: ${value}`);
    }
    generateWorldUi(worldList, worldName)
}
// för att skriva ut detailsinformationen i HTML
function generateDetailsUi(detailsList) {
    detailsWrapper.innerHTML = "";
    let detailsH3 = document.createElement("h3");
    detailsH3.innerHTML = detailsName;
    detailsWrapper.appendChild(detailsH3)
    detailsList.length = 7;
    for (let i = 1; i < 7; i++){
        let detailsEl = document.createElement("p");
        detailsEl.innerHTML = detailsList[i];
        detailsWrapper.appendChild(detailsEl);
    }
}
// för att skriva ut worldinformationen i HTLM
function generateWorldUi(worldList, worldName) {
    worldWrapper.innerHTML = "";
    let worldH3 = document.createElement("h3");
    worldH3.innerHTML = worldName;
    worldWrapper.appendChild(worldH3)
    worldList.length = 7;
    for (let i = 1; i < 7; i++){
        let worldDetailsEl = document.createElement("p");
        worldDetailsEl.innerHTML = worldList[i];
        worldWrapper.appendChild(worldDetailsEl);
    }
}
// för att kunna välja sida av starwars characters
leftCounter.addEventListener("click", () => {
    if (pageCount > 1) {
        pageCount--;
        pageCounter.innerHTML = pageCount + " / 8";
        fetchStarWars(pageCount);
    }
})
rightCounter.addEventListener("click", () => {
    if (pageCount < 9) {
        pageCount++;
        pageCounter.innerHTML = pageCount + " / 8";
        fetchStarWars(pageCount);
    }
})

fetchStarWars()



