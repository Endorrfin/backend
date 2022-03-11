
process.on('message', (msg) => {
    if (msg == 'disconnect') {
        process.disconnect();
        return;
    }
    console.log(`Client received: ${msg}`)
    process.send('Pong!');
})
