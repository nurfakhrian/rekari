import React, { Component } from 'react';
import Select from 'react-select';
import Card from '../../common/Card';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nSubPart: 2,
            section: "",
            subParts: [
                {name: ""},
                {name: ""}
            ],
            selectSection: null,

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderSubPart = this.renderSubPart.bind(this);
        this.handleChangeSubPart = this.handleChangeSubPart.bind(this);
    }

    handleChange(e) {
        if (e.target.name === "nSubPart" && e.target.value > 1) {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
        if (e.target.name !== "nSubPart") {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }

    handleChangeSelect(selectSection) {
        this.setState(
            { selectSection, section: selectSection.value }
        );
    }

    handleChangeSubPart(e) {
        let tempSubParts = [ ...this.state.subParts ];
        tempSubParts[e.target.dataset.index] = {name: e.target.value};
        this.setState(
            { subParts: tempSubParts }
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        let nullSubPart = false;
        for (let i = 0; i < this.state.subParts.length; i++) {
            console.log(this.state.subParts[i].name)
            if (this.state.subParts[i].name === "") {
                console.log(this.state.subParts[i].name);
                nullSubPart = true;
                break;
            }
        }
        if (this.state.name && 
            this.state.nSubPart > 1 && 
            this.state.section &&
            !nullSubPart) {
            const { selectSection, ...newData } = this.state;
            axios.post('http://localhost:3028/typepart/add', newData)
                .then(response => {
                    this.props.history.push("./detail/" + response.data.message.id)
                })
                .catch(err => console.log(err.response.data.message));
        }
        else {
            alert("Form tidak boleh kosong/salah.");
        }
    }

    renderSubPart() {
        const subPartElem = index => (
            <div className="form-group" key={index}>
                <label>Sub Part {index + 1}</label>
                <input
                    // value={this.state.subPart[index]}
                    data-index={index}
                    onChange={this.handleChangeSubPart}
                    type="text"
                    className="form-control"
                    name="subPart" />
            </div>
        );
        let subPartForm = [];
        for (let i = 0; i < this.state.nSubPart ; i++) {
            subPartForm.push(subPartElem(i));
        }
        return subPartForm;
    }

    render() {
        const sectionOptions = [
            { value: 'master', label: 'Master' },
            { value: 'caliper', label: 'Caliper' }
        ];
        return (
            <Card title="Tambah Data" col={6}>
                <form
                    onSubmit={this.handleSubmit}
                    noValidate>
                    <div className="form-group">
                        <label htmlFor="iNama">Nama</label>
                        <input
                                id="iNama"
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="iSection">Section</label>
                        <Select
                            id="iSection"
                            placeholder="Pilih Section"
                            value={this.state.selectSection}
                            onChange={this.handleChangeSelect}
                            options={sectionOptions} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inSubPart">Jumlah Sub Part</label>
                        <input
                                id="inSubPart"
                                type="number"
                                className="form-control"
                                name="nSubPart"
                                value={this.state.nSubPart}
                                onChange={this.handleChange} />
                    </div>
                    <div className="ml-5">
                        {this.renderSubPart().map(component => {
                            return component;
                        })}
                    </div>
                    <div className="d-flex">
                        <Link to="/dashboard/tipe-part"
                            className="btn btn-cc btn-cc-white btn-cc-radius-normal ml-0 py-2 px-5">
                            <i><FontAwesomeIcon icon={faArrowLeft} /></i>&nbsp;Semua
                        </Link>
                        <button type="submit"
                            className="ml-auto btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5">
                            <i><FontAwesomeIcon icon={faPlusSquare} /></i>&nbsp;Tambahkan
                        </button>
                    </div>
                </form>
            </Card>
        )
    }
}

export default Add;
