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
  static deleteNote(id) {
    const notes = Storage.currentNotes();
    notes.forEach((element, index) => {
      if (element.id === id) {
        notes.splice(index, 1);
      }
    });
    localStorage.setItem('notes', JSON.stringify(notes));
  }
}
