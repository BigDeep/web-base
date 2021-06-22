const obj = {
    a: "2"
};
function reactive(obj) {
    return new Proxy(obj, {
        get(target, key, receiver) {
            console.log("这里是get");
            if (typeof target[key] === "object") {
                return reactive(target[key]);
            };
            return Reflect.get(target, key, receiver);
        },
        set(target, key, value, receiver) {
            console.log("这里是set");
            return Reflect.set(target, key, value, receiver);
        }
    });
};
const proxy = reactive(obj);
const { a } = proxy;
console.log(a);
// console.log(proxy);


const example = {
    a: "2"
}
const { a } = example;