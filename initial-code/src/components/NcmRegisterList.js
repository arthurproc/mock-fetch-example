import React, { useEffect, useState } from 'react'
import Card from './Card';

function NcmRegisterList() {
  const [ncmRegisters, setNcmRegisters] = useState([]);

  useEffect(() => {
    const getNcm = async () => {
      const response = await fetch('https://brasilapi.com.br/api/ncm/v1');
      const ncmRegistersResult = (await response.json())?.slice(0, 10);
      setNcmRegisters(ncmRegistersResult);
    };

    getNcm();
  }, []);

  return (
    <div className='row m-3'>
      <h1>Lista de registros NCM</h1>
      {
        ncmRegisters.map((ncmRegister, index) => (
          <div key={ `${ncmRegister.codigo}-${index}` } className="col-sm-6 col-md-4 col-lg-3 p-1">
            <Card
              title={ `Código: ${ncmRegister.codigo}` }
              description={ `Número do ato: ${ncmRegister.numero_ato}` }
              text={ ncmRegister.descricao }
              footer={`Data de registro ${ncmRegister.data_inicio}`}
            />
          </div>
        ))
      }
    </div>
  )
}

export default NcmRegisterList;
