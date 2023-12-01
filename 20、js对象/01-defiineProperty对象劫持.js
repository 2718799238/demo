const info = {
  name: "张三",
  age: 18,
  sex: "男",
  address: "北京",
  height: 1.7,
};

const age = 18;
const a = Object.defineProperty(info, "age", {
  //   configurable: true, //默认为false,当为false的时候，该属性无法被配置。 。
  //   enumerable: true, //enumerable是否可枚举：默认false,当为falsel的时候，该属性无法被枚举，也是就是使用in操作符，或者for in的时候无法被找到。
  //   writable: true, //writable是否可写：默认false,当为falsel的时候，该属性无法被修改。
  //   value: 18, // value属性值：默认undefined,可以是js中的任何类型任何值 get方法：返回值默认undefined。
  //当访问该属性的时候会调用此方法，访问时，所得到的属性值是该方法的返回值。 set方法：默认值为undefined。当修改该属性时会调用此方法。注意：当配置对象中存在value和writable属性时，不应该存在get和set方法，反之亦然。当value属性和get方法同时存在时，会报错
  get() {
    return age + 1;
  },

  //   在外面定义的变量，就会和这个对象进行绑定到一块
  set(newVal) {
    console.log("修改了age属性", newVal);
  },
});
console.log("两者比较", info === a); //true  两个对象完全是对等的
console.log(info.age);
