import "./Success.css";
import React from 'react';


function SuccessPage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '200px'}}>
            <div className="card">
                <div style={{ borderRadius: '200px', height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto' }}>
                    <i className="checkmark">✔</i>
                </div>
                <h1>Success</h1>
                <p>We have received your registration.<br /> We’ll be in touch shortly.</p>
            </div>
        </div>
    )
}

export default SuccessPage;
