var howtoscroll = 0;
var changedcontent = false;
var bootlimit = 767;
var memoldid = "";
var wall;

function plinkClick()
{

    var pageurl = $(this).attr('data-href');
    if (pageurl != window.location) {
        window.history.pushState({path: pageurl}, '', pageurl);
    }

    var text = "";
    var v;

    var element = ($(window).width() > bootlimit) ? $(this).attr("data-id") : $(this).attr("data-small");

    if ($(".desc-container").length != 0)
    {
        if ($(".desc-container").attr("id") != element)
        {
            if ($(".details-container").length > 0)
            {
                $("#" + memoldid).find(".details-container").stop().animate({opacity: 0}, 0, function ()
                {
                    $("#" + memoldid).find(".details-container").hide();
                    $("#" + memoldid).find(".finiture-container").hide();
                    $(".desc-container").stop().animate({
                        height: 0

                    }, 0, function () {
                        $(".desc-container").remove();
                    });


                });
            }
            else
            {
                $("#" + memoldid).find(".finiture-container").animate({opacity: 0}, 0, function ()
                {
                    $("#" + memoldid).find(".finiture-container").hide();

                    $(".desc-container").animate({
                        height: 0

                    }, 0, function () {
                        $(".desc-container").remove();
                    });

                    /*$(".desc-container").removeClass("add-height");
                     
                     $("#" + memoldid).find(".finiture-container").css("display", "none");
                     $(".desc-container").remove();*/

                });
            }


        }
    }


    if ($(".desc-container").attr("data-name") == $(this).attr("data-class"))
    {
        //$(".desc-container").removeClass("add-height");
        //alert($(".details-container").length);

        if ($(".details-container").length > 0)
        {
            $("#" + memoldid).find(".details-container").stop().animate({opacity: 0}, 100, function ()
            {
                $("#" + memoldid).find(".details-container").hide();
                $("#" + memoldid).find(".finiture-container").hide();
                $(".desc-container").stop().animate({
                    height: 0

                }, 200, function () {
                    $(".desc-container").remove();
                });

            });
        }
        else
        {
            $("#" + memoldid).find(".finiture-container").stop().animate({opacity: 0}, 100, function ()
            {
                $("#" + memoldid).find(".finiture-container").hide();
                $(".desc-container").stop().animate({
                    height: 0

                }, 200, function () {
                    $(".desc-container").remove();
                });


            });
        }
        changedcontent = false;
        return;
    }

    memoldid = element;
    setHtml($(this));
    //goeffect($(this));

}

function setHtml(se)
{

    if ($(window).width() > bootlimit)
    {
        if ($(".desc-container").attr("data-name", se.attr("data-class")).length == 0)
        {
            v = se.attr("data-id").split("-");
            text = '<div class="desc-container" id="' + se.attr("data-id") + '" data-name="' + se.attr("data-class") + '">';
            text += '<div class="finiture-container text-center">';

            text += '</div>';
            text += '</div>';
            $("#" + v[0]).append(text);

            $(".desc-container").width($(".container").width());
            $(".desc-container").attr("data-name", se.attr("data-class"));
        }

    }
    else
    {
        v = se.attr("data-small").split("-");
        text = '<div class="desc-container" id="' + se.attr("data-small") + '" data-name="' + se.attr("data-class") + '">';
        text += '<div class="finiture-container text-center">';

        text += '</div>';
        text += '</div>';
        se.append(text);

        $(".desc-container").width($(".container").width());
        $(".desc-container").attr("data-name", se.attr("data-class"));


    }
    goeffect(se);
    //return;

//            $.ajax({
//                url: "finiture.html",
//                dataType: "html",
//                success: function (data, stato)
//                {
//
//                    v = se.attr("data-id").split("-");
//                    text = '<div class="desc-container" id="' + se.attr("data-id") + '" data-name="' + se.attr("data-class") + '">';
//                    text += '<div class="finiture-container text-center">';
//                    if ($("#" + v[0]).find(".desc-container").length == 0)
//                    {
//                        text += data;
//                        text += '</div>';
//                        text += '</div>';
//                        $("#" + v[0]).append(text);
//                    }
//                    else
//                    {
//                        if ($(".desc-container").length > 1 && !changedcontent)
//                        {
//                            $(".desc-container").remove();
//                            text += data;
//                            text += '</div>';
//                            text += '</div>';
//                            $("#" + v[0]).append(text);
//                        }
//                        else
//                        {
//                            changedcontent = true;
//                            changeOnlyContent(se);
//                            $(".desc-container").width($(".container").width());
//                            $(".desc-container").attr("data-name", se.attr("data-class"));
//                            return;
//                        }
//                    }
//
//                    $('.finiture-container').on('click', '.detail', function () {
//                        finalDetail($(this));
//                    });
//
//                    $(".desc-container").width($(".container").width());
//                    $(".desc-container").attr("data-name", se.attr("data-class"));
//
//                    goeffect(se);
//                },
//                error: function (richiesta, stato, errori) {
//                    alert("E' evvenuto un errore. Lo stato della chiamata: " + stato);
//                }
//            });
    //}


    /*if ($(window).width() > bootlimit)
     {
     // aggiunta del contenuto dinamico 
     text = '<div class="desc-container" id="' + se.attr("data-id") + '" data-name="' + se.attr("data-class") + '">';
     text += '<div class="finiture-container text-center">';
     text += '<h3>Lorem ipsum magistrtir dei congiureg Lorem ipsum magistrtir dei congiureg Lorem ipsum magistrtir dei congiureg Lorem ipsum magistrtir dei congiureg</h3>';
     text += '<div class="row">';
     for (var f = 0; f < 16; f++)
     {
     text += '<div class="col-sm-3 detail padding-3px">';
     text += '<img src="gb/images/prodotti/textures/t2.jpg" class="img-responsive"/>';
     text += '</div>';
     }
     text += '</div>';
     text += '</div>';
     text += '</div>';
     
     
     v = se.attr("data-id").split("-");
     if ($("#" + v[0]).find(".desc-container").length == 0)
     {
     $("#" + v[0]).append(text);
     }
     else
     {
     if ($(".desc-container").length > 1 && !changedcontent)
     {
     $(".desc-container").remove();
     $("#" + v[0]).append(text);
     }
     else
     {
     changedcontent = true;
     changeOnlyContent(se);
     $(".desc-container").width($(".container").width());
     $(".desc-container").attr("data-name", se.attr("data-class"));
     return;
     }
     }
     
     $('.finiture-container').on('click', '.detail', function () {
     finalDetail($(this));
     });
     
     }
     else
     {
     // aggiunta del contenuto dinamico 
     text = '<div class="desc-container" id="' + se.attr("data-small") + '" data-name="' + se.attr("data-class") + '">';
     text += '<div class="finiture-container">';
     text += '<h3>Lorem ipsum magistrtir dei congiureg Lorem ipsum magistrtir dei congiureg Lorem ipsum magistrtir dei congiureg Lorem ipsum magistrtir dei congiureg</h3>';
     text += '<div clas="container">';
     text += '<div class="row">';
     for (var f = 0; f < 4; f++)
     {
     text += '<div class="col-xs-6 detail">';
     text += '<img src="gb/images/prodotti/textures/t2.jpg" class="img-responsive"/>';
     text += '</div>';
     }
     text += '</div>';
     text += '</div>';
     text += '</div>';
     text += '</div>';
     
     if ($(".desc-container").length > 1)
     {
     
     $(".finiture-container").stop().animate({opacity: 0}, 0, function ()
     {
     $(this).hide();
     
     $(".desc-container").stop().animate({
     height: 0
     
     }, 0, function () {
     $(".desc-container").remove();
     });
     });
     
     $('.finiture-container').on('click', '.detail', function () {
     finalDetail($(this));
     });
     //$(".desc-container").removeClass("add-height");
     //$(".desc-container").remove();
     //$(".finiture-container").css("display", "none");
     
     se.append(text);
     }
     else
     se.append(text);
     
     }*/

}

function goeffect(se)
{

    if ($(window).width() > bootlimit)
    {
        if ($("#" + se.attr("data-id")).height() != 0)
        {
            changedcontent = true;
            changeOnlyContent(se);
            $(".desc-container").width($(".container").width());
            $(".desc-container").attr("data-name", se.attr("data-class"));
            return;
        }
        $("#" + se.attr("data-id")).stop().animate({
            height: 1100

        }, 300, function () {

            $(this).on('mouseover', function () {
                $(".plink").unbind("click", plinkClick);
            });

            $(this).on('mouseout', function () {
                $(".plink").bind("click", plinkClick);
            });

            $.ajax({
                url: se.attr("data-href"),
                //url: "finiture.html",
                dataType: "html",
                success: function (data, stato)
                {

                    $("#" + se.attr("data-id")).find(".finiture-container").append(data);
                    $("#" + se.attr("data-id")).find(".finiture-container").show().stop().animate({opacity: 1}, 300);

                    $('.finiture-container').on('click', '.detail', function () {
                        finalDetail($(this));
                    });

                },
                error: function (richiesta, stato, errori) {
                    alert("E' evvenuto un errore. Lo stato della chiamata: " + stato);
                }
            });

        });
    }
    else
    {
        $("#" + se.attr("data-small")).stop().animate({
            height: 1200

        }, 300, function () {

            $(this).on('mouseover', function () {
                $(".plink").unbind("click", plinkClick);
            });

            $(this).on('mouseout', function () {
                $(".plink").bind("click", plinkClick);
            });

            //$("#" + se.attr("data-small")).find(".finiture-container").show().stop().animate({opacity: 1}, 300);
            $.ajax({
                url: se.attr("data-href"),
                //url: "finiture.html",
                dataType: "html",
                success: function (data, stato)
                {

                    $("#" + se.attr("data-small")).find(".finiture-container").append(data);
                    $("#" + se.attr("data-small")).find(".finiture-container").show().stop().animate({opacity: 1}, 300);

                    $('.finiture-container').on('click', '.detail', function () {

                        finalDetail($(this));
                    });

                },
                error: function (richiesta, stato, errori) {
                    alert("E' evvenuto un errore. Lo stato della chiamata: " + stato);
                }
            });

        });

    }

    if ($(window).scrollTop() > se.offset().top)
    {
        $(window).scrollTop(se.offset().top + 120)
        $("html, body").animate({scrollTop: (se.offset().top - howtoscroll) + "px"});
    }
    else
    {
        $("html, body").animate({scrollTop: (se.offset().top - howtoscroll) + "px"});
    }

}

function changeOnlyContent(se)
{

    if ($(".desc-container").attr("data-name") == se.attr("data-class"))
        changedcontent = true;


    if ($(".details-container").length > 0)
    {
        $("#" + se.attr("data-id")).find(".details-container").animate({opacity: 0}, 300, function () {

            /* cambio il contenuto */
            $(this).hide();
            $(this).remove();

            $(".finiture-container").empty();

            var pageurl = se.attr('data-href');
            if (pageurl != window.location) {
                window.history.pushState({path: pageurl}, '', pageurl);
            }

            $.ajax({
                url: se.attr("data-href"),
                //url: "finiture.html",
                dataType: "html",
                success: function (data, stato)
                {
                    $("#" + se.attr("data-id")).find(".finiture-container").css("left", "0px");
                    $("#" + se.attr("data-id")).find(".finiture-container").append(data);
                    $("#" + se.attr("data-id")).find(".finiture-container").show().animate({opacity: 1}, 300, function () {

                        $('.finiture-container').on('click', '.detail', function () {
                            finalDetail($(this));
                        });
                    });
                },
                error: function (richiesta, stato, errori) {
                    alert("E' evvenuto un errore. Lo stato della chiamata: " + stato);
                }
            });

            /*text = '<h3>Lorem ipsum magistrtir dei congiureg Lorem ipsum magistrtir dei congiureg Lorem ipsum magistrtir dei congiureg Lorem ipsum magistrtir dei congiureg</h3>';
             text += '<div clas="container">';
             text += '<div class="row">';
             for (var f = 0; f < 16; f++)
             {
             text += '<div class="col-sm-3 detail padding-3px">';
             text += '<img src="gb/images/prodotti/textures/t2.jpg" class="img-responsive"/>';
             text += '</div>';
             }
             text += '</div>';
             text += '</div>';*/


            /*$("#" + se.attr("data-id")).find(".finiture-container").css("left", "0px");
             $("#" + se.attr("data-id")).find(".finiture-container").append(text);
             $("#" + se.attr("data-id")).find(".finiture-container").show().animate({opacity: 1}, 300, function () {
             
             $('.finiture-container').on('click', '.detail', function () {
             finalDetail($(this));
             });
             });*/

        });
    }
    else
    {
        $("#" + se.attr("data-id")).find(".finiture-container").animate({opacity: 0}, 300, function () {

            /* cambio il contenuto */
            $(".finiture-container").empty();
            $.ajax({
                url: se.attr("data-href"),
                //url: "finiture.html",
                dataType: "html",
                success: function (data, stato)
                {
                    $("#" + se.attr("data-id")).find(".finiture-container").css("left", "0px");
                    $("#" + se.attr("data-id")).find(".finiture-container").append(data);
                    $("#" + se.attr("data-id")).find(".finiture-container").animate({opacity: 1}, 300, function () {

                    });
                },
                error: function (richiesta, stato, errori) {
                    alert("E' evvenuto un errore. Lo stato della chiamata: " + stato);
                }
            });



            /*$(".finiture-container").empty();
             
             
             text = '<h3>Lorem ipsum magistrtir dei congiureg Lorem ipsum magistrtir dei congiureg Lorem ipsum magistrtir dei congiureg Lorem ipsum magistrtir dei congiureg</h3>';
             text += '<div class="row">';
             for (var f = 0; f < 16; f++)
             {
             text += '<div class="col-sm-3 detail padding-3px">';
             text += '<img src="gb/images/prodotti/textures/t2.jpg" class="img-responsive"/>';
             text += '</div>';
             }
             text += '</div>';
             $("#" + se.attr("data-id")).find(".finiture-container").css("left", "0px");
             $("#" + se.attr("data-id")).find(".finiture-container").append(text);
             $("#" + se.attr("data-id")).find(".finiture-container").animate({opacity: 1}, 300, function () {
             
             $('.finiture-container').on('click', '.detail', function () {
             finalDetail($(this));
             });
             });*/

        });
    }




}

/* function remove pannello dettaglio*/
function removeDetailPanel()
{

}

/* dettagli delle finiture */
function finalDetail(se)
{
    var pageurl = se.attr('data-href');
    if (pageurl != window.location) {
        window.history.pushState({path: pageurl}, '', pageurl);
    }
    //if(se.attr("id") == 1)
    //alert(se.attr("id"));

    $('.finiture-container').stop().animate({
        left: -500,
        opacity: 0

    }, 200, function () {

        $(this).hide();
        $(this).remove();

        $.ajax({
            url: se.attr("data-href"),
            //url: "dettaglio.html",
            dataType: "html",
            success: function (data, stato)
            {
                text = '<div class="details-container">';
                text += data;
                text += '</div>';

                $(".desc-container").append(text);
                $(".details-container").css("opacity", "0");
                $(".details-container").css("right", "-500px");

                $('.details-container').stop().animate({
                    right: 0,
                    opacity: 1

                }, 300);

                $('.details-container').on('click', '#closer-panel', function () {
                    closePanel($(this));
                });

            },
            error: function (richiesta, stato, errori) {
                alert("E' evvenuto un errore. Il stato della chiamata: " + stato);
            }

        });

        /*text += '<div clas="container">';
         text += '<div class="row">';
         
         text += '<div class="col-sm-6">';
         text += '<h1 class="left text-left">texture</h1>';
         text += '</div>';
         text += '<div class="col-sm-6">';
         text += '<h5 class="right text-right" id="closer-panel">CLOSER</h5>';
         text += '</div>';
         
         
         text += '<div class="col-sm-12">';
         text += '<img src="gb/images/prodotti/details/e.jpg" class="img-responsive"/>';
         text += '</div>';
         text += '</div>';
         
         text += "<h4>Download Hi Resolution Images</h4>";
         
         text += '<div class="row" style="border-top: 1px #ccc solid; border-bottom: 1px #ccc solid; padding-top: 20px;">';
         text += '<div class="col-sm-6">';
         text += '<img src="gb/images/prodotti/details/e1.jpg" class="img-responsive"/>';
         text += '<h4>GLT 23A next utopia (1.4 mb)</h4>';
         text += '</div>';
         text += '<div class="col-sm-6">';
         text += '<img src="gb/images/prodotti/details/e1.jpg" class="img-responsive"/>';
         text += '<h4>GLT 23A next utopia (1.4 mb)</h4>';
         text += '</div>';
         text += '</div>';
         
         text += '<div class="row" style="margin-top: 10px;">';
         text += '<div class="col-sm-6">';
         text += '<h5 class="left text-left">Product data sheet</h5>';
         text += '</div>';
         text += '<div class="col-sm-6">';
         text += '<h5 class="right text-right">Next-utopia.pdf</h5>';
         text += '</div>';
         text += '<div class="col-sm-12" style="padding: 10px;">';
         text += '<h5 class="text-center">Per poter scaricare le immagini in alta risluzione devi essere registrato a Glamora.it</h5>';
         text += '</div>';
         
         
         text += '</div>';
         
         text += '</div>';
         text += '</div>';*/




    });


}

function closePanel(se)
{
    $('.details-container').stop().animate({
        right: -500,
        opacity: 0

    }, 200, function () {

        $(this).hide();
        $(this).remove();


        $.ajax({
            url: se.attr("data-href"),
            //url: "dettaglio.html",
            dataType: "html",
            success: function (data, stato)
            {
                text = '<div class="finiture-container">';
                text += data;
                text += '</div>';
                
                $(".desc-container").append(text);
                $(".finiture-container").show();
                $(".finiture-container").css("opacity", "0");
                $(".finiture-container").css("left", "-500px");

                $('.finiture-container').stop().animate({
                    left: 0,
                    opacity: 1

                }, 300);

                $('.finiture-container').on('click', '.detail', function () {
                    finalDetail($(this));
                });



            },
            error: function (richiesta, stato, errori) {
                alert("E' evvenuto un errore. Il stato della chiamata: " + stato);
            }

        });

        /*$('.finiture-container').show().stop().animate({
         left: 0,
         opacity: 1
         
         }, 200);*/
    });
}

function resizer()
{
    //overlay thumb
    $(".overlay").width($(this).find("img").width());
    $(".overlay").height($(this).find("img").height());

    //desc container width
    // if($(window).width() < 768)
    //$(".desc-container").remove();
    $(".desc-container").width($(".container").width());

    if ($(window).width() > bootlimit)
    {
        if ($("#puzzle-container").length > 0)
        {
            wall = new freewall("#puzzle-container");
            wall.reset({
                selector: '.item',
                animate: true,
                cellW: 320,
                cellH: 320,
                gutterX: 30,
                gutterY: 30,
                fixSize: 0,
                onResize: function () {
                    wall.fitWidth();
                }
            });
            //wall.fitWidth();
        }
    }
    else
    {
        if ($("#puzzle-container").length > 0)
            wall.destroy();
    }


}

function onscroll()
{
    if ($(window).width() > bootlimit)
    {
        if ($(window).scrollTop() > 120)
        {
            $(".navbar-default").addClass("navbar-default-changed");
            $(".navbar-right").addClass("navbar-right-changed");
            $("#logo").addClass("logo-changed");
            howtoscroll = 60;
        }
        else {
            $(".navbar-default").removeClass("navbar-default-changed");
            $(".navbar-right").removeClass("navbar-right-changed");
            $("#logo").removeClass("logo-changed");
            howtoscroll = 120;
        }
    }
}

function initPlugins()
{
    /* scrolltop refresh page */
    $("html, body").animate({scrollTop: 0}, 0);


    /* funzione mostra search box push menu top*/
    $("#search").click(function () {

        var off;

        if ($(".navbar-default").hasClass("getDowned"))
        {
            off = 0;
            $("#row-footer").stop().animate({top: off + "px"}, 200);
            $(".content").stop().animate({top: off + "px"}, 200);
            $(".navbar-default").stop().animate({top: 0}, 200, function () {
                $(".navbar-default").removeClass("getDowned");
            });
        } else {
            off = 60;
            $(".navbar-default").stop().animate({top: off + "px"}, 200);
            $(".content").stop().animate({top: off + "px"}, 200);
            $("#row-footer").stop().animate({top: off + "px"}, 200);
            $(".navbar-default").addClass("getDowned");
        }
    });

    /* funzione mostra pannello descrizione prodotto */

    $(".plink").bind("click", plinkClick);

    $(".desc-container").mouseover(function () {

        console.log("over");
    });

    $(".desc-container").mouseout(function () {

        console.log("out");
    });


    /* funzione overlay thumb images */
    $(".plink").mouseover(function () {

        $(this).find(".overlay").width($(this).find("img").width());
        $(this).find(".overlay").height($(this).find("img").height());
        $(this).find(".overlay").stop().animate({opacity: 1});

    });
    $(".plink").mouseout(function () {

        $(this).find(".overlay").stop().animate({opacity: 0});

    });

    /* window resize function */
    $(window).resize(function () {
        resizer();
    });



    /* window scroll function */
    $(window).scroll(function () {
        onscroll();
    });
    /* home slider */
    if ($("#home-masterslider").length > 0)
    {
        var slider = new MasterSlider();

        // adds Arrows navigation control to the slider.
        slider.control('arrows');
        //slider.control('timebar', {insertTo: '#masterslider'});
        slider.control('bullets');

        slider.setup('home-masterslider', {
            width: 1400, // slider standard width
            height: 650, // slider standard height
            space: 0,
            fillMode: "fill",
            layout: 'boxed',
            loop: true,
            preload: "all",
            autoplay: true,
            speed: 15
        });
    }
    if ($("#material-masterslider").length > 0)
    {
        var slider = new MasterSlider();

        // adds Arrows navigation control to the slider.
        slider.control('arrows');
        //slider.control('timebar', {insertTo: '#masterslider'});
        slider.control('bullets');

        slider.setup('material-masterslider', {
            width: 1400, // slider standard width
            height: 650, // slider standard height
            space: 0,
            fillMode: "fill",
            layout: 'boxed',
            loop: true,
            preload: "all",
            autoplay: true,
            speed: 15
        });
    }
    if ($("#material-masterslider2").length > 0)
    {
        var slider = new MasterSlider();

        // adds Arrows navigation control to the slider.
        slider.control('arrows');
        //slider.control('timebar', {insertTo: '#masterslider'});
        slider.control('bullets');

        slider.setup('material-masterslider2', {
            width: 1400, // slider standard width
            height: 650, // slider standard height
            space: 0,
            fillMode: "fill",
            layout: 'boxed',
            loop: true,
            preload: "all",
            autoplay: true,
            speed: 15
        });
    }
    /* tabs masterslider*/
    if ($("#tabs-masterslider").length > 0)
    {
        var slider = new MasterSlider();

        slider.control('arrows');
        slider.control('circletimer', {color: "#FFFFFF", stroke: 9});
        slider.control('thumblist', {autohide: false, dir: 'h', type: 'tabs', width: 240, height: 120, align: 'bottom', space: 0, margin: -12, hideUnder: 400});

        slider.setup('tabs-masterslider', {
            width: 1140,
            height: 580,
            space: 0,
            preload: 'all',
            view: 'basic'
        });
    }

    /* freewall */
    if ($(window).width() > bootlimit)
    {
        if ($("#puzzle-container").length > 0)
        {
            wall = new freewall("#puzzle-container");
            wall.reset({
                selector: '.item',
                animate: true,
                cellW: 320,
                cellH: 320,
                gutterX: 30,
                gutterY: 30,
                fixSize: 0,
                onResize: function () {
                    wall.fitWidth();
                }
            });
            wall.fitWidth();
        }
    }
}

$(document).ready(function () {

    $(window).load(function () {

        initPlugins();

    });/*$(window).load*/

});/*$(document).ready*/



