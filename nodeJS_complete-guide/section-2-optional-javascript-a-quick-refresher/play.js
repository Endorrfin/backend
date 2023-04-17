const name = 'Max';
let age = 29;
const  hasHobbies = true;

age = 30;

// console.log(name);


function summarizerUser(userName, userAge, userHasHobby) {
  return ('Name is ' + userName + ', age is ' + userAge + ' and the user has hobbies: ' + userHasHobby);
}
// console.log(summarizerUser(name, age, hasHobbies));


const add = (a, b) => a + b;
// console.log(add(3, 5));


const person1 = {
  name: 'Max',
  age: 29,
  greet() {
    console.log('Hi, I am ' + this.name);
  }
}
// console.log(person1.greet());


const person2 = {
  name: 'Stephan',
  age: 33,
  greet: () => {
    console.log('Hi, I am ' + this.name);
  }
}
// console.log(person2.greet());


const hobbies = ['Sports', 'Cooking'];
for (let hobby of hobbies) {
  // console.log(hobby);
};

// console.log(hobbies.map(hobby => 'My hobby is: ' + hobby));
// console.log(hobbies);

hobbies.push('Programming');
// console.log(hobbies);

const copiedArray = hobbies.slice();
const copiedArraySpread = [...hobbies];
// console.log(copiedArray);
// console.log(copiedArraySpread);

const copiedPerson = {...person1};
// console.log(copiedPerson);


const toArray = (arg1, arg2, arg3) => {
  return [arg1, arg2, arg3];
};

// console.log(toArray(1, 2, 3,));


const toArraySpread = (...args) => {
  return args;
}

// console.log(toArraySpread(1, 2, 3, 4, 5, 6, 7));



const printName = (personData) => {
  // console.log(personData.name);
};

// printName(person1);

const printNameDestructuring = ({ name, age }) => {
  // console.log(name, age);
};

// printNameDestructuring(person2);


const [hobby1, hobby2] = hobbies;
// console.log(hobby1, hobby2);


// ----------------------------- Async Code & Promise

const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, 1500);
  });
  return promise;
}

setTimeout(() => {
  console.log( 'Timer is done!');
  fetchData().then(text => {
    console.log(text);
    return fetchData().then(text2 => {
      console.log(text2)
    })
  });
}, 2000);

// console.log('Hello!');
// console.log('Hi!');









