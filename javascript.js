// JavaScript data types:
// - number
// - string
// - boolean
// - object:
//  - array
//  - null
// - undefined

// Khai báo biến
let x = 3;
const a = 1;
const b = '1';

// So sánh
if (a == b) {

} else if (a != b) {

} else {

}
// Toán tử 3 ngôi
const isEqual = (a == b) ? true : false;

switch (key) {
  case value:

    break;

  default:
    break;
}

// Toán tử so sánh với nhiều điều kiện (&& là và, || là hoặc)
if (username === 'tringo' && password === '123123') {
  // Login success
}

if (username === 'tri' || username === 'lam') {
  // Login success
}

if (username === 'tri' || username === 'lam' && password === '123123') {
  // Login success
}

if (username !== 'tri') {
  // Login failed
}

/**
 * Kiểm tra username có giá trị là truthy (https://developer.mozilla.org/en-US/docs/Glossary/Truthy?retiredLocale=vi),
 * tức là username khác falsy (false, 0, -0, 0n, "", null, undefined, and NaN)
 * */
if (username) {
  // Truthy
  console.log(`Your username is ${username}`);
}
if (!username) {
  // Falsy
  console.log('Please input username');
}

// Kiểm tra 1 biến có phải là mảng không?
if (myArray instanceof Array) {

}

// Từ khóa typeof để kiểm tra kiểu dữ liệu của biến
if (typeof username === 'string') {

}

// Hàm
function myFunction(myParameter) {
  let myFunctionVar = 1;
}



myFunction()

let x = 1;

x = 2;

// Vòng lặp
const myArray = [1, 2, 3, 4, 5, 6];

for (let index = 0; index < myArray.length; index++) {
  console.log('index > ', index);

  console.log('item > ', myArray[index]);
}

myArray.forEach((item, index) => {
  console.log('index > ', index);

  console.log('item > ', item)
});

// Duyệt qua các thuộc tính/phương thức của object
for (const item of myArray) {
  console.log('item > ', item)
}

const myObject = {
  _1: 'myProperty1',
  $2: 'myProperty2',
  myProperty3: 'myProperty3',
  myProperty4: 'myProperty4',
  myProperty5: 'myProperty5',
  myMethod: () => { },
}

for (const key in myObject) {
  console.log('myObject[key] > ', myObject[key]);
}

const FirstName = 'Tri';
const LastName = 'Ngo';

const $a = 1;
const _a_$_$_$_$_123123 = 1;

// Bắt lỗi bằng try/catch
try {
  const myName = 'Tri';

  myName = 'Lam';
} catch (error) {
  console.log(error);
}

// Hằng số
const cars = ["Saab", "Volvo", "BMW"];

cars = 1; // Sai

cars[0] = 'Mercedes';

// Toán tử

let a = 1;

// biến a tăng lên 1
a++;

// biến a tăng lên 2
a += 2
a -= 2

// Cách viết class và dùng phương thức của class
class MyClass {
  name = 'Tri';
  dob = 2000;
  updateName = function (name) {
    this.name = name;
    console.log('new name > ', this.name);
  }
}

const s = new MyClass();
s.updateName('Tri Ngo');