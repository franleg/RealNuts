// Funcion para mostrar los productos en el HTML:

function mostrarProductos(productos, contenedor) {
	for (const producto of productos) {
		$(contenedor).append(`<div class="col-lg-3 col-xs-6 contenedor-cards">
									<div class="card card-productos">
										<img src="${producto.img}" class="card-img-top img-cards img-fluid">
										<div class="card-body text-center">
											<h3 class="card-title">${producto.nombre}</h3>
											<hr>
											<div>
												<span><strike>$${producto.precio1}</strike></span>
												<span><b>$${producto.precio2} ${producto.pesaje}</b></span>
											</div> 
											<i id="boton${producto.id}" class="fas fa-cart-plus cart botonCarrito"></i>
										</div>
									</div>
								</div>`)
		$(`#boton${producto.id}`).click(()=>{
			agregarAlCarrito(producto.id);
			$("#botonIniciar").show();
			Toastify({
			  text: "Producto Agregado",
			  gravity: "bottom",
			  backgroundColor: "seagreen",
			  className: "info",
			}).showToast();
		})
	}
}


// Función para agregar los productos al carrito de compras:

function agregarAlCarrito(id) {
	let repetido = carrito.find(productoR => productoR.id == id);
	if (repetido){
		repetido.cantidad = repetido.cantidad + 1;
		$(`#cantidad${repetido.id}`).html(`${repetido.cantidad} ${repetido.pesaje}`);
		$(`#subtotal${repetido.id}`).html(`$${repetido.precio2 * repetido.cantidad}`);
		actualizarCarrito();
		localStorage.setItem("Carrito", JSON.stringify(carrito));
	}else{
		let agregado = stockProductos.find(productoA => productoA.id == id);
		carrito.push(agregado);
		agregado.cantidad = 1;
		mostrarCarrito(carrito);
		actualizarCarrito();	
		localStorage.setItem("Carrito", JSON.stringify(carrito));	
	}
	localStorage.setItem("Carrito", JSON.stringify(carrito));
}


// Función para mostrar los productos en el carrito de compras:

function mostrarCarrito(productos){
	$("#carrito").empty();
	for (const producto of productos){
		$("#carrito").append( ` <div id="contenedor${producto.id}" class="row d-flex align-items-center carrito-producto">
									<div class="col-lg-4 col-xs-2 contenedor-imagen-columna">
											<img src="${producto.img}" class="card-img-top img-fluid img-productos">
									</div>
									<div class="col-lg-8 col-xs-10 contenedor-producto-columna">
										<div class="d-flex justify-content-between">
											<h6 id="nombre-producto">${producto.nombre}</h6>
											<div id="eliminar${producto.id}"><i class="fas fa-trash-alt iconoEliminar"></i></div>
										</div>
										<div>
											<div id="subtotal${producto.id}">$${producto.precio2 * producto.cantidad}</div>						
												<div class="contenedor-cantidad d-flex justify-content-center align-items-center">
													<div id="restar${producto.id}" class="contenedor-restar"><i class="fas fa-minus iconoRestar"></i></div>
													<div id="cantidad${producto.id}" class="cantidad">${producto.cantidad} ${producto.pesaje}</div>
													<div id="sumar${producto.id}" class="contenedor-sumar"><i class="fas fa-plus iconoSumar"></i></div>
												</div>
										</div>
									</div>
								</div>`)

		$(`#restar${producto.id}`).click(function() {
			let restado = carrito.find(prodRes => prodRes.id == producto.id);
			if(restado.cantidad > 1){
				restado.cantidad = restado.cantidad -1;
				$(`#cantidad${restado.id}`).html(`${restado.cantidad} ${restado.pesaje}`);
				$(`#subtotal${restado.id}`).html(`$${restado.precio2 * restado.cantidad}`);
				actualizarCarrito();
				localStorage.setItem("Carrito", JSON.stringify(carrito));
			}
		})

		$(`#sumar${producto.id}`).click(function() {
			let sumado = carrito.find(prodSum => prodSum.id == producto.id);
			sumado.cantidad = sumado.cantidad +1;
			$(`#cantidad${sumado.id}`).html(`${sumado.cantidad} ${sumado.pesaje}`);
			$(`#subtotal${sumado.id}`).html(`$${sumado.precio2 * sumado.cantidad}`);
			actualizarCarrito();
			localStorage.setItem("Carrito", JSON.stringify(carrito));
		})

		$(`#eliminar${producto.id}`).click(function() {
			$(this).parent().parent().parent().remove();
			carrito = carrito.filter(prodE => prodE.id != producto.id);
			actualizarCarrito();
			carritoVacio();
			localStorage.setItem("Carrito", JSON.stringify(carrito));
			Toastify({
				text: "Producto Eliminado",
				gravity: "bottom",
				backgroundColor: "orangered",
				className: "info",
			}).showToast();	
		});						
	}
}


// Función para actualizar contador de productos en carrito y precio total:

function actualizarCarrito() {
    $("#contador-carrito").text(carrito.reduce((acc, element) => acc + element.cantidad, 0));
    let sumaTotal = carrito.reduce((acc , element) => acc + (element.precio2 * element.cantidad),0);
    $("#precio-total").html(`<p>TOTAL:</p>
	 						<p>$${sumaTotal}</p>`);
}
    

// Función para buscar productos:

function buscar(event) {
    event.preventDefault();
    let textoIngresado = event.target.value.toLowerCase();
    let buscados = stockProductos.filter(prodB => prodB.nombre.toLowerCase().includes(textoIngresado));
    $("#contenedor-slider, #contenedor-categorias, #contenedor-selector, #contenedor-productos").empty();
	$(".contenedor-menu").removeClass("active");
	$(".fondo-menu").removeClass("active");
    mostrarProductos(buscados, $("#contenedor-productos"));
	console.log(buscados)
    if (textoIngresado == "" || buscados.length == 0){
    	$("#contenedor-productos").html(`<div class="text-center">
											<p><b>No se ha encontrado el producto</b></p>
											<a href="index.html" id="atras">Volver</a>
										</div>`)
    }
}


// Función para recuperar productos del Local Storage:

function recuperar() {
    let productoGuardar = JSON.parse(localStorage.getItem("Carrito"));
    if (productoGuardar){
    	for (const guardado of productoGuardar) {
			carrito.push(guardado)
		}
		mostrarCarrito(productoGuardar);
		actualizarCarrito();
 	}
}
     

// Función para enviar productos mediante un post y finalizar la compra:

function finalizarCompra() {
	$.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(carrito),function(respuesta,estado) {
	  console.log(respuesta);
	  console.log(estado);
	  if(estado == "success"){
		carrito = [];
		localStorage.setItem("Carrito", JSON.stringify(carrito));
		$("#carrito, #precio-total").empty();
		$("#contador-carrito").html("0");
		carritoVacio();
	  }else{
		console.log("Los datos no se enviaron correctamente");
	  };
	});
  }


// Función para modificar carrito en caso de no haber productos agregados: 
  
function carritoVacio(){
	if(carrito == 0){
		$("#carrito").append(`<p class="text-center">El carrito de compras está vacío</p>`)
		$("#precio-total").empty();
		$("#botonIniciar").hide();
	}
}
  

// Función para validad formulario de compra:

function validar() {
	$(".error").hide();

	let nombre = $("#nombre").val().trim();
	let apellido = $("#apellido").val().trim();
	let email = $("#email").val().trim();
	let telefono = $("#telefono").val().trim();
	let tarjeta = $("#tarjeta").val().trim();
	let localidad = $("#localidad").val().trim();
	let direccion = $("#direccion").val().trim();
	
	if (nombre.length == 0){
		$("#error-nombre").show();
	};
	if (apellido.length == 0){
		$("#error-apellido").show();
	};
	if (email.length == 0){
		$("#error-email").show();	
	};
	if (telefono.length == 0){
		$("#error-telefono").show();	
	};
	if (tarjeta.length == 0){
		$("#error-tarjeta").show();	
	};
	if (localidad.length == 0){
		$("#error-localidad").show();	
	};
	if (direccion.length == 0){
		$("#error-direccion").show();
	};
	if (nombre.length > 0 && apellido.length > 0 && email.length > 0 && telefono.length >= 0 && tarjeta.length > 0 && localidad.length > 0 && direccion.length > 0) {
		$(".error").hide();
		$(".contenedor-compra").addClass("active");
		$(".contenedor-carrito").removeClass("active");
		finalizarCompra();  	
	}							
}