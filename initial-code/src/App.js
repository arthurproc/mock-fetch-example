import { useState } from 'react';
import NcmRegisterList from './components/NcmRegisterList';
import SearchBook from './components/SearchBook';
import SearchCep from './components/SearchCep';

const tabs = {
  ncmRegisters: 'ncmRegisters',
  isbnSearch: 'ISBNSearch',
  cepSearch: 'cepSearch'
};

function App() {
  const [activeTab, setActiveTab] = useState(tabs.ncmRegisters);

  const renderTabContent = () => {
    switch(activeTab) {
      case tabs.ncmRegisters: 
        return (
          <NcmRegisterList />
        );
      case tabs.isbnSearch: 
        return (
          <SearchBook />
        )
      case tabs.cepSearch:
        return (
          <SearchCep />
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
            className={ `nav-link ${activeTab === tabs.ncmRegisters ? 'active' : ''}` }
            onClick={ () => setActiveTab(tabs.ncmRegisters) }
          >
            NCM Registers
          </button>
        </li>
        <li className="nav-item">
          <button
            className={ `nav-link ${activeTab === tabs.isbnSearch ? 'active' : ''}` }
            onClick={ () => setActiveTab(tabs.isbnSearch) }
          >
            ISBN Search
          </button>
        </li>
        <li className="nav-item">
          <button
            className={ `nav-link ${activeTab === tabs.cepSearch ? 'active' : ''}` }
            onClick={ () => setActiveTab(tabs.cepSearch) }
          >
            CEP Search
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
