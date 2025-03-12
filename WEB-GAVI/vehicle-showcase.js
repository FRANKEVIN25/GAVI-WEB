document.addEventListener('DOMContentLoaded', function() {
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
});