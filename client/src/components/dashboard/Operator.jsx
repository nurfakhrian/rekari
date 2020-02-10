import React, { Component } from 'react';
import Select from 'react-select';
// import { connect } from 'react-redux';

import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Card from '../common/Card';
// import { getOperator } from '../../store/actions/operator';
import axios from 'axios';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

class Operator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datatable: {
                data: []
            },
            searchValue: null,
            searchRole: {
                value: null
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.drawTable = this.drawTable.bind(this);
        // this.handleGotoEdit = this.handleGotoEdit.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
    }

    drawTable(query = {}) {
        axios.post('http://localhost:3028/operator', query)
            .then(response => {
                this.setState(prevState => ({
                    datatable: {
                        ...prevState.datatable,
                        data: response.data.message
                    }
                }))
            })
            .catch(err => console.log(err.response.data.message));
    }

    componentDidMount() {
        // this.props.dispatch(getOperator()).then(response => {
        //     console.log(response);
        // });
        // axios.post('http://localhost:3028/operator')
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

    // handleGotoEdit(code) {
    //     this.props.history.push(`/dashboard/operator/edit/${code}`)
    // }

    render() {
        const columns = [
            {
                Header: 'Code',
                accessor: 'code'
            },
            {
                Header: 'Nama',
                accessor: 'name'
            },
            {
                Header: 'Role',
                accessor: 'role'
            },
            {
                Header: 'Created at',
                accessor: 'createdAt'
            },
            {
                Header: 'Updated at',
                accessor: 'updatedAt'
            },
            {
                Header: 'Action',
                sortable: false,
                Cell: ({ original }) => (
                    <>
                        <Link to={{pathname: `/dashboard/operator/edit/${original.id}`}}
                            className="btn btn-cc btn-cc-primary btn-cc-radius-normal p-1 mb-1">
                            <i><FontAwesomeIcon icon={faEdit} /></i>&nbsp;Edit
                        </Link>
                        <Link to={{pathname: `/dashboard/operator/delete/${original.code}`}}
                            className="btn btn-cc btn-cc-secondary btn-cc-radius-normal p-1 mb-1">
                            <i><FontAwesomeIcon icon={faTrashAlt} /></i>&nbsp;Delete
                        </Link>
                    </>
                )
            },
        ];

        return (
            <Card title={"Operator"} col={12}>
                <div className="row align-items-center">
                    <div className="col-md-3 pr-md-1 mb-md-0 mb-2">
                        <label className="sr-only" htmlFor="search-dt">Cari</label>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                name="searchValue"
                                className="form-control font-italic bg-grey focus"
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
                                { value: 'operator', label: 'Operator' },
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
                        <a href="/#" className="btn btn-cc btn-cc-primary btn-cc-radius-extra ml-0 py-2 px-5 px-md-2"><FontAwesomeIcon icon={faPlus} />&ensp;Tambah</a>
                    </div>
                </div>
                <ReactTable 
                    data={this.state.datatable.data}
                    columns={columns}
                    pageSize={10} />
            </Card>
        )
    }
}

// const mapState = (state) => ({
//     operator: state.operator
// });

// export default connect(mapState)(Operator);
export default Operator;
