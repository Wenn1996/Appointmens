const IGVPERU = 0.18;


var total;
var reservar;
var paciente1;
var cita1;
var datosValidos;
var nombreIngresado;
var edadIngresado;
var nombreTratamiento;
var diaIngresado;

// clases 
class Paciente {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
}

class Cita {
    constructor(fecha) {
        //this.dia = dia;
        //this.mes = mes;
        this.fecha = fecha;

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
miFormulario.addEventListener("submit", agregarPaciente);
var contenedorTratamientos = document.getElementById("tratamientos");

var pacientes = [];
var citas = [];




//Mostrar lista de tratamientos
function mostrarTratamientos() {
    contenedorTratamientos.innerHTML = '<h3> 2. Escoge el tratamiento </h3> <br> <p>A continuación se presentará la lista de Tratamientos:</p>';
    //alert(" A continuación se presentará la lista de Tratamientos");
    for (tratamiento of tratamientos) {
        contenedorTratamientos.innerHTML += `<p> ${tratamiento.id}</p>
        <p><strong>Tratamiento:</strong> ${tratamiento.nombreTratamiento}</p><hr>`;
    }
    contenedorTratamientos.innerHTML += ` <form action="#" method="GET" id="form2"> <input type="text" name="trata" required placeholder="Tratamiento" id="nombreTratamiento">`;
    contenedorTratamientos.innerHTML += `<label for="start">Start date:</label>
    <input type="date" id="start" name="trip-start"
           value="2021-08-24"
           min="2021-08-24" max="2021-12-31" id="fecha"> <br> <input type="submit" class="formulario__boton boton" value="Reservar cita" id="cita"> </form>`;
}


// Función Saludar 
function saludar() {
    alert("Hola Bienvenido a Get Your Dentists");
    reservar = prompt("Deseas una cita (s/n)");
    alert("Por favor, ingresa al menu opción Cita");

}

//Función para validar Paciente
function validarForm1() {
    nombreIngresado = miFormulario.children[0].value;
    edadIngresado = miFormulario.children[1].value;
    if (nombreIngresado == "" || edadIngresado == "") {
        alert("Debe completar todos los campos");
        datosValidos = false;
    } else {
        datosValidos = true;
    }


}

function validarCita() {
    nombreTratamiento = document.getElementById("nombreTratamiento").value;
    diaTratamiento = document.getElementById("").value;

    while (nombreTratamiento == "") {
        alert("Ingrese el número de tratamiento");
        if (nombreTratamiento != "") {
            break;
        }
    }


}


//Función para registrar Paciente
function agregarPaciente(e) {
    e.preventDefault();
    validarForm1();
    if (datosValidos) {
        var form = e.target;
        nombreIngresado = miFormulario.children[0].value;
        edadIngresado = miFormulario.children[1].value;
        pacientes.push(new Paciente(nombreIngresado, edadIngresado));
        console.log(pacientes);
        miFormulario.children[0].value = "";
        miFormulario.children[1].value = "";
        mostrarTratamientos();
    } else {
        alert("No se puedo agregar paciente");
    }
    miFormulario.children[0].value = "";
    miFormulario.children[1].value = "";
}



console.log(pacientes);


function registrarCita(e) {
    e.preventDefault();
    var form = e.target;
    nombreTratamiento = document.getElementById("nombreTratamiento").value;
    console.log(nombreTratamiento);
    fechaIngresado = document.getElementById("fecha").value;
    citas.push(new Cita(fechaIngresado));
    console.log(citas[0]);

}

function mostrarTratamiento(idtratamiento) {
    const encontrado = tratamientos.find(elemento => elemento.id === idtratamiento);
    alert("El tratamiento que escogiste fue " + encontrado.nombreTratamiento);
    encontrado.calcularCosto();
}

//Elección de tratamiento
/*
    

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