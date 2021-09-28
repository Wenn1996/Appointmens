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
let correoIngresado;
let contrasenaIngresado;
let dniIngresado;

// clases 
class Paciente {
    constructor(nombre, edad, dni) {
        this.nombre = nombre;
        this.edad = edad;
        this.dni = dni;
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

class Usuario {
    constructor(correo, contrasena) {
        this.correo = correo;
        this.contrasena = contrasena;
    }
}

//Modal de registro

var usuarios = [];
let cerrar = document.querySelectorAll(".close")[0];
let abrir = document.querySelectorAll(".cta")[0];
let modal = document.querySelectorAll(".modal")[0];
let modalC = document.querySelectorAll(".modal-container")[0];
let cerrar2 = document.getElementById("btnRegistrate");
var miRegistro = document.getElementById("Register");
miRegistro.addEventListener("submit", agregarUsuario);

abrir.addEventListener("click", function(e) {
    e.preventDefault();
    modalC.style.opacity = "1";
    modalC.style.visibility = "visible";
    modal.classList.toggle("modal-close");
});

cerrar.addEventListener("click", function() {
    modal.classList.toggle("modal-close");

    setTimeout(function() {
        modalC.style.opacity = "0";
        modalC.style.visibility = "hidden";
    }, 1000)
})

window.addEventListener("click", function(e) {
    console.log(e.target);
    if (e.target == modalC) {
        modal.classList.toggle("modal-close");

        setTimeout(function() {
            modalC.style.opacity = "0";
            modalC.style.visibility = "hidden";
        }, 1000)
    }
})



function agregarUsuario(e) {
    e.preventDefault();
    validarRegistro();
    if (datosValidos) {
        var form = e.target;
        correoIngresado = miRegistro.children[0].value;
        contrasenaIngresado = miFormulario.children[1].value;
        usuarios.push(new Usuario(correoIngresado, contrasenaIngresado));
        console.log(usuarios);
        sessionStorage.setItem('usuarioactual', usuarios[0]);
        modal.classList.toggle("modal-close");
        setTimeout(function() {
            modalC.style.opacity = "0";
            modalC.style.visibility = "hidden";
        }, 800)
        $(".cta").hide();
        $(".lista").append(`<p> Bienvenido ${correoIngresado}</p>`);
        miRegistro.children[0].value = "";
        miRegistro.children[1].value = "";


    } else {
        alert("Error. No se pudo registrar");
    }

}


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
        $("#listadoc").append(`
        <div class="columna__evento">
            <img class="cuadros__img" src="images/doctor${doctor.id}.jpg" alt="" width="270" height="250">
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
//Formulario de registro de paciente
var miFormulario = document.getElementById("miFormulario");
miFormulario.addEventListener("submit", agregarPaciente);
var contenedorTratamientos = document.getElementById("tratamientos");
var contenerdorFormCita = document.getElementById("citasform");
var contenedorResumen = document.getElementById("resumen");

let pacientes = [];
let citas = [];
let tratamientos = [];

//Mostrar lista de tratamientos
function mostrarTratamientos() {
    $(".unete").hide();
    contenedorTratamientos.innerHTML = ' <h1 class="tituloSecundario">Saca tu cita!</h1> <p> 2. Escoge el horario de tu cita </p> <br> <p>A continuación se presentará la lista de Tratamientos:</p> <br> <button class="formulario__boton boton" id="btn2">Mostrar tratamiento </button>';

    const URLJSON = "data.json"

    console.log(URLJSON);
    /*
    for (let tratamiento of tratamientos) {
        contenedorTratamientos.innerHTML += `<p> ${tratamiento.id}</p>
        <p><strong>Tratamiento:</strong> ${tratamiento.nombreTratamiento}</p>`;
    }*/

    $(document).on("click", "#btn2", () => {
        $.getJSON(URLJSON, function(respuesta, estado) {
            if (estado === "success") {
                let misDatos = respuesta.tratamientos;
                console.log(respuesta.tratamientos);
                for (const dato of misDatos) {
                    tratamientos.push(new Tratamiento(parseInt(dato.id), dato.nombreTratamiento, parseInt(dato.precio)));
                    $("#tratamientos").append(`
                                       <h3>${dato.id}</h3>
                                       <p> ${dato.nombreTratamiento}</p>
                                      `);
                }
            }
        });
    });
    console.log(tratamientos);



    contenerdorFormCita.innerHTML = `<form action="#" method="GET" id="form2"> 
    <label> Ingrese el id del tratamiento: </label> <br>
    <input type="number" class="formulario__input" name="idTratamiento" required placeholder="idTratamiento" id="idTratamiento"> <br>
    <label> Ingrese día: </label> <br>
    <input type="number" class="formulario__input" name="dia" required placeholder="día" id="dia"> <br> 
    <label> Ingrese mes ("Febrero"): </label> <br> <input type="text" class="formulario__input" name="mes" required placeholder="Mes" id="mes"> <br>
    <input type="submit" class="formulario__boton boton" value="Reservar cita" id="cita"> </form>`;
    var formCita = document.getElementById("form2");
    formCita.addEventListener("submit", registrarCita);
}



//funcion para validar formulario de registro
function validarRegistro() {
    correoIngresado = miRegistro.children[0].value;
    contrasenaIngresado = miRegistro.children[1].value;
    if (correoIngresado == "" || contrasenaIngresado == "") {
        alert("Debe completar todos los campos");
        datosValidos = false;
    } else {
        datosValidos = true;
    }


}


//Función para validar Paciente
function validarForm1() {
    nombreIngresado = miFormulario.children[1].value;
    edadIngresado = miFormulario.children[2].value;
    dniIngresado = miFormulario.children[3].value;
    if (nombreIngresado == "" || edadIngresado == "" || dniIngresado == "") {
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
        nombreIngresado = miFormulario.children[1].value;
        edadIngresado = miFormulario.children[2].value;
        dniIngresado = miFormulario.children[3].value;
        pacientes.push(new Paciente(nombreIngresado, edadIngresado, dniIngresado));
        console.log(pacientes);
        miFormulario.children[0].value = "";
        miFormulario.children[1].value = "";
        miFormulario.children[2].value = "";
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