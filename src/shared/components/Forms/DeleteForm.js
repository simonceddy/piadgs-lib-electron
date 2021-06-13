function DeleteForm({
  onDelete,
  confirmMsg = 'Confirm deletion?',
  children
}) {
  return (
    <button
      type="button"
      onClick={() => {
        onDelete();
      }}
    >
      {children || 'Delete'}
    </button>
  );
}

export default DeleteForm;
