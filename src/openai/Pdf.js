import React, { Component } from "react";
import { render } from "react-dom"

class Pdf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: "",
            fileContext: "",
        }
    }
    handlechange = e => {
        const file = e.target.files[0];
        console.log("file",file)

        const Reader = new FileReader();
        console.log("render",Reader)
        Reader.readAsText(file);
        Reader.onload = () => {
            this.setState({
                fileName: file.name,
                fileContext: Reader.result
            });
            Reader.onerror = () => {
                console.log("fille error ", Reader.error)
            }
        }
    }


    render() {
        return (
            <div>
                <h2>File Reader </h2>
                <input type="file" onChange={this.handlechange}></input>
                <br />
                <h5>{this.state.fileName}</h5>
                <p>{this.state.fileContext}</p>
            </div>
        );
    }
}

export default Pdf;