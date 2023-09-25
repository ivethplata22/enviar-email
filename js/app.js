document.addEventListener('DOMContentLoaded', () => {

    // Objeto Email

    const email = {
        email: '',
        asunto: '',
        cc: '',
        mensaje: ''
    }
    
    // Variables HTML

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputCC = document.querySelector('#cc'); // No obligatorio
    const inputMensaje = document.querySelector('#mensaje');
    const btnSubmit = document.querySelector('#botones button[type="submit"]');
    const btnReset = document.querySelector('#botones button[type="reset"]');
    const formulario = document.querySelector('#formulario');
    const spinner = document.querySelector('#spinner');

    // Event Listener

    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputCC.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    btnReset.addEventListener('click', borrarFormulario);
    btnSubmit.addEventListener('click', enviarFormulario);

    // Funciones Event Listener

    function validar(e) {

        // Validar CC
        if( e.target.id === 'cc') {

            if( e.target.value.trim() !== '' ) {

                if( !validarEmail( e.target.value.trim() ) ) {

                    // Mostrar Alerta Email Invalido
                    mostrarAlerta('El email no es válido', e.target.parentElement);
                    email[e.target.name] = 'invalid';
                    validarFormulario();
                    return;

                }

            }

        }

        // Validar Campos Obligatorios
        if( e.target.id !== 'cc' && e.target.value.trim() === '' ) {
            
            // Mostrar Alerta Campo Obligatorio
            mostrarAlerta(`El campo ${e.target.name} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            validarFormulario();
            return;

        }

        // Validar Email
        if( e.target.id === 'email') {

            if( !validarEmail( e.target.value.trim() ) ) {

                // Mostrar Alerta Email Invalido
                mostrarAlerta('El email no es válido', e.target.parentElement);
                email[e.target.name] = '';
                validarFormulario();
                return;
                
            }

        }

        // Limpiar Alerta
        limpiarAlerta(e.target.parentElement);
        email[e.target.name] = e.target.value.trim().toLowerCase();
        validarFormulario();
        
    }

    function borrarFormulario(e) {

        e.preventDefault();

        resetearValoresFormulario();

    }

    function enviarFormulario(e) {

        e.preventDefault();

        // Mostrar el Spinner
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        // Ocultar el Spinner despues de 3 segundos
        setTimeout(() => {

            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            // Borrar Formulario
            resetearValoresFormulario();

            const alertaEnviado = document.createElement('P');
            alertaEnviado.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaEnviado.textContent = 'Mensaje Enviado Correctamente';

            formulario.appendChild(alertaEnviado);

            // Borrar Alerta despues de 3 segundos
            setTimeout(() => {

                alertaEnviado.remove();

            }, 3000);

        }, 3000);

    }

    // Funciones

    function mostrarAlerta(mensaje, referencia) {

        // Limpiar Alerta Anterior
        limpiarAlerta(referencia);

        // Crear Elemento Alerta
        const errorMensaje = document.createElement('P');
        errorMensaje.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        errorMensaje.textContent = mensaje;

        // Agregar Alerta al HTML
        referencia.appendChild(errorMensaje);

    }

    function limpiarAlerta(referencia) {

        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }

    }

    function limpiarAlertas() {

        const alertas = formulario.querySelectorAll('.bg-red-600');
        
        for( const alerta of alertas ) {
            alerta.remove();
        }

    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function validarFormulario() {

        const camposObligatorios = {...email};
        const cc = camposObligatorios.cc;
        delete camposObligatorios.cc;

        if( Object.values(camposObligatorios).includes('') || cc === 'invalid' ) {

            // Desactivar el Boton
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;

        }
        
        // Activa el Boton
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;

    }

    function resetearValoresFormulario() {

        formulario.reset();

        email.asunto = '';
        email.cc = '';
        email.email = '';
        email.mensaje = '';

        limpiarAlertas();

        validarFormulario();
        
    }

});