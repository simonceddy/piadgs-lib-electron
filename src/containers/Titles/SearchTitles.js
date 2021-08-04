import { connect } from 'react-redux';
import { useState } from 'react';
import TitleTableRow from '../../components/Titles/TitleTableRow';
import { FlexCol } from '../../shared/components/Flex';
import { SingleFieldForm } from '../../shared/components/Forms';
import { DefaultTable } from '../../shared/components/Tables';
import { setTitleSearchInput, submitTitleSearch } from '../../store/actions';
// import adminColumns from '../../util/adminColumns';
import { titleCols } from '../../shared/data/titleCols';
import Modal from '../../shared/components/Modal';
import Title from './Title';

function SearchTitles({
  input,
  setInput,
  submitSearch,
  results = [],
}) {
  const [titleModal, setTitleModal] = useState(false);

  const onClose = () => setTitleModal(false);

  const TitleModal = () => (!titleModal ? null : (
    <Modal onClose={onClose}>
      <Title
        onClose={onClose}
        title={titleModal}
        onTitleChange={() => console.log('updates have occurred')}
      />
    </Modal>
  ));
  const onRowClick = (title) => setTitleModal(title);

  return (
    <>
      <TitleModal />
      <SingleFieldForm
        submitLabel="Search Titles"
        input={input}
        setInput={setInput}
        onSubmit={submitSearch}
      />
      {results.length < 1 ? null : (
        <FlexCol className="w-full">
          {/* TODO */}
          <DefaultTable
            columns={titleCols}
          >
            {results.map((title = {}) => (
              <TitleTableRow
                onClick={() => onRowClick(title)}
                key={title.id}
                title={title}
                columns={titleCols}
              />
            ))}
          </DefaultTable>
        </FlexCol>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  input: state.titles.search.input,
  results: state.titles.search.results,
});

const mapDispatchToProps = (dispatch) => ({
  setInput: (input) => dispatch(setTitleSearchInput(input)),
  submitSearch: () => dispatch(submitTitleSearch())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchTitles);
