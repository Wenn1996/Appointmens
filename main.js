const IGVPERU = 0.18;


let total;
let reservar;
let paciente1;
let cita1;

// clases 
class Paciente {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
}

class Cita {
    constructor(dia, mes) {
        this.dia = dia;
        this.mes = mes;

    }
    mostrarCita() {
        alert(" Tu cita está programada para " + this.dia + " de " + this.mes);
    }

}


class Tratamiento {
    constructor(id, nombreTratamiento, precio) {
        this.id = id;
        this.nombreTratamiento = nombreTratamiento;
        this.precio = precio;
    }

    calcularCosto() {
        total = this.precio + (IGVPERU * this.precio);
        alert("Precio del tratamiento es S/." + total);
    }
}

//Declaramos un array para guardar objetos tipos tratamientos
const tratamientos = [];

//Agregamos objetos al array
tratamientos.push(new Tratamiento(0, "Ortodoncia", 100));
tratamientos.push(new Tratamiento(1, "Endodoncia", 60));
tratamientos.push(new Tratamiento(2, "Extracción", 200));

var miFormulario = document.getElementById("miFormulario");
var nombreIngresado = miFormulario.children[0].value;
var edadIngresado = miFormulario.children[1].value;
miFormulario.addEventListener("submit", agregarPaciente);
let contenedorTratamientos = document.getElementById("tratamientos");

let pacientes = [];

function agregarPaciente() {

    pacientes.push(new Paciente(nombreIngresado, edadIngresado));
    console.log(pacientes[0]);
    //miFormulario.children[0].value = "";
    //miFormulario.children[1].value = "";
    mostrarTratamientos();

}

console.log(pacientes);




//Mostrar lista de tratamientos
function mostrarTratamientos() {
    contenedorTratamientos.innerHTML = '<h3> A continuación se presentará la lista de Tratamientos:</h3>';
    //alert(" A continuación se presentará la lista de Tratamientos");
    for (tratamiento of tratamientos) {
        contenedorTratamientos.innerHTML += `<p><strong>Id: </strong> ${tratamiento.id}</p>
        <p><strong>Tratamiento:</strong> ${tratamiento.nombreTratamiento}</p><hr>`
            //alert("Tratamiento: " + tratamiento.nombreTratamiento + " - Codigo: " + tratamiento.id);
    }


}


// Función Saludar 
function saludar() {
    alert("Hola Bienvenido a Get Your Dentists");
    reservar = prompt("Deseas una cita (s/n)");
    alert("Por favor, ingresa al menu opción Cita");

}


function mostrarTratamiento(idtratamiento) {
    const encontrado = tratamientos.find(elemento => elemento.id === idtratamiento);
    alert("El tratamiento que escogiste fue " + encontrado.nombreTratamiento);
    encontrado.calcularCosto();

}






//console.log(nombreIngresado.innerHTML);
//Función que registra al paciente y la cita
//function registrar() {


//Registro de Paciente


/*
while (nombreIngresado == "") {
    alert("No ingresaste tu nombre :(");
    nombreIngresado = prompt("Ingrese su Nombre:");
    if (nombreIngresado != "") {
        break;
    }
}*/


/*
while (isNaN(edadIngresado)) {
    alert("No ingresaste tu edad :(");
    edadIngresado = parseInt(prompt("Ingrese su edad:"));
    if (isNaN(edadIngresado) == false) {
        break;
    }
}*/




//Elección de tratamiento
/*
    listaTratamientos();
    tratamientoIngresado = parseInt(prompt("Ingresa el codigo del tratamiento:  "));
    while (isNaN(tratamientoIngresado)) {
        alert("No ingresaste el tipo de tratamiento :(");
        diaIngresado = parseInt(prompt("Ingrese el tipo de tratamiento:"));
        if (isNaN(tratamientoIngresado) == false) {
            break;
        }
    }

    //Registro de cita

    let diaIngresado = parseInt(prompt("Ingrese el día de la cita: (Ejemplo:31)"));
    while (isNaN(diaIngresado)) {
        alert("No ingresaste el día de la cita :(");
        diaIngresado = parseInt(prompt("Ingrese el día:  (Ejemplo:31)"));
        if (isNaN(diaIngresado) == false) {
            break;
        }
    }

    let mesIngresado = prompt("Ingrese el mes:  (Ejemplo: enero)");

    while (mesIngresado == "") {
        alert("No ingresaste el mes para la cita:(");
        mesIngresado = prompt("Ingrese el mes: (Ejemplo: enero)");
        if (mesIngresado != "") {
            break;
        }
    }

    cita1 = new Cita(diaIngresado, mesIngresado);
    console.log(cita1);

    mostrarTratamiento(tratamientoIngresado);
    cita1.mostrarCita();
*/
//}



//Función que verifica si se desea registrar una cita o no
/*
function verificar() {
    if (reservar == "s") {
        registrar();
    } else {
        alert("Vuelve pronto!!");
    }
}*/


//Llamando a las funciones 
//saludar();
//verificar();