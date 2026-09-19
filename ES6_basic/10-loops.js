export default function appendToEachArrayValue(array, appendString) {
  const newArr = [];
  for (let item of array) {
    newArr.push(appendString + item);
  }
  return newArr;
}
