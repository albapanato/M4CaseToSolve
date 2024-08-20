import React, { useRef, useEffect } from "react";

const InputsValidation = ({ register, errors, setCode }) => {
  const inputsRef = useRef([]); // Creamos una variable que almacene referencias a cada input

  useEffect(() => {
    const newValues = inputsRef.current.map((input) => input.value).join("");
    setCode(newValues);
  }, [setCode]);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value)) {
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
      const newValues = inputsRef.current.map((input) => input.value).join("");
      setCode(newValues);
      console.log("newValues", newValues);
    }
    register(`code[${index}]`).onChange(e);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const setRef = (el, index) => {
    inputsRef.current[index] = el;
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          className={`w-10 h-10 text-center text-xl border ${
            errors.code ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:border-blue-500 focus:shadow-outline`}
          ref={(input) => {
            setRef(input, index);
            register(`code[${index}]`);
          }}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};

export default InputsValidation;
