class Note {
  constructor(heading, note, id) {
    this.heading = heading;
    this.note = note;
    this.id = id;
  }
}

class Storage {
  // This function gets current notes in local storage
  static currentNotes() {
    let notes;
    if (localStorage.getItem('notes') === null) {
      notes = [];
    } else {
      notes = JSON.parse(localStorage.getItem('notes'));
    }
    return notes;
  }

  // This function adds new note into Local storage
  static addNoteToStorage(note) {
    const notes = Storage.currentNotes();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  // This function removes note from Local Storage by ID
  static deleteNoteFromStorage(id) {
    const notes = Storage.currentNotes();
    notes.forEach((element, index) => {
      if (element.id == id) {
        notes.splice(index, 1);
      }
    });
    localStorage.setItem('notes', JSON.stringify(notes));
  }
}
class UI {
  static displayItems() {
    const notes = Storage.currentNotes();
    notes.forEach(note => {
      UI.addIntoSection(note);
    });
  }

  static addIntoSection(note) {
    const div = document.createElement('div');
    div.classList.add('note', 'deleteNote');
    div.id = note.id;
    div.innerHTML = `
	<h2 class="subject">${note.heading}</h2>
	<p>${note.note}</p>
	`;
    document.querySelector('.note_section').appendChild(div);
  }

  static trashButtonHandler() {
    const notes = document.querySelectorAll('.deleteNote');
    notes.forEach(note => note.addEventListener('click', UI.deleteNoteFromUI));
    notes.forEach(note => note.classList.add('heartbeat'));
    if (document.querySelector('.note_section').children.length) {
      document.querySelector('#whatToDo').classList.add('visible');
    }
  }

  static deleteNoteFromUI(e) {
    const itemToRemove = e.currentTarget.id;
    console.log(itemToRemove);
    Storage.deleteNoteFromStorage(itemToRemove);
    e.currentTarget.remove();
    document.querySelector('#whatToDo').classList.remove('visible');
  }

  static resetForm() {
    document.querySelector('form').reset();
  }

  static addingHandler(e) {
    e.preventDefault();
    const form = document.querySelector('form');
    const note = new Note(form[0].value, form[1].value, Date.now());
    UI.addIntoSection(note);
    UI.resetForm();
    Storage.addNoteToStorage(note);
  }

  static counter() {
    const lettersInArea = document.querySelector('form')[1].value.length;
    document.querySelector('#counter').innerText = `${lettersInArea}/140`;
  }
}
document
  .querySelector('.deleteButton')
  .addEventListener('click', UI.trashButtonHandler);
document.querySelector('form').addEventListener('submit', UI.addingHandler);
document.addEventListener('DOMContentLoaded', UI.displayItems);
document
  .querySelector('.createButton')
  .addEventListener('click', UI.addingHandler);
document.querySelector('form').addEventListener('keypress', UI.counter);
document.querySelector('form').addEventListener('keyup', UI.counter);
