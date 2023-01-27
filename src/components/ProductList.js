import React, { useEffect, useRef, useState } from 'react'
import Card from './Card';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getNcm = async () => {
      const response = await fetch('https://brasilapi.com.br/api/ncm/v1');
      const productsResult = (await response.json())?.slice(0, 10);
      setProducts(productsResult);
    };

    getNcm();
  }, []);

  return (
    <div className='row m-3'>
      <h1>Lista de registros NCM</h1>
      {
        products.map((product, index) => (
          <div key={ `${product.codigo}-${index}` } className="col-sm-6 col-md-4 col-lg-3">
            <Card
              title={ `Código: ${product.codigo}` }
              description={ `Número do ato: ${product.numero_ato}` }
              text={ product.descricao }
              footer={`Data de registro ${product.data_inicio}`}
            />
          </div>
        ))
      }
    </div>
  )
}

export default ProductList;
