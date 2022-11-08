import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {

    //Crear state de formulario
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    });
    const [ error, actualizarError ] = useState(false);

    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value,
        })
    }
    //extraer valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;
    //cuando usuario agregaa cita
    const submitCita = e => {
        e.preventDefault();

        //Validar
        if ( mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            actualizarError(true);
            return;
        }
        //aliminar mensaje error
        actualizarError(false);
        //Asignar Id
        cita.id = uuidv4();
        //Crear cita
        crearCita(cita);

        //reiniciar cita
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: '',
        })
    }

    return (
        <>
            <h2>Crear Cita</h2>
            
            { error ? <p className='alerta-error'>Todos los campos son obligatorios</p> : null }
            <form
                onSubmit={submitCita}
            >
                <label htmlFor="">Nombre Mascotas</label>
                <input 
                type="text"
                name='mascota'
                className='u-full-width'
                placeholder='Nombre Mascota'
                onChange={actualizarState}
                value={mascota}
                />

                <label htmlFor="">Nombre Dueño</label>
                <input 
                type="text"
                name='propietario'
                className='u-full-width'
                placeholder='Nombre Dueño'
                onChange={actualizarState}
                value={propietario}
                />

                <label htmlFor="">Fecha</label>
                <input 
                type="date"
                name='fecha'
                className='u-full-width'
                onChange={actualizarState}
                value={fecha}
                />

                <label htmlFor="">Hora</label>
                <input 
                type="time"
                name='hora'
                className='u-full-width'
                onChange={actualizarState}
                value={hora}
                />

                <label htmlFor="">Sintomas</label>
                <textarea 
                name="sintomas" 
                className='u-full-width'
                onChange={actualizarState}
                value={sintomas}
                ></textarea>

                <button
                type='submit'
                className='u-full-width button-primary'
                >
                    Agregar Cita
                </button>
            </form>
        </>
    );
};

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;