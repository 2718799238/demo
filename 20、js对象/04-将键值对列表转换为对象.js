const arr = [
  [0, 2],
  [1, 3],
  ["a", "b"],
];

const newObj = Object.fromEntries(arr);
const mapArr = new Map(arr); // Map(3) { 0 => 2, 1 => 3, a => b }
const mapObj = Object.fromEntries(mapArr); // { 0: 2, 1: 3, a: "b" }
console.log(newObj, mapObj); // { 0: 2, 1: 3, a: "b" }
