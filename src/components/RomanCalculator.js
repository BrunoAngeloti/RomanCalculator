import { useState } from 'react';
import '../styles/components/RomanCalculator.css';

import iconSend from '../assets/send.svg'
import info from '../assets/info.svg'

import Swal from 'sweetalert2'

function RomanCalculator() {

    const [expression, setExpression] = useState('');
    const [clear, setClear] = useState(true);
    const [result, setResult] = useState();
    const [messageError, setMessageError] = useState('');
    const [error, setError] = useState(false);

    // Função para converter um inteiro para algarismo romano
    function intToRoman(num) {
        var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
        "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
        "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman_num = "",
        i = 3;

        while (i--)
            roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num;
        return Array(+digits.join("") + 1).join("M") + roman_num;
    }

    // Função para converter caracter para inteiro
    function char_to_int(c){
        switch (c){
            case 'I': return 1;
            case 'V': return 5;
            case 'X': return 10;
            case 'L': return 50;
            case 'C': return 100;
            case 'D': return 500;
            case 'M': return 1000;
            default: return -1;
        }
    }

    // Função para converter um algarismo romano para inteiro
    function romanToInt(str1) {
        if(str1 == null) return -1;
        var num = char_to_int(str1.charAt(0));
        var pre, curr;
        
        for(var i = 1; i < str1.length; i++){
            curr = char_to_int(str1.charAt(i));
            pre = char_to_int(str1.charAt(i-1));
            if(curr === -1 || pre === -1) return -1;
            if(curr <= pre){
                num += curr;
            } else {
                num = num - pre*2 + curr;
            }
        }
        
        return num;
    }

    // Função para calcular a expressão dada
    function calculation(expression){
        var res = 0;
        var aux = 0;
        for(var i = 0; i < expression.length; i = i+2){
            if(i > 1){
                if(expression[i-1] === '+' && expression[i] !== '+' && expression[i] !== '-'){      
                    aux = romanToInt(expression[i].toUpperCase());
                    res += aux;
                }else if(expression[i-1] === '-' && expression[i] !== '+' && expression[i] !== '-'){
                    aux = romanToInt(expression[i].toUpperCase());                
                    res -= aux;
                }else{
                    setMessageError("EXPRESSÃO INVALIDA");
                    return;
                }
            }else{
                aux = romanToInt(expression[i].toUpperCase());
                res += aux;
            }
            if(aux === -1){
                setMessageError("EXPRESSÃO INVALIDA");
                return;
            }
        }

        if(res < 0){
            setMessageError("NAO EXISTE ALGARISMOS NEGATIVOS");
            return;
        }else if(res === 0){
            setMessageError("IMPOSSIVEL REPRESENTAÇÃO PARA ZERO");
            return;
        }

        return res;
    }

    // Função para pegar a expressão passada pelo input e transformar no padrão do código
    function getExpression(e){
        e.preventDefault();
        let separators = ["+", '-'];

        //Elimina todos os possíveis espaços
        let expres = expression.split(' ').join('');

        //Faz um split da expressão pelo + ou -
        let numbers = expres.split(new RegExp('(['+ separators.join('') + '])'))

        setExpression(expres);
        let res = calculation(numbers);

        //Caso seja NULL existe algum erro
        if(res == null){
            setError(true);
            return;
        };
        setClear(false);
        setResult(res);
    }

    // Função para setar estados quando o input for alterado
    function HandleChange(e){
        setExpression(e.target.value)
        setClear(true)
        setError(false)
    }

    function ClickInfo(){
        Swal.fire({
            title: '<strong>DICAS</strong>',
            icon: 'info',
            html:
              'Entre com uma expressão válida, por exemplo:</br><strong>X+L+C</strong></br></br>' +
              'Esta calculadora só faz <strong>somas</strong> e <strong>subtrações</strong>.</br>'
          })
    }

    return (
        <div className="container">
            <div className="title">
                <h1>ROMAN CALCULATOR</h1>
                <img onClick={ClickInfo} className="iconInfo" src={info} alt="detalhes" />
            </div>
            
            <form onSubmit={getExpression}>
                <input required placeholder="insira a expressão..." onChange={HandleChange} type="text" />   
                <button type="submit">
                    <img src={iconSend} alt="Icone de enviar" />
                </button>
            </form>

            {
                !clear && (
                    <div className="results">
                        <h2>RESULT:</h2>
                        <p>{result}</p>
                        <h2>EXPRESSION:</h2>
                        <p>{expression.toUpperCase()} = {intToRoman(result)}</p>                                
                    </div>                 
                ) 
            }

            {
                error && (
                    <div className="error">
                        <h2>{messageError}</h2>                              
                    </div>                 
                ) 
            }
        </div>
    );
}

export default RomanCalculator;
