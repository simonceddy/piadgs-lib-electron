import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setSubjectMessage } from '../../store/actions/subjects';

function TitleSummary({ id, setMessage }) {
  const [title, setTitle] = useState({});

  const fetchData = useCallback(() => axios.get(`/titles/${id}`)
    .then((res) => {
      if (res.status === 200) {
        setTitle(res.data.data);
      } else {
        setMessage(`Error getting data for title with the id ${id}.`);
      }
    })
    .catch((err) => console.log(err)), [id]);

  useEffect(() => {
    if (!title.id) {
      fetchData();
    }
  });

  return (
    <div className="w-full flex flex-col justify-between items-center p-2">
      <div className="w-full">
        {title.accessionNumber}
      </div>
      <div className="w-full">
        {title.isbn}
      </div>
      <div className="w-full">
        {title.imprint}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setMessage: (message) => dispatch(setSubjectMessage(message))
});

export default connect(null, mapDispatchToProps)(TitleSummary);
