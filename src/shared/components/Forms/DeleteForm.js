import { confirmAlert } from 'react-confirm-alert';
import ThemedButton from '../Styled/ThemedButton';

function DeleteForm({
  onDelete = () => null,
  message = 'Confirm deletion?',
  children
}) {
  return (
    <ThemedButton
      onClick={() => {
        console.log('here');
        return confirmAlert({
          title: 'Confirm Deletion',
          message,
          buttons: [
            {
              label: 'YES, CONFIRM',
              onClick: onDelete
            },
            {
              label: 'NO!',
              onClick: () => null
            }
          ]
        });
      }}
    >
      {children || 'Delete'}
    </ThemedButton>
  );
}

export default DeleteForm;
