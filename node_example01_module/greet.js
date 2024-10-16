function sayHello(name) {
    return `Hello, ${name}!`;
}

function sayHello2(name) {
    return `Hello, ${name}!`;
}

// 以下是NodeJS 项目默认的 commonJS 模式
module.exports = {
    sayHello,
    sayHello2
};

// 以下是使用 ES modules 模式
// export { sayHello, sayHello2 };
// 又或者可以这样：
// export default sayHello;
// export { sayHello2 };