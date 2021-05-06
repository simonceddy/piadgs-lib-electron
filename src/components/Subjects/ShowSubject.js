import { useMemo, useState } from 'react';
import Subject from '../../containers/Subjects/Subject';
import Modal from './Modal';
// import ViewSubject from './ViewSubject';

function ShowSubject({ subject = {} }) {
  const [visible, setVisible] = useState(false);

  const onClose = () => setVisible(false);

  const SubjectModal = useMemo(() => (
    <Modal onClose={onClose}>
      <Subject onClose={onClose} id={subject.id} />
    </Modal>
  ), [subject]);

  return (
    <>
      {visible ? SubjectModal : null}
      <div
        role="presentation"
        className="cursor-pointer hover:underline m-0.5 p-1 w-full flex flex-row justify-between items-start"
        onClick={() => setVisible(true)}
      >
        <span>
          {subject.name}
        </span>
        <span>
          {subject.titles ? subject.titles.length : 'No'} titles
        </span>
      </div>
    </>
  );
}

export default ShowSubject;
