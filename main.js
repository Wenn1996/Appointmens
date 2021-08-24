const IGVPERU = 0.18;

//El proceso comienza cuando se va a la sección Saca tu cita

var total;
var reservar;
var paciente1;
var cita1;
var datosValidos;
var nombreIngresado;
var edadIngresado;
var idTratamiento;
var diaIngresado;
var mesIngresado;

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
        return total = this.precio + (IGVPERU * this.precio);
        //alert("Precio del tratamiento es S/." + total);
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
var contenerdorFormCita = document.getElementById("citasform");
var contenedorResumen = document.getElementById("resumen");

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
    contenerdorFormCita.innerHTML = `<form action="#" method="GET" id="form2"> <label> Ingrese el id del tratamiento: </label> <input type="number" name="idTratamiento" required placeholder="idTratamiento" id="idTratamiento"> <br>
    <label> Ingrese día: </label> <input type="number" name="dia" required placeholder="día" id="dia"> <br> <label> Ingrese mes ("Febrero"): </label> <input type="text" name="mes" required placeholder="Mes" id="mes"> <hr>
    <input type="submit" class="formulario__boton boton" value="Reservar cita" id="cita"> </form>`;
    var formCita = document.getElementById("form2");
    console.log(formCita.innerHTML);
    formCita.addEventListener("submit", registrarCita);
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
    idTratamiento = document.getElementById("idTratamiento").value;
    console.log(idTratamiento);
    diaIngresado = document.getElementById("dia").value;
    mesIngresado = document.getElementById("mes").value;
    citas.push(new Cita(diaIngresado, mesIngresado));
    console.log(citas[0]);
    //mostrarResumen(idTratamiento);
    citas[0].mostrarCita();


}

function mostrarResumen(idtratamiento) {
    const encontrado = tratamientos.find(elemento => elemento.id === idtratamiento);
    //var costo = encontrado.calcularCosto();

    //alert("El tratamiento que escogiste fue " + encontrado.nombreTratamiento);
    //falta ponerle precio
    contenedorResumen.innerHTML = `<h3> Detalles de Cita</h3>
    <p><strong> Tratamiento : </strong> ${encontrado.nombreTratamiento}</p>`;


}