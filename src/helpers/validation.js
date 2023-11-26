export const mapErrorMessagesWithFields = (errors) => {
  if (!errors || !Array.isArray(errors)) return;
  const errorsObj = {};
  for (let i = 0; i < errors.length; i++) {
    const error = errors[i];
    errorsObj[error.path] = error.message;
  }
  return errorsObj;
};
