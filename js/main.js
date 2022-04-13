$(document).ready(function(){
    $(".tituloProductos").hide();

    $(".tituloCategorias").hide();

    $("#formulario").hide();

    $(".error").hide();

    $("#botonMenu").click(function(){
        $(".contenedor-menu").addClass("active");
        $(".fondo-menu").addClass("active");
    });

    $(".cerrarMenu").click(function(){
        $(".contenedor-menu").removeClass("active");
        $(".fondo-menu").removeClass("active");
    });

    $(".fondo-menu").click(function(){
        $(".contenedor-menu").removeClass("active");
        $(".fondo-menu").removeClass("active");
    });

    $(".contenedor-menu").click(function(e){
        e.stopPropagation();
    })

    $(".menu-productos").click(function(){
        $(".lista-productos").slideToggle(500);
        $(".flecha").toggleClass("rotar");
    });

    $(".menu-productos").click(function(e) {
        e.preventDefault();
    });

    $("#contacto").click(function(e) {
        e.preventDefault();
        $(".contenedor-menu").removeClass("active");
        $(".fondo-menu").removeClass("active");
        $("html, body").animate({
            scrollTop: $("#contenedor-contacto").offset().top -8},2000);
    });

    $("#botonCarrito").click(function(){
        $(".contenedor-carrito").addClass("active");
        $(".fondo-carrito").addClass("active");
    });

    $(".cerrar-carrito").click(function(){
        $(".contenedor-carrito").removeClass("active");
        $(".fondo-carrito").removeClass("active");
    });

    $(".fondo-carrito").click(function(){
        $(".contenedor-carrito").removeClass("active");
        $(".fondo-carrito").removeClass("active");
    });    

    $(".contenedor-carrito").click(function(e){
        e.stopPropagation();
    })

    $("#select").change(function(){
        let ir = $(this).val()
        console.log(ir);
        $("html, body").animate({
            scrollTop: $(ir).offset().top -40},2000)
    });

    $("#verMas").click(function(){
        $(".contenedor-carrito").removeClass("active"); 
        $(".fondo-carrito").removeClass("active");
    })

    $("#botonIniciar").click(function(e) {
        e.preventDefault();
        $("#carrito").hide();
        $(".hr-carrito").hide();
        $(".contenedor-total").hide();
        $("#verMas").hide();
        $("#botonIniciar").hide();
        $("#formulario").show();
    });

    $("#volver").click(function(e){
        e.preventDefault();
        $("#formulario").hide();
        $("#carrito").show();
        $(".hr-carrito").show();
        $(".contenedor-total").show();
        $("#verMas").show();
        $("#botonIniciar").show();
    })

    $("#botonConfirmar").on('click',function(){
        validar()   
    });

    $(".boton-modal").click(function(){
        $(".contenedor-compra").removeClass("active");
        $(".fondo-carrito").removeClass("active");

    });

    carritoVacio();
});


$(window).on("load",function(){
    if(window.screen.width > 767){
        $(".titulo").animate({fontSize:"68px"},
                        "slow", 
                        function(){
                            $(".tituloProductos").fadeIn(1500);
                            $(".tituloCategorias").fadeIn(3000);
                        });
    }if(window.screen.width < 767){
        $(".titulo").animate({fontSize:"44px"},
                        "slow", 
                        function(){
                            $(".tituloProductos").fadeIn(1500);
                            $(".tituloCategorias").fadeIn(3000);
                        });        
    }
})


$("#input-buscar").change(buscar);

$("#boton-buscar").click(() =>{
	$("#input-buscar").trigger("change"); 
});


$(".item-producto").click(function(e) {
    e.preventDefault();
    let productoLista = e.target.innerText;
    console.log(productoLista);
    switch (productoLista) {
        case "Todos los productos":
            $(".contenedor-menu").removeClass("active");
            $(".fondo-menu").removeClass("active");
            $("html, body").animate({
                scrollTop: $(".titulo").offset().top -8},2000)
            break;
        case "Frutos Secos":
            $(".contenedor-menu").removeClass("active");
            $(".fondo-menu").removeClass("active");
            $("html, body").animate({
                scrollTop: $("#titulo-frutos").offset().top -75},2000)
            break;
        case "Chocolates":
            $(".contenedor-menu").removeClass("active");
            $(".fondo-menu").removeClass("active");
            $("html, body").animate({
                scrollTop: $("#titulo-chocolates").offset().top -75},2000)
            break;
        case "Dulce de leche":
            $(".contenedor-menu").removeClass("active");
            $(".fondo-menu").removeClass("active");
            $("html, body").animate({
                scrollTop: $("#titulo-dulces").offset().top -75},2000)
            break;
        case "Vinos":
            $(".contenedor-menu").removeClass("active");
            $(".fondo-menu").removeClass("active");
            $("html, body").animate({
                scrollTop: $("#titulo-vinos").offset().top -75},2000)
            break;
    
        default:
            console.log("error")
            break;
    }
});


recuperar();


