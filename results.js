const playAgainButton = document.getElementById('play-again');
const allTimeResultsButton = document.getElementById('all-time');

let encounteredResultsRaw = localStorage.getItem('ENCOUNTERED');
let encounteredResults = JSON.parse(encounteredResultsRaw);

let caughtResultsRaw = localStorage.getItem('CAUGHT');
let caughtResults = JSON.parse(caughtResultsRaw);

const ctx = document.getElementById('chart').getContext('2d');
const cty = document.getElementById('chart1').getContext('2d');

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