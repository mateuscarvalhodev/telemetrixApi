import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { api } from "../services/api";
import { Container, List } from "./styles";
// import Modal from 'react-modal';

export function Main() {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState<number>(0);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [editingProduct, setEditingProduct] = useState<IProducts | null>(null);
  const [showModal, setShowModal] = useState(false);

  const data = {
    "id": 0,
    "categoryId": 0,
    "description": "string",
    "icmsTax": 0,
    "ipiTax": 0,
    "isAvailable": true,
    "isWarehouse": true,
    "minPuchaseQuantity": 0,
    "name": "name",
    "productCategory": {
      "id": 0,
      "allowAttachments": true,
      "allowQuantityVariation": true,
      "description": "string",
      "hasShipping": true,
      "limitRequest": 0,
      "limitRequestsPerMonth": true,
      "name": "string",
      "validateClient": true,
      "valueVariation": 0,
      "allowValueVariation": true
    }
  }

  const pageSize = 6;

  useEffect(() => {
    api.get('').then((response) => {
      const apiProducts: IProducts[] = response.data.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        minPurchase: product.minPuchaseQuantity
      }));

      setTotalPages(Math.ceil(apiProducts.length / pageSize));
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const apiProductsSlice = apiProducts.slice(startIndex, endIndex);
      setProducts(apiProductsSlice);
    });
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
  const handleClick = (page : number) => {
    setCurrentPage(page)
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

      if (product.id === updatedProduct.id) {
        data['name'] = productName;
        api.put('' + product.id, data);
        return updatedProduct;
      }

      return product;
    });
    setProducts(updatedProducts);
  }
  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    const newProduct: IProducts = {
      id: products.length + 1,
      name: productName,
      price: productPrice,
    };

    const data = {
      "id": 0,
      "categoryId": 0,
      "description": "string",
      "icmsTax": 0,
      "ipiTax": 0,
      "isAvailable": true,
      "isWarehouse": true,
      "minPuchaseQuantity": 0,
      "name": productName,
      "productCategory": {
        "id": 0,
        "allowAttachments": true,
        "allowQuantityVariation": true,
        "description": "string",
        "hasShipping": true,
        "limitRequest": 0,
        "limitRequestsPerMonth": true,
        "name": "string",
        "validateClient": true,
        "valueVariation": 0,
        "allowValueVariation": true
      }
    };

    api.post('', data)
    window.location.reload();
  
    setProducts([...products, newProduct]);
    setProductName('');
    setProductPrice(0);
  };


  function handleDelete(product: IProducts): void {
    const updatedProducts = products.filter(p => p.id !== product.id);

    api.delete('' + product.id);
    setProducts(updatedProducts);
  }
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for(let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} className={currentPage === number ? 'active' : ''}>
            <a onClick={() => handleClick(number)}>{number}</a>
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <Container>
        <button onClick={() => setShowModal(showModal => !showModal)}>Adicionar Produto</button>
        {showModal && (
          <div className="modalContent">

            <form onSubmit={editingProduct ? handleUpdate : handleSubmit}>
              <input
                type="text"
                placeholder="Digite o nome do produto..."
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
              />
              <input
                type="text"
                placeholder="Preço do produto:"
                value={productPrice}
                onChange={(event) => setProductPrice(parseFloat(event.target.value))}
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
          </div>
        )}
        <List>
          <table>
            <thead>
              <tr>
                <th>PRODUTO</th>
                <th>VENDE A PARTIR DE</th>
                <th>PREÇO</th>
                <th>EDIT/DELETE</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => 
                <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.minPurchase}</td>
                <td>R$ {product.price}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Editar</button>
                  <button onClick={() => handleDelete(product)}>Excluir</button>
                </td>
              </tr>
              )}
            </tbody>
          </table>
          <div className="pages">
          
        {renderPageNumbers()}
          
          </div>
        </List>
      </Container>
    </>
  )
}
{/* <div className="pageNumber">{renderPageNumbers()}</div> */}
