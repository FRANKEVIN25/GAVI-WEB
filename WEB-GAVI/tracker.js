// ---- Variables globales ----
const image = document.getElementById("track_it")
color = image.getAttribute("data-name")
console.log("asd")
let tracking = false

start_x = 0     // Posición inicial del ratón al hacer clic

index = 0       // Posición inicial del puntero de imágenes

image_array = [ // Las imágenes en sí
    "1.png", "2.png", "3.png", "4.png",
    "5.png", "6.png", "7.png", "8.png",
    "9.png", "10.png", "11.png", "12.png",
]

selected_image = image_array[index]


// ---- Funciones principales ----
image.addEventListener("mousedown", (event) => {    // Evento de presionar el ratón
    color = image.getAttribute("data-name")         // Cambiar de nombre de acuerdo a lo seleccionado
    const rect = image.getBoundingClientRect()      // Obtener parámetros de la imagen colocada
    start_x = event.clientX - rect.left             // Restar coordenadas del mouse con la coordenada de "offset"
    tracking = true                                 // Seguir rastreando la posición del ratón
})


document.addEventListener("mouseup", () => {        // Evento de soldar el ratón
    tracking = false                                // Dejar de rastrear el ratón
})


image.addEventListener("dragstart", (event) => {    // Para evitar arrastrar la imagen
    event.preventDefault();                         // Hace más fácil hacer la animación
});


image.addEventListener("mousemove", (event) => {    // Evento de mover el ratón
    if (tracking){
        const rect = image.getBoundingClientRect()  // Actualizar parámetros de la imagen colocada
        const x = event.clientX - rect.left         // Actualizar coordenadas

        if (start_x + 20 < x){                      // Si se han movido 20 píxeles a la derecha
            start_x = x                             // Cambiar posición inicial
            index -= 1                              // Decrementar puntero de imágenes
            if(index <= -1){                        // Si es puntero indica un número menor al inicio colocar al final
                index = image_array.length - 1
            }
            selected_image = image_array[index]     // Seleccionar, mostrar la imagen y cambiar index de la imagen
            document.getElementById("track_it").src = "car_images/" + color + "/" + selected_image
            document.getElementById("track_it").setAttribute("data-name2", index + 1)
        }

        if (start_x - 20 > x){                      // Si se han movido 20 píxeles a la izquierda
            start_x = x                             // Cambiar posición inicial
            index += 1                              // Incrementar puntero de imágenes
            if(index >= image_array.length){        // Si se sobrepasa el número de imágenes retornar al inicio
                index = 0
            }
            selected_image = image_array[index]     // Seleccionar, mostrar la imagen y cambiar index de la imagen
            document.getElementById("track_it").src = "car_images/" + color + "/" + selected_image
            document.getElementById("track_it").setAttribute("data-name2", index + 1)
        }
    }
})