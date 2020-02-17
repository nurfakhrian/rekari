import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Card from '../../common/Card';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import bwipjs from 'bwip-js';
import Swal from 'sweetalert2';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeParts: [],
            subPartsFromDb: [],
            // datasend/payload
            typePartId: null,
            total: 1,
            subPartsToSend: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSubPart = this.handleChangeSubPart.bind(this);
    }

    generateUnique = () => {
        const length = 15;
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
     }

    // resetSubPartCode() {
    //     this
    // }

    componentDidMount() {
        axios.post('http://localhost:3028/typepart')
            .then(response => {
                this.setState({
                    typeParts: response.data.message.map(
                        item => ({ value: item.id, label: item.name, ...item })
                    )
                });
            })
            .catch(err => console.log(err.response.data.message));
    }

    handleChangeSelect(selected) {
        let tempSubPartsToSend = [];
        selected.subParts.forEach(item => {
            tempSubPartsToSend.push({lotSubPartCode: "", subPartName: item.name});
        })
        this.setState({
            subPartsFromDb: selected.subParts,
            typePartId: selected.value,
            subPartsToSend: tempSubPartsToSend
        });
    }

    handleChangeSubPart(e) {
        // e.preventDefault();
        // console.log(e.target.value);
        let tempSubPartsToSend = [ ...this.state.subPartsToSend ];
        tempSubPartsToSend[e.target.dataset.index] = {
            lotSubPartCode: e.target.value.replace(/\s/g, ''),
            subPartName: this.state.subPartsToSend[e.target.dataset.index].subPartName
        };
        this.setState(
            { subPartsToSend: tempSubPartsToSend }
        );
        const catchGroup = /=.*-BR0.*(PC)\s(\d+)/.exec(e.target.value);
        console.log(catchGroup);
    }

    handleChange(e) {
        if (e.target.name === "nSubPart" && e.target.value > 0) {
            this.setState({
                total: parseInt(e.target.value)
            });
        }
    }

    renderSubPart() {
        const subPartElem = (index, id, name) => (
            <div className="form-group" key={index}>
                <label>{name}</label>
                <input
                    id={"subPart" + index}
                    tabIndex="-1"
                    data-index={index}
                    data-idsubpart={id}
                    data-namesubpart={name}
                    onChange={this.handleChangeSubPart}
                    value={this.state.subPartsToSend[index].lotSubPartCode}
                    type="text"
                    className="form-control"
                    name="lotSubPartCode" />
            </div>
        );
        let subPartForm = [];
        this.state.subPartsFromDb.forEach((item, index) => {
            subPartForm.push(subPartElem(index, item.id, item.name));
        });
        return subPartForm;
    }

    async handleSubmit(e) {
        e.preventDefault();
        let nullSubPart = false;
        for (let i = 0; i < this.state.subPartsFromDb.length; i++) {
            if (this.state.subPartsToSend[i].lotSubPartCode === "") {
                nullSubPart = true;
                break;
            }
        }
        if (this.state.typePartId && this.state.total > 0 && !nullSubPart) {
            const generatedUnique = this.generateUnique();
            try {
                const newLog = await axios.post('http://localhost:3028/lotpart/add', {
                    lotpartBarcode: generatedUnique,
                    total: this.state.total,
                    operatorId: this.props.auth.id,
                    typePartId: this.state.typePartId,
                    lotPartsLotSubParts: this.state.subPartsToSend
                });
                if (newLog.data.message.id) {
                    try {
                        const canvasBarcode = document.createElement('canvas');
                        bwipjs.toCanvas(canvasBarcode, {
                            bcid: 'qrcode',
                            text: generatedUnique,
                            scale: 4
                        });
                        Swal.fire({
                            title: "Data berhasil ditambahkan!",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            html: `
                                <img src="${canvasBarcode.toDataURL('image/png')}" alt="barcode"/>
                                <p class="h3 mt-3 font-weight-bold">${generatedUnique}</p>`,
                            backdrop:true,
                            allowOutsideClick: false,
                            onClose: () => {
                                setTimeout(() => {
                                    document.getElementById("subPart0").focus()
                                }, 500);
                            }
                        }).then(result => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                console.log("lolo")
                            }
                        });
                        const resetSubPartsToSend = this.state.subPartsToSend.map(obj => ({...obj, lotSubPartCode: ""}));
                        this.setState({
                            subPartsToSend: resetSubPartsToSend
                        });
                    }
                    catch(e) {
                        console.log(e);
                    }
                }
            }
            catch(err) {
                console.log(err.response.data.message);
            }
        }
        else {
            alert("Form tidak boleh kosong/salah.");
        }
    }

    render() {
        return (
            <Card title="Tambah Data Log" col={6}>
                <form
                    onSubmit={this.handleSubmit}
                    noValidate>
                    <div className="form-group">
                        <label htmlFor="iTipe">Tipe Part</label>
                        <Select
                            id="iTipe"
                            placeholder="Pilih Tipe Part"
                            onChange={this.handleChangeSelect}
                            options={this.state.typeParts}
                            />
                    </div>
                    <div className="ml-5">
                        {this.renderSubPart().map(component => {
                            return component;
                        })}
                    </div>
                    <div className="form-group">
                        <label htmlFor="iNPerLot">Jumlah per Lot</label>
                        <input
                                id="iNPerLot"
                                type="number"
                                className="form-control"
                                name="nSubPart"
                                value={this.state.total}
                                onChange={this.handleChange}
                                />
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

const mapState = (state) => ({
    auth: state.auth
});

export default connect(mapState)(Add);
