
/*
* Event emitter - необзодим для обмена событиями между частями нашей системы.
* 1. Мы можем подписаться на какое-то событие
* 2. Мы можем генерировать какое-то событие. В случае генерации можна передавать некие данные, которые можно
*  обрабатываеть в обработчике этого события.
* */

// EVENT EMITTER
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

const logDbConnection = () => {
    console.log('DB connected');
};

myEmitter.addListener('connected', logDbConnection);
myEmitter.emit('connected');


// Отписка (удалиение) подписки
myEmitter.removeListener('connected', logDbConnection);
// myEmitter.off('connected', logDbConnection);
// myEmitter.removeAllListeners('connected');

myEmitter.emit('connected');

myEmitter.on('msg', (data) => {
    console.log(`Received ${data}`);
});

// prependListener позволяет вывести определенный лисенер раньше
myEmitter.prependListener('msg', (data) => {
    console.log('Prepend');
})
myEmitter.emit('msg', 'Hello! Received my message');


// Можно подписаться только на 1 событие
myEmitter.once('off', () => {
    console.log('Я вызвался 1 раз и не больше')
});
myEmitter.emit('off');
myEmitter.emit('off');

console.log(myEmitter.getMaxListeners());
myEmitter.setMaxListeners(1);
console.log(myEmitter.getMaxListeners());

console.log(myEmitter.listenerCount('msg'));
console.log(myEmitter.listenerCount('off'));
console.log(myEmitter.listeners('msg'));
console.log(myEmitter.eventNames());

myEmitter.on('error', (err) => {
    console.log(`Произошла ошибка: ${err.message}`);
});
myEmitter.emit('error', new Error('BOOM!'));


// EVENT TARGET
const target = new EventTarget();
const logTarget = () => {
    console.log('Connected to target');
}

target.addEventListener('connected', logTarget);
target.dispatchEvent(new Event('connected'));
















