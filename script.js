class Producto{
    constructor(id, nombre, descripcion, precio, img, alt){
      this.id = id
      this.nombre = nombre
      this.cantidad = 1
      this.descripcion = descripcion
      this.precio = precio
      this.img = img
      this.alt = alt
    }
  }
class ProductoController{
    constructor(){
      this.listaProductos = []
      this.contenedor_productos = document.getElementById("contenedor_productos")

     }
  
  levantarProducto(){
    this.listaProductos = [
      new Producto (1, "Cuadro abstracto","pintura oleo", 15000, "./cuadros/oleo.webp", "pintura 1"),
      new Producto (2, "Cuadro barco","pintura oleo", 12000, "./cuadros/barcooleo.webp", "pintura 2"),
      new Producto (3, "Cuadro flores","pintura oleo", 12000, "./cuadros/flores.webp", "pintura 3"),
      new Producto (4, "Milo Locket-marino","pintura acrilica", 10000, "./cuadros/milo.webp", "pintura 4"),
      new Producto (5, "Milo Locket-urbano","pintura acrilica", 10000, "./cuadros/milo2.webp", "pintura 5"),
      new Producto (6, "Milo Locket-desamor","pintura acrilica", 10000, "./cuadros/milo3.webp","pintura 6"),
    
    ]
      }
  
  
  mostrarEnDOM(){
  this.listaProductos.forEach(producto => {
    this.contenedor_productos.innerHTML += `
        <div class="card" style="width: 18rem;">
          <img src="${producto.img}" class="card-img-top" alt="${producto.alt}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text">$${producto.precio}</p>
            <a href="#" id= "cuadro${producto.id}" class="btn btn-primary">Agregar al carrito</a>
          </div>
          </div>`
  })
  
  }
  
  darEventoClickAProductos(controladorCarrito){
    this.listaProductos.forEach(producto => {
        const btnAP = document.getElementById(`cuadro${producto.id}`)
        btnAP.addEventListener("click", () =>{
    
    controladorCarrito.agregar(producto)
    controladorCarrito.guardarEnStorage()
    controladorCarrito.mostrarEnDOM(contenedor_carrito)
  })
  })
}

  }
  
class CarritoControler{
    constructor(){
      this.listaCarrito = []
      this.contenedor_carrito = document.getElementById("contenedor_carrito")
      this.total = document.getElementById("total")
    }
  agregar(producto){
        this.listaCarrito.push(producto)
  }  

  limpiarCarritoStorage(){
    localStorage.removeItem("listaCarrito")
    }
  
  guardarEnStorage(){
  let listaCarritoJSON = JSON.stringify(this.listaCarrito)
  localStorage.setItem("listaCarrito", listaCarritoJSON)
  
  }

  chequearStorage() {
    this.listaCarrito = JSON.parse(localStorage.getItem("listaCarrito")) || [];
    this.listaCarrito.length && this.mostrarEnDOM();
  }


  limpiarContenedor_Carrito(){
      this.contenedor_carrito.innerHTML = ""
  }
  
  mostrarEnDOM(){
    this.limpiarContenedor_Carrito()
    this.listaCarrito.forEach(producto => {
      this.contenedor_carrito.innerHTML +=
      `<div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.alt}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio: $${producto.precio}</p>
            <p class="card-text">Cantidad${producto.cantidad}</p>
<span id="valor">0</span>
<button class="boton diminuir">
<button class="boton resetear">
<button class="boton aumentar">
          </div>
        </div>
      </div>
    </div>`
    })

    this.mostrarTotalEnDom()
  }
    calcularTotal(){
    let total= 0
    this.listaCarrito.forEach(producto =>{ 
      total += producto.precio * producto.cantidad
    })
     return total;
  }
    mostrarTotalEnDom(){
       this.total.innerHTML = this.calcularTotal() 
   }  
  }
  
  const controladorProductos = new ProductoController()
  controladorProductos.levantarProducto()
  
  const controladorCarrito = new CarritoControler()

 //DOM y verificamos STORAGE
  controladorCarrito.chequearStorage()
  
  //Mostramos productos en el DOM
  controladorProductos.mostrarEnDOM()
  
  //los Eventos
  controladorProductos.darEventoClickAProductos(controladorCarrito)

  const finalizar_compra = document.getElementById("finalizar_compra")
  finalizar_compra.addEventListener("click", () =>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Compra exitosa',
      showConfirmButton: false,
      timer: 1800

  })
 
  //en DOM
   controladorCarrito.limpiarContenedor_Carrito()
   //en localSTORAGE
   controladorCarrito.limpiarCarritoStorage()
   //en listaCarrito
   controladorCarrito.listaCarrito = []
   
   controladorCarrito.mostrarTotalEnDom()
})

   const urlUsuarios = 'https://jsonplaceholder.typicode.com/users';
   const listaUsuarios = document.querySelector("#lista_usuarios");

   fetch(urlUsuarios)
   .then((response) => response.json())
   .then((data) =>{
       // data.forEach(usuario => {
         // const li = document.createElement("li");
          //li.textContent = usuario.name;
         // listaUsuarios.append(li);
         console.log(data);
        })
        .catch((error) => {
             console.error(error);
        })
  