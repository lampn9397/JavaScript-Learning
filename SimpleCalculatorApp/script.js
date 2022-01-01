let prevNumber = null;
let currentNumber = null;
let displayNumber = '';
let currentOperator = '';

const operators = ['+', '-', 'x', '÷', '='];

const resultElement = document.getElementsByClassName('result-panel')[0];

// Get các thẻ có class="button"
const buttonElements = document.getElementsByClassName('button');

// Convert sang dạng mảng để duyệt
const buttonArray = [...buttonElements];

function executeOperator(pNumber, cNumber, operator) {
  let result = pNumber;

  if (operator === '+') {
    result = pNumber + cNumber;
  } else if (operator === '-') {//
    result = pNumber - cNumber;
  } else if (operator === 'x') {
    result = pNumber * cNumber;
  } else {
    result = pNumber / cNumber;
  }

  return result;
}

function onClickOperator(innerText) {
  /**
   * Kiểm tra nếu người dùng bấm nút = trong khi chưa nhập số
   * -> Ngắt lệnh
   *  */
  if (innerText === '=' && !displayNumber) return;

  if (innerText === '=') {
    const result = executeOperator(prevNumber, currentNumber, currentOperator);
    prevNumber = result;
    resultElement.innerText = `${result}`;
    return;
  }

  if (prevNumber === null) {
    prevNumber = currentNumber;
  } else if (currentNumber !== null) {
    const result = executeOperator(prevNumber, currentNumber, currentOperator);
    prevNumber = result;
    resultElement.innerText = `${result}`;
  }

  // Lưu lại toán tử hiện tại
  currentOperator = innerText;

  displayNumber = '';
}

/**
 * Duyệt qua tất cả các thẻ button trong mảng
 * -> để lắng nghe sự kiện click của từng button
 **/
buttonArray.forEach((b) => {
  b.addEventListener('click', function () {
    // Khi bấm button C thì xóa khung kết quả, reset các giá trị về ban đầu
    if (this.innerText === 'C') {
      prevNumber = null;
      currentNumber = null;
      displayNumber = '';
      resultElement.innerText = '0';
      return;
    }

    // Người dùng bấm vào toán tử +-x/
    if (operators.includes(this.innerText)) {
      onClickOperator(this.innerText);
      return;
    }

    /**
     * Nếu người dùng bấm 0 trong khi chưa có số nào trước đó
     * -> thì không ngắt lệnh k thực hiện chèn thêm số phía sau
     *  */
    if (this.innerText === '0' && !displayNumber) return;

    displayNumber += this.innerText; // Nối thêm số vừa bấm vào số trước đó
    currentNumber = +displayNumber; // Lưu lại con số vừa nối cho trường hợp bấm = liên tục
    resultElement.innerText = displayNumber; // Hiển thị ra màn hình
  });
});
