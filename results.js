const caughtArrayResults = document.getElementById('pokemon-caught');
const encounteredArrayResults = document.getElementById('pokemon-encountered');

let caughtResultsRaw = localStorage.getItem('CAUGHT');
let caughtResults = JSON.parse(caughtResultsRaw);
console.log(caughtResults);
caughtArrayResults.textContent = caughtResultsRaw;


let encounteredResultsRaw = localStorage.getItem('ENCOUNTERED');
let encounteredResults = JSON.parse(encounteredResultsRaw);
console.log(encounteredResults);
encounteredArrayResults.textContent = encounteredResultsRaw;