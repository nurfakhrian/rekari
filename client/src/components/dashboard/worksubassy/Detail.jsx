import React, { Component } from 'react';
import Card from '../../common/Card';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import bwipjs from 'bwip-js';
import Swal from 'sweetalert2';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.logpartId,
            lotpartBarcode: "",
            typePart: {},
            lotPartsLotSubParts: [],
            total: 0,
            operator: {name:"", code:""},
            createdAt: null
        }
    }

    componentDidMount() {
        axios.post('http://localhost:3028/lotpart/detail', { id: this.state.id })
            .then(response => {
                const {
                    lotpartBarcode,
                    typePart,
                    lotPartsLotSubParts,
                    total,
                    operator,
                    createdAt } = response.data.message;
                this.setState({
                    lotpartBarcode,
                    typePart,
                    lotPartsLotSubParts,
                    total,
                    operator,
                    createdAt
                }, () => console.log(this.state));
            })
            .catch(err => console.log(err.response.data.message));
    }

    renderSubPart() {
        // const subPartElem = (index, id, name) => (
        //     <div className="form-group" key={index}>
        //         <label>{name}</label>
        //         <input
        //             id={"subPart" + index}
        //             tabIndex="-1"
        //             data-index={index}
        //             data-idsubpart={id}
        //             data-namesubpart={name}
        //             // onChange={this.handleChangeSubPart}
        //             // value={this.state.subPartsToSend[index].lotSubPartCode}
        //             type="text"
        //             className="form-control"
        //             name="lotSubPartCode" />
        //     </div>
        // );
        // let subPartForm = [];
        // this.state.subPartsFromDb.forEach((item, index) => {
        //     subPartForm.push(subPartElem(index, item.id, item.name));
        // });
        // return subPartForm;
    }

    render() {
        return (
            <Card title="Detail Sub Assy" col={6}>
                <form
                    // onSubmit={this.handleSubmit}
                    noValidate>
                    <div className="form-group">
                        <label htmlFor="iCode">Code</label>
                        <input
                                id="iCode"
                                type="text"
                                className="form-control"
                                name="barcode"
                                value={this.state.lotpartBarcode}
                                readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="iTotal">Total (SNP)</label>
                        <input
                                id="iTotal"
                                type="text"
                                className="form-control"
                                name="total"
                                value={this.state.total}
                                readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="iOperator">Operator ID</label>
                        <input
                                id="iOperator"
                                type="text"
                                className="form-control"
                                name="iOperator"
                                value={this.state.operator.code}
                                readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="iOperatorName">Operator Name</label>
                        <input
                                id="iOperatorName"
                                type="text"
                                className="form-control"
                                name="section"
                                value={this.state.operator.name}
                                readOnly />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="iTipe">Tipe Part</label>
                        <Select
                            id="iTipe"
                            placeholder="Pilih Tipe Part"
                            // onChange={this.handleChangeSelect}
                            options={this.state.typeParts}
                            />
                    </div> */}
                    {/* <div className="ml-5">
                        {this.renderSubPart().map(component => {
                            return component;
                        })}
                    </div> */}
                    {/* <div className="form-group">
                        <label htmlFor="iNPerLot">Jumlah per Lot</label>
                        <input
                                id="iNPerLot"
                                type="number"
                                className="form-control"
                                name="nSubPart"
                                // value={this.state.total}
                                // onChange={this.handleChange}
                                />
                    </div> */}
                    
                    <div className="d-flex">
                        <Link to="/dashboard/work-subassy"
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

export default Detail;
