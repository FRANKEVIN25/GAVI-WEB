document.addEventListener('DOMContentLoaded', function() {
    // Variables para rotación de imágenes
    image_index = 0                                             // Posición de la imagen
    tracking = false                                            // Activar la rotación
    const image_array = ["1.png", "2.png", "3.png", "4.png",    // Nombres de los archivos del modelo
                         "5.png", "6.png", "7.png", "8.png",
                         "9.png", "10.png", "11.png", "12.png",]

    // Obtener todas las diapositivas de vehículos
    const slides = document.querySelectorAll('.vehicle-slide');
    const slideContainer = document.getElementById('vehicle-showcase');
    let currentSlideIndex = 0;

    let slideInterval = setInterval(showNextSlide, 5000);       // Intervalo de cambio automático de diapositivas

    createSlideControls();                                      // Crear los controles de diapositiva

    // ##########

    function showNextSlide() {                                  // Mostrar siguiente diapositiva
        showSlide((currentSlideIndex + 1) % slides.length);
    }

    function showPrevSlide() {                                  // Mostrar diapositiva anterior
        showSlide((currentSlideIndex - 1 + slides.length) % slides.length);
    }

    function showSlide(index) {                                 // Mostrar una diapositiva específica
        // Ocultar la diapositiva actual
        slides[currentSlideIndex].classList.remove('active');
        document.querySelector(`.slide-dot:nth-child(${currentSlideIndex + 1})`).classList.remove('active');

        // Actualizar el índice actual
        currentSlideIndex = index;

        // Mostrar la nueva diapositiva
        slides[currentSlideIndex].classList.add('active');
        document.querySelector(`.slide-dot:nth-child(${currentSlideIndex + 1})`).classList.add('active');

        // Actualizar la imagen activa para la rotación
        active_image = Array.from(slides).find(slide => slide.classList.contains('active'));
        active_image = active_image.querySelector("img")
        active_image.src = active_image.src.replace(/[^/]+$/, image_array[image_index])
    }

    function createSlideControls() {                            // Crear controles de navegación (puntos y flechas)
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slide-controls';             // Crear el contenedor de los puntos de selección

        slides.forEach((_, index) => {                          // Crear los puntos de selección para cada diapositiva
            const dot = document.createElement('div');
            dot.className = 'slide-dot';
            if (index === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {               // Añadir disparador para cambiar de diapositiva
                showSlide(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);                     // Añadir punto al contenedor de puntos
        });

        const prevArrow = document.createElement('div');        // Crear flecha de navegación
        prevArrow.className = 'slide-arrow prev';
        prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevArrow.addEventListener('click', () => {
            showPrevSlide();
            resetInterval();
        });
        
        const nextArrow = document.createElement('div');        // Crear flecha de navegación
        nextArrow.className = 'slide-arrow next';
        nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextArrow.addEventListener('click', () => {
            showNextSlide();
            resetInterval();
        });

        slideContainer.appendChild(dotsContainer);              // Añadir elementos al contenedor
        slideContainer.appendChild(prevArrow);
        slideContainer.appendChild(nextArrow);
    }

    function resetInterval() {                                  // Reiniciar intervalo
        clearInterval(slideInterval);
        slideInterval = setInterval(showNextSlide, 5000);
    }

    slideContainer.addEventListener('mouseenter', function() {  // Pausar rotación al pasar el ratón por encima
        clearInterval(slideInterval);
    });

    slideContainer.addEventListener('mouseleave', function() {  // Reanudar rotación al pasar fuera del contenedor
        resetInterval();
    });

    // ########## ROTACIÓN DE IMÁGENES CON ACCIÓN DEL RATÓN ##########

    document.addEventListener("mousedown", (event) => {         // Evento de presionar el ratón
        active_image = Array.from(slides).find(slide => slide.classList.contains('active'));
        active_image = active_image.querySelector("img")        // Actualizar la variable de la imagen activa
        const rect = active_image.getBoundingClientRect()       // Obtener parámetros de la imagen colocada
        start_x = event.clientX - rect.left                     // Obtener una coordenada inicial X
        tracking = true                                         // Seguir rastreando la posición del ratón

        active_image.addEventListener("mousemove", (event) => { // Evento de mover el ratón
            active_image = Array.from(slides).find(slide => slide.classList.contains('active'));
            active_image = active_image.querySelector("img")    // Actualizar la variable de la iamgen activa
            if (tracking){
                const rect = active_image.getBoundingClientRect()
                const x = event.clientX - rect.left             // Actualizar coordenada X

                if (start_x + 20 < x){                          // Si se han movido 20 píxeles a la derecha
                    start_x = x                                 // Cambiar posición inicial
                    image_index -= 1                            // Decrementar puntero y actualizar imagen
                    if(image_index <= -1) image_index = image_array.length - 1
                    active_image.src = active_image.src.replace(/[^/]+$/, image_array[image_index])
                }

                if (start_x - 20 > x){                          // Si se han movido 20 píxeles a la izquierda
                    start_x = x                                 // Cambiar posición inicial
                    image_index += 1                            // Incrementar puntero y actualizar imagen
                    if(image_index >= image_array.length) image_index = 0
                    active_image.src = active_image.src.replace(/[^/]+$/, image_array[image_index])
                }
            }
        })
    })

    document.addEventListener("mouseup", () => {        // Evento de soltar el ratón
        tracking = false                                // Dejar de rastrear el ratón
    })

    document.addEventListener("dragstart", (event) => { // Para evitar arrastrar la imagen
        event.preventDefault();                         // para una animación ininterrumpida
    });
});