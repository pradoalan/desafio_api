const fs = require('fs');

class Carrito{
    async mostrarCarrito(id){
        try{
            const data = await fs.promises.readFile(
                './data/carrito.txt', 'utf-8'
            );
            const result = JSON.parse(data)

            let cart = result.find(cart => cart.id === id)
            if(!cart){
                return {error: "Carrito no existe"}
            }
            else{
                return cart
            }
        }catch(err){
            console.log(err.message);
        }
    }

    async agregarCarrito(cart){        
        try{           
            const data = await fs.promises.readFile(
                './data/carrito.txt', 'utf-8'
            );

            const result = JSON.parse(data);
            const newData = [...result];
            const payload = {
                cart
            };
            newData.push(payload)

            await fs.promises.writeFile(
                `./data/carrito.txt`, JSON.stringify(newData, null, 2)
            );
            
        return payload;
        }catch (err){
            console.log(err.message);
        }
    }

    async agregarProductoCarrito(id, prodId){
        try{    
            const dataCart = await fs.promises.readFile(
                './data/carrito.txt', 'utf-8'
            )
            const resultCart = JSON.parse(dataCart)
            const indiceCart = resultCart.findIndex(cart => cart.id === id);

            const dataProd = await fs.promises.readFile(
                './data/productos.txt', 'utf-8'
            )
            const resultProd = JSON.parse(dataProd);
            const prod = resultProd.find(prod => prod.id === prodId)

            if(indiceCart < 0){
                return {error: 'El carrito no existe'}
            }
            else{
                if(!prod){
                    return {error: 'El producto no existe'}
                }
                else{
                    resultCart[indiceCart].dataProd.push(prod);
                    await fs.promises.writeFile(`./data/carrito.txt`, JSON.stringify(resultCart, null, 2));
                    
                    return resultCart
                }
            }
        }catch(err){
            console.log(err.message);
        }
    }

    async eliminarCarrito(id){
        try{
            const data = await fs.promises.readFile(
                './data/carrito.txt', 'utf-8'
            );
            const result = JSON.parse(data);
            const oldData = [...result];
            const indiceCart = oldData.findIndex((cart) => {
                return cart.id === id;
            });

            oldData.splice(indiceCart, 1);
            fs.promises.writeFile(
                `./data/carrito.txt`, JSON.stringify(oldData, null, 2)
            );

            return oldData;
        }catch(err){
            console.log(err.message);
        }
    }
}

module.exports = {
    Carrito
}