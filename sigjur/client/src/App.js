import 'antd/dist/antd.css';
import React, { Component } from 'react';
import './App.scss';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout
/* // /client/src/App.js

import React, { useState, useEffect } from "react";

// SERVICES
import lawsuitService from './services/lawsuitService';

function App() {
  const [lawsuits, setlawsuits] = useState(null);

  useEffect(() => {
    if(!lawsuits) {
      getLawsuits();
    }
  })

  const getLawsuits = async () => {
    let res = await lawsuitService.getAll();
    console.log(res);
    setlawsuits(res);
  }

  const renderLawsuit = lawsuit => {
    return (
      <li key={lawsuit._id} className="list__item lawsuit">
        <h3 className="lawsuit__name">{lawsuit.name}</h3>
        <p className="lawsuit__description">{lawsuit.description}</p>
      </li>
    );
  };

  return (
    <div className="App">
      <ul className="list">
        {(lawsuits && lawsuits.length > 0) ? (
          lawsuits.map(lawsuit => renderLawsuit(lawsuit))
        ) : (
          <p>No lawsuits found</p>
        )}
      </ul>
    </div>
  );
}

export default App; */




class App extends Component {
    render() {
        return (
            <div className="App" style={{ height: '100%' }}>
                <Layout className="layout">
                    <Header>
                        <h3 className="logo">SigJur - Movimentação de Processos</h3>
                    </Header>
                    <Content>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'end' }}>WeNow - Soluções em T.I.</Footer>
                </Layout>
            </div>
        )
    }
}

export default App;