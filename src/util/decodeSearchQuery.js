const decodeSearchQuery = (search = '') => {
  const query = new URLSearchParams(search);
  return {
    title: query.get('title'),
    author: query.get('author'),
    subject: query.get('subject'),
  };
};

export default decodeSearchQuery;
