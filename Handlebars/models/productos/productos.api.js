class Productos{
    constructor(){
        this.productos = []
    }
    static idCount = 0;

    traerTodo(){
        return [...this.productos];
    }

    traerPorId(id){
        const producto = this.productos.find(prod => prod.id === +id)
        return producto || {error: `Producto no encontrado`};
    }

    agregarProducto(prod){
        const {title, price, thumbnail} = prod
        if(!title || !price || !thumbnail) return {error: `Datos ingresados erroneamente`}
        const nuevoProducto = {...prod, id: ++Productos.idCount};
        this.productos.push(nuevoProducto);
        return nuevoProducto;
    }

    actualizarProducto(prod, id){
        const indice = this.productos.findIndex(prod => prod.id === +id);
        if(indice < 0) return {error: `El id ${id} no existe`};
        this.productos[indice] = {id: +id, ...prod};
        return this.productos[indice];
    }

    borrarProducto(id){
        const indice = this.productos.findIndex(prod => prod.id === +id)
        if(indice < 0) return {error: `Producto no encontrado`}
        return this.productos.splice(indice, 1);
    }
}

module.exports = Productos;