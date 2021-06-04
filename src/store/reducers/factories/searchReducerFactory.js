export default function searchReducerFactory(defaultState = {}) {
  const reducer = (state = defaultState, action) => {
    // TODO
    switch (action.type) {
      default:
        return state;
    }
  };

  return reducer;
}
