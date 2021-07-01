import { eliminarCita, cargarEdicion } from '../funciones.js'
import { contenerCitas} from '../selectores.js'

class UI{
    imprimirAlerta(mensaje, tipo){
        // crea div
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12')
        // agrega clases segun el tipo de mensaje
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger')
        } else{
            divMensaje.classList.add('alert-success')
        }

        // mensaje
        divMensaje.textContent = mensaje

        // agregar al dom
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'))

        // eliminar mensaje
        setTimeout(()=>{
            divMensaje.remove()
        },3000)
    }
    imprimirCitas({citas}){

        this.limpiarHtml()

        citas.forEach( cita =>{
            const { mascota, propietario, telefono, fecha, hora, sintomas,id} = cita
            const divCita = document.createElement('div')
            divCita.classList.add('cita', 'p-3')
            divCita.dataset.id = id

            // scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h4')
            mascotaParrafo.classList.add('card-tittle', 'font-weight-bolder')
            mascotaParrafo.textContent = mascota

            const propietarioParrafo = document.createElement('p')
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder"> Propietario: </span> ${propietario}
            ` 

            const telefonoParrafo = document.createElement('p')
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder"> Telefono: </span> ${telefono}
            ` 
            const fechaParrafo = document.createElement('p')
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder"> Fecha: </span> ${fecha}
            ` 
            const horaParrafo = document.createElement('p')
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder"> hora: </span> ${hora}
            ` 
            const sintomasParrafo = document.createElement('p')
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder"> sintomas: </span> ${sintomas}
            ` 
            // bottom para eleminar esta cita
            const btnEliminar = document.createElement('button')
            btnEliminar.classList.add('btn', 'btn-danger','mr-2')
            btnEliminar.innerHTML= 'Eliminar'

            btnEliminar.onclick = () => eliminarCita(id)
            // boton para editar cita
            const btnEditar = document.createElement('button')
            btnEditar.classList.add('btn', 'btn-info', 'mr-2')
            btnEditar.innerHTML='Editar'
            
            btnEditar.onclick = () => cargarEdicion(cita)
            // agregar parrafos al div

            divCita.appendChild(mascotaParrafo)
            divCita.appendChild(propietarioParrafo)
            divCita.appendChild(telefonoParrafo)
            divCita.appendChild(fechaParrafo)
            divCita.appendChild(horaParrafo)
            divCita.appendChild(sintomasParrafo)
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)

            //agregar las citas al html
            contenerCitas.appendChild(divCita)
        })
    }
    limpiarHtml(){
        while (contenerCitas.firstChild){
            contenerCitas.removeChild(contenerCitas.firstChild) 
        }
    }
}

export default UI