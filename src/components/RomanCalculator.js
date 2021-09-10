import { useState } from 'react';
import '../styles/components/RomanCalculator.css';

function RomanCalculator() {

    const [expression, setExpression] = useState('');
    const [clear, setClear] = useState(false);
    const [expressionFinal, setExpressionFinal] = useState('');
    const [result, setResult] = useState();

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

    function romanToInt(str1) {
        if(str1 == null) return -1;
        var num = char_to_int(str1.charAt(0));
        var pre, curr;
        
        for(var i = 1; i < str1.length; i++){
            curr = char_to_int(str1.charAt(i));
            pre = char_to_int(str1.charAt(i-1));
            if(curr <= pre){
                num += curr;
            } else {
                num = num - pre*2 + curr;
            }
        }
        
        return num;
    }

    function calculation(expression){
        var res = 0;
        for(var i = 0; i < expression.length; i = i+2){
            if(i > 1){
                if(expression[i-1] === '+'){              
                    res += romanToInt(expression[i]);
                }else if(expression[i-1] === '-'){
                    res -= romanToInt(expression[i]);
                }else{
                    console.log("IMPOSSIVEL")
                }
            }else{
                res += romanToInt(expression[i]);
            }
        }

        return res;
    }

    function getExpression(e){
        e.preventDefault();

        let separators = ["+", '-'];
        let expres = expression.split(' ').join('');
        let numbers = expres.split(new RegExp('(['+ separators.join('') + '])'))

        setExpression(expres);
        setClear(true);

        let res = calculation(numbers);
        setResult(res);
    }

    function HandleChange(e){
        setExpression(e.target.value)
        setClear(false)
    }

    return (
        <div className="container">
            <h1>Roman Calculator</h1>
            <form onSubmit={getExpression}>
                <input onChange={HandleChange} type="text" />   
                <button type="submit">Calcular</button>
            </form>

            {
                clear && (
                    <div>
                        <p>A resposta é: {result}</p>
                        <p>{expression} = {intToRoman(result)}</p>
                    </div>                 
                ) 
            }
            
        </div>
    );
}

export default RomanCalculator;
