document.addEventListener('DOMContentLoaded', function () {
    const noteTextArea = document.getElementById('note-text');
    const saveNoteButton = document.getElementById('save-note');
    const notesList = document.getElementById('notes');

    saveNoteButton.addEventListener('click', function () {
        const note = noteTextArea.value;
        if (note.trim() !== '') {
            saveNoteToStorage(note);
            updateNotesList();
            noteTextArea.value = '';
        }
    });

    notesList.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('delete-note')) {
            const noteIndex = target.dataset.index;
            deleteNoteFromStorage(noteIndex);
            updateNotesList();
        }
    });

    function saveNoteToStorage(note) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function deleteNoteFromStorage(index) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function updateNotesList() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${note}</span><span class="delete-note" data-index="${index}">Delete</span>`;
            notesList.appendChild(li);
        });
    }

    // Initial update when the popup is opened
    updateNotesList();
});
