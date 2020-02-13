import React, { Component } from 'react';
import Select from 'react-select';

import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import Card from '../../common/Card';
import axios from 'axios';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSet: [],
            searchValue: null,
            searchSection: {
                value: null
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.drawTable = this.drawTable.bind(this);
    }

    drawTable(query = {}) {
        axios.post('http://localhost:3028/typepart', query)
            .then(response => {
                this.setState({
                    dataSet: response.data.message
                })
            })
            .catch(err => console.log(err.response.data.message));
    }

    componentDidMount() {
        this.drawTable();
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleChangeSelect(val) {
        this.setState({
            searchSection: val
        });
    }

    handleSearch() {
        let query = { 
            name: this.state.searchValue,
            section: this.state.searchSection.value || null
        };
        this.drawTable(query)
    }

    handleDelete(e) {
        if (window.confirm(`Hapus data dengan id ${e.target.dataset.id} (${e.target.dataset.name}) ?`)) {
            axios.post('http://localhost:3028/typepart/delete', { id: e.target.dataset.id })
                .then(response => {
                    if (response.data.message.id) {
                        alert(`Data dengan id ${response.data.message.id} (${response.data.message.name}) berhasil dihapus.`)
                        this.handleSearch();
                    }
                    else {
                        alert("Terjadi kesalahan.");
                    }
                })
                .catch(err => console.log(err.response.data.message));
        }
    }

    render() {
        const columns = [
            {
                Header: 'Nama',
                accessor: 'name',
                width: 200
            },
            {
                Header: 'Section',
                accessor: 'section',
            },
            // {
            //     Header: 'Sub Part',
            //     id: 'subParts',
            //     accessor: data => {
            //         const output = data.subParts.map(subpart => {
            //             return subpart.name;
            //         });
            //         return output.join(', ');
            //     },
            //     width: 300
            // },
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
                width: 250,
                Cell: ({ original }) => (
                    <>
                        <Link to={{pathname: `/dashboard/tipe-part/detail/${original.id}`}}
                            className="btn btn-cc btn-cc-primary btn-cc-radius-normal p-1 mb-1">
                            <FontAwesomeIcon icon={faInfoCircle} />&nbsp;Detil
                        </Link>
                        <Link to={{pathname: `/dashboard/tipe-part/edit/${original.id}`}}
                            className="btn btn-cc btn-cc-primary btn-cc-radius-normal p-1 mb-1">
                            <FontAwesomeIcon icon={faEdit} />&nbsp;Edit
                        </Link>
                        <button
                            className="btn btn-cc btn-cc-secondary btn-cc-radius-normal p-1 mb-1"
                            data-id={original.id}
                            data-name={original.name}
                            onClick={this.handleDelete}>
                            <FontAwesomeIcon icon={faTrashAlt} />&nbsp;Hapus
                        </button>
                    </>
                )
            },
        ];

        return (
            <Card title={"Tipe Part"} col={12}>
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
                            placeholder="Pilih Section"
                            onChange={this.handleChangeSelect}
                            options={[
                                { value: '', label: '-- Semua --' },
                                { value: 'master', label: 'Master' },
                                { value: 'caliper', label: 'Caliper' }
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
                            to="/dashboard/tipe-part/add"
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
            </Card>
        )
    }
}

export default List;
