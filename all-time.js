/* eslint-disable no-undef */
const playAgainButton = document.getElementById('play-again');

playAgainButton.addEventListener('click', () => {
    window.location.href = './index.html';
});

let allTimeResultsRaw = localStorage.getItem('ALL-TIME');
let allTimeResults = JSON.parse(allTimeResultsRaw);

const ctx = document.getElementById('chart').getContext('2d');

function mungeNames(allTimeResults) {
    let names = [];
    for (let i = 0; i < allTimeResults.length; i++) {
        const pokemon = allTimeResults[i];
        names.push(pokemon.pokemon);
    }
    return names;
}

function mungeCaught(allTimeResults) {
    let caught = [];
    for (let i = 0; i < allTimeResults.length; i++) {
        const pokemonCaught = allTimeResults[i];
        caught.push(pokemonCaught.caught);
    }
    return caught;
}

function mungeEncountered(allTimeResults) {
    let encountered = [];
    for (let i = 0; i < allTimeResults.length; i++) {
        const pokemonEncountered = allTimeResults[i];
        encountered.push(pokemonEncountered.timesEncountered);
    }
    return encountered;
}

Chart.defaults.global.defaultFontColor = 'yellow';
Chart.defaults.global.defaultFontFamily = 'PokemonHollow';
Chart.defaults.global.defaultFontSize = 16;
// eslint-disable-next-line no-unused-vars
let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: mungeNames(allTimeResults),
        datasets: [{
            label: '# Caught',
            data: mungeCaught(allTimeResults),
            backgroundColor: 'red',
            borderColor: 'black',
            borderWidth: 1
        }, {
            label: '# Encountered',
            data: mungeEncountered(allTimeResults),
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