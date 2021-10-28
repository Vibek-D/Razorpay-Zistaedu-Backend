import "./Error.css";
import React from 'react';


function ErrorPage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '200px'}}>
            <div className="card">
                <div style={{ borderRadius: '200px', height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto' }}>
                    <i className="checkmark">✖</i>
                </div>
                <h1>Payment Failed</h1>
                <p>We were unable to process your request<br /> kindly try again.</p>
            </div>
        </div>
    )
}

export default ErrorPage;