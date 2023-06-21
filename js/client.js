const url = "http://localhost:3000/notekeep";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const notes = document.getElementsByClassName("notes")[0];
    data.forEach((element) => {
      const note = document.createElement("div");
      note.classList.add("note");
      const id = element._id
      note.innerHTML = `<div class="noteContent" onclick="selectNote('${id}')" ><h3 class="noteTitle">${element.noteTitle}</h3><p class="nodeText">${element.noteText}</p></div>`;
      notes.appendChild(note);
    });
  })
  .catch((err) => console.log(`Caiu no catch ${err}`));

function submitFormNote() {
  console.log("entrou no submit form note");
  const formNote = document.getElementById("noteFormId");
  const formData = new FormData(formNote);
  const data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  console.log(data);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.text())
    .then((text) => console.log(`Resposta do servidor: ${text}`))
    .then(() => location.reload())
    .catch((err) =>
      console.log(
        `ERRO, NÃO FOI POSSIVEL ENVIAR OS DADOS PARA O SERVIDOR: ${err}`
      )
    );
}

function getElements(id) {
  console.log("oi");
  fetch(`${url}/${id}`)
    .then((data) => data.json())
    .then((values) => {
      console.log("acima do showNOte");
      const showNote = document.createElement("div");
      showNote.classList.add("showNote");
      // showNote.setAttribute("tabindex", -1);
      showNote.innerHTML = `<form class="selectedNote">
      <input type="hidden" name="id" value="${values._id}" >
      <textarea type="text" id="openTitle" name="noteTitle">${values.noteTitle}</textarea>
      <textarea type="text" id="openNote" name="noteText">${values.noteText}</textarea>
      <div class="selectedNoteButtons">
        <input type="submit" id="editSubmitButton" value="Salvar">
        <button class="deleteNoteButton">Excluir</button>
      </div>
      </form>`;
      main.appendChild(showNote);
      const openNote = showNote.querySelector('#openNote')
      const openTitle = showNote.querySelector('#openTitle')
      const editSubmitButton = showNote.querySelector('#editSubmitButton')
      const deleteNoteButton = showNote.querySelector('.deleteNoteButton')
      openNote.focus()
      showNote.addEventListener("blur", (event) => {
        console.log("teste blut");
        setTimeout(() => {
          if(document.activeElement !== openTitle && document.activeElement !== openNote && document.activeElement !== editSubmitButton && document.activeElement !== deleteNoteButton){
            showNote.innerHTML = "";
         }
        }, 50);
      },true);
    });
}
