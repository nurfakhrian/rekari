import React, { Component } from 'react';
import Card from '../../common/Card';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import bwipjs from 'bwip-js';
import moment from 'moment';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.logpartId,
            lotpartBarcode: "",
            typePart: {name:""},
            lotPartsLotSubParts: [],
            total: 0,
            operator: {name:"", code:"", role:""},
            createdAt: new Date()
        }
    }

    componentDidMount() {
        axios.post(`http://${process.env.REACT_APP_API_URL || 'localhost'}:3028/lotpart/detail`, { id: this.state.id })
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
                }, () => {
                    const canvasBarcode = document.createElement('canvas');
                    bwipjs.toCanvas(canvasBarcode, {
                        bcid: 'qrcode',
                        text: this.state.lotpartBarcode,
                        scale: 2,
                        version: 5
                    });
                    document.getElementById("imgBarcode").src = canvasBarcode.toDataURL('image/png');
                });
            })
            .catch(err => console.log(err.response.data.message));
    }

    render() {
        const roleOptions = [
            { value: 'su', label: 'Super Admin' },
            { value: 'admin', label: 'Admin' },
            { value: 'operator', label: 'Operator' }
        ];
        return (
            <Card title="Detail Sub Assy" col={6}>
                <div className="text-center">
                    <img id="imgBarcode" alt="barcode"/>
                </div>
                <div className="form-group">
                    <label htmlFor="iCode">Code</label>
                    <input
                            id="iCode"
                            type="text"
                            className="form-control"
                            name="iCode"
                            value={this.state.lotpartBarcode}
                            readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="iTime">Time</label>
                    <input
                            id="iTime"
                            type="text"
                            className="form-control"
                            name="iTime"
                            value={moment(this.state.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                            readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="iTotal">Total (SNP)</label>
                    <input
                            id="iTotal"
                            type="text"
                            className="form-control"
                            name="iTotal"
                            value={this.state.total}
                            readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="iOperator">Operator</label>
                    <input
                            id="iOperator"
                            type="text"
                            className="form-control"
                            name="iOperator"
                            value={this.state.operator.code}
                            readOnly />
                </div>
                <div className="ml-5">
                    <div className="form-group">
                        <label htmlFor="iOperatorName">Name</label>
                        <input
                                id="iOperatorName"
                                type="text"
                                className="form-control"
                                name="iOperatorName"
                                value={this.state.operator.name}
                                readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="iOperatorRole">Role</label>
                        <input
                                id="iOperatorRole"
                                type="text"
                                className="form-control"
                                name="iOperatorRole"
                                value={
                                    (roleOptions.find(o => o.value === this.state.operator.role) === undefined) ? "" :
                                    roleOptions.find(o => o.value === this.state.operator.role).label
                                }
                                readOnly />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="iTypePart">Tipe Part</label>
                    <input
                            id="iTypePart"
                            type="text"
                            className="form-control"
                            name="iTypePart"
                            value={this.state.typePart.name}
                            readOnly />
                </div>
                <div className="ml-5">
                    {this.state.lotPartsLotSubParts.map((item, i) => (
                        <div key={i} className="form-group">
                            <label htmlFor={"iSubpart" + i}>{item.subPartName}</label>
                            <input
                                    id={"iSubpart" + i}
                                    type="text"
                                    className="form-control"
                                    name="section"
                                    value={item.lotSubPartCode}
                                    readOnly />
                        </div>
                    ))}
                </div>
                
                <div className="d-flex">
                    <Link to="/dashboard/work-subassy"
                        className="btn btn-cc btn-cc-white btn-cc-radius-normal ml-0 py-2 px-5">
                        <i><FontAwesomeIcon icon={faArrowLeft} /></i>&nbsp;Semua
                    </Link>
                    <Link to={{pathname: `/dashboard/work-subassy/edit/${this.state.id}`}}
                        className="ml-auto btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5">
                        <i><FontAwesomeIcon icon={faEdit} /></i>&nbsp;Edit
                    </Link>
                </div>
            </Card>
        )
    }
}

export default Detail;
