const socketClient = io()

const nombreUsuario = document.getElementById('userName')
const formulario = document.getElementById('form')
const inputMensaje = document.getElementById('message')
const chatParrafo = document.getElementById('chatParrafo')

let user = null

if(!user){
    Swal.fire({
        title:'WELCOME TO CHAT',
        text:'Ingresa tu usuario',
        input:'email',
        inputValidator:(value)=>{
            if(!value){
                return 'Necesitas ingresar usuario'
            }
        }
    })
    .then(userName=>{
        usuario = userName.value
        nombreUsuario.innerText= usuario
        socketClient.emit('nuevoUsuario', usuario)

    })
}

formulario.onsubmit = (e)=>{
    e.preventDefault()
    const info = {
        user: usuario,
        message: inputMensaje.value
    }
    socketClient.emit('mensaje',info)
    inputMensaje.value= ''
}

socketClient.on('chat', mensajes =>{
    const htmlRender= mensajes.map(e=>{
        return `<p><strong>${e.user}</strong>  ${e.message}</p>`
    }).join(' ')

    chatParrafo.innerHTML= htmlRender
})

socketClient.on('broadcast',nombreUsuario=>{
    Toastify({
        text:`Ingreso ${nombreUsuario} al chat`,
        duration: 6000,
        position: 'right',
        style:{
            background: 'linear-gradient(to right, #00b19c,#95c73d'
        },
    }).showToast()
})






// formulario.onsubmit= (e) =>{
//     e.preventDefault()
//     const usuario = userName.value
//     const mensaje = message.value
//     socketClient.emit('mensaje1', {usuario,mensaje})
// }

// socketClient.on('saludo',(mensaje)=>{
//     console.log(mensaje)
// })

// socketClient.on('respuesta1',(mensajes)=>{
//     let info = ''
//     mensajes.forEach((m) => {
//         info += `El usuario <strong>${m.usuario}</strong> dice: ${m.mensaje} <br>`
//     });

//     parrafo.innerHTML= info
// })