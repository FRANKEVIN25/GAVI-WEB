document.addEventListener('DOMContentLoaded', function() {

    image_index = 0       // Posición inicial del puntero de imágenes

    let tracking = false

    start_x = 0     // Posición inicial del ratón al hacer clic


    color = "Forthing_T5_2022"

    image_array = [ // Las imágenes en sí
        "1.png", "2.png", "3.png", "4.png",
        "5.png", "6.png", "7.png", "8.png",
        "9.png", "10.png", "11.png", "12.png",
    ]

    selected_image = image_array[image_index]


    // Obtener todas las diapositivas de vehículos
    const slides = document.querySelectorAll('.vehicle-slide');
    const slideContainer = document.getElementById('vehicle-showcase');
    let currentSlideIndex = 0;
    
    // Crear controles de navegación
    createSlideControls();
    
    // Función para mostrar la siguiente diapositiva
    function showNextSlide() {
        showSlide((currentSlideIndex + 1) % slides.length);
    }
    
    // Función para mostrar la diapositiva anterior
    function showPrevSlide() {
        showSlide((currentSlideIndex - 1 + slides.length) % slides.length);
    }
    
    // Función para mostrar una diapositiva específica
    function showSlide(index) {
        // Ocultar la diapositiva actual
        slides[currentSlideIndex].classList.remove('active');
        document.querySelector(`.slide-dot:nth-child(${currentSlideIndex + 1})`).classList.remove('active');
        
        // Actualizar el índice actual
        currentSlideIndex = index;
        
        // Mostrar la nueva diapositiva
        slides[currentSlideIndex].classList.add('active');
        document.querySelector(`.slide-dot:nth-child(${currentSlideIndex + 1})`).classList.add('active');


        selected_image = image_array[image_index]     // Seleccionar y mostrar la imagen
        active_image = Array.from(slides).find(slide => slide.classList.contains('active'));
        active_image = active_image.querySelector("img")
        active_image.src = active_image.src.replace(/[^/]+$/, selected_image)
    }
    
    // Crear controles de navegación (puntos y flechas)
    function createSlideControls() {
        // Crear contenedor de puntos
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slide-controls';
        
        // Crear puntos para cada diapositiva
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'slide-dot';
            if (index === 0) dot.classList.add('active');
            
            // Evento para cambiar a la diapositiva correspondiente al punto
            dot.addEventListener('click', () => {
                showSlide(index);
                resetInterval();
            });
            
            dotsContainer.appendChild(dot);
        });
        
        // Crear flechas de navegación
        const prevArrow = document.createElement('div');
        prevArrow.className = 'slide-arrow prev';
        prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevArrow.addEventListener('click', () => {
            showPrevSlide();
            resetInterval();
        });
        
        const nextArrow = document.createElement('div');
        nextArrow.className = 'slide-arrow next';
        nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextArrow.addEventListener('click', () => {
            showNextSlide();
            resetInterval();
        });
        
        // Añadir elementos al contenedor
        slideContainer.appendChild(dotsContainer);
        slideContainer.appendChild(prevArrow);
        slideContainer.appendChild(nextArrow);
    }
    
    // Configurar un intervalo para cambiar las diapositivas automáticamente
    let slideInterval = setInterval(showNextSlide, 5000); // Cambiado a 5 segundos para una experiencia más agradable
    
    // Reiniciar el intervalo
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(showNextSlide, 5000);
    }
    
    // Pausar la rotación cuando el usuario pasa el ratón por encima
    slideContainer.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    // Reanudar la rotación cuando el ratón sale del contenedor
    slideContainer.addEventListener('mouseleave', function() {
        resetInterval();
    });

    // TRACKER


    active_image = slides[currentSlideIndex].querySelector("img")




        // ---- Funciones principales ----
    document.addEventListener("mousedown", (event) => {    // Evento de presionar el ratón
        active_image = Array.from(slides).find(slide => slide.classList.contains('active'));
        active_image = active_image.querySelector("img")
        const rect = active_image.getBoundingClientRect()      // Obtener parámetros de la imagen colocada
        start_x = event.clientX - rect.left             // Restar coordenadas del mouse con la coordenada de "offset"
        tracking = true                                 // Seguir rastreando la posición del ratón

        active_image.addEventListener("mousemove", (event) => {    // Evento de mover el ratón
            active_image = Array.from(slides).find(slide => slide.classList.contains('active'));
            active_image = active_image.querySelector("img")
            if (tracking){
                const rect = active_image.getBoundingClientRect()  // Actualizar parámetros de la imagen colocada
                const x = event.clientX - rect.left         // Actualizar coordenadas

                if (start_x + 20 < x){                      // Si se han movido 20 píxeles a la derecha
                    start_x = x                             // Cambiar posición inicial
                    image_index -= 1                              // Decrementar puntero de imágenes
                    if(image_index <= -1){                        // Si es puntero indica un número menor al inicio colocar al final
                        image_index = image_array.length - 1
                    }
                    selected_image = image_array[image_index]     // Seleccionar y mostrar la imagen
                    active_image.src = active_image.src.replace(/[^/]+$/, selected_image)
                }

                if (start_x - 20 > x){                      // Si se han movido 20 píxeles a la izquierda
                    start_x = x                             // Cambiar posición inicial
                    image_index += 1                              // Incrementar puntero de imágenes
                    if(image_index >= image_array.length){        // Si se sobrepasa el número de imágenes retornar al inicio
                        image_index = 0
                    }
                    selected_image = image_array[image_index]     // Seleccionar y mostrar la imagen
                    active_image.src = active_image.src.replace(/[^/]+$/, selected_image)
                }
            }
        })
    })
    document.addEventListener("mouseup", () => {        // Evento de soldar el ratón
        tracking = false                                // Dejar de rastrear el ratón
    })

    document.addEventListener("dragstart", (event) => {    // Para evitar arrastrar la imagen
        event.preventDefault();                         // Hace más fácil hacer la animación
    });
});

