const fs = require("fs")

class Producto{

    async listarProductos(){
        try{
            const data = await fs.promises.readFile(
                './data/productos.txt', 'utf-8'
            );

            const result = JSON.parse(data)

            if(result.length === 0){
                return {error: "No hay productos cargados"};
            }
            return result
        }catch(err){
            console.log(err.message);
        }
    }

    async mostrarProductos(id){
        try{
            const data = await fs.promises.readFile(
                './data/productos.txt', 'utf-8'
            );

            const result = JSON.parse(data);

            let producto = result.find(prod => prod.id === id)
            if(!producto){
                return {error: "El producto no existe"}
            }
            else{
                return producto
            }
        }catch(err){
            console.log(err.message);
        }
    }

    async agregarProducto(title, price, thumbnail, description, code){        
        try{
            const data = await fs.promises.readFile(
                './data/productos.txt', 'utf-8'
            );

            const result = JSON.parse(data);
            const newData = [...result];
            const payload = {
                title,
                price,
                thumbnail,
                description,
                code,
                id: result.length + 1,
                timestamp: Date.now()
            };
            newData.push(payload)

            await fs.promises.writeFile(
                `./data/productos.txt`, JSON.stringify(newData, null, 2)
            );
            return payload;
        }catch (err){
            console.log(err.message);
        }
    }

    async actualizarProducto(title, price, thumbnail, description, code, id){
        try{
            const data = await fs.promises.readFile(
                './data/productos.txt', 'utf-8'
            );
            
            const result = JSON.parse(data);
            const oldData = [...result];
            const payload = {
                title,
                price,
                thumbnail,
                description,
                code,
                id,
                timestamp: Date.now()
            };

            const indiceProd = oldData.findIndex((prod) => {
                return prod.id === id
            });
            oldData[indiceProd] = payload;

            await fs.promises.writeFile( //AWAIT
                `./data/productos.txt`, JSON.stringify(oldData, null, 2)
            );

            return payload;
        }catch(err){
            console.log(err.message);
        }
    }

    async eliminarProducto(id){
        try{
            const data = await fs.promises.readFile(
                './data/productos.txt', 'utf-8'
            );
            const result = JSON.parse(data);
            const oldData = [...result];
            const indiceProd = oldData.findIndex((prod) => {
                return prod.id === id;
            });

            oldData.splice(indiceProd, 1);
            fs.promises.writeFile(
                `./data/productos.txt`, JSON.stringify(oldData, null, 2)
            );

            return oldData;
        }catch(err){
            console.log(err.message);
        }
    }
}

module.exports = {
    Producto
}