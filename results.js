const playAgainButton = document.getElementById('play-again');
const allTimeResultsButton = document.getElementById('all-time');

let encounteredResultsRaw = localStorage.getItem('ENCOUNTERED');
let encounteredResults = JSON.parse(encounteredResultsRaw);

let caughtResultsRaw = localStorage.getItem('CAUGHT');
let caughtResults = JSON.parse(caughtResultsRaw);

const ctx = document.getElementById('chart').getContext('2d');
const cty = document.getElementById('chart1').getContext('2d');
const ctz = document.getElementById('chart2').getContext('2d');

function mungeNames(encounteredResults) {
    let names = [];
    for (let i = 0; i < encounteredResults.length; i++) {
        const pokemon = encounteredResults[i];
        names.push(pokemon.pokemon);
    }
    return names;
}

function mungeCaught(encounteredResults) {
    let caught = [];
    for (let i = 0; i < encounteredResults.length; i++) {
        const pokemonCaught = encounteredResults[i];
        caught.push(pokemonCaught.caught);
    }
    return caught;
}

function mungeEncountered(encounteredResults) {
    let encountered = [];
    for (let i = 0; i < encounteredResults.length; i++) {
        const pokemonEncountered = encounteredResults[i];
        encountered.push(pokemonEncountered.timesEncountered);
    }
    return encountered;
}

function mungeAttack(caughtResults) {
    let attackArray = [];
    for (let i = 0; i < caughtResults.length; i++) {
        const pokemon = caughtResults[i].attack;
        attackArray.push(pokemon); 
    }
    return attackArray;
}

function mungeDefense(caughtResults) {
    let defenseArray = [];
    for (let i = 0; i < caughtResults.length; i++) {
        const pokemon = caughtResults[i].defense;
        defenseArray.push(pokemon); 
    }
    return defenseArray;
}

//My attempt to munge types to leverage for a pie chart
function classifyType(array) {
    //initialize all types as objects with a name and quantity
    const typeArray = [
        { id:'grass', quantity: 0 },
        { id:'fire', quantity: 0 },
        { id:'water', quantity: 0 },
        { id:'bug', quantity: 0 },
        { id:'normal', quantity: 0 },
        { id:'flying', quantity: 0 },
        { id:'poison', quantity: 0 },
        { id:'dragon', quantity: 0 }
    ];
    for (let i = 0; i < array.length; i++) {
        
        const pokemon = array[i];
        //for caughtpokemon, check their type_1 and type_2 against each type.name, if its a match, increment that quantity
        if (pokemon.type_1 === typeArray[0].id || pokemon.type_2 === typeArray[0].id) {
            typeArray[0].quantity++;
        } else if (pokemon.type_1 === typeArray[1].id || pokemon.type_2 === typeArray[1].id) {
            typeArray[1].quantity++;
        } else if (pokemon.type_1 === typeArray[2].id || pokemon.type_2 === typeArray[2].id) {
            typeArray[2].quantity++;
        } else if (pokemon.type_1 === typeArray[3].id || pokemon.type_2 === typeArray[3].id) {
            typeArray[3].quantity++;
        } else if (pokemon.type_1 === typeArray[4].id || pokemon.type_2 === typeArray[4].id) {
            typeArray[4].quantity++;
        } else if (pokemon.type_1 === typeArray[5].id || pokemon.type_2 === typeArray[5].id) {
            typeArray[5].quantity++;
        } else if (pokemon.type_1 === typeArray[6].id || pokemon.type_2 === typeArray[6].id) {
            typeArray[6].quantity++;
        } else if (pokemon.type_1 === typeArray[7].id || pokemon.type_2 === typeArray[7].id) {
            typeArray[7].quantity++;
        }
    }
    return typeArray;
}
const pokemonTypes = classifyType(caughtResults);

//munge names from typeArray
function mungeTypeName(pokemonTypes) {
    let typeNames = [];
    for (let i = 0; i < pokemonTypes.length; i++) {
        const typeName = pokemonTypes[i].id;
        typeNames.push(typeName);
    }
    return typeNames;
}
//munge quantities from typeArray
function mungeTypeQuantity(pokemonTypes) {
    let typeQuantities = [];
    for (let i = 0; i < pokemonTypes.length; i++) {
        const typeQuantity = pokemonTypes[i].quantity;
        typeQuantities.push(typeQuantity);
    }
    return typeQuantities;
}


Chart.defaults.global.defaultFontColor = 'yellow';
Chart.defaults.global.defaultFontFamily = 'PokemonHollow';
Chart.defaults.global.defaultFontSize = 16;
// eslint-disable-next-line no-undef, no-unused-vars
let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: mungeNames(encounteredResults),
        datasets: [{
            label: '# Caught',
            data: mungeCaught(encounteredResults),
            backgroundColor: 'red',
            borderColor: 'black',
            borderWidth: 1
        }, {
            label: '# Encountered',
            data: mungeEncountered(encounteredResults),
            backgroundColor: 'blue',
            borderColor: 'black',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

let attackDefenseChart = new Chart(cty, {
    type: 'bar',
    data: {
        labels: mungeNames(caughtResults),
        datasets: [{
            label: 'Attack',
            data: mungeAttack(caughtResults),
            backgroundColor: 'red',
            borderColor: 'black',
            borderWidth: 1
        }, {
            label: 'Defense',
            data: mungeDefense(caughtResults),
            backgroundColor: 'blue',
            borderColor: 'black',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

//pie chart for types caught
var data = {
    labels: mungeTypeName(pokemonTypes),
    datasets: [
        {
            fill: true,
            borderColor: 'black',
            backgroundColor: ['green', 'red', 'blue', 'orange', 'grey', 'white', 'chartreuse', 'purple'],
            data: mungeTypeQuantity(pokemonTypes)
        }
    ]
};

let myPieChart = new Chart(ctz, {
    type: 'pie',
    data: data,
});


playAgainButton.addEventListener('click', () => {
    localStorage.setItem('CAUGHT', []);
    localStorage.setItem('ENCOUNTERED', []);
    localStorage.setItem('ALL-TIME', encounteredResultsRaw);
    window.location.href = './index.html';
});

allTimeResultsButton.addEventListener('click', () => {
    localStorage.setItem('CAUGHT', []);
    localStorage.setItem('ENCOUNTERED', []);
    localStorage.setItem('ALL-TIME', encounteredResultsRaw);
    window.location.href = './all-time.html';
});