export const formatDateForInput = (date) => {
  const [day, month, year] = date.split("/");
  const dateObject = new Date(`${year}/${month}/${day}`);

  return dateObject;
};
