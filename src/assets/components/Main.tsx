import { useState } from "react";
import { Container, List } from "./styles";

// const [productName, setProductName] = useState('');
// const [price, setPrice] = useState(0);
export function Main () {
  return (
    <>
    <Container>
      <form>
        {/* <input type="text" onChange= {() => console.log('teste')} /> */}
      </form>
      <List>
      <table>
  <tr>
    <th>PRODUTO</th>
    <th>DISPONIBILIDADE</th>
    <th>PREÇO</th>
  </tr>
 
  <tr>
    <td>Criação de logo</td>
    <td>1 semana</td>
    <td>R$ 500,00</td>
  </tr>
 
  
</table>
      </List>
    </Container>
    </>
  )
}