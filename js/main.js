$(document).ready(function() {
    "use strict";

    // AOS Animations Initialization
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Year for Footer Copyright
    $('#currentYear').text(new Date().getFullYear());

    // Smooth scrolling for all anchor links
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 800);
            }
        }
    });

    // Navbar behavior on scroll
    $(window).scroll(function() {
        const scrollPosition = $(this).scrollTop();
        
        // Navbar shrink effect
        if (scrollPosition > 100) {
            $('#mainNav').addClass('navbar-shrink');
        } else {
            $('#mainNav').removeClass('navbar-shrink');
        }
        
        // Back to top button visibility
        if (scrollPosition > 300) {
            $('.back-to-top').addClass('active');
        } else {
            $('.back-to-top').removeClass('active');
        }
    });
    
    // Mobile menu behavior
    $('.navbar-toggler').click(function() {
        if(!$('#mainNav').hasClass('navbar-shrink')) {
            $('#mainNav').addClass('navbar-shrink');
        }
    });
    
    // Close mobile menu on link click
    $('.navbar-nav .nav-link').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Project filtering
    $('.filter-btn').click(function() {
        const value = $(this).attr('data-filter');
        
        // Add/remove active class
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        if (value === 'all') {
            $('.project-item').show('500');
        } else {
            $('.project-item').not(`[data-category="${value}"]`).hide('500');
            $(`.project-item[data-category="${value}"]`).show('500');
        }
    });

    // Form validation
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Clear previous validation state
        $(this).find('.is-invalid').removeClass('is-invalid');
        $(this).find('.invalid-feedback').empty();
        
        // Get form values
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const subject = $('#subject').val().trim();
        const message = $('#message').val().trim();
        
        // Basic validation
        let isValid = true;
        
        if (name === '') {
            $('#name').addClass('is-invalid');
            $('#name').siblings('.invalid-feedback').text('Por favor ingrese su nombre');
            isValid = false;
        }
        
        if (email === '') {
            $('#email').addClass('is-invalid');
            $('#email').siblings('.invalid-feedback').text('Por favor ingrese su email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            $('#email').addClass('is-invalid');
            $('#email').siblings('.invalid-feedback').text('Por favor ingrese un email válido');
            isValid = false;
        }
        
        if (subject === '') {
            $('#subject').addClass('is-invalid');
            $('#subject').siblings('.invalid-feedback').text('Por favor ingrese un asunto');
            isValid = false;
        }
        
        if (message === '') {
            $('#message').addClass('is-invalid');
            $('#message').siblings('.invalid-feedback').text('Por favor ingrese un mensaje');
            isValid = false;
        }
        
        // If valid, send data to Formspree via AJAX
        if (isValid) {
            const form = $(this);
            const submitButton = $('#submitButton');
            const originalText = submitButton.text();
            
            submitButton.text('Enviando...').prop('disabled', true);
            
            $.ajax({
                url: form.attr('action'),
                method: form.attr('method'),
                data: form.serialize(),
                dataType: 'json',
                success: function(response) {
                    // Éxito - el usuario NO ve nada de Formspree
                    form.trigger('reset');
                    $('#form-message-success').removeClass('d-none alert-danger').addClass('alert-success').text('¡Mensaje enviado con éxito! Te responderé pronto.');
                    
                    setTimeout(function() {
                        $('#form-message-success').addClass('d-none');
                    }, 5000);
                },
                error: function(xhr, status, error) {
                    // Formspree devuelve status 200 pero sin JSON cuando funciona
                    // Esto es normal y significa que SÍ se envió
                    if (xhr.status === 200 || xhr.status === 0) {
                        form.trigger('reset');
                        $('#form-message-success').removeClass('d-none alert-danger').addClass('alert-success').text('¡Mensaje enviado con éxito! Te responderé pronto.');
                        
                        setTimeout(function() {
                            $('#form-message-success').addClass('d-none');
                        }, 5000);
                    } else {
                        // Error real
                        $('#form-message-success').removeClass('d-none alert-success').addClass('alert-danger').text('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
                    }
                },
                complete: function() {
                    submitButton.text(originalText).prop('disabled', false);
                }
            });
        }
    });
    
    // Email validation helper function
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

});