import { useState } from 'react';
import NcmRegisterList from './components/NcmRegisterList';
import SearchBook from './components/SearchBook';

const tabs = {
  ncmRegisters: 'ncmRegisters',
  ISBNSearch: 'ISBNSearch'
};

function App() {
  const [activeTab, setActiveTab] = useState(tabs.ncmRegisters);

  const renderTabContent = () => {
    switch(activeTab) {
      case tabs.ncmRegisters: 
        return (
          <NcmRegisterList />
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
            className={ `nav-link ${activeTab === tabs.ncmRegisters ? 'active' : ''}` }
            onClick={ () => setActiveTab(tabs.ncmRegisters) }
          >
            NCM Registers
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
