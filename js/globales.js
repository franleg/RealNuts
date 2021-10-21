let stockProductos = [];

let carrito = [];

$.getJSON("productos.json", function(datos, estado){
    console.log(datos);
    console.log(estado);
    datos.forEach(prod => stockProductos.push(prod));
    mostrarProductos(stockProductos.filter(el=> el.categoria == "Frutos secos"), $("#contenedor-frutos"));
    mostrarProductos(stockProductos.filter(el=> el.categoria == "Chocolates"), $("#contenedor-chocolates"));
    mostrarProductos(stockProductos.filter(el=> el.categoria == "Dulce de Leche"), $("#contenedor-dulces"));
    mostrarProductos(stockProductos.filter(el=> el.categoria == "Vinos"), $("#contenedor-vinos"));
});