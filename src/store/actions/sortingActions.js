export const SET_SORTING_FOR = 'SET_SORTING_FOR';

/**
 *
 * @param {string} applet The applet name
 * @param {string} sortCol Column name to sort by
 * @param {string} sortDirection Direction to sort by, either "ASC" or "DESC"
 * @returns {object}
 */
export const setSortingFor = (applet, sortCol, sortDirection) => ({
  type: SET_SORTING_FOR,
  payload: { applet, sortCol, sortDirection }
});

export const sort = () => {};
