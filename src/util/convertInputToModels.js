import { fromWorksCols } from '../shared/data/columns';
import splitUserInput from './splitUserInput';

/**
 * Convert input text into model objects
 *
 * @param {string} input Input text
 * @returns {object} Array of converted objects
 */
export default function converInputToModels(input) {
  return input.split('\n')
    .filter((bit) => bit.trim().length > 0)
    .map((line, id) => {
      const obj = {
        id
      };

      const bits = line.split('\t');
      fromWorksCols.map(({ key }, index) => {
        if (key === 'subjects' && bits[index]) {
          obj.subjects = splitUserInput(bits[index])
            .map((name) => ({ name }));
        } else {
          obj[key] = bits[index] || '';
        }
        return true;
      });
      return obj;
    });
}
