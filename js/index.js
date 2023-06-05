const url = "http://localhost:3000/notekeep";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const notes = document.getElementsByClassName("notes")[0];
    console.log(notes);
    data.forEach((element) => {
      console.log("oi");
      console.log(element);
      const note = document.createElement("div");
      note.classList.add("note");
      note.innerHTML = `<div class="noteContent"><p class="nodeText">${element.noteText}</p></div>`;
      notes.appendChild(note)
    });
  })
  .catch((err) => console.log(`Caiu no catch ${err}`));
