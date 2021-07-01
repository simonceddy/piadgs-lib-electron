/**
 * Split and trim user input and filter empty bits
 * @param {string} input User input string
 * @returns {string[]} Array of strings
 */
export default function splitUserInput(input, delimiter = ',') {
  return input.split(delimiter)
    .map((bit) => bit.trim())
    .filter((bit) => bit.length > 0);
}
