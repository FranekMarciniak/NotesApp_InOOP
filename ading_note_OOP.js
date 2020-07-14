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
    // if local storage is empty initialize notes object with empty array
    if (localStorage.getItem('notes') === null) {
      notes = [];
    } else {
      // If there is notes object get its value and save it into notes varieble
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
    // delete note with coresponding ID
    notes.forEach((element, index) => {
      if (element.id == id) {
        notes.splice(index, 1);
      }
    });
    // save changed notes varieble into local storage
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
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    div.classList.add('note', 'deleteNote');
    div.id = note.id;
    h2.classList.add('subject');
    h2.textContent = note.heading;
    p.innerText = note.note;
    div.appendChild(h2);
    div.appendChild(p);
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
    Storage.deleteNoteFromStorage(itemToRemove);
    e.currentTarget.remove();
    const notes = document.querySelectorAll('.deleteNote');
    notes.forEach(note =>
      note.removeEventListener('click', UI.deleteNoteFromUI)
    );
    notes.forEach(note => note.classList.remove('heartbeat'));
    document.querySelector('#whatToDo').classList.remove('visible');
  }

  static resetForm() {
    document.querySelector('form').reset();
  }

  static addingHandler(e) {
    e.preventDefault();
    const form = document.querySelector('form');
    if (
      form[0].value === '' ||
      form[1].value === '' ||
      form[1].value.length > 140
    ) {
    } else {
      const note = new Note(form[0].value, form[1].value, Date.now());
      UI.addIntoSection(note);
      UI.resetForm();
      Storage.addNoteToStorage(note);
      document.querySelector('#counter').innerHTML = '0/140';
    }
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
