const failMessage = (message) => ({
  message,
  success: false
});

const crudMessages = {
  d: {
    success: (result) => ({
      result,
      success: true
    }),
    fail: failMessage,
  },
  c: {
    success: (newId) => ({
      success: true,
      id: newId
    }),
    fail: failMessage,
  },
  u: {
    success: (result) => ({
      success: true,
      result
    }),
    fail: failMessage,
  },
  r: {
    success: (data) => ({
      data,
      success: true
    }),
    fail: failMessage,
  },
};

module.exports = crudMessages;
