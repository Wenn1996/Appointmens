const IGVPERU = 0.18;

//El proceso comienza cuando se va a la sección Saca tu cita

let total;
let reservaActual;
let pacienteActual;
let cita1;
let datosValidos;
let datosValidos2;

let idTratamiento;
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
    constructor(id, fecha, hora, idTratamiento, idDoctor) {
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.idTratamiento = idTratamiento;
        this.idDoctor = idDoctor;
    }
}

class ReservaCita {
    constructor(idCita, pacienteDNI) {
        this.idCita = idCita;
        this.pacienteDNI = pacienteDNI;
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

let reservas = [];
let citas = [];
citas.push(new Cita(0, "28/09/2021", "09:30", 1, 0));
citas.push(new Cita(1, "28/09/2021", "10:30", 2, 1));
citas.push(new Cita(2, "28/09/2021", "11:30", 3, 2));
citas.push(new Cita(3, "29/09/2021", "09:30", 1, 0));
citas.push(new Cita(4, "29/09/2021", "10:30", 1, 0));
citas.push(new Cita(5, "29/09/2021", "11:30", 2, 3));
citas.push(new Cita(6, "30/09/2021", "09:30", 2, 3));
citas.push(new Cita(7, "30/09/2021", "10:30", 3, 2));
citas.push(new Cita(8, "30/09/2021", "11:30", 3, 2));
citas.push(new Cita(9, "30/09/2021", "12:30", 1, 0));
citas.push(new Cita(10, "30/09/2021", "13:30", 2, 1));
citas.push(new Cita(11, "30/09/2021", "14:30", 3, 2));
console.log(citas);


const doctores = [];
//Agregamos objetos al array
doctores.push(new Doctor(0, "Daniela Lopez", "Ortodoncia"));
doctores.push(new Doctor(1, "Lucia Espinoza", "Endodoncia"));
doctores.push(new Doctor(2, "Rodrigo Sanchez", "Extracción"));
doctores.push(new Doctor(3, "Samantha Torres", "Endodoncia"));
console.log(doctores);
mostrarDoctores();


//Formulario de registro de paciente
let miFormulario = document.getElementById("miFormulario");
miFormulario.addEventListener("submit", agregarPaciente);
let contenedorTratamientos = document.getElementById("tratamientos");
let contenerdorFormCita = document.getElementById("citasform");
let contenedorResumen = document.getElementById("resumen");
let contenedorlistacitas = document.getElementById("appointment");
let contenedorMiscitas = document.getElementById("listacitas");

let pacientes = [];

let tratamientos = [];


//Modal de registro

let usuarios = [];
let cerrar = document.querySelectorAll(".close")[0];
let abrir = document.querySelectorAll(".cta")[0];
let modal = document.querySelectorAll(".modal")[0];
let modalC = document.querySelectorAll(".modal-container")[0];
let cerrar2 = document.getElementById("btnRegistrate");
let miRegistro = document.getElementById("Register");
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
        let form = e.target;
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

    }


}





//Mostrar lista de tratamientos
function mostrarTratamientos() {
    //$(".unete").hide();
    $("#tratamientos").show();

    contenedorTratamientos.innerHTML = '<p> 2. Escoge el horario de tu cita </p> <br> <p>Escoge el tratamiento para tu cita:</p> <br>';

    const URLJSON = "data.json"

    console.log(URLJSON);
    $.getJSON(URLJSON, function(respuesta, estado) {

        if (estado === "success") {
            let misDatos = respuesta.tratamientos;
            console.log(respuesta.tratamientos);
            let options = `<select class="inputsClass">`;
            for (const dato of misDatos) {
                tratamientos.push(new Tratamiento(parseInt(dato.id), dato.nombreTratamiento, parseInt(dato.precio)));
                options += `<option value="${dato.id}">${dato.nombreTratamiento}</option>`;

            }
            options += `</select>`;
            $("#tratamientos").append(options);
            $(".inputsClass").change(function(e) {
                console.log(e.target.value);
                console.log(this.value);
                const filtro3 = citas.filter(elemento => elemento.idTratamiento == parseInt(e.target.value));
                mostrarCitas(filtro3);
            });
        }
    });

}

function mostrarCitas(filtro) {
    $("#appointment").show();
    console.log(filtro);
    let tablacitas = `<form action="#" method="GET" id="form2"><p>Horarios disponibles</p><table class="datatable"><thead><tr><th>Seleccionar</th><th>Fecha</th> <th>Hora</th></tr></thead><tbody>`;
    for (let cita of filtro) {
        tablacitas += `<td class="table-checkbox"><input type="radio" value="${cita.id}" class="elegirC" name="rbtn"></td><td>${cita.fecha}</td> <td> ${cita.hora}</td></tbody> `;
    }

    contenedorlistacitas.innerHTML = `${tablacitas} </tbody> </table> <div> <input type="submit" class=" boton" value="Reservar cita" id="cita"> </div> </form> `;
    var formCita = document.getElementById("form2");
    formCita.addEventListener("submit", registrarCita2);
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



//Función para registrar Paciente
function agregarPaciente(e) {
    e.preventDefault();
    validarForm1();
    if (datosValidos) {
        let form = e.target;
        nombreIngresado = miFormulario.children[1].value;
        edadIngresado = miFormulario.children[2].value;
        dniIngresado = miFormulario.children[3].value;
        pacientes.push(new Paciente(nombreIngresado, edadIngresado, dniIngresado));
        pacienteActual = new Paciente(nombreIngresado, edadIngresado, dniIngresado);
        console.log(pacientes);
        miFormulario.children[1].value = "";
        miFormulario.children[2].value = "";
        miFormulario.children[3].value = "";
        $("#miFormulario").hide();
        mostrarTratamientos();
    } else {
        alert("No se puedo agregar paciente");
    }
}



function mostrarResumen() {
    $("#resumen").show();
    console.log(tratamientos);
    const cita1 = citas.find(elemento => elemento.id == reservaActual.idCita)
    const encontrado = tratamientos.find(elemento => elemento.id == cita1.idTratamiento);
    const doctor = doctores.find(elemento => elemento.id == cita1.idDoctor)
    contenedorResumen.innerHTML = `<h3> Detalles de Cita</h3><br>
    <p><strong> Tratamiento : </strong>  ${encontrado.nombreTratamiento} </p>  
    <p><strong> Fecha : </strong> ${cita1.fecha}</p>
    <p><strong> Hora : </strong> ${cita1.hora}</p>
    <p><strong> Doctor : </strong> ${doctor.nombre}</p>
    <p><strong> Costo : </strong> S/.${encontrado.calcularCosto()}</p> <br>`;

    $("#resumen").append(`<h3 class="oferta_titulo">Está Oferta es para tí</h3>
    <p class="oferta_parrafo">Saca tu segunda consulta con 50% de descuento</p>
    <div><input type="submit" class=" boton" value="Nueva cita" id="cita4"></div>
    <div><input type="submit" class=" boton" value="Mis citas" id="cita5"></div> `);


    //transiciones 

    $(".oferta_titulo").fadeIn("slow", function() {
        //Cuando termina de ocultarse el elemento lo mostramos nuevamente
        $(".oferta_titulo").fadeOut(5000);
    });
    $(".oferta_parrafo").fadeIn("slow", function() {
        //Cuando termina de ocultarse el elemento lo mostramos nuevamente
        $(".oferta_parrafo").fadeOut(5000);
    });


    $('#cita4').click(function(e) {
        e.preventDefault();
        $("#miFormulario").show();
        $("#resumen").hide();
        $("#listacitas").hide();
    });

    //mis citas
    $('#cita5').click(function(e) {
        e.preventDefault();
        mostrarMisCitas();
        $("#listacitas").show();
        //Animamos sus propiedades CSS con animate
        $('html, body').animate({
            scrollTop: $("#listacitas").offset().top
        }, 2000);
    });

    console.log(reservas);

}

function mostrarMisCitas() {
    contenedorMiscitas.style.margin = "100px 50px 0px 50px";
    contenedorMiscitas.style.height = "80vh";
    let tabla2 = `<form action="#" method="GET" id="form6"><p>Mis citas reservadas </p> <table>
    <tr>
        <th>Tratamiento</th>
        <th>Doctor</th>
        <th>Fecha</th>
        <th>Hora</th>
        <th>Paciente</th>
    </tr>`;
    for (let reserva of reservas) {
        let cita1 = citas.find(elemento => elemento.id == reserva.idCita);
        let encontrado = tratamientos.find(elemento => elemento.id == cita1.idTratamiento);
        let doctor = doctores.find(elemento => elemento.id == cita1.idDoctor)
        let paciente = pacientes.find(elemento => elemento.dni == reserva.pacienteDNI)
        tabla2 += `<tr>
        <th>${encontrado.nombreTratamiento}</th>
        <td>${doctor.nombre}</td>
        <td>${cita1.fecha}</td>
        <td>${cita1.hora}</td>
        <td>${paciente.nombre}</td>
        
    </tr> `;
    }
    contenedorMiscitas.innerHTML = `${tabla2} </table>  <input type="submit" class=" boton" value="Nueva cita" id="cita8"> </form> `;


    $('#cita8').click(function(e) {
        e.preventDefault();
        $("#listacitas").hide();
        $("#miFormulario").show();
        $("#resumen").hide();
    });
}


function registrarCita2(e) {
    e.preventDefault();
    let form = e.target;
    for (let checkbox of $(".elegirC")) {
        if (checkbox.checked) {
            console.log("Se ha checkeado el " + checkbox.value);
            reservas.push(new ReservaCita(checkbox.value, pacienteActual.dni));
            reservaActual = new ReservaCita(checkbox.value, pacienteActual.dni);
        }
    }
    console.log(reservas);
    $("#tratamientos").hide();
    $("#appointment").hide();
    mostrarResumen();

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