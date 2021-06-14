import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SubjectWindow from '../../components/Subjects/SubjectWindow';
import SubjectNameField from '../../components/Subjects/SubjectNameField';
import SubjectTitleList from '../../components/Subjects/SubjectTitleList';
import { ThemedDiv, ThemedButton } from '../../shared/components/Styled';
import DefaultForm from '../../shared/components/Forms/DefaultForm';
import {
  fetchSubject,
  setSubjectMessage,
  setSubjectName,
  setSubjectSelectedTitles, updateSubject
} from '../../store/actions/subjects';

// TODO - less props - split responsibilities
function Subject({
  id,
  onClose,
  getSubject,
  data,
  setName,
  subjectName,
  message,
  setMessage,
  submitChanges,
  selectedTitles,
  setSelectedTitles
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleChecked = (titleId) => setSelectedTitles({
    ...selectedTitles,
    [titleId]: !selectedTitles[titleId]
  });

  // Is this helping?
  const fetchData = useCallback(() => getSubject(id), [id]);
  useEffect(() => fetchData(), [id]);

  return (
    <SubjectWindow>
      <ThemedDiv
        className="flex flex-row justify-between items-center w-full mb-3 pb-2 border-b"
      >
        <ThemedButton
          className="hover:underline"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Stop Editing' : 'Edit'}
        </ThemedButton>

        <ThemedButton
          className="hover:underline"
          onClick={() => {
            setMessage(null);
            onClose();
          }}
        >
          Close
        </ThemedButton>
      </ThemedDiv>
      {!message ? null : (
        <div
          className="w-full flex flex-row all-center"
          role="presentation"
          onClick={() => setMessage(null)}
        >
          {message}
        </div>
      )}
      {isEditing ? (
        <SubjectNameField
          value={subjectName}
          setValue={setName}
        />
      ) : (
        <>
          <span className="p-3 text-2xl">
            {subjectName}
          </span>
        </>
      )}
      <div className="w-full flex flex-col py-4 px-2 overflow-scroll">
        {data.titles && data.titles.length < 1 ? null : (
          <SubjectTitleList
            titles={data.titles}
            selectedTitles={selectedTitles}
            handleChecked={handleChecked}
            isEditing={isEditing}
          />
        )}
      </div>
      {isEditing ? (
        <>
          <ThemedDiv className="flex flex-row justify-evenly items-center pb-4 pt-2 mt-3 px-2 border-t w-full">
            <ThemedButton
              onClick={() => submitChanges({ id, name: subjectName })}
              isSubmit
            >
              Save Changes
            </ThemedButton>
            <ThemedButton
              onClick={() => console.log('save as a new subject and add to checked titles')}
            >
              Save As New
            </ThemedButton>
          </ThemedDiv>
          <div>
            <DefaultForm onDelete={() => console.log('delete')}>
              Delete Subject
            </DefaultForm>
          </div>
        </>
      ) : null}
    </SubjectWindow>
  );
}

const mapStateToProps = (state) => ({
  subjectName: state.subjects.subject.name,
  data: state.subjects.subject.data,
  message: state.subjects.subject.message,
  selectedTitles: state.subjects.subject.selectedTitles
});

const mapDispatchToProps = (dispatch) => ({
  getSubject: (id) => dispatch(fetchSubject(id)),
  setName: (name) => dispatch(setSubjectName(name)),
  setMessage: (message) => dispatch(setSubjectMessage(message)),
  submitChanges: (data) => dispatch(updateSubject(data)),
  setSelectedTitles: (selectedTitles) => dispatch(setSubjectSelectedTitles(selectedTitles))
});

export default connect(mapStateToProps, mapDispatchToProps)(Subject);
