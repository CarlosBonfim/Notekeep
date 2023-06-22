const formNote = document.getElementById("noteFormId");
const noteText = document.querySelector("#noteText");
const noteTitle = document.querySelector("#noteTitle");
const noteSubmitButton = document.querySelector("#noteSubmitButton");
const main = document.querySelector(".main")
//o envio dos dados do formulario
formNote.addEventListener("submit", (event) => {
  event.preventDefault();
  submitFormNote();
  formNote.reset();
});

function selectNote(id) {
  console.log(id)
  getElements(id)

}

function blurMainForm() {
  noteTitle.style.display = "none";
  noteSubmitButton.style.display = "none";
}
//add titulo e botão no formMain
function focusMainForm() {
  noteTitle.style.display = "block";
  noteSubmitButton.style.display = "flex";
}
//aumenta e diminui a altura textarea
function updateHeightMainForm(){
  noteText.style.height = 'auto';
  noteText.style.height = (noteText.scrollHeight) + 'px';
}

//vai receber a interação com o noteText
//detectar
noteText.addEventListener("input", updateHeightMainForm);
noteText.addEventListener("paste", updateHeightMainForm);
noteText.addEventListener("cut", updateHeightMainForm);
noteText.addEventListener("focus", updateHeightMainForm);
//responsavel por receber o evento focus no form Inteiro
formNote.addEventListener('focus', function(event){
  focusMainForm();
},true)
//responsavel por receber o evento blur do formInteiro 
//um setTimeout para que haja uma checagem dos outros campos
formNote.addEventListener('blur', function(event){
  setTimeout(() => {
    if(document.activeElement !== noteTitle && document.activeElement !== noteText && document.activeElement !== noteSubmitButton){
      blurMainForm()
    }
  }, 50);
},true)