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
        
        // If valid, show success message (in a real app, you would send data to a server)
        if (isValid) {
            $(this).trigger('reset');
            $('#form-message-success').removeClass('d-none');
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                $('#form-message-success').addClass('d-none');
            }, 5000);
        }
    });
    
    // Email validation helper function
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Dark/Light theme toggle
    $('#theme-toggle').click(function(e) {
        e.preventDefault();
        $('body').toggleClass('dark-mode');
        
        const icon = $(this).find('i');
        if (icon.hasClass('fa-moon')) {
            icon.removeClass('fa-moon').addClass('fa-sun');
        } else {
            icon.removeClass('fa-sun').addClass('fa-moon');
        }
        
        // Store preference in localStorage
        const isDarkMode = $('body').hasClass('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
        $('body').addClass('dark-mode');
        $('#theme-toggle').find('i').removeClass('fa-moon').addClass('fa-sun');
    }
    
    // Add small icon to external links
});