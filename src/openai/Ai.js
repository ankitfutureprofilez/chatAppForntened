

const axios = require('axios');

// Set up your API credentials

function Ai() {
    
    const apiKey = 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;
    const apiUrl = 'http://localhost:8080/findAnswer';

    async function sendMessage(message) {
        try {
          const response = await axios.post(apiUrl, {
            messages: [{ role: 'system', content: 'user' }, { role: 'user', content: message }],
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${apiKey}`,
            },
        });
      
          const reply = response.data.choices[0].message.content;
          return reply;
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
    }
      
      // Example usage
      const userMessage = 'Hello, how are you?';
      sendMessage(userMessage)
        .then(reply => {
          console.log('Chatbot reply:', reply);
        })
        .catch(error => {
          console.error('Error:', error);
        });


    return (

        <>
        </>
      );
}

export default Ai;



