export const SET_CURRENT_PAGE_FOR = 'SET_CURRENT_PAGE_FOR';

export const setCurrentPageFor = (applet, currentPage) => ({
  type: SET_CURRENT_PAGE_FOR,
  payload: { applet, currentPage }
});
