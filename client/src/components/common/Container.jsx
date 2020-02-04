import React from 'react';

function Container(props) {
    return (
        <div class="container-fluid">
            <div class="row justify-content-center">
                {props.children}
            </div>
        </div>
    )
}

export default Container;
