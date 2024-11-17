import React, { useState } from 'react';

const ScientificCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const calculateResult = () => {
    try {
      const evalResult = eval(input);
      setResult(evalResult);
    } catch (error) {
      setResult("Error");
    }
  };

  const handleAdvancedOperation = (operation) => {
    try {
      let evaluated;
      switch (operation) {
        case "sqrt":
          evaluated = Math.sqrt(eval(input));
          break;
        case "log":
          evaluated = Math.log10(eval(input));
          break;
        case "ln":
          evaluated = Math.log(eval(input));
          break;
        case "sin":
          evaluated = Math.sin(eval(input));
          break;
        case "cos":
          evaluated = Math.cos(eval(input));
          break;
        case "tan":
          evaluated = Math.tan(eval(input));
          break;
        default:
          evaluated = '';
      }
      setResult(evaluated);
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 ">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg" style={{'margin':'30px'}}>
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">ماشین حساب</h1>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-4 text-right text-2xl text-gray-800 h-20 flex items-center justify-end">
          {input || "0"}
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-right text-2xl text-green-700 h-16 flex items-center justify-end">
          {result || "Result"}
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleInput(num.toString())}
              className="bg-gray-300 p-4 rounded-lg text-2xl hover:bg-gray-400"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleInput('/')}
            className="bg-indigo-500 p-4 rounded-lg text-2xl text-white hover:bg-indigo-600"
          >
            ÷
          </button>

          {[4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => handleInput(num.toString())}
              className="bg-gray-300 p-4 rounded-lg text-2xl hover:bg-gray-400"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleInput('*')}
            className="bg-indigo-500 p-4 rounded-lg text-2xl text-white hover:bg-indigo-600"
          >
            ×
          </button>

          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => handleInput(num.toString())}
              className="bg-gray-300 p-4 rounded-lg text-2xl hover:bg-gray-400"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleInput('-')}
            className="bg-indigo-500 p-4 rounded-lg text-2xl text-white hover:bg-indigo-600"
          >
            −
          </button>

          <button
            onClick={() => handleInput('0')}
            className="bg-gray-300 p-4 rounded-lg text-2xl hover:bg-gray-400 col-span-2"
          >
            0
          </button>
          <button
            onClick={() => handleInput('.')}
            className="bg-gray-300 p-4 rounded-lg text-2xl hover:bg-gray-400"
          >
            .
          </button>
          <button
            onClick={() => handleInput('+')}
            className="bg-indigo-500 p-4 rounded-lg text-2xl text-white hover:bg-indigo-600"
          >
            +
          </button>

          <button onClick={() => handleAdvancedOperation('sqrt')} className="bg-blue-500 p-4 rounded-lg text-xl text-white hover:bg-blue-600">
            √
          </button>
          <button onClick={() => handleAdvancedOperation('log')} className="bg-blue-500 p-4 rounded-lg text-xl text-white hover:bg-blue-600">
            log
          </button>
          <button onClick={() => handleAdvancedOperation('ln')} className="bg-blue-500 p-4 rounded-lg text-xl text-white hover:bg-blue-600">
            ln
          </button>
          <button onClick={calculateResult} className="bg-green-600 p-4 rounded-lg text-xl text-white hover:bg-green-700 col-span-1">
            =
          </button>

          <button onClick={() => handleAdvancedOperation('sin')} className="bg-blue-500 p-4 rounded-lg text-xl text-white hover:bg-blue-600">
            sin
          </button>
          <button onClick={() => handleAdvancedOperation('cos')} className="bg-blue-500 p-4 rounded-lg text-xl text-white hover:bg-blue-600">
            cos
          </button>
          <button onClick={() => handleAdvancedOperation('tan')} className="bg-blue-500 p-4 rounded-lg text-xl text-white hover:bg-blue-600">
            tan
          </button>
          <button onClick={handleClear} className="bg-red-600 p-4 rounded-lg text-xl text-white hover:bg-red-700 col-span-1">
            C
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
