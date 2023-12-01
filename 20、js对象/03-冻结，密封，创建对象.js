const info = {
  name: "张三",
  age: 18,
  sex: "男",
  address: "北京市",
  hobby: ["吃饭", "睡觉", "打豆豆"],
};

// 禁止扩展，不可以对齐进行添加属性，其他操作都可以
const newInfo = Object.preventExtensions(info); //newInfo 和info是同一个对象
delete newInfo.hobby;
console.log(newInfo); // { name: '张三', age: 18, sex: '男', address: '北京市' }

// 冻结对象

const frozenInfo = Object.freeze(info);

// 判断对象是否冻结
console.log(Object.isFrozen(frozenInfo));

// 密封对象
const sealedInfo = Object.seal(info);

// 判断对象是否密封
console.log(Object.isSealed(sealedInfo));
