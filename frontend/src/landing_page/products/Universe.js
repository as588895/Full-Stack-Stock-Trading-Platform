import React from 'react';

function Universe() {
    return (
        <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
            Extend your trading and investments experience even further with our partner platforms
        </p>
        
      
        <div className="col-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png" style={{ width: '60%', height: 'auto' }} />
          <p className="text-small text-muted mt-2">Thematic investment platform </p> 
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/streakLogo.png" style={{ width: '60%', height: 'auto' }} />
          <p className="text-small text-muted">Algo & strategy platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/sensibullLogo.svg" style={{ width: '60%', height: 'auto' }} />
          <p className="text-small text-muted mt-2">Options trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/zerodhaFundhouse.png" style={{ width: '60%', height: 'auto' }} />
          <p className="text-small text-muted mt-2">Asset management platform</p> 
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/goldenpiLogo.png" style={{ width: '60%', height: 'auto' }} />
          <p className="text-small text-muted mt-2">Bonds trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/dittoLogo.png" style={{ width: '47%', height: 'auto' }} />
          <p className="text-small text-muted mt-2">Insurance</p>
        </div>
        <button className='p-2c btn btn-primary fs-5 mb-5 mt-3'
                         style={{ width: '20%', margin: '0 auto', borderRadius: '5px' }}>
                            Sign up Now</button>
      </div>
    </div>
 );
}

export default Universe;