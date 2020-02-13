import React, { Component } from 'react';
import Card from '../../common/Card';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.operatorId,
            name: "",
            section: "",
            nSubPart: 0
        }
    }

    componentDidMount() {
        axios.post('http://localhost:3028/typepart/detail', { id: this.state.id })
            .then(response => {
                console.log(response);
                const sectionOptions = [
                    { value: 'master', label: 'Master' },
                    { value: 'caliper', label: 'Caliper' }
                ];
                const myRole = sectionOptions.find(o => o.value === response.data.message.section);
                this.setState({
                    name: response.data.message.name,
                    section: myRole.value,
                    nSubPart: response.data.message.nSubPart,
                });
            })
            .catch(err => console.log(err.response.data.message));
    }
    
    render() {
        return (
            <Card title={this.state.name} col={6}>
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
            </Card>
        )
    }
}

export default Detail;
