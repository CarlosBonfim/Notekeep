const url = "http://localhost:3000/notekeep";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const notes = document.getElementsByClassName("notes")[0];
    data.forEach((element) => {
      const note = document.createElement("div");
      note.classList.add("note");
      note.innerHTML = `<div class="noteContent"><p class="nodeText">${element.noteText}</p></div>`;
      notes.appendChild(note);
    });
  })
  .catch((err) => console.log(`Caiu no catch ${err}`));

const formNote = document.getElementById("noteFormId");
formNote.addEventListener("submit", (event) => {
  event.preventDefault();
  submitFormNote();
  formNote.reset();
});

function submitFormNote() {
  console.log("entrou no submit form note");
  // const formNote = document.getElementById("noteFormId");
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
