import { useState } from 'react';
import ProductList from './components/ProductList';
import SearchBook from './components/SearchBook';

const tabs = {
  products: 'products',
  ISBNSearch: 'ISBNSearch'
};

function App() {
  const [activeTab, setActiveTab] = useState(tabs.products);

  const renderTabContent = () => {
    switch(activeTab) {
      case tabs.products: 
        return (
          <ProductList />
        );
      case tabs.ISBNSearch: 
        return (
          <SearchBook />
        )
      default:
        return (
          <p>Selecione uma aba</p>
        )
    }
  }

  return (
    <div className='container'>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={ `nav-link ${activeTab === tabs.products ? 'active' : ''}` }
            onClick={ () => setActiveTab(tabs.products) }
          >
            Products
          </button>
        </li>
        <li className="nav-item">
          <button
            className={ `nav-link ${activeTab === tabs.ISBNSearch ? 'active' : ''}` }
            onClick={ () => setActiveTab(tabs.ISBNSearch) }
          >
            ISBN Search
          </button>
        </li>
      </ul>
      {
        renderTabContent()
      }
    </div>
  );
}

export default App;
