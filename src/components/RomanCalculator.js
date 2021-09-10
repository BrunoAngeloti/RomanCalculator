import { useState } from 'react';
import '../styles/components/RomanCalculator.css';

function RomanCalculator() {

    const [expression, setExpression] = useState('');

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
        var sum = 0;
        for(var i = 0; i < expression.length; i = i+2){
            if(i > 1){
                if(expression[i-1] === '+'){
                    sum += romanToInt(expression[i]);
                }else if(expression[i-1] === '-'){
                    sum -= romanToInt(expression[i]);
                }else{
                    console.log("IMPOSSIVEL")
                }
            }else{
                sum += romanToInt(expression[i]);
            }
            
        }

        return sum;
    }

    function getExpression(e){
        e.preventDefault();

        let separators = ["+", '-'];
        let expres = expression.split(' ').join('');
        let numbers = expres.split(new RegExp('(['+ separators.join('') + '])'))

        console.log(numbers);

        let res = calculation(numbers);
        
        console.log(res)
    }

    function handleChange(e) {
        setExpression(e.target.value);
    }

    return (
        <div className="container">
            <form onSubmit={getExpression}>
                <h1>Roman Calculator</h1>
                <input onChange={handleChange} type="text" />
                <button type="submit">Calcular</button>
            </form>
        </div>
    );
}

export default RomanCalculator;
