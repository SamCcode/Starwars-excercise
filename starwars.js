// hämta API

const start_URL = "https://swapi.dev/api/"

async function getRandomStarWars() {
    let data = await fetch(start_URL + "/people/");
    data = await data.json();
    let results = data.results
    return results;
}

function getListOfNames() {
    getRandomStarWars().then((results) =>{
    let parent = document.querySelector("section")
    results.forEach(el => {
        let child = document.createElement("p")
        child.innerText = el.name
        child.addEventListener("click", genereateInfo)
        parent.appendChild(child)
     });
    })}

function genereateInfo() {
    console.log("hej");
}
getListOfNames()



