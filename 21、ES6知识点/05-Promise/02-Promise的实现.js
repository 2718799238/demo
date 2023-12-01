const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  // 状态
  status = PENDING;
  //成功的值
  value = null;
  //失败的原因
  reason = null;

  //成功回调
  onFullFilled = [];
  //、失败回调
  onRejected = [];

  constructor(executor) {
    if (typeof executor !== "function") {
      throw new Error("executor must be a function");
    }
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  //定义回调
  resolve(value) {
    // console.log("resolve");
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      this.onFullFilled.length !== 0 &&
        this.onFullFilled.forEach((fn) => fn(value));
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      this.onRejected.length !== 0 &&
        this.onRejected.forEach((fn) => fn(reason));
    }
  }

  then(onFullFilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
      //   console.log("new MyPromise");
      //   resolve("success");

      //  利用异步函数API进行把then的回调放入微任务队列中
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          const v = onFullFilled(this.value);
          validate(v, resolve, reject);
        });
      };

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          const v = onRejected(this.reason);
          validate(v, resolve, reject); // 这里是错误处理
        });
      };

      if (this.status !== PENDING) {
        if (this.status === FULFILLED) {
          fulfilledMicrotask();
        } else {
          if (typeof onRejected === "function") {
            rejectedMicrotask();
          }
        }
      } else {
        this.onFullFilled.push(fulfilledMicrotask);
        this.onRejected.push(rejectedMicrotask);
      }
    });

    return promise2;
  }
}

function validate(value, resolve, reject) {
  //   console.log("---------------", value);
  if (typeof value === "object" || typeof value === "function") {
    if (value === null) {
      resolve(value);
    }
    try {
      if (value.then && typeof value.then === "function") {
        queueMicrotask(() => {
          value.then.call(value, resolve, reject);
        });
      } else {
        resolve(value);
      }
    } catch (e) {
      reject(e);
    }
  } else {
    resolve(value);
  }
}

const promise = new MyPromise((resolve, reject) => {
  //   reject("error");

  setTimeout(() => {
    resolve("success");
  }, 1000);
});

promise
  .then(
    (res) => {
      console.log("1", res);
      return {
        then(resolve, reject) {
          resolve("success2");
        },
      };
    },
    (err) => {
      console.log(err);
    }
  )
  .then(
    (res) => {
      console.log("2", res);
    },
    (err) => {
      console.log(err);
    }
  );

// then返回自身

promise
  .then((res) => {
    console.log("4", res);

    return promise;
  })
  .then(
    (res) => {
      console.log("5", res);
    },
    (err) => {
      console.log(err);
    }
  );
