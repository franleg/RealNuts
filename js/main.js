$(document).ready(function(){
    $(".tituloProductos").hide();

    $(".tituloCategorias").hide();

    $("#formulario").hide();

    $(".error").hide();

    $("#botonConfirmar").on('click',function(){
        console.log('form');
        validar()   
    });

    $("#botonCarrito").click(function(){
        $(".contenedor-carrito").addClass("active");
        $(".contenedorCarrito").addClass("active");
    });

    $(".cerrar-carrito").click(function(){
        $(".contenedor-carrito").removeClass("active");
        $(".contenedorCarrito").removeClass("active");
    });

    $("#botonMenu").click(function(){
        $(".menu").addClass("active");
        $(".contenedor-menu").addClass("active");
    });

    $(".cerrarMenu").click(function(){
        $(".menu").removeClass("active");
        $(".contenedor-menu").removeClass("active");
    });

    $(".menu-productos").click(function(){
        $(".lista-productos").slideToggle(500);
        $(".flecha").toggleClass("rotar");
    });

    $("#select").change(function(){
        let ir = $(this).val()
        console.log(ir);
        $("html, body").animate({
            scrollTop: $(ir).offset().top -40},2000)
    });

    $("#verMas").click(function(){
        $(".contenedor-carrito").removeClass("active"); 
        $(".contenedorCarrito").removeClass("active");
    })

    $(".boton-modal").click(function(){
        $(".contenedor-compra").removeClass("active");
        $(".contenedorCarrito").removeClass("active");

    });

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
        $(".titulo").animate({fontSize:"48px"},
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
            $(".menu").removeClass("active");
            $(".contenedor-menu").removeClass("active");
            $("html, body").animate({
                scrollTop: $(".titulo").offset().top -8},2000)
            break;
        case "Frutos Secos":
            $(".menu").removeClass("active");
            $(".contenedor-menu").removeClass("active");
            $("html, body").animate({
                scrollTop: $("#titulo-frutos").offset().top -30},2000)
            break;
        case "Chocolates":
            $(".menu").removeClass("active");
            $(".contenedor-menu").removeClass("active");
            $("html, body").animate({
                scrollTop: $("#titulo-chocolates").offset().top -30},2000)
            break;
        case "Dulce de leche":
            $(".menu").removeClass("active");
            $(".contenedor-menu").removeClass("active");
            $("html, body").animate({
                scrollTop: $("#titulo-dulces").offset().top -30},2000)
            break;
        case "Vinos":
            $(".menu").removeClass("active");
            $(".contenedor-menu").removeClass("active");
            $("html, body").animate({
                scrollTop: $("#titulo-vinos").offset().top -30},2000)
            break;
    
        default:
            console.log("error")
            break;
    }
});


$("#contacto").click(function(e) {
    e.preventDefault();
    $(".menu").removeClass("active");
    $(".contenedor-menu").removeClass("active");
    $("html, body").animate({
        scrollTop: $("#contenedor-contacto").offset().top -8},2000);
});


$(".menu-productos").click(function(e) {
    e.preventDefault();
});


recuperar();


