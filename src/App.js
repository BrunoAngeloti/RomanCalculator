import './styles/App.css';
import RomanCalculator from './components/RomanCalculator'

import fundoDesktop from './assets/fundoDesktop.svg'
import fundoCelular from './assets/fundoCelular.svg'

function App() {
  return (
    <div className="App">
      <RomanCalculator />
      <footer>
        Made with ❤️ by Bruno Angeloti
      </footer>
      <img className="imagemFundoDesktop" src={fundoDesktop} alt="imagem Fundo" />
      <img className="imagemFundoCelular" src={fundoCelular} alt="imagem Fundo" />
    </div>
  );
}

export default App;
