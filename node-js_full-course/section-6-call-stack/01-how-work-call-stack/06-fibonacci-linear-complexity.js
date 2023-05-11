// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55

function measurement(title) {
	console.log(title, performance.now().toFixed(0))
}

measurement('----------> Program start <----------')

setTimeout(() => measurement('Timeout'), 0)

function fibonacci(n) {
	if(n === 0 || n === 1) return n

	let fib1 = 0
	let fib2 = 1
	let sum = 0
	for(let i = 1; i < n; i++) {
		sum = fib1 + fib2
		fib1 = fib2
		fib2 = sum
	}

	return sum
}


console.log(fibonacci('10', 10))
console.log(fibonacci('100', 100))
console.log(fibonacci('1000', 1000))
console.log(fibonacci('100000', 100000))

measurement('<---------- Program end ---------->')

