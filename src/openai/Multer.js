import React, { useState } from 'react';
import axios from 'axios';
function Multer() {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };



    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post('http://localhost:8080/multer', formData)
            .then((response) => {
                const reader=response.data;

                console.log(reader);
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    };

    return (
        <>

            <div>
                <h1>File Upload Example</h1>
                <input type="file" accept=".pdf" onChange={handleFileChange} />

                <button onClick={handleUpload}>Upload</button>
            </div>
            <div>
               
            </div>
        </>
    );
}

export default Multer;