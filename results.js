const playAgainButton = document.getElementById('play-again');
const allTimeResultsButton = document.getElementById('all-time');

let encounteredResultsRaw = localStorage.getItem('ENCOUNTERED');
let encounteredResults = JSON.parse(encounteredResultsRaw);

const ctx = document.getElementById('chart').getContext('2d');

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