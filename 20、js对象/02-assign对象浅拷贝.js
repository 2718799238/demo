const info = {
  name: "张三",
  age: 18,
  sex: "男",
  hobby: ["吃饭", "睡觉", "打豆豆"],
};

const friends = [
  {
    name: "李四",
    age: 18,
    sex: "男",
    hobby: ["吃饭", "睡觉", "打豆豆"],
  },
];

// 浅拷贝
// 浅层次的对象会完全拷贝下来，而对于第二层级和更深的则拷贝的是指针，其原数组或对象改变，或者新的改变都都彼此发生影响。
const copyInfo = Object.assign({}, info, friends);
console.log(copyInfo);
info.name = "李四";
// console.log(copyInfo);
friends[0].name = "王五";
console.log(copyInfo);
