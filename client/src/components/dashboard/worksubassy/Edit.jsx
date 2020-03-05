import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Card from '../../common/Card';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlusSquare, faSave, faPrint } from '@fortawesome/free-solid-svg-icons';
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
          typeParts: []
      }
      this.handleChange = this.handleChange.bind(this);
      // this.handleChangeSelect = this.handleChangeSelect.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      // this.handleChangeSubPart = this.handleChangeSubPart.bind(this);
      // this.isFormValid = this.isFormValid.bind(this);
  }

    async componentDidMount() {
        try {
            const typePartResponse = await axios.post(`http://${process.env.REACT_APP_API_URL || 'localhost'}:3028/typepart`)
            this.setState({
                typeParts: typePartResponse.data.message.map(
                    item => ({ value: item.id, label: item.name, ...item })
                )
            }, () => console.log(this.state.typeParts));
        }
        catch(err) {
            console.log(err.response.data.message)
        }
        

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

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // handleChangeNSubPart(e) {
    //     const value = e.target.value;
    //     if (value > 1) {
    //         this.setState(
    //             (prevState) => {
    //                 if (parseInt(value) > parseInt(prevState.nSubPart)) {
    //                     return {
    //                         nSubPart: parseInt(value),
    //                         subParts: [ ...prevState.subParts, {name: "", typePartId: this.state.id}]
    //                     }
    //                 }
    //                 else {
    //                     return {
    //                         nSubPart: parseInt(value),
    //                     }
    //                 }
    //             }
    //         );
    //     }
    // }

    // handleChangeSelect(obj) {
    //     this.setState({
    //         section: obj.value
    //     });
    // }

    // handleChangeSubPart(e) {
    //     let tempSubParts = [ ...this.state.subParts ];
    //     tempSubParts[e.target.dataset.index].name = e.target.value;
    //     this.setState(
    //         { subParts: tempSubParts }
    //     );
    // }

    async handleSubmit(e) {
        e.preventDefault();
        let nullSubPart = false;
        for (let i = 0; i < this.state.lotPartsLotSubParts.length; i++) {
            if (this.state.lotPartsLotSubParts[i].lotSubPartCode === "") {
                nullSubPart = true;
                break;
            }
        }
        if (this.state.total > 1 && !nullSubPart) {
            try {
                const { id, total } = this.state;
                const response = await axios.post(
                    `http://${process.env.REACT_APP_API_URL || 'localhost'}:3028/lotpart/edit`,
                    {id, total});
                alert("data pada database berhasil diperbarui");
            }
            catch(err) {
                console.log(err.response.data.message)
            }
        }
        else {
            alert("Form tidak boleh kosong/salah.");
        }
    }

    // renderSubPart() {
    //     const subPartElem = index => (
    //         <div className="form-group" key={index}>
    //             <label>Sub Part {index + 1}</label>
    //             <input
    //                 value={(this.state.subParts[index] && this.state.subParts[index].name) || ""}
    //                 data-index={index}
    //                 onChange={this.handleChangeSubPart}
    //                 type="text"
    //                 className="form-control"
    //                 name="subPart" />
    //         </div>
    //     );
    //     let subPartForm = [];
    //     for (let i = 0; i < this.state.nSubPart ; i++) {
    //         subPartForm.push(subPartElem(i));
    //     }
    //     return subPartForm;
    // }

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
                    onSubmit={this.handleSubmit}
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
                                      type="text"
                                      className="form-control"
                                      name="section"
                                      value={item.lotSubPartCode}
                                      readOnly/>
                          </div>
                      ))}
                  </div>
                  <div className="form-group">
                      <label htmlFor="iTotal">Total (SNP)</label>
                      <input
                              id="iTotal"
                              type="text"
                              className="form-control"
                              name="total"
                              value={this.state.total}
                              onChange={this.handleChange}
                              />
                  </div>
                  <div className="d-flex">
                      <Link to="/dashboard/work-subassy"
                          className="btn btn-cc btn-cc-white btn-cc-radius-normal ml-0 py-2 px-5">
                          <i><FontAwesomeIcon icon={faArrowLeft} /></i>&nbsp;Semua
                      </Link>
                      <button
                          className="ml-auto btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5">
                          <i><FontAwesomeIcon icon={faPrint} /></i>&nbsp;Print
                      </button>
                      <button type="submit"
                          className="ml-auto btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5">
                          <i><FontAwesomeIcon icon={faSave} /></i>&nbsp;Save
                      </button>
                  </div>
              </form>
          </Card>
      )
  }
}

export default connect(state => ({
    auth: state.auth
}))(Edit);
