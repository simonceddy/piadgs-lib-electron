function RemoveButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1 border-2 hover:border-black border-gray-400 bg-red-500 text-white rounded-md"
    >
      Remove
    </button>
  );
}

export default RemoveButton;
