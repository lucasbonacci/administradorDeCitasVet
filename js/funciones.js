import Citas from './clases/Citas.js'
import UI from './clases/UI.js'
import {mascotaInput, propietarioInput, telefonoInput, fechaInput, formulario, sintomasInput, horaInput, } from './selectores.js'

const ui = new UI()
const administrarCitas = new Citas()

let editando = false

// objeto con la informacion de la cita

const citaObj = {
    mascota: '',
    propietario: '',
    telefono:'',
    fecha:'' ,
    hora: '',
    sintomas: ''
}

//agrega datos al objeto cita
export function datosCita(e){
    citaObj[e.target.name] = e.target.value
}



// valida y agrega una nueva cita a la calse de cita

export function nuevaCita(e){
    e.preventDefault()

    //Extrae info de citaObj
    const { mascota, propietario, telefono, fecha, hora, sintomas} = citaObj

    // Validacion
    if (mascota ==='' || propietario === '' || telefono==='' || fecha ==='' || hora ==='' || sintomas ==='' ){
        ui.imprimirAlerta('todos los campos son obligatorios', 'error')

        return
    }

    if (editando){
        ui.imprimirAlerta('Editado correctamente')
        // pasar objeto de la eddicion
        administrarCitas.editarCita({...citaObj})
        // regresa el texto del boton
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita'
        // quitar modo edicion
        editando = false
    } else {
        // generar un id unico para cada cita
        citaObj.id = Date.now()
        //crear cita
        administrarCitas.agregarCita({...citaObj})
        // agregar alarte
        ui.imprimirAlerta('Se agrego correctamente')
    }


    // reinicia el objeto
    reiniciarObjeto()
    // reinicia el form
    formulario.reset()
    // mostrar html
    ui.imprimirCitas(administrarCitas)
}

export function reiniciarObjeto(){
    citaObj.mascota = ''
    citaObj.propietario=''
    citaObj.telefono=''
    citaObj.sintomas=''
    citaObj.hora=''
    citaObj.fecha= ''
}

export function eliminarCita(id){
    //Eliminar cita
    administrarCitas.eliminarCita(id)
    // muestra mensaje
    ui.imprimirAlerta('La cita se elimino correctamente')
    // refresccar citas
    ui.imprimirCitas(administrarCitas)
}

// carga los datos editando la cita
export function cargarEdicion(cita){
    const { mascota, propietario, telefono, fecha, hora, sintomas,id} = cita
    // llenar inputs
    mascotaInput.value = mascota
    propietarioInput.value = propietario
    telefonoInput.value = telefono
    fechaInput.value = fecha
    horaInput.value = hora
    sintomasInput.value = sintomas

    //llenar el objeto
    citaObj.mascota= mascota
    citaObj.propietario= propietario
    citaObj.telefono = telefono
    citaObj.fecha = fecha
    citaObj.hora = hora
    citaObj.sintomas = sintomas
    citaObj.id = id
    // cambiar texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios'
    editando = true
}