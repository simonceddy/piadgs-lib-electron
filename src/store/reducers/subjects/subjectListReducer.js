const defaultState = {
  results: [],
  sortKey: 'name',
  sortDirection: 'ASC'
};

export default function subjectListReducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
