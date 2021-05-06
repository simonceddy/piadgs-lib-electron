import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  submitSearchForm,
  updateSearchValues,
  resetFormValues
} from '../../store/actions';
import SearchForm from '../../components/Search/SearchForm';

function Search({
  setValues,
  values,
  submitSearch,
  resetForm,
}) {
  const history = useHistory();

  return (
    <SearchForm
      submitForm={(e) => {
        e.preventDefault();
        submitSearch(values, (queryString) => history.push(`/search?${queryString}`));
      }}
      resetForm={resetForm}
      values={values}
      onValueChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
    />
  );
}

const mapStateToProps = (state) => ({
  values: state.titles.search.values,
  // isSubmitted: state.titles.search.isSubmitted,
  results: state.titles.search.results
});

const mapDispatchToProps = (dispatch) => ({
  setValues: (values = {}) => dispatch(updateSearchValues(values)),
  // setIsSubmitted: (isSubmitted) => dispatch(setFormSubmitted(isSubmitted)),
  submitSearch: (vals, history) => dispatch(submitSearchForm(vals, history)),
  resetForm: () => dispatch(resetFormValues())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
