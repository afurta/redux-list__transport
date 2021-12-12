import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ContentBlock from "./components/ContentBlock/ContentBlock";
import { BrowserRouter } from "react-router-dom";


const App:React.FC = () => {
  return (
      <BrowserRouter>
          <div className='App'>
            <Header/>
              <ContentBlock/>
            <Footer/>
          </div>
      </BrowserRouter>
  );
};

export default App;
