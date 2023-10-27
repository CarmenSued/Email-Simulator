//Load the HTML
document.addEventListener('DOMContentLoaded',function () {
    const email = {
        email: '',
        asunto: '',
        mensaje: '',
        name: '',
        cc: ''
    }
    console.log(email);

    //Seleccionar los elementos del interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const inputName = document.querySelector('#name');
    const formulario =  document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    const inputCc = document.querySelector('#cc')
    

    //Asignar eventos
    inputEmail.addEventListener('blur',validar); //llamar la funcion sin parentesis
    inputAsunto.addEventListener('blur',validar);
    inputMensaje.addEventListener('blur',validar);   
    inputName.addEventListener('blur',validar);
    inputCc.addEventListener('input', validar)

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click',function(e){
        e.preventDefault();

        resetFormulario();
    })

    function enviarEmail (e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            
            resetFormulario();

            //Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg','mt-10',
            'font-bold','text-sm', 'uppercase');
            alertaExito.textContent = " Mensaje enviado correctamente "; 

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);   
    }

    // funcion para validar que los campos reciban el input
    function validar(e){
        console.log(e.target.parentElement);
        if(e.target.value.trim() === ('')){  // el metodo trim elimina los espcios en blanco
            // mostrarAlert(mensaje, referencia):
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement); 
            email[e.target.name] = '';
            comprobarEmail();
            return; // detiene la ejecucion del codigo
        }
        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);   
        
        //Asignar los valores del input para el formulario
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        //Comprobar el objeto de email
        comprobarEmail();
    };

    function mostrarAlerta(mensaje,referencia){
        limpiarAlerta(referencia);

        //Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600','text-white', 'p-2', 'text-center', 'validInputAlert');
        
        //Inyectar el error al formulario
        referencia.appendChild(error);
    }

     function limpiarAlerta(referencia){
        //comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.validInputAlert');// usamos la referencia en vez de document
        if(alerta){
            alerta.remove();
        }
     }
    // email validation
     function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const resultado = regex.test(email);
        return resultado;
     }

     function comprobarEmail() {
        if(Object.values(email).includes('')){
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
     }

     function resetFormulario(){
        //reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        email.name = '';
        email.cc = '';

        formulario.reset();
        comprobarEmail();
     }
    
});