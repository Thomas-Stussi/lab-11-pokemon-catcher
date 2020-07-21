// IMPORT MODULES under test here:
// import { example } from '../example.js';
import { getRandomPokemon } from '../pokemonUtils.js';

const test = QUnit.test;

test('getRandomPokemon should produce 1 when given an array with only one object', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = 1;
    let array = [1];
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = getRandomPokemon(array);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual, expected);
});
