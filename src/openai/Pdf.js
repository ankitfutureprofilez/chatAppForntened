import React, { Component } from "react";
import { render } from "react-dom";

class Pdf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: "",
            fileContent: "",
        };
    }

    handleChange = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsText(file);

            reader.onload = () => {
                this.setState({
                    fileName: file.name,
                    fileContent: reader.result,
                });
            };

            reader.onerror = () => {
                console.log("File error: ", reader.error);
            };
        }
    }

    render() {
        return (
            <div>
                <h2>File Reader</h2>
                <input type="file" onChange={this.handleChange}></input>
                <br />
                <h5>{this.state.fileName}</h5>
                <p>{this.state.fileContent}</p>
            </div>
        );
    }
}

export default Pdf;
