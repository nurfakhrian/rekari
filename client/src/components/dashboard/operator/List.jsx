import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import Card from '../../common/Card';
// import { getOperator } from '../../store/actions/operator';
import axios from 'axios';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSet: [],
            searchValue: null,
            searchRole: {
                value: null
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.drawTable = this.drawTable.bind(this);
        // this.handleGotoEdit = this.handleGotoEdit.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
    }

    drawTable(query = {}) {
        axios.post(`http://${process.env.REACT_APP_API_URL || 'localhost'}:3028/operator`, query)
            .then(response => {
                this.setState({
                    dataSet: response.data.message
                })
            })
            .catch(err => console.log(err.response.data.message));
    }

    componentDidMount() {
        // this.props.dispatch(getOperator()).then(response => {
        //     console.log(response);
        // });
        // axios.post(`http://${process.env.REACT_APP_API_URL || 'localhost'}:3028/operator`)
        //     .then(response => {
        //         this.setState({
        //             datatable: { data: response.data.message }
        //         })
        //     })
        //     .catch(err => console.log(err.response.data.message));
        this.drawTable();
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleChangeSelect(val) {
        this.setState({
            searchRole: val
        });
    }

    handleSearch() {
        let query = { 
            code: this.state.searchValue,
            role: this.state.searchRole.value || null
        };
        this.drawTable(query)
    }

    handleDelete(e) {
        if (window.confirm(`Hapus data dengan id ${e.target.dataset.id} dan code ${e.target.dataset.code} ?`)) {
            axios.post(`http://${process.env.REACT_APP_API_URL || 'localhost'}:3028/operator/delete`, { id: e.target.dataset.id })
                .then(response => {
                    if (response.data.message.id) {
                        alert(`Data dengan id ${response.data.message.id} dan code ${response.data.message.code} berhasil dihapus.`)
                        this.handleSearch();
                    }
                    else {
                        alert("Terjadi kesalahan.");
                    }
                })
                .catch(err => console.log(err.response.data.message));
        }
    }

    // handleGotoEdit(code) {
    //     this.props.history.push(`/dashboard/operator/edit/${code}`)
    // }

    render() {
        const columns = [
            {
                Header: 'Code',
                accessor: 'code',
                width: 100
            },
            {
                Header: 'Nama',
                accessor: 'name'
            },
            {
                Header: 'Role',
                accessor: 'role',
                width: 100
            },
            {
                Header: 'Created at',
                Cell: ({ original }) => (
                    <Moment format="DD/MM/YYYY HH:mm:ss">
                        {original.createdAt}
                    </Moment>
                )
            },
            {
                Header: 'Updated at',
                Cell: ({ original }) => (
                    <Moment format="DD/MM/YYYY HH:mm:ss">
                        {original.updatedAt}
                    </Moment>
                )
            },
            {
                Header: 'Action',
                sortable: false,
                width: 250,
                Cell: ({ original }) => (
                    <>
                        <Link to={{pathname: `/dashboard/operator/detail/${original.id}`}}
                            className="btn btn-cc btn-cc-primary btn-cc-radius-normal p-1 mb-1">
                            <FontAwesomeIcon icon={faInfoCircle} />&nbsp;Detil
                        </Link>
                        {this.props.auth.role === "admin" && original.role ==="su" ?
                        <></> :
                        <Link to={{pathname: `/dashboard/operator/edit/${original.id}`}}
                            className="btn btn-cc btn-cc-primary btn-cc-radius-normal p-1 mb-1">
                            <FontAwesomeIcon icon={faEdit} />&nbsp;Edit
                        </Link>}
                        {this.props.auth.role === "su" ?
                        <button
                            className="btn btn-cc btn-cc-secondary btn-cc-radius-normal p-1 mb-1"
                            data-id={original.id}
                            data-code={original.code}
                            onClick={this.handleDelete}>
                            <FontAwesomeIcon icon={faTrashAlt} />&nbsp;Hapus
                        </button> : <></>}
                    </>
                )
            },
        ];

        return (
            <Card title={"Operator"} col={12}>
                {this.props.auth.role === "su" || this.props.auth.role === "admin" ?
                <>
                    <div className="row align-items-center">
                        <div className="col-md-3 pr-md-1 mb-md-0 mb-2">
                            <label className="sr-only" htmlFor="search-dt">Cari</label>
                            <div className="input-with-icon">
                                <input
                                    type="text"
                                    name="searchValue"
                                    className="form-control bg-grey focus"
                                    id="search-dt"
                                    placeholder="Cari..."
                                    onChange={this.handleChange}></input>
                                <i><FontAwesomeIcon icon={faSearch} /></i>
                            </div>
                        </div>
                        <div className="col-md-3 p-md-1 mb-md-0 mb-2">
                            <Select
                                placeholder="Pilih Role"
                                // value={this.state.searchRole}
                                onChange={this.handleChangeSelect}
                                options={[
                                    { value: '', label: '-- Semua --' },
                                    { value: 'su', label: 'Super Admin' },
                                    { value: 'admin', label: 'Admin' },
                                    { value: 'operator', label: 'Operator' }
                                ]} />
                        </div>
                        
                        <div className="col-md-2 p-md-1 text-center text-md-left">
                            <button
                                className="btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5 px-md-2"
                                onClick={this.handleSearch}>
                                <FontAwesomeIcon icon={faSearch} />&ensp;Cari
                            </button>
                        </div>
                        <div className="col-md-3 ml-md-auto text-center text-md-right">
                            <Link
                                to="/dashboard/operator/add"
                                className="btn btn-cc btn-cc-primary btn-cc-radius-extra ml-0 py-2 px-5 px-md-2">
                                <FontAwesomeIcon icon={faPlus} />&ensp;Tambah
                            </Link>
                        </div>
                    </div>
                    <ReactTable 
                        data={this.state.dataSet}
                        columns={columns}
                        pageSize={10}
                        minRows={2} />
                </>  :
                <div className="text-center">
                    <span>access denied</span>
                </div>}
            </Card>
        )
    }
}

// const mapState = (state) => ({
//     operator: state.operator
// });

// export default connect(mapState)(Operator);
export default connect(state => ({
    auth: state.auth
}))(List);
