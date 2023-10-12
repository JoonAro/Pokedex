const content = document.querySelector('section');
//creates variable named content and targets section in html
const container = document.querySelector('container');
let type2Cont = document.querySelector('type2');
const searchButton = document.querySelector('pokeSearch');
let searchInput;
const searchDiv = document.querySelector('search');
let pokeData = [1, 2, 3];
let searchResult = [];
let pokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=121&offset=0'
const searchFunc = () => {
    searchInput = document.querySelector('#searchBar').value;
    console.log(searchInput);
    if (searchInput === '') {
        window.location.reload();
    }
    if(searchInput < 121 && searchInput >= 1) {
        searchInput++;
        searchInput--;}
        const inputLength = searchInput.length;
        searchResult = pokeData.filter((pokemon) => {
            if (pokemon.id === searchInput) {
                return pokemon;
            } else if (pokemon.name === searchInput || pokemon.name.slice(0, inputLength) === searchInput) {
                return pokemon;
            }else if (pokemon.types[0].type.name === searchInput) {
                return pokemon;
            }else if (pokemon.types[1] != undefined && pokemon.types[1].type.name === searchInput) {
                return pokemon;
            }
            
        })
        pokeCard();
} 

const fetchData = async() => {
    await
fetch(pokeUrl)
.then(res => res.json())
.then(data => {
    const fetches = data.results.map(item => {
return fetch(item.url)
.then((res) => res.json())
.then((data) => {
    return {
        id: data.id,
        name: data.name,
        img: data.sprites.other['official-artwork'].front_default,
        types: data.types,
        height: data.height,
        weight: data.weight
    };
});

});
    Promise.all(fetches).then(res => {
        pokeData = res;

        pokeCards();
});
})
}
/* const pokemonSearched = pokeData2.filter((pokemon) => pokemon.name.includes(searchInput)).map((pokemon2) => { */
/* const fetchData2 = async() => {
    const response = await fetch(pokeUrl);
    const data = await response.json();
    const {name, id, height, weight, types} = data;
    const img = data.sprites.other['official-artwork'].front_default;
    name1 = name;
    id1 = id;
    height1 = height;
    weight1 = weight;
    img1 = img;
        whatEverFunc(); */
searchInput = document.querySelector('#searchBar').value
console.log(searchInput);


const pokeCards = () => {
   //map takes the pokeData array 
    //getting every string to start with uppercase letter
    const cards = pokeData.map((pokemon) => {
        console.log(pokemon);
        let name = ' ' + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + ' ';
        let type1 = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
        let weight = pokemon.weight / 10;
        let height = pokemon.height / 10;
    //console.log(pokemon.types[0].type.url);

        //if there are 2 types and the 2nd type isn't undefined run this or else emptystring
        if (pokemon.types[1] != undefined) {
            let type2 = pokemon.types[1].type.name.charAt(0).toUpperCase() + pokemon.types[1].type.name.slice(1);
          type2Cont = ` & ${type2}`;
        }else {
            type2Cont = '';
        }
        return `<div class="container">
        <div class="nro ${type1}">${pokemon.id}</div>
        <img class="pokePic ${type1}"
        src="
        ${pokemon.img}"
        />
        <div class="card">
        <div>Name: ${name} </div>
        <div>Type: ${type1} ${type2Cont}
        </div>
        <div>Height: ${height} m</div>
        <div>Weight: ${weight} kgs</div>
        </div>
        </div>`
    }).join('')
//pokemon.types.map((type) => getTypeString(type)).join('')
/* ${pokemon.types[0].type.name} */
/* ${if (pokemon.types[1] != undefined) {
    pokemon.types[1].type.name}
}} */


    content.innerHTML = cards;
    
    //this creates the content inside section
}
const pokeCard = () => {
     const card = searchResult.map((pokemon) => {
         console.log(pokemon);
         let name = ' ' + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + ' ';
         let type1 = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
         let weight = pokemon.weight / 10;
         let height = pokemon.height / 10;
         //if there are 2 types and the 2nd type isn't undefined run this or else emptystring
         if (pokemon.types[1] != undefined) {
             let type2 = pokemon.types[1].type.name.charAt(0).toUpperCase() + pokemon.types[1].type.name.slice(1);
           type2Cont = ` & ${type2}`;
         }else {
             type2Cont = '';
         }
         return `<div class="container">
         <div class="nro ${type1}">${pokemon.id}</div>
         <img class="pokePic ${type1}"
         src="
         ${pokemon.img}"
         />
         <div class="card">
         <div>Name: ${name} </div>
         <div>Type: ${type1} ${type2Cont}
         </div>
         <div>Height: ${height} m</div>
         <div>Weight: ${weight} kgs</div>
         </div>
         </div>`
     }).join('')
     content.innerHTML = card;
    }
     fetchData();

const searchBarReset = () => {
    searchInput = '';
    searchInput = document.querySelector('#searchBar').value;
}
//searchInput.addEventListener('change', searchBarReset);
searchDiv.addEventListener('change', searchBarReset);
/* searchButton.addEventListener('click', whatEverFunc); */