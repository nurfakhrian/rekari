import React, { Component } from 'react';

class BarcodeToPrint extends Component {
  render() {
      return (
          <div style={{ marginLeft: 75, marginTop:400 }}>
              <table className="table table-bordered" style={{height:700, border: '2px solid #000'}}>
                  <tbody>
                      <tr>
                          <td><span className="h1">Sub Assy</span></td>
                          <td colSpan="3">
                              <span className="h1">{this.props.name}</span>
                          </td>
                      </tr>
                      <tr>
                          <td colSpan="2">
                              <span className="h1">{this.props.code}</span>
                          </td>
                          <td rowSpan="3" className="text-center">
                              <img src={this.props.src} alt="barcode" style={{ marginTop: 60, width:290 }}/>
                          </td>
                          <td rowSpan="2"><span className="h2">Stampel Inspeksi</span></td>
                      </tr>
                      <tr>
                          <td><span className="h1">SNP</span></td>
                          <td><span className="h1">{this.props.total}</span></td>
                      </tr>
                      <tr>
                          <td><span className="h1">Operator</span></td>
                          <td><span className="h1">
                            {this.props.op.code}
                            <br />
                            Rev: {this.props.opRev.code}
                          </span></td>
                          <td rowSpan="2"><span className="h2">Stamp Spesial</span></td>
                      </tr>
                      <tr>
                          <td><span className="h1">Time</span></td>
                          <td colSpan="2">
                              <span className="h1">{this.props.time}</span>
                              <br />
                              <span className="h1">Rev: {this.props.timeRev}</span>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      );
  }
}

export default BarcodeToPrint;
