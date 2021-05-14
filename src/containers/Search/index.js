import { connect } from 'react-redux';
import { useState } from 'react';
import {
  submitLibrarySearchForm,
  updateLibrarySearchValues,
  resetLibraryFormValues
} from '../../store/actions';
import SearchForm from '../../components/Search/SearchForm';
import Results from './Results';

function Search({
  setValues,
  values,
  submitSearch,
  resetForm,
  isSubmitted = false
}) {
  const [showForm, setShowForm] = useState(!isSubmitted);

  return (
    <>
      {showForm ? (
        <SearchForm
          submitForm={async (e) => {
            e.preventDefault();
            await submitSearch(values);
            setShowForm(false);
          }}
          resetForm={resetForm}
          values={values}
          onValueChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
        />
      ) : (
        <Results showForm={() => setShowForm(true)} />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  values: state.search.values,
  isSubmitted: state.search.isSubmitted,
  results: state.search.results
});

const mapDispatchToProps = (dispatch) => ({
  setValues: (values = {}) => dispatch(updateLibrarySearchValues(values)),
  // setIsSubmitted: (isSubmitted) => dispatch(setFormSubmitted(isSubmitted)),
  submitSearch: (params) => dispatch(submitLibrarySearchForm(params)),
  resetForm: () => dispatch(resetLibraryFormValues())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
