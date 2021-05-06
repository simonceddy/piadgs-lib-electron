import { ThemedButton, ThemedTextInput } from '../../shared/components/Styled';

function SearchSubjectsForm({ input, setInput, onSubmit = () => null }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(input);
      }}
      className="flex flex-row items-center justify-around w-full"
    >
      <ThemedTextInput
        type="text"
        className="text-2xl p-2 border-2 rounded-xl"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <ThemedButton submits>
        Search subjects
      </ThemedButton>
    </form>
  );
}

export default SearchSubjectsForm;
