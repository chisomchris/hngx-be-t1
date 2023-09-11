const isString = (value) => {
  return typeof value === "string";
};

const isValidId = (value) => {
  if (typeof value !== "string") return false;
  const arr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  const arr1 = value.split("");
  return arr1.every((v) => arr.includes(v));
};

module.exports = { isString, isValidId };
