const inputNombre = document.querySelector("#inputNombre");
const inputEdad = document.querySelector("#inputEdad");
const inputFecha = document.querySelector("#inputFecha");
const inputEmail = document.querySelector("#inputEmail");

// ELEMENTO BOTÓN 
const btnEnviar = document.querySelector("button#btnEnviar");

/* function recuperarDatos() {
    inputNombre.value = localStorage.getItem("nombre")
    inputEdad.value = localStorage.getItem("edad")
    inputFecha.value = localStorage.getItem("fechaingreso")
    inputEmail.value = localStorage.getItem("email")
} */

function recuperarDatos(){
    let datosForm = JSON.parse(localStorage.getItem("datosForm"))
    return(datosForm)
}

function guardarDatos() {

    const datosDeFormulario = {
        nombre: inputNombre.value,
        edad: inputEdad.value,
        fechaingreso: inputFecha.value,
        email: inputEmail.value
    }
    
    localStorage.setItem("datosForm", JSON.stringify(datosDeFormulario))
}

btnEnviar.addEventListener("click", guardarDatos)
