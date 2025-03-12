car_models = ["C35_Crew_Van_2012", "Fengguang_580_2019",
              "Fengxing_S560_2021", "Forthing_T5_2022",
              "Forthing_T5_EVO_2024"]

const car_brands = [["DFSK", "GLORY C35 - C37"],
                    ["FENGGUANG", "580 2019"],
                    ["FENGXING", "S560 2021"],
                    ["FORTHING", "T5 2022"],
                    ["FORTHING", "T5EVO 2024"]]


document.addEventListener('DOMContentLoaded', function() {
    // Obtener todas las diapositivas de vehículos
    const slides = document.querySelectorAll('.vehicle-slide');
    const slideContainer = document.getElementById('vehicle-showcase');
    let currentSlideIndex = 0;

    const current_image = document.getElementById("track_it")
    
    // Crear controles de navegación
    createSlideControls();
    
    // Función para mostrar la siguiente diapositiva
    function showNextSlide() {
        showSlide((currentSlideIndex + 1) % car_models.length);
    }
    
    // Función para mostrar la diapositiva anterior
    function showPrevSlide() {
        showSlide((currentSlideIndex - 1 + car_models.length) % car_models.length);
    }
    
    // Función para mostrar una diapositiva específica
    function showSlide(index) {
        // Transición del botón
        document.querySelector(`.slide-dot:nth-child(${currentSlideIndex + 1})`).classList.remove('active');

        // Índice interno: Ángulo del carro
        internal_index = current_image.getAttribute("data-name2")

        // Índice de vehículo: Modelo del carro
        currentSlideIndex = index;

        // Cambiar el índice interno
        current_image.setAttribute("data-name", car_models[index])

        // Cambiar la fuente de la imagen
        current_image.src = "car_images/"+car_models[index]+"/"+internal_index+".png"

        // Salida de consola DEBUG
        console.log("Modelo: " + current_image.getAttribute("data-name") + "  Índice: " +index)

        // Actualizar descripción del vehículo
        const marca = document.getElementById("marca")
        const modelo = document.getElementById("modelo")
        marca.textContent = car_brands[index][0]
        modelo.textContent = car_brands[index][1]

        // Transición del botón
        document.querySelector(`.slide-dot:nth-child(${currentSlideIndex + 1})`).classList.add('active');

    }
    
    // Crear controles de navegación (puntos y flechas)
    function createSlideControls() {
        // Crear contenedor de puntos
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slide-controls';
        
        const NUM_DOTS = car_models.length; // Número constante de puntos

        for (let i = 0; i < NUM_DOTS; i++) {
            const dot = document.createElement('div');
            dot.className = 'slide-dot';
            if (i === 0) dot.classList.add('active');

            // Evento para cambiar a la diapositiva correspondiente al punto
            dot.addEventListener('click', () => {
                showSlide(i);
                resetInterval();
            });

            dotsContainer.appendChild(dot);
        }

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
});