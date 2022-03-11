
const a = 5;

function b() {
    console.log('3');
    return c();
}

function c() {
    console.log('2');
    return d();
}

function d() {
    console.log('1', a);
}

setTimeout(() => {
    console.log('Timeout');
}, 1000)

b();
