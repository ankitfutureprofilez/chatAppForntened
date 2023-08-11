import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { PDFDocument } from 'pdfjs-dist';
import axios from 'axios';
import Api from "../Api/Api";


function PdfView() {
    const [pdfFile, setPDFFile] = useState(null);
    const [viewPdf, setViewPdf] = useState(null);

    const fileType = ["application/pdf"];

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onload = () => {
                    setPDFFile(reader.result);
                    console.log("PDF Data URL:", reader.result);
                };
                reader.onerror = () => {
                    console.log("File error: ", reader.error);
                };
            } else {
                setPDFFile(null);
            }
        } else {
            console.log("Select a PDF file.");
        }
    };

    //    const handleFileChange = async (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = async (e) => {
    //       const contents = e.target.result;
    //       const pdf = await PDFDocument.load(contents);
    //       const pages = pdf.getPages();
    //       let extractedText = '';

    //       for (const page of pages) {
    //         const textContent = await page.getTextContent();
    //         const pageText = textContent.items.map((item) => item.str).join(' ');
    //         extractedText += pageText;
    //       }
    //       console.log("extractedText",extractedText)
    //     };

    //     reader.readAsArrayBuffer(file);
    //   };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pdfFile !== null) {
            setViewPdf(pdfFile);
        } else {
            setViewPdf(null);
        }
    };

    const newPlugin = defaultLayoutPlugin();

    // const [pdfFiles, setpdfFiles] = useState(null);

    // async function handlePDF(e) {
    //     const main = new OpenAi();
    //     const fdata = new FormData;
    //     fdata.append("file", e);
    //     const resp = main.pdf(e);
    //     resp.then((res) => {
    //         if (res.data.status) {
    //             console.log(res.data.msg)
    //             if (res.data.user) {
    //             }
    //         } else {
    //             console.error("status login error", res);
    //         }
    //     }).catch((err) => {
    //         console.log("login err", err)
    //     });
    // }

    // const uploadPDF = async (e) => {
    //     const selectedFile = await e.target.files[0];
    //     handlePDF(selectedFile);
    // }

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };

      const handleUpload = () => {
        const formData = new Api();
         const main= formData.views();
        formData.append('file', selectedFile);
    
        axios.post('http://localhost:3000/upload', formData)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
          });
      };
    

    return (
        <div className="container">
            <form onSubmit={handleUpload}>
                <input type="file" className="form-control" onChange={handleFileChange}/>
                <button className="btn btn-success">View PDF</button>
            </form>
            <h2>View PDF</h2>

            <div className="pdf-container">
                <Worker
                    workerUrl="https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js"
                >
                    {viewPdf && <Viewer fileUrl={viewPdf} plugins={[newPlugin]} />}
                </Worker>
            </div>
        </div>
    );
}

export default PdfView;


