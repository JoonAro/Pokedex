const content = document.querySelector('section');
//creates variable named content and targets section in html
const container = document.querySelector('container');
let type2Cont = document.querySelector('type2');
const searchButton = document.querySelector('pokeSearch');
let searchInput;
const searchDiv = document.querySelector('search');
const pokeNr = document.querySelector('#pokeNr');
let pokeData = [1, 2, 3];
let searchResult = [];
let pokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
let pokeUrl2 =  'https://pokeapi.co/api/v2/pokemon?limit=100&offset=151'
let pokeUrl3 =  'https://pokeapi.co/api/v2/pokemon?limit=135&offset=251'
let pokeUrl4 =  'https://pokeapi.co/api/v2/pokemon?limit=107&offset=386'
let pokeUrl5 =  'https://pokeapi.co/api/v2/pokemon?limit=156&offset=493'
let pokeUrl6 =  'https://pokeapi.co/api/v2/pokemon?limit=72&offset=649'
let pokeUrl7 =  'https://pokeapi.co/api/v2/pokemon?limit=88&offset=721'
let pokeUrl8 =  'https://pokeapi.co/api/v2/pokemon?limit=96&offset=809'
let pokeUrl9 =  'https://pokeapi.co/api/v2/pokemon?limit=112&offset=905'
let pokeUrl10 = 'https://pokeapi.co/api/v2/pokemon?limit=1017&offset=0'
let pokeUrls = pokeUrl;
//you can press enter to search
function search(ele) {
    if(event.key === 'Enter') {
        searchFunc();     
    }
}
const genHolder = document.querySelectorAll('pokeGen');
const genSelect = () => {
    if (document.querySelector('#gen1').checked) {
        pokeUrls = pokeUrl;
        pokeNr.textContent = '151 Pokemon';
    }
    else if (document.querySelector('#gen2').checked) {
    pokeUrls = pokeUrl2;
    pokeNr.textContent = '100 Pokemon';
    }
    else if (document.querySelector('#gen3').checked) {
        pokeUrls = pokeUrl3;
        pokeNr.textContent = '135 Pokemon';
    }
    else if (document.querySelector('#gen4').checked) {
        pokeUrls = pokeUrl4;
        pokeNr.textContent = '107 Pokemon';
    }
    else if (document.querySelector('#gen5').checked) {
        pokeUrls = pokeUrl5;
        pokeNr.textContent = '156 Pokemon';
    }
    else if (document.querySelector('#gen6').checked) {
        pokeUrls = pokeUrl6;
        pokeNr.textContent = '72 Pokemon';
    }
    else if (document.querySelector('#gen7').checked) {
        pokeUrls = pokeUrl7;
        pokeNr.textContent = '88 Pokemon';
    }
    else if (document.querySelector('#gen8').checked) {
        pokeUrls = pokeUrl8;
        pokeNr.textContent = '96 Pokemon';
    }
    else if (document.querySelector('#gen9').checked) {
        pokeUrls = pokeUrl9;
        pokeNr.textContent = '112 Pokemon';
    }
    else if (document.querySelector('#gen10').checked) {
        pokeUrls = pokeUrl10;
        pokeNr.textContent = '1017 Pokemon. Search a pokemon type here to get all pokemon of that type.';
    }
    fetchData();
}
const searchFunc = () => {
    searchInput = document.querySelector('#searchBar').value;
    console.log(searchInput);
    //if searchInput is empty reload page
    if (searchInput === '') {
        window.location.reload();
    }
    if(searchInput < 1017 && searchInput >= 1) {
        searchInput++;
        searchInput--;}
        //get length of searchinput. Needed if name.
        const inputLength = searchInput.length;
        
        searchResult = pokeData.filter((pokemon) => {
            if (pokemon.id === searchInput) {
                return pokemon;
                //using input length to take same length slice of pokemon.name
            } else if (pokemon.name === searchInput || pokemon.name.slice(0, inputLength) === searchInput) {
                return pokemon;
            }else if (pokemon.types[0].type.name === searchInput) {
                return pokemon;
                //if type 2 exists check if it matches the search
            }else if (pokemon.types[1] != undefined && pokemon.types[1].type.name === searchInput) {
                return pokemon;
            }           
        })
        pokeCard();
} 
const fetchData = async() => {
    await
fetch(pokeUrls)
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
/* searchInput = document.querySelector('#searchBar').value
console.log(searchInput); */


const pokeCards = () => {
   //map takes the pokeData array 
    //getting every string to start with uppercase letter
    const cards = pokeData.map((pokemon) => {
        console.log(pokemon);
        let name = ' ' + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + ' ';
        let type1 = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
        //getting weight to kilos and height to meters
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
    content.innerHTML = cards;
    //this creates the content inside section
}
//pokeCard identical to pokeCards but runs the searchResults instead of pokeData and prints card to html instead of cards
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
searchDiv.addEventListener('change', searchBarReset);
genHolder.addEventListener('change', genSelect);