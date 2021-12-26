// Khai báo mảng dữ liệu
const sampleText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const news = [
  { id: 1, title: 'Bai viet 1', body: sampleText, author: 'Tri Ngo' },
  { id: 2, title: 'Bai viet 2', body: sampleText, author: 'Tri Ngo' },
  { id: 3, title: 'Bai viet 3', body: sampleText, author: 'Tri Ngo' },
];

// Get thẻ div container để chèn item vào trong container
const container = document.getElementsByClassName('container')[0];

for (const item of news) {
  // Tạo thẻ div item
  const divElement = document.createElement('div');

  divElement.style.marginBottom = '8px';

  // Chèn dữ liệu vào thẻ div item
  divElement.innerHTML = `
    ${item.id} - ${item.title} - ${item.author}
    <button id="${item.id}" class="delete-button">
      Delete
    </button>
    <button id="${item.id}" class="edit-button" author="${item.author}">
      Edit
    </button>
  `;

  // Thêm thẻ div item vào thẻ div container
  container.appendChild(divElement);
}

const deleteButtons = document.getElementsByClassName('delete-button');
const editButtons = document.getElementsByClassName('edit-button');

// Khai báo function để lắng nghe sự kiện click nút xóa bài viết
const onClickDelete = function () {
  const isConfirmed = confirm('Are you sure want to delete this post?');

  if (!isConfirmed) return;

  this.parentElement.remove();
}

for (const button of deleteButtons) {
  button.addEventListener('click', onClickDelete);
}

// const result = prompt('Please input title');

// ReactJS
// news.map((item) => (
//   <div>{item.id} - {item.title} - {item.author}</div>
// ))