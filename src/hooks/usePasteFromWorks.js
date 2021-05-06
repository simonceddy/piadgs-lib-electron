import { useState, useCallback } from 'react';
import { trim } from 'lodash';

/**
 * Column map for split text.
 *
 * In order of top-bottom = left-right.
 *
 * False entries indicate a column that should be ignored.
 */
const columns = [
  false,
  'authors',
  false,
  'title',
  false,
  'imprint',
  false,
  'pagination',
  false,
  'accessionNumber',
  false,
  'todo1',
  false,
  'callNumber',
  'date',
  'source',
  'cost',
  false,
  false,
  'todo3',
  'subjects'
];

const handlers = {
  authors(val) {
    const authors = val.split('&')
      .map((author) => {
        const [surname, givenNames] = author.split(',', 2).map((bit) => trim(bit));
        return { surname, givenNames };
      });
    return authors;
  },
  subjects(val) {
    return val.split(/\s\s+/i).map((bit) => ({ name: trim(bit) }));
  }
};

const handleData = (col, val) => {
  if (!handlers[col]) {
    return val;
  }
  return handlers[col](val);
};

const ignoreVals = [
  '0', '.'
];

const shouldIgnore = (val) => ignoreVals.filter((ignore) => val === ignore)
  .length > 0;

// TODO validate and sanitize input
export default function usePasteFromWorks() {
  const [currentVal, setCurrentVal] = useState('');
  const [resultsList, setResultsList] = useState([]);
  const [isProcessed, setIsProcessed] = useState(false);

  const transformText = useCallback((value) => value.split('\n')
    .filter((bit) => trim(bit).length > 0)
    .map((line) => {
      const obj = {
        unexpectedValues: []
      };
      line.split('\t').map((val, key) => {
        const column = columns[key];
        if (!column && !shouldIgnore(val) && val.length > 0) {
          obj.unexpectedValues.push({
            key,
            val,
            adjacent: [
              key === 0 ? null : columns[key - 1],
              key === columns.length - 1 ? null : columns[key + 1],
            ]
          });
        } else if (column !== false) {
          obj[column] = handleData(column, val);
        }
        return column;
      });
      return obj;
    }), [currentVal]);

  const processText = () => {
    setResultsList(transformText(currentVal));
    setIsProcessed(true);
  };

  const clear = () => {
    setCurrentVal('');
    setResultsList([]);
    setIsProcessed(false);
  };

  const setCurrent = (val) => {
    if (isProcessed) {
      setIsProcessed(false);
    }
    setCurrentVal(val);
  };

  return {
    current: currentVal,
    setCurrent,
    results: resultsList,
    processText,
    clear,
    isProcessed
  };
}
