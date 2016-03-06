(function() {

    // Init global DOM elements, functions and arrays
    window.app = {
        el: {},
        fn: {}
    };
    app.el['window'] = $(window);
    app.el['document'] = $(document);
    app.el['back-to-top'] = $('.back-to-top');
    app.el['html-body'] = $('html,body');
    app.el['loader'] = $('#loader');
    app.el['mask'] = $('#mask');

    app.fn.screenSize = function() {
        var size, width = app.el['window'].width();
        if (width < 320)
            size = "Not supported";
        else if (width < 480)
            size = "Mobile portrait";
        else if (width < 768)
            size = "Mobile landscape";
        else if (width < 960)
            size = "Tablet";
        else
            size = "Desktop";
        if (width < 768) {
            $('.animated').removeClass('animated').removeClass('hiding');
        }
        // $('#screen').html( size + ' - ' + width );
        // console.log( size, width );
    };



    $(function() {
        //Preloader
        app.el['loader'].delay(700).fadeOut();
        app.el['mask'].delay(1200).fadeOut("slow");

        // Resized based on screen size
        app.el['window'].resize(function() {
            app.fn.screenSize();
        });

        // fade in .back-to-top
        $(window).scroll(function() {
            if ($(this).scrollTop() > 500) {
                app.el['back-to-top'].fadeIn();
            } else {
                app.el['back-to-top'].fadeOut();
            }
        });

        // scroll body to 0px on click
        app.el['back-to-top'].click(function() {
            app.el['html-body'].animate({
                scrollTop: 0
            }, 1500);
            return false;
        });

        $('#mobileheader').html($('#header').html());

        function heroInit() {

            //alert(jQuery(window).height());

            var hero = jQuery('#hero'),
                winHeight = jQuery(window).height(),
                heroHeight = winHeight;

            if (!hero.hasClass('ignore')) {
                hero.css({
                    height: heroHeight + "px"
                });
            }
        };

        jQuery(window).on("resize", heroInit);
        jQuery(document).on("ready", heroInit);

        $('.navigation-bar').onePageNav({
            currentClass: 'active',
            changeHash: true,
            scrollSpeed: 750,
            scrollThreshold: 0.5,
            easing: 'swing'
        });

        $('.animated').appear(function() {
            var element = $(this);
            var animation = element.data('animation');
            var animationDelay = element.data('delay');
            if (animationDelay) {
                setTimeout(function() {
                    element.addClass(animation + " visible");
                    element.removeClass('hiding');
                    if (element.hasClass('counter')) {
                        element.find('.value').countTo();
                    }
                }, animationDelay);
            } else {
                element.addClass(animation + " visible");
                element.removeClass('hiding');
                if (element.hasClass('counter')) {
                    element.find('.value').countTo();
                }
            }
        }, {
            accY: -150
        });

        $('#header').waypoint('sticky', {
            wrapper: '<div class="sticky-wrapper" />',
            stuckClass: 'sticky'
        });

        //$('.fancybox').fancybox();

        //
        //  Newsletter Signup
        //

        var $subscribe = $('#subscribe'),
            $response = $('#response'),
            $newsletterEmail = $('#NewsletterEmail'),
            $csrfToken = $('#csrfToken');

        $subscribe.on('submit', function(event) {
            event.preventDefault();

            var payload = {
                email: $newsletterEmail.val(),
                _csrf: $csrfToken.val()
            };

            // console.log(payload);

            // update user interface
            $response.html('<span class="notice_message">Adding email address...</span>');

            // Prepare query string and send AJAX request
            $.ajax({
                url: '/api/notify/join',
                type: 'POST',
                data: payload,
                success: function(data, textStatus, jqXHR) {

                    // show message
                    $response.html('<span class="success_message">' + data.message + '</span>');

                    // clear field
                    $newsletterEmail.val('');

                },
                error: function(jqXHR, textStatus, errorThrown) {

                    //console.log(jqXHR, textStatus, errorThrown);

                    $response.html('<span class="error_message">User already subscribed</span>');

                    /*
                    if (jqXHR.responseJSON) {

                        if (jQuery.isArray(jqXHR.responseJSON)) {
                            // output messages
                            $response.html('<span class="error_message">' + jQuery.map(jqXHR.responseJSON, function (v) {
                                return v.msg;
                            }).join(', ') + '</span>');
                        } else {

                             $response.html('<span class="error_message">' + jqXHR.responseJSON.error + '</span>');

                        }

                    } else if (jqXHR.responseText) {

                        $response.html('<span class="error_message">' + jqXHR.responseText + '</span>');

                    } 
                    */
                }
            });

            return false;
        });

        var votedVal = $.cookie('voted'),
            votedIds = [];

        if (votedVal) {
            votedIds = votedVal.split(',');
        }

        $.each(votedIds, function (i, id) {

            if (id) {
                $('#vote-' + id).hide();
                $('#voted-' + id).show();
            }
            
        });

        $('form[data-vote]').on('submit', function (event) {
            event.preventDefault();

            var self = this,
                payload = {
                sessionId: $(this).find('input[name="id"]').val(),
                vote: $(this).find('select[name="vote"]').val(),
                _csrf: $csrfToken.val()
            };

            if (payload.sessionId && payload.vote) {

                $(this).find('[data-vote-button]').prop('disabled', true);

                $.ajax('/voting/vote/', {
                    method: 'POST',
                    data: payload,
                    dataType: 'text',
                    success: function () {

                        var votedVal = $.cookie('voted'),
                            votedIds = [];

                        if (votedVal) {
                            votedIds = votedVal.split(',');
                        }

                        votedIds.push(payload.sessionId);

                        $.cookie('voted', votedIds.join(','), {
                            expires: 365,
                            path: '/'
                        });

                        // hide the form
                        $(self).hide();
                        $('#voted-' + payload.sessionId).show();

                    },
                    error: function () {
                        $(self).find('[data-vote-button]').prop('disabled', false);
                    }
                });

            } else {
                alert('Please choose a score');
            }

        });

        initializeCarousel();

    });

    function initializeCarousel(){
        var owl = $("#speakers-carousel");
 
        owl.owlCarousel({
            items : 4, //4 items above 1280px browser width
            itemsDesktop : [1279,4], //5 items between 1279px and 960px
            itemsDesktopSmall : [959,3], // betweem 959px and 768px
            itemsTablet: [767,2], //2 items between 600 and 0
            itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
        });
       
        // Custom Navigation Events
        $(".carousel-next").click(function(){
          owl.trigger('owl.next');
        })
        $(".carousel-prev").click(function(){
          owl.trigger('owl.prev');
        })
    };

    // ****** GOOGLE MAP *******
    var map;
    var brooklyn = new google.maps.LatLng(45.518383, 9.213452);

    var MY_MAPTYPE_ID = 'custom_style';

    function initialize() {

        var featureOpts = [{
            stylers: [{
                saturation: -20
            }, {
                lightness: 40
            }, {
                visibility: 'simplified'
            }, {
                gamma: 0.8
            }, {
                weight: 0.4
            }]
        }, {
            elementType: 'labels',
            stylers: [{
                visibility: 'on'
            }]
        }, {
            featureType: 'water',
            stylers: [{
                color: '#dee8ff'
            }]
        }];

        var mapOptions = {
            zoom: 14,
            scrollwheel: false,
            panControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            center: new google.maps.LatLng(45.513699, 9.210525),
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
            },
            mapTypeId: MY_MAPTYPE_ID
        };

        map = new google.maps.Map(document.getElementById('canvas-map'), mapOptions);
        var image = 'images/pmarker.png';
        var myLatLng = new google.maps.LatLng(45.513699, 9.210525);
        var beachMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
        });
        var styledMapOptions = {
            name: 'Custom Style'
        };

        var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

        map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
    }

    google.maps.event.addDomListener(window, 'load', initialize);

})();

function formatDate(data) {
    alert(data);
}
