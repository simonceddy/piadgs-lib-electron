import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import SubjectWindow from '../../components/Subjects/SubjectWindow';
import SubjectNameField from '../../components/Subjects/SubjectNameField';
import SubjectTitleList from '../../components/Subjects/SubjectTitleList';
import { ThemedDiv, ThemedButton } from '../../shared/components/Styled';
import {
  fetchSubject,
  setSubjectMessage,
  setSubjectName,
  updateSubject
} from '../../store/actions';
import DeleteForm from '../../shared/components/Forms/DeleteForm';
import { deleteSubject } from '../../message-control/controllers';
import { FlexRow } from '../../shared/components/Flex';
import Messages from '../../components/Messages';

// TODO - less props - split responsibilities
// TODO
function Subject({
  match,
  // onClose,
  getSubject,
  data,
  setName,
  subjectName,
  // message,
  // setMessage,
  submitChanges,
  onDataChange
}) {
  // console.log(match);
  const history = useHistory();
  const [statusMessage, setStatusMessage] = useState(null);

  const { id } = match.params;
  const onDelete = () => deleteSubject(id)
    .then((result) => {
      console.log(result);
      if (result.success) {
        setName('');
        setStatusMessage('Successfully deleted title');
        if (typeof onDataChange === 'function') {
          onDataChange(result);
        }
      } else {
        setStatusMessage('An error occurred while attempting deletion.');
      }
    });

  const Titles = useCallback(() => (data.titles && data.titles.length > 1 ? (
    <div className="w-full flex flex-col py-4 px-2 overflow-scroll">
      <SubjectTitleList
        titles={data.titles}
      />
    </div>
  ) : null), [data.titles]);

  // Is this helping?
  useEffect(() => {
    if (id) getSubject(id);
  }, [id]);

  return (
    <SubjectWindow>
      <ThemedDiv
        className="flex flex-row justify-between items-center w-full mb-3 pb-2 border-b"
      >

        <ThemedButton
          className="hover:underline"
          onClick={() => history.goBack()}
        >
          Back
        </ThemedButton>
      </ThemedDiv>
      {statusMessage ? (
        <Messages
          clearMessage={() => setStatusMessage(null)}
          message={statusMessage}
        />
      ) : null}
      <SubjectNameField
        value={subjectName}
        setValue={setName}
      />
      <Titles />
      <ThemedDiv className="flex flex-row justify-evenly items-center pb-4 pt-2 mt-3 px-2 border-t w-full">
        <ThemedButton
          onClick={() => {
            submitChanges({ id, name: subjectName });
            if (typeof onDataChange === 'function') onDataChange();
          }}
        >
          Save Changes
        </ThemedButton>
      </ThemedDiv>
      <FlexRow className="p-2 w-full justify-start items-center">
        <DeleteForm onDelete={onDelete}>
          Delete Subject
        </DeleteForm>
      </FlexRow>
    </SubjectWindow>
  );
}

const mapStateToProps = (state) => ({
  subjectName: state.subjects.subject.name,
  data: state.subjects.subject.data,
  message: state.subjects.subject.message,
});

const mapDispatchToProps = (dispatch) => ({
  getSubject: (id) => dispatch(fetchSubject(id)),
  setName: (name) => dispatch(setSubjectName(name)),
  setMessage: (message) => dispatch(setSubjectMessage(message)),
  submitChanges: (data) => dispatch(updateSubject(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Subject));
