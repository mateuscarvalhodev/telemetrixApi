import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Container, List } from "./styles";

export function Main () {

  
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState<number>(0);
  const [ products, setProducts ] = useState<IProducts[]>([]);
  const [editingProduct, setEditingProduct] = useState<IProducts | null>(null);

  
  useEffect(() => {
    api.get('').then((response) => {
      console.log(response.data);
      const apiProducts: IProducts[] = response.data.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        minPurchase: product.minPuchaseQuantity
      }));
      setProducts(apiProducts);
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  interface IProducts {
    id?: number;
    name: string;
    price: number;
    minPurchase?: number;
  }

  function handleEdit(product: IProducts) {
    setEditingProduct(product);
    setProductName(product.name);
    setProductPrice(product.price);
  }

  function handleCancel() {
    setEditingProduct(null);
    setProductName('');
    setProductPrice(0);
  }

  function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const updatedProduct: IProducts = {
      id: editingProduct?.id,
      name: productName,
      price: productPrice,
      minPurchase: editingProduct?.minPurchase
    };
    const updatedProducts = products.map((product) => {
      if(product.id === updatedProduct.id) {
        return updatedProduct;
      }
      return product;
    });
    setProducts(updatedProducts);
  }
    function handleSubmit (event: { preventDefault: () => void }) { 
    event.preventDefault();
    
    const newProduct:IProducts = {
      name: productName,
      price: productPrice,
    };
    
    setProducts([...products, newProduct])
    setProductName('');
    setProductPrice(0);
  }


  function handleDelete(product: IProducts): void {
    const updatedProducts = products.filter(p => p.id !== product.id);
    setProducts(updatedProducts);
  }

  return (
    <>
    
    <Container>
      <form onSubmit={editingProduct ? handleUpdate : handleSubmit}>
        <input 
        type="text" 
        value={productName}
        onChange= {(event) => setProductName(event.target.value)} 
        />
        <input 
        type="text"
        value={productPrice}
        onChange= {(event) => setProductPrice(parseFloat(event.target.value))}
        />
        {editingProduct ? (
        <>
          <button type="submit">Atualizar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </>
        ) : (
          <button type="submit">Registrar</button>
        )}
        

      </form>
      <List>
      <table>
        <tr>
          <th>PRODUTO</th>
          <th>VENDE A PARTIR DE</th>
          <th>PREÇO</th>
        </tr>


  {products.map((product) => <tr>
    <td>{product.name}</td>
    <td>{product.minPurchase}</td>
    <td>R$ {product.price}</td>
    <td>
      <button onClick={() => handleEdit(product)}>Editar</button>
      <button onClick={() => handleDelete(product)}>Excluir</button>
    </td>
  </tr>
  )}
 
  
</table>
      </List>
    </Container>
    </>
  )
}
