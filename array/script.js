// Khai báo mảng dữ liệu
const sampleText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const news = [
  { id: 1, title: 'Bai viet 1', body: sampleText, author: 'Tri Ngo', image: 'https://www.si.com/.image/t_share/MTc3NTc2OTI0NDgxMDcwNzAx/top100_dchorizontal.jpg', },
  { id: 2, title: 'Bai viet 2', body: sampleText, author: 'Tri Ngo', image: 'https://www.si.com/.image/t_share/MTc3NTc2OTI0NDgxMDcwNzAx/top100_dchorizontal.jpg' },
  { id: 3, title: 'Bai viet 3', body: sampleText, author: 'Tri Ngo', image: 'https://www.si.com/.image/t_share/MTc3NTc2OTI0NDgxMDcwNzAx/top100_dchorizontal.jpg' },
];

// Get thẻ div container để chèn item vào trong container
const container = document.getElementsByClassName('container')[0];

const createPostHTML = (item) => {

  let divElement = document.querySelector(`div#post_${item.id}.item-container`);
  const isCreate = !divElement;

  if (!divElement) {
    // Tạo thẻ div item
    divElement = document.createElement('div');

    // divElement.style.marginBottom = '8px';
    divElement.className = 'item-container';

    divElement.id = `post_${item.id}`;
  }
  // Chèn dữ liệu vào thẻ div item
  divElement.innerHTML = `
    <img src="${item.image}" class="item-image" />

    <div class="item-content">
      <div class="item-title">${item.title}</div>

      <div class="item-title-separator">
        <div class="item-title-separator-inner"></div>
      </div>

      <div class="item-body">${item.body}</div>

      <div>
        <button id="${item.id}" class="delete-button">
          <img src="https://icons-for-free.com/iconfiles/png/512/trash+bin+icon-1320086460670911435.png" class="icon-style" >
          Delete
        </button>
        <button id="${item.id}" class="edit-button" author="${item.author}" image="${item.image}" body="${item.body}">         
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Edit_Notepad_Icon.svg" class="icon-style" >
          Edit
        </button>
      </div>
    </div>
  `;

  // Thêm thẻ div item vào thẻ div container
  if (isCreate) {
    container.appendChild(divElement);
  }
}

for (const item of news) {
  createPostHTML(item);
}

const deleteButtons = document.getElementsByClassName('delete-button');
const editButtons = document.getElementsByClassName('edit-button');

const onClickDelete = function () {
  const isConfirmed = confirm('Are you sure want to delete this post?');

  if (!isConfirmed) return;

  const postElement = document.querySelector(`div#post_${this.id}.item-container`);

  postElement.remove();
}

const onClickEdit = function () {

  const title = prompt('input title of the post')

  const id = this.getAttribute('id');

  const newsItem = news.find(function (item) {
    return item.id == id;

  })

  const author = prompt('input author');

  const image = newsItem.image
  const body = newsItem.body

  if (!title || !author) return;


  createPostHTML({ title, author, image, body, id })
  addButtonEvent();
  newsItem.title = title;
  newsItem.author = author;
  console.log(news)
}


const onClickAdd = function () {
  const title = prompt('input title of the post')

  const id = prompt('input id of the post')

  const author = prompt('input author of the post');

  const image = prompt('input link of the image');

  const body = prompt('input body of the post');

  // const image = this.getAttribute('image')
  const addNews = {
    id,
    title,
    author,
    image,
    body
  }

  createPostHTML(addNews);
  addButtonEvent();

}


const addButtonEvent = () => {

  for (const button of deleteButtons) {
    button.addEventListener('click', onClickDelete);
  }

  for (const button of editButtons) {
    button.addEventListener('click', onClickEdit);
  }

}
addButtonEvent();
// Khai báo function để lắng nghe sự kiện click nút xóa bài viết




// const result = prompt('Please input title');

// ReactJS
// news.map((item) => (
//   <div>{item.id} - {item.title} - {item.author}</div>
// ))