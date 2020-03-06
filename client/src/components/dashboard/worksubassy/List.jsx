import React, { Component } from 'react';
import Select from 'react-select';
import Moment from 'react-moment';

import ReactTable from 'react-table-6';
import { CSVLink } from 'react-csv';
import 'react-table-6/react-table.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faPlus,
    // faTrashAlt,
    faInfoCircle,
    faDownload
} from '@fortawesome/free-solid-svg-icons';

import Card from '../../common/Card';
import axios from 'axios';
// import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSet: [],
            searchValue: null,
            searchTypePart: {
                value: null
            },
            typeParts: [],
            searchStartDate: null,
            searchEndDate: null,
            downloadTapped: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.drawTable = this.drawTable.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
    }

    drawTable(query = {}) {
        axios.post(`http://${process.env.REACT_APP_API_URL || 'localhost'}:3028/lotpart`, query)
            .then(response => {
                this.setState({
                    dataSet: response.data.message
                })
            })
            .catch(err => console.log(err.response.data.message));
    }

    async fetchDropdown() {
        try {
            const typeParts = await axios.post(`http://${process.env.REACT_APP_API_URL || 'localhost'}:3028/typepart`);
            const typePartsTemp = typeParts.data.message.map(
                item => ({ value: item.id, label: item.name, ...item })
            );
            typePartsTemp.unshift({ value: '', label: '-- Semua --' });
            this.setState({
                typeParts: typePartsTemp
            });
        }
        catch (err) {
            console.log(err.response.data.message);
        }
    }

    componentDidMount() {
        this.drawTable();
        this.fetchDropdown();
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleChangeSelect(val) {
        this.setState({
            searchTypePart: val
        });
    }

    handleStartDateChange = date => {
        this.setState({
            searchStartDate: date
        }, () => {
            if (!this.state.searchStartDate) {
                this.setState({
                    searchEndDate: null
                });
            }
        });
    };

    handleEndDateChange = date => {
        let searchEndDate = new Date();
        if (new Date().toDateString() !== date.toDateString()) {
            date.setHours(23,59,0,0);
            searchEndDate = date;
        }
        if (this.state.searchStartDate) {
            this.setState({
                searchEndDate: searchEndDate
            });
        }
    };

    handleSearch() {
        let query = { 
            lotpartBarcode: this.state.searchValue,
            typePartId: this.state.searchTypePart.value || null,
            startDate: this.state.searchStartDate,
            endDate: this.state.searchEndDate
        };
        this.drawTable(query);
        this.setState({
            downloadTapped: true
        })
    }

    exportCSV() {
        this.csvLink.link.click();
    }

    render() {
        const columns = [
            {
                Header: 'ID',
                accessor: 'lotpartBarcode',
                width: 200
            },
            {
                Header: 'SNP',
                accessor: 'total',
                width: 50
            },
            {
                Header: 'Sub Assy',
                Cell: ({ original }) => (
                    <span>
                        {original.typePart.name}
                    </span>
                ),
                width: 150
            },
            {
                Header: 'Repack Part',
                Cell: ({ original }) => (
                    <ul>
                        {original.lotPartsLotSubParts.map((item, i) => (
                            <li key={i}>{item.subPartName + ": " + item.lotSubPartCode}</li>
                        ))}
                    </ul>
                ),
                width: 450
            },
            {
                Header: 'Operator',
                Cell: ({ original }) => (
                    <span>
                        {original.operator.code} | {original.operator.name}
                    </span>
                ),
                width: 150
            },
            {
                Header: 'Orginal Time',
                Cell: ({ original }) => (
                    <Moment format="DD/MM/YYYY HH:mm:ss">
                        {original.createdAt}
                    </Moment>
                ),
                width: 150
            },
            {
                Header: 'Updated At',
                Cell: ({ original }) => {
                    if (!(original.createdAt === original.updatedAt)) {
                        return (<Moment format="DD/MM/YYYY HH:mm:ss">
                            {original.updatedAt}
                        </Moment>)
                    }
                    else {
                        return (<span>-</span>)
                    }
                },
                width: 150
            },
            {
                Header: 'Action',
                sortable: false,
                width: 100,
                Cell: ({ original }) => (
                    <>
                        <Link to={{pathname: `/dashboard/work-subassy/detail/${original.id}`}}
                            className="btn btn-cc btn-cc-primary btn-cc-radius-normal p-1 mb-1">
                            <FontAwesomeIcon icon={faInfoCircle} />&nbsp;Detil
                        </Link>
                    </>
                )
            },
        ];
        const headers = [
            { label: "No ID", key: "id" },
            { label: "ID Barcode", key: "lotpartBarcode" },
            { label: "SNP", key: "total" },
            { label: "Sub Assy", key: "typePart.name" },
            { label: "Repack Part Name 1", key: "lotPartsLotSubParts[0].subPartName" },
            { label: "Repack Part Code 1", key: "lotPartsLotSubParts[0].lotSubPartCode" },
            { label: "Repack Part Name 2", key: "lotPartsLotSubParts[1].subPartName" },
            { label: "Repack Part Code 2", key: "lotPartsLotSubParts[1].lotSubPartCode" },
            { label: "Repack Part Name 3", key: "lotPartsLotSubParts[2].subPartName" },
            { label: "Repack Part Code 3", key: "lotPartsLotSubParts[2].lotSubPartCode" },
            { label: "Repack Part Name 4", key: "lotPartsLotSubParts[3].subPartName" },
            { label: "Repack Part Code 4", key: "lotPartsLotSubParts[3].lotSubPartCode" },
            { label: "Repack Part Name 5", key: "lotPartsLotSubParts[4].subPartName" },
            { label: "Repack Part Code 5", key: "lotPartsLotSubParts[4].lotSubPartCode" },
            { label: "Kode Operator", key: "operator.code" },
            { label: "Created", key: "createdAt" }
        ];
        return (
            <Card title={"Log Sub Assy"} col={12}>
                <div className="row align-items-center">
                    <div className="col-md-3 pr-md-1 mb-md-0 mb-2">
                        <label className="sr-only" htmlFor="search-dt">Cari</label>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                name="searchValue"
                                className="form-control bg-grey focus"
                                id="search-dt"
                                placeholder="Cari ID..."
                                onChange={this.handleChange}></input>
                            <i><FontAwesomeIcon icon={faSearch} /></i>
                        </div>
                    </div>
                    <div className="col-md-3 p-md-1 mb-md-0 mb-2">
                        <Select
                            placeholder="Pilih Sub Assy"
                            onChange={this.handleChangeSelect}
                            options={this.state.typeParts}
                        />
                    </div>
                    <div className="col-md-2 p-md-1 mb-md-0 mb-2">
                        <DatePicker
                            placeholderText="Start Date (00:00)"
                            className="form-control"
                            selected={this.state.searchStartDate}
                            onChange={this.handleStartDateChange}
                            dateFormat="dd/MM/yyyy"
                            maxDate={new Date()}
                            showDisabledMonthNavigation
                            isClearable
                        />
                    </div>
                    <div className="col-md-2 p-md-1 mb-md-0 mb-2">
                        <DatePicker
                            placeholderText="End Date (23:59)"
                            className="form-control"
                            selected={this.state.searchEndDate}
                            onChange={this.handleEndDateChange}
                            dateFormat="dd/MM/yyyy"
                            maxDate={new Date()}
                            minDate={this.state.searchStartDate}
                            showDisabledMonthNavigation
                            isClearable
                        />
                    </div>
                    
                    <div className="col-md-2 p-md-1 text-center text-md-left">
                        <button
                            className="btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5 px-md-2"
                            onClick={this.handleSearch}
                            >
                            <FontAwesomeIcon icon={faSearch} />&ensp;Cari
                        </button>
                    </div>

                    <div className="col-md-2 p-md-1 pl-md-3 text-center text-md-left">
                        <button
                            className="btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5 px-md-2"
                            onClick={this.exportCSV}
                            disabled={!this.state.downloadTapped}
                            >
                            <FontAwesomeIcon icon={faDownload} />&ensp;Download
                        </button>
                        <CSVLink 
                            data={this.state.dataSet} 
                            headers={headers}
                            filename="subassy.csv"
                            target="_blank"
                            style={{ display: 'none' }}
                            ref={(r) => this.csvLink = r}
                            >
                            Download me
                        </CSVLink>
                    </div>

                    <div className="col-md-3 ml-md-auto text-center text-md-right">
                        <Link
                            to="/dashboard/work-subassy/add"
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
