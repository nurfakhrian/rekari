import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../common/Card';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.typePartId,
            name: "",
            section: "",
            subParts: [],
            nSubPart: 0
        }
        this.renderSubPart = this.renderSubPart.bind(this);
    }

    componentDidMount() {
        axios.post(`http://${process.env.REACT_APP_API_URL || 'localhost'}:3028/typepart/detail`, { id: this.state.id })
            .then(response => {
                const sectionOptions = [
                    { value: 'master', label: 'Master' },
                    { value: 'caliper', label: 'Caliper' }
                ];
                const myRole = sectionOptions.find(o => o.value === response.data.message.section);
                this.setState({
                    name: response.data.message.name,
                    section: myRole.label,
                    nSubPart: response.data.message.nSubPart,
                    subParts: response.data.message.subParts
                });
            })
            .catch(err => console.log(err.response.data.message));
    }

    renderSubPart() {
        const subPartElem = index => (
            <div className="form-group" key={index}>
                <label>Sub Part {index + 1}</label>
                <input
                    value={this.state.subParts[index].name}
                    // data-index={index}
                    // onChange={this.handleChangeSubPart}
                    type="text"
                    className="form-control"
                    name="subPart" 
                    readOnly />
            </div>
        );
        let subPartForm = [];
        for (let i = 0; i < this.state.nSubPart ; i++) {
            subPartForm.push(subPartElem(i));
        }
        return subPartForm;
    }
    
    render() {
        return (
            <Card title={this.state.name} col={6}>
                {this.props.auth.role === "su" || this.props.auth.role === "admin" ?
                <>
                    <div className="form-group">
                        <label htmlFor="iNama">Nama</label>
                        <input
                                id="iNama"
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="iSection">Section</label>
                        <input
                                id="iSection"
                                type="text"
                                className="form-control"
                                name="section"
                                value={this.state.section}
                                readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inSubPart">Jumlah Sub Part</label>
                        <input
                                id="inSubPart"
                                type="text"
                                className="form-control"
                                name="nSubPart"
                                value={this.state.nSubPart}
                                readOnly />
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
                        <Link to={{pathname: `/dashboard/tipe-part/edit/${this.state.id}`}}
                            className="ml-auto btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5">
                            <i><FontAwesomeIcon icon={faEdit} /></i>&nbsp;Edit
                        </Link>
                    </div>
                    </>  :
                <div className="text-center">
                    <span>access denied</span>
                </div>}
            </Card>
        )
    }
}

export default connect(state => ({
    auth: state.auth
}))(Detail);
