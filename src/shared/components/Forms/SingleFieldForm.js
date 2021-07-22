import { ThemedButton, ThemedTextInput } from '../Styled';

function SingleFieldForm({
  input,
  setInput,
  onSubmit = () => null,
  submitLabel = ''
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(input);
      }}
      className="flex flex-row justify-around items-center w-full p-1"
    >
      <ThemedTextInput
        required
        type="text"
        className="text-2xl p-2 border-2 rounded-xl m-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <ThemedButton submits className="m-2">
        {submitLabel}
      </ThemedButton>
    </form>
  );
}

export default SingleFieldForm;
