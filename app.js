// import functions and grab DOM elements
import { pokemon } from './pokemon.js';
import { getRandomPokemon } from './pokemonUtils.js';

const caughtCounter = document.getElementById('caught-counter');
const radios = document.querySelectorAll('input');
let caughtArray = [];
let encounteredArray = [];
let trio = [];

//labels
let labels = document.querySelectorAll('label');

let label0 = labels[0];
let input0 = label0.children[0];
let img0 = label0.children[1];

let label1 = labels[1];
let input1 = label1.children[0];
let img1 = label1.children[1];

let label2 = labels[2];
let input2 = label2.children[0];
let img2 = label2.children[1];

// initialize state
let triosEncountered = 0;
let pokemonCaught = 0;
let randomPokemon0 = getRandomPokemon(pokemon);
let randomPokemon1 = getRandomPokemon(pokemon);
let randomPokemon2 = getRandomPokemon(pokemon);

// set event listeners to update state and DOM

const initializeNewTrio = () => {
    //get initial trio
    let randomPokemon0 = getRandomPokemon(pokemon);
    let randomPokemon1 = getRandomPokemon(pokemon);
    let randomPokemon2 = getRandomPokemon(pokemon);
    while (randomPokemon0.id === randomPokemon1.id || randomPokemon0.id === randomPokemon2.id || randomPokemon1.id === randomPokemon2.id) {
        let randomPokemon0 = getRandomPokemon(pokemon);
        let randomPokemon1 = getRandomPokemon(pokemon);
        let randomPokemon2 = getRandomPokemon(pokemon);
    }
    trio.push(randomPokemon0, randomPokemon1, randomPokemon2);

    //add all three to the encounteredArray
        //if not in array, add to array
    if (encounteredArray.includes(trio[0]) === false) {
        encounteredArray.push(trio[0]);
        trio[0].timesEncountered = 0;
        //if in array, increment encountered quantity
    } else { if (encounteredArray.includes(trio[0]) === true); 
        trio[0].timesEncountered++;
    }
    //repeat for other two
    if (encounteredArray.includes(trio[1]) === false) {
        encounteredArray.push(trio[1]);
        trio[1].timesEncountered = 0;
    } else { if (encounteredArray.includes(trio[1]) === true);
        trio[1].timesEncountered++;
    }
    if (encounteredArray.includes(trio[2]) === false) {
        encounteredArray.push(trio[2]);
        trio[2].timesEncountered = 0;
    } else { if (encounteredArray.includes(trio[2]) === true); 
        trio[2].timesEncountered++;
    }

    //add properties of those pokemon to the correct html elements
    input0.value = trio[0].id;
    img0.src = trio[0].url_image;

    input1.value = trio[1].id;
    img1.src = trio[1].url_image;

    input2.value = trio[2].id;
    img2.src = trio[2].url_image;

    radios.forEach((radioTag, i) => {
        if (i === 0) {
            radioTag.value = trio[0].id;
        } else if (i === 1) {
            radioTag.value = trio[1].id;
        } else if (i === 2) {
            radioTag.value = trio[2].id;
        }
    });
};
initializeNewTrio();
//when you select a new pokemon
radios.forEach((radio) => {
    radio.addEventListener('click', (event) => {
        //get the pokemon from that radio
        if (Number(event.target.value) === trio[0].id) {
            //if uncaught push to caughtArray and initialize caught property
            if (caughtArray.includes(trio[0]) === false) {
                caughtArray.push(trio[0]);
                trio[0].caught = 1;
            } else {
                //increment caught property
                trio[0].caught++;
            }
        }
        if (Number(event.target.value) === trio[1].id) {
            if (caughtArray.includes(trio[1]) === false) {
                caughtArray.push(trio[1]);
                trio[1].caught = 1;
            } else {
                trio[1].caught++;
            }
        }
        if (Number(event.target.value) === trio[2].id) {
            if (caughtArray.includes(trio[2]) === false) {
                caughtArray.push(trio[2]);
                trio[2].caught = 1;
            } else {
                trio[2].caught++;
            }
        }
        pokemonCaught++;
        triosEncountered++;
        caughtCounter.textContent = `Congratulations! You've caught ${pokemonCaught} pokemon!`; 
        //reset the game
        if (triosEncountered === 10) {
            console.log('relocate');
            window.location.href = './results.html';
        }
        //clear trio and checked
        radios.checked = false;
        trio = [];
        initializeNewTrio();
    });
    
});
