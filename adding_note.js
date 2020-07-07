const form = document.querySelector('form');
const section = document.querySelector('.note_section');
const addButton = document.querySelector('.createButton');
const trashButton = document.querySelector('.deleteButton');
const counerSpan = document.querySelector('#counter');
const paragraph = document.querySelector('#whatToDo');

let items = [];

function addingNote(e) {
  e.preventDefault();
  const heading = form[0].value;
  const note = form[1].value;
  if (heading === '' || note === '' || note.length > 140) {
    return;
  }
  const id = Date.now();
  const item = {
    heading,
    note,
    id,
  };
  items.push(item);
  form.reset();
  paragraph.classList.remove('visible');
  updateItems();
}

function counter() {
  const lettersInArea = form[1].value.length;
  counerSpan.innerText = `${lettersInArea}/140`;
}

function updateItems() {
  const html = items
    .map(
      item => `
	  <div class="note deleteNote" id="${item.id}">
	  <h2 class="subject">${item.heading}</h2>
	  <p>${item.note}</p>
	  </div>
	  `
    )
    .join('');
  section.innerHTML = html;
  counerSpan.innerText = '0/140';
  console.log(items);
  mirrorToLocalStorage();
}

function trashButtonHandler() {
  const notes = document.querySelectorAll('.deleteNote');
  notes.forEach(note => note.addEventListener('click', deletingNote));
  notes.forEach(note => note.classList.add('heartbeat'));
  if (section.children.length) {
    paragraph.classList.add('visible');
  }
}

function deletingNote(e) {
  console.clear();
  const itemToRemove = e.currentTarget.id;
  console.log(itemToRemove);
  items = items.filter(item => item.id != itemToRemove);
  paragraph.classList.remove('visible');
  updateItems();
}
function mirrorToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}
function restoreFromLocalStorage() {
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems.length) {
    items.push(...lsItems);
    updateItems();
  }
}

form.addEventListener('submit', addingNote);
addButton.addEventListener('click', addingNote);
form[1].addEventListener('keypress', counter);
form[1].addEventListener('keyup', counter);
trashButton.addEventListener('click', trashButtonHandler);
restoreFromLocalStorage();
