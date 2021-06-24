import { useEffect, useState } from 'react';

export default function useInputSuggestions(
  callback = () => null,
  initialInput = '',
  minimumLength = 3
) {
  const [input, setInput] = useState(initialInput);

  const [suggestions, setSuggestions] = useState([]);

  const clearSuggestions = () => setSuggestions([]);

  useEffect(() => {
    if (input.length >= minimumLength) {
      callback(input, setSuggestions);
    } else if (suggestions.length > 0) {
      clearSuggestions();
    }
  }, [input]);

  return {
    input,
    setInput,
    suggestions,
    clearSuggestions
  };
}
