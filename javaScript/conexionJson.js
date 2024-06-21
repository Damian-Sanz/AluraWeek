async function datosJson (lista) {
    const conexion = await fetch(`http://localhost:3001/${lista}`);
    const conexionConvertida = conexion.json();
    return conexionConvertida;
}

async function postProductos (id,titulo,precio,categoria,genero,existencia,imagen) {
    const conexionPost = await fetch("http://localhost:3001/productos", {
        method:"POST",
        headers:{"Content-type":"application-json"},
        body:JSON.stringify({
            id:id,
            titulo:titulo,
            precio:precio, 
            categoria:categoria,
            genero:genero,
            existencia:existencia,
            imagen:imagen
        })
    });

    const conexionConvertidaPost = conexionPost.json();

    return conexionConvertidaPost;
}

async function postClientes (id, nombre, telefono, correo, fechaNacimiento, imagen) {
    const conexionPost = await fetch("http://localhost:3001/clientes", {
        method:"POST",
        headers:{"Content-type":"application-json"},
        body:JSON.stringify({
            id:id,
            nombre:nombre,
            telefono:telefono, 
            correo:correo,
            fechaNacimiento:fechaNacimiento,
            imagen:imagen
        })
    });

    const conexionConvertidaPost = conexionPost.json();

    return conexionConvertidaPost;
}

async function postEmpleados (id, nombre, telefono, correo, domicilio, fechaNacimiento, imagen) {
    const conexionPost = await fetch("http://localhost:3001/empleados", {
        method:"POST",
        headers:{"Content-type":"application-json"},
        body:JSON.stringify({
            id:id,
            nombre:nombre,
            telefono:telefono, 
            correo:correo,
            domicilio:domicilio,
            fechaNacimiento:fechaNacimiento,
            imagen:imagen
        })
    });

    const conexionConvertidaPost = conexionPost.json();

    return conexionConvertidaPost;
}

async function postCategorias (id, nombreCategoria) {
    const conexionPost = await fetch("http://localhost:3001/categorias", {
        method:"POST",
        headers:{"Content-type":"application-json"},
        body:JSON.stringify({
            id:id,
            nombreCategoria:nombreCategoria
        })
    });

    const conexionConvertidaPost = conexionPost.json();

    return conexionConvertidaPost;
}

async function putProductos (id, nombre, precio, categoria, genero, existencia, imagen) {
    try {
        const nuevosDatos = await fetch(`http://localhost:3001/productos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                titulo: nombre,
                precio: precio,
                categoria: categoria,
                genero: genero,
                existencia: existencia,
                imagen: imagen
            })
        })
    } catch {
        console.log('Error en la Actualizacion');
    }
}

async function putClientes () {
    try{
        const nuevosDatos = await fetch(`http://localhost:3001/clientes/${id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                id:id,
                nombre:nombre,
                telefono:telefono,
                correo:correo,
                felchaNacimiento:fechaNacimiento,
                imagen:imagen
            })
        })
    } catch {
        console.log("Error al actualizar los Datos");
    }
}

async function putEmpleados () {
    try{
        const nuevosDatos = await fetch(`http://localhost:3001/empleados/${id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                id:id,
                nombre:nombre,
                telefono:telefono,
                correo:correo,
                domicilio:domicilio,
                felchaNacimiento:fechaNacimiento,
                imagen:imagen
            })
        })
    } catch {
        console.log("Error al actualizar los Datos");
    }
}

async function eliminarProducto(productId) {
  
    try {
      const response = await fetch(`http://localhost:3001/productos/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error al eliminar el producto: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result;

    } catch (error) {
      console.error('Hubo un problema con la solicitud de eliminación:', error);
    }
}

async function eliminarCategria (id) {

    try {

        const response = await fetch(`http://localhost:3001/categorias/${id}`, {
            method: 'DELETE',
            headers: {'content-Type' : 'appclication/json'}
        });

        if (response.ok) {
            throw new Error(`Error al eliminar la categoria: ${response.statusText}`);
        };

        const result = await response.json();
        
    } catch (error) {
        console.error('Hubo un problema con la solicitud de eliminación:', error);
    }
}

  


export const conexionJson = {
    datosJson, postProductos, postClientes, postEmpleados, postCategorias,
    putProductos, putClientes, putEmpleados,
    eliminarProducto, eliminarCategria
}