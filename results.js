let caughtResultsRaw = localStorage.getItem('CAUGHT');
let caughtResults = JSON.parse(caughtResultsRaw);

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

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: mungeNames(encounteredResults),
        datasets: [{
            label: '# Caught',
            data: mungeCaught(encounteredResults),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }, {
            label: '# Encountered',
            data: mungeEncountered(encounteredResults),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
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