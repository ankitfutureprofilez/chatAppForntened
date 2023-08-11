import React, { useState } from 'react';
function Regex() {

    const [inputText, setInputText] = useState('');
    const [sanitizedText, setSanitizedText] = useState('');
  
    const sanitizeText = (text) => {
        // Replace multiple consecutive spaces with a single space
        // Remove special characters except single special characters
        const sanitizedText = text.replace(/\s+/g, ' ').replace(/([^\w\s])\1+/g, '$1');
        return sanitizedText;
      };
    
      const handleInputChange = (event) => {
        const text = event.target.value;
        setInputText(text);
        const sanitized = sanitizeText(text);
        setSanitizedText(sanitized);
      };

    return ( 
        <div>
        <textarea
          rows="5"
          cols="50"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text with special characters and multiple spaces"
        />
        <div>
          <h2>Sanitized Text:</h2>
          <p>{sanitizedText}</p>
        </div>
      </div>
     );
}

export default Regex;