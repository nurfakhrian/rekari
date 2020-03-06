import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../common/Card';
import BarcodeToPrint from './BarcodeToPrint';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import bwipjs from 'bwip-js';
import ReactToPrint from 'react-to-print';
import moment from 'moment';

class Edit extends Component {
  constructor(props) {
      super(props);
      this.state = {
          id: this.props.match.params.logpartId,
          lotpartBarcode: "",
          typePart: {name:""},
          lotPartsLotSubParts: [],
          total: 0,
          operator: {name:"", code:"", role:""},
          createdAt: new Date(),
          createdAtTimeLabel: "",
          updatedAtTimeLabel: "",
          barcodeDataUrl: "",
          totalOriginal: 0
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeLotSubPartCode = this.handleChangeLotSubPartCode.bind(this);
      this.clearSubPartCode = this.clearSubPartCode.bind(this);
      this.isFormValid = this.isFormValid.bind(this);
    }

    async componentDidMount() {
          
        try {
            const lotPartResponse = await axios.post(`http://${process.env.REACT_APP_API_URL || 'localhost'}:3028/lotpart/detail`, { id: this.state.id })
            const {
                lotpartBarcode,
                typePart,
                lotPartsLotSubParts,
                total,
                operator,
                createdAt,
                updatedAt } = lotPartResponse.data.message;
            this.setState({
              lotpartBarcode,
              typePart,
              lotPartsLotSubParts,
              total,
              operator,
              createdAt,
              totalOriginal: total,
              createdAtTimeLabel: moment(createdAt).format("DD/MM/YYYY HH:mm:ss"),
              updatedAtTimeLabel: moment(createdAt).format("DD/MM/YYYY HH:mm:ss") === moment(updatedAt).format("DD/MM/YYYY HH:mm:ss") ? "-" : moment(updatedAt).format("DD/MM/YYYY HH:mm:ss")
          }, () => {
              const canvasBarcode = document.createElement('canvas');
              bwipjs.toCanvas(canvasBarcode, {
                  bcid: 'qrcode',
                  text: this.state.lotpartBarcode,
                  scale: 2,
                  version: 5
              });
              document.getElementById("imgBarcode").src = canvasBarcode.toDataURL('image/png');
              this.setState({
                barcodeDataUrl: canvasBarcode.toDataURL('image/png')
              })
          });
        }
        catch(err) {
            console.log(err.response.data.message)
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isFormValid() {
        let nullSubPart = false;
        for (let i = 0; i < this.state.lotPartsLotSubParts.length; i++) {
            if (this.state.lotPartsLotSubParts[i].lotSubPartCode === "") {
                nullSubPart = true;
                break;
            }
        }
        return this.state.total > 0 && !nullSubPart;
    }

    async handleSubmit() {
        if (this.isFormValid()) {
            try {
                const { id, total } = this.state;
                if (this.state.totalOriginal !== this.state.total) {
                    const response = await axios.post(
                        `http://${process.env.REACT_APP_API_URL || 'localhost'}:3028/lotpart/edit`,
                        {id, total});
                    this.setState({
                        totalOriginal: response.data.message.total,
                        updatedAtTimeLabel: moment(response.data.message.updatedAt).format("DD/MM/YYYY HH:mm:ss")
                    })
                }
                this.state.lotPartsLotSubParts.forEach(async item => {
                    if (!item.createdAt) {
                        await axios.post(
                            `http://${process.env.REACT_APP_API_URL || 'localhost'}:3028/lotpart/edit-subpart`,
                            item);
                    }
                })
                // alert("mndeteksi perubahan data, data pada database berhasil diperbarui");
            }
            catch(err) {
                console.log(err.response.data.message)
            }
        }
        else {
            alert("Form tidak boleh kosong/salah.");
        }
    }

    handleChangeLotSubPartCode(e) {
        let tempLotPartsLotSubParts = [ ...this.state.lotPartsLotSubParts ];
        const { id } = this.state.lotPartsLotSubParts[e.target.dataset.index]
        tempLotPartsLotSubParts[e.target.dataset.index] = {
            id,
            lotSubPartCode: e.target.value,
            subPartName: this.state.lotPartsLotSubParts[e.target.dataset.index].subPartName
        };
        this.setState(
            { lotPartsLotSubParts: tempLotPartsLotSubParts }
        );
        const regex = /.*(.{7})=.*-BR0.*PC\s(\d+)\s{28,29}(.*)(\d{8})\s*\*/;
        if (regex.test(e.target.value)) {
            const catchGroup = regex.exec(e.target.value);
            let tempLotPartsLotSubParts2 = [ ...this.state.lotPartsLotSubParts ];
            const { id } = this.state.lotPartsLotSubParts[e.target.dataset.index]
            tempLotPartsLotSubParts2[e.target.dataset.index] = {
                id,
                lotSubPartCode: catchGroup[2] + "-" + catchGroup[4] + "-" + catchGroup[1] + "-" + catchGroup[3],
                subPartName: this.state.lotPartsLotSubParts[e.target.dataset.index].subPartName
            };
            this.setState(
                { lotPartsLotSubParts: tempLotPartsLotSubParts2 }
            );
            try {
                document.getElementById("iSubPart" + (parseInt(e.target.dataset.index) + 1)).focus();
            }
            catch {
                document.getElementById("iTotal").focus();
            }
        }
    }

    clearSubPartCode(e) {
        e.preventDefault();
        let tempLotPartsLotSubParts = [ ...this.state.lotPartsLotSubParts ];
        const { id } = this.state.lotPartsLotSubParts[e.target.dataset.index]
        tempLotPartsLotSubParts[e.target.dataset.index] = {
            id,
            lotSubPartCode: "",
            subPartName: this.state.lotPartsLotSubParts[e.target.dataset.index].subPartName
        };
        this.setState(
            { lotPartsLotSubParts: tempLotPartsLotSubParts }
        );
        document.getElementById("iSubpart" + parseInt(e.target.dataset.index)).focus();
    }

    render() {
      const roleOptions = [
          { value: 'su', label: 'Super Admin' },
          { value: 'admin', label: 'Admin' },
          { value: 'operator', label: 'Operator' }
      ];
      return (
          <Card title="Edit Sub Assy" col={6}>
              <div className="text-center">
                  <img id="imgBarcode" alt="barcode"/>
              </div>
              <form
                    onSubmit={(e) => e.preventDefault()}
                    noValidate>
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
                              readOnly/>
                  </div>
                  <div className="ml-5">
                      {this.state.lotPartsLotSubParts.map((item, i) => (
                          <div key={i} className="form-group">
                              <label htmlFor={"iSubpart" + i}>{item.subPartName}</label>
                              <input
                                      id={"iSubpart" + i}
                                      data-index={i}
                                      tab-index="-1"
                                      type="text"
                                      className="form-control"
                                      name="section"
                                      value={item.lotSubPartCode}
                                      onChange={this.handleChangeLotSubPartCode}
                                      /><small>
                                            <a href="/#" data-index={i} onClick={this.clearSubPartCode}>hapus</a>
                                            &nbsp;terlebih dahulu sebelum mulai scan/diganti
                                        </small>
                          </div>
                      ))}
                  </div>
                  <div className="form-group">
                      <label htmlFor="iTotal">Total (SNP)</label>
                      <input
                              id="iTotal"
                              type="number"
                              className="form-control"
                              name="total"
                              value={this.state.total}
                              onChange={this.handleChange}
                              />
                  </div>
                  <div className="d-flex">
                        <Link to={"/dashboard/work-subassy/detail/" + this.state.id}
                            className="btn btn-cc btn-cc-white btn-cc-radius-normal ml-0 py-2 px-5">
                            <i><FontAwesomeIcon icon={faArrowLeft} /></i>&nbsp;Kembali
                        </Link>
                        <ReactToPrint
                            trigger={() => <button
                                type="submit"
                                disabled={!this.isFormValid()}
                                className="ml-auto btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5">
                                <i><FontAwesomeIcon icon={faSave} /></i>&nbsp;Save/Print
                            </button>}
                            content={() => this.componentRef}
                            onBeforeGetContent={() => this.handleSubmit()}
                        />
                        <div
                            style={{ display: "none" }}
                            >
                            <BarcodeToPrint
                                name={this.state.typePart.name}
                                code={this.state.lotpartBarcode}
                                total={this.state.total}
                                time={this.state.createdAtTimeLabel}
                                timeRev={this.state.updatedAtTimeLabel}
                                op={this.props.auth}
                                src={this.state.barcodeDataUrl}
                                ref={el => (this.componentRef = el)} />
                        </div>
                  </div>
              </form>
          </Card>
      )
  }
}

export default connect(state => ({
    auth: state.auth
}))(Edit);
