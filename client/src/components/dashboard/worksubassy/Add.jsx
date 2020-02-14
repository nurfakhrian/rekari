import React, { Component } from 'react';
import { connect } from 'react-redux';
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
            typeParts: [],
            // typePartsSelect: [],
            subParts: [],
            total: 1
        }
        // this.state = {
        //     name: "",
        //     nSubPart: 2,
        //     section: "",
        //     subParts: [
        //         {name: ""},
        //         {name: ""}
        //     ],
        //     selectSection: null,

        // }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.renderSubPart = this.renderSubPart.bind(this);
        // this.handleChangeSubPart = this.handleChangeSubPart.bind(this);
    }

    componentDidMount() {
        axios.post('http://localhost:3028/typepart')
            .then(response => {
                this.setState({
                    typeParts: response.data.message.map(
                        item => ({ value: item.id, label: item.name, ...item })
                    )
                }, () => console.log(this.state));
            })
            .catch(err => console.log(err.response.data.message));
    }

    handleChangeSelect(selected) {
        this.setState(
            { subParts: selected.subParts }, () => console.log(this.state)
        );
    }

    handleChange(e) {
        if (e.target.name === "nSubPart" && e.target.value > 0) {
            this.setState({
                total: parseInt(e.target.value)
            }, () => console.log(this.state));
        }
    }

    renderSubPart() {
        const subPartElem = (index, id, name) => (
            <div className="form-group" key={index}>
                <label>{name}</label>
                <input
                    // value={this.state.subPart[index]}
                    data-index={index}
                    // onChange={this.handleChangeSubPart}
                    type="text"
                    className="form-control"
                    name="lotSubPartCode" />
            </div>
        );
        let subPartForm = [];
        this.state.subParts.forEach((item, index) => {
            subPartForm.push(subPartElem(index, item.id, item.name));
        });
        return subPartForm;
    }

    handleSubmit() {

    }

    render() {
        // console.log(this.props.auth.id);
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
                            // value={this.state.selectSection}
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
