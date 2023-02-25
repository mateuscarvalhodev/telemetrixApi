import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Container, List } from "./styles";

export function Main () {

  
  const [productName, setProductName] = useState('');
  const [productPrice, setPrice] = useState<number>(0);
  const [ products, setProducts ] = useState<IProducts[]>([]);
  
  useEffect(() => {
    api.get('').then((response) => {
      console.log(response.data);
      const apiProducts: IProducts[] = response.data.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      }));
      setProducts(apiProducts);
    }).catch((error) => {
      console.log(error);
    })
  }, [])
  
interface IProducts {
  id?: number;
  name: string;
  price: number;
}

  function handleSubmit (event: { preventDefault: () => void; }) {
    event.preventDefault();
    
    
    console.log(productName, productPrice)
    
    const newProduct:IProducts = {
      name: productName,
      price: productPrice,
    };
    
    setProducts([...products, newProduct])
  }

  return (
    <>
    
    <Container>
      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        onChange= {(event) => setProductName(event.target.value)} 
        />
        <input 
        type="text"
        onChange= {(event) => setPrice(parseFloat(event.target.value))}
        />
        <button type="submit">Registrar</button>
      </form>
      <List>
      <table>
  <tr>
    <th>PRODUTO</th>
    <th>DISPONIBILIDADE</th>
    <th>PREÇO</th>
  </tr>


  {products.map((product) => <tr>
    <td>{product.name}</td>
    <td>SIM</td>
    <td>R$ {product.price}</td>
  </tr>
  )}
 
  
</table>
      </List>
    </Container>
    </>
  )
}