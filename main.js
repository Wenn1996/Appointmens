const IGVPERU = 0.18;

//El proceso comienza cuando se va a la sección Saca tu cita

let total;
let reservar;
let paciente1;
let cita1;
let datosValidos;
let datosValidos2;
let nombreIngresado;
let edadIngresado;
let idTratamiento;
let diaIngresado;
let mesIngresado;

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
        this.precio = this.precio + (IGVPERU * this.precio);
        //alert("Precio del tratamiento es S/." + total);
        return this.precio;
    }
}


class Doctor {
    constructor(id, nombre, especialidad, img) {
        this.id = id;
        this.nombre = nombre;
        this.especialidad = especialidad;
        this.img = img;
    }
}

//Declaramos un array para guardar objetos tipos doctores
const tratamientos = [];

/*
tratamientos.push(new Tratamiento(0, "Ortodoncia", 100));
tratamientos.push(new Tratamiento(1, "Endodoncia", 60));
tratamientos.push(new Tratamiento(2, "Extracción", 200));*/

var miFormulario = document.getElementById("miFormulario");
miFormulario.addEventListener("submit", agregarPaciente);
var contenedorTratamientos = document.getElementById("tratamientos");
var contenerdorFormCita = document.getElementById("citasform");
var contenedorResumen = document.getElementById("resumen");

var pacientes = [];
var citas = [];

const doctores = [];
//Agregamos objetos al array
doctores.push(new Doctor(0, "Daniela Lopez", "Ortodoncia"));
doctores.push(new Doctor(1, "Lucia Espinoza", "Endodoncia"));
doctores.push(new Doctor(2, "Rodrigo Sanchez", "Extracción"));
doctores.push(new Doctor(3, "Samantha Torres", "Endodoncia"));
console.log(doctores);



mostrarDoctores();

function mostrarDoctores() {
    for (const doctor of doctores) {
        $("#listadoc").append(
            `<div class="columna__evento">
        <img class="cuadros__img" src="images/doctor${doctor.id}.jpg" alt="" width="260" height="250">
        <div class="columna__container">
            <h3 class="columna__titulo"> <b> ${doctor.nombre}</b></h3>
            <p> Experto en  ${doctor.especialidad}</p>
            <button id="btn${doctor.id}" class="columna__boton boton btnDoc"> Saca tu cita </button>
        </div>`);

        /*            
        $(`#btn${doctor.id}`).on('click', function() {
            alert(`Sacaras cita con el doctor ${doctor.nombre}`);
        });*/
    }



}



//Mostrar lista de tratamientos
function mostrarTratamientos() {
    contenedorTratamientos.innerHTML = '<p> 2. Escoge el horario de tu cita <p> <br> <p>A continuación se presentará la lista de Tratamientos:</p>';

    const URLJSON = "Data/tratamientos.json";

    console.log(URLJSON);
    /*
    for (let tratamiento of tratamientos) {
        contenedorTratamientos.innerHTML += `<p> ${tratamiento.id}</p>
        <p><strong>Tratamiento:</strong> ${tratamiento.nombreTratamiento}</p>`;
    }*/

    $("#btn1").click(() => {
        $.getJSON(URLJSON, function(respuesta, estado) {
            if (estado === "success") {
                let misDatos = respuesta;
                for (const dato of misDatos) {
                    $("tratamientos").append(`
                                       <h3>${dato.id}</h3>
                                       <p> ${dato.nombreTratamiento}</p>
                                      `);
                }
            }
        });
    });

    contenerdorFormCita.innerHTML = `<form action="#" method="GET" id="form2"> 
    <label> Ingrese el id del tratamiento: </label> <br>
    <input type="number" class="formulario__input" name="idTratamiento" required placeholder="idTratamiento" id="idTratamiento"> <br>
    <label> Ingrese día: </label> <br>
    <input type="number" class="formulario__input" name="dia" required placeholder="día" id="dia"> <br> 
    <label> Ingrese mes ("Febrero"): </label> <br> <input type="text" class="formulario__input" name="mes" required placeholder="Mes" id="mes"> <br>
    <input type="submit" class="formulario__boton boton" value="Reservar cita" id="cita"> </form>`;
    var formCita = document.getElementById("form2");
    console.log(formCita.innerHTML);
    formCita.addEventListener("submit", registrarCita);
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
    idTratamiento = document.getElementById("idTratamiento").value;
    diaTratamiento = document.getElementById("dia").value;
    mesIngresado = document.getElementById("mes").value;
    if (idTratamiento == "" || diaTratamiento == "" || mesIngresado == "") {
        alert("Debe completar todos los campos");
        datosValidos2 = false;
    } else {
        datosValidos2 = true;
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
        $("#miFormulario").hide();
        mostrarTratamientos();
    } else {
        alert("No se puedo agregar paciente");
    }
    miFormulario.children[0].value = "";
    miFormulario.children[1].value = "";
}



console.log(pacientes);

function mostrarResumen(id, dia, mes) {
    console.log(tratamientos);
    const encontrado = tratamientos.find(elemento => elemento.id == id);

    contenedorResumen.innerHTML = `<h3> Detalles de Cita</h3>
    <p><strong> Tratamiento : </strong> ${encontrado.nombreTratamiento}</p> <br> 
    <p><strong> Fecha : </strong> ${dia} de ${mes}</p> <br>
    <p><strong> Costo : </strong> S/.${encontrado.calcularCosto()}</p> <br>`;

    $("#resumen").append(`<h3 class="oferta_titulo">Está Oferta es para tí</h3>
    <p class="oferta_parrafo">Saca tu segunda consulta con 50% de descuento</p>
    <input type="submit" class="formulario__boton boton" value="Reservar cita" id="cita4">`);

    //transiciones 

    $(".oferta_titulo").fadeIn("slow", function() {
        //Cuando termina de ocultarse el elemento lo mostramos nuevamente
        $(".oferta_titulo").fadeOut(5000);
    });
    $(".oferta_parrafo").fadeIn("slow", function() {
        //Cuando termina de ocultarse el elemento lo mostramos nuevamente
        $(".oferta_parrafo").fadeOut(5000);
    });
    $("#cita4").fadeIn("slow", function() {
        //Cuando termina de ocultarse el elemento lo mostramos nuevamente
        $("#cita4").fadeOut(5000);
    });



}

function registrarCita(e) {
    e.preventDefault();
    var form = e.target;
    idTratamiento = document.getElementById("idTratamiento").value;
    console.log(idTratamiento);
    diaIngresado = document.getElementById("dia").value;
    mesIngresado = document.getElementById("mes").value;
    citas.push(new Cita(diaIngresado, mesIngresado));
    console.log(citas[0]);
    $("#tratamientos").hide();
    $("#citasform").hide();
    mostrarResumen(idTratamiento, diaIngresado, mesIngresado);
    document.getElementById("idTratamiento").value = "";
    diaIngresado = document.getElementById("dia").value = "";
    mesIngresado = document.getElementById("mes").value = "";
    //citas[0].mostrarCita();


}

// Cuando hago clic en Descubre
$('#botonPrincipal').click(function(e) {
    e.preventDefault();
    //Animamos sus propiedades CSS con animate
    $('html, body').animate({
        scrollTop: $("#docs").offset().top
    }, 2000);
});

//Cuando hago clic en Saca Cita

$('.btnDoc').click(function(e) {
    e.preventDefault();
    //Animamos sus propiedades CSS con animate
    $('html, body').animate({
        scrollTop: $("#registrate").offset().top
    }, 2000);
});