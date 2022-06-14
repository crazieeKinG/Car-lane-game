/**
 * It returns a random integer between the two parameters.
 * @param min - The minimum number you want to generate.
 * @param max - The maximum number of the range.
 * @returns A random number between the min and max values.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}