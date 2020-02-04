import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

class Card extends Component {
    render() {
        return (
            <div className="card col pr-0 pl-0">
                <div className="card-header text-center h5 bg-agt-dark text-white">News List</div>
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-md-2 pr-md-1 mb-md-0 mb-2">
                            <label className="sr-only" htmlFor="search-dt">Search</label>
                            <div className="input-with-icon">
                                <input type="text" className="form-control font-italic bg-grey" id="search-dt" placeholder="Seacrh news..."></input>
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                        </div>
                        <div className="col-md-2 p-md-1 mb-md-0 mb-2">
                            <select name="category" className="select2">
                                <option value="CL">Change Log</option>
                                <option value="NT">Notice</option>
                            </select>
                        </div>
                        <div className="col-md-3 p-md-1 mb-md-0 mb-2">
                            <select name="tags[]" className="select2" multiple="multiple" size="8">
                                <option value="E1">Event 1</option>
                                <option value="E2">Event 2</option>
                                <option value="E3">Event 3</option>
                                <option value="NY">New Year</option>
                            </select>
                        </div>
                        <div className="col-md-2 p-md-1 text-center text-md-left">
                            <button type="submit" className="btn btn-agt btn-agt-default btn-agt-radius-normal ml-0 py-2 px-5 px-md-2"><FontAwesomeIcon icon={faSearch} />&ensp;Search</button>
                        </div>
                        <div className="col-md-3 ml-md-auto text-center text-md-right">
                            <a href="add_news.html" className="btn btn-agt btn-agt-default btn-agt-radius-extra ml-0 py-2 px-5 px-md-2"><FontAwesomeIcon icon={faPlus} />&ensp;Add News</a>
                        </div>
                    </div>
                    <table id="dt-news" className="table display" width="100%">
                        <thead>
                            <tr>
                                <th className="th-sm">
                                    Title
                                </th>
                                <th className="th-sm">
                                    Category
                                </th>
                                <th className="th-sm">
                                    Tags
                                </th>
                                <th className="th-sm">
                                    Status
                                </th>
                                <th className="th-sm">
                                    Pinned ?
                                </th>
                                <th className="th-sm">
                                    Start Date
                                </th>
                                <th className="th-sm">
                                    End Date
                                </th>
                                <th className="th-sm sorting_disabled">
                                    Action
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        )
    }
}

export default Card;
