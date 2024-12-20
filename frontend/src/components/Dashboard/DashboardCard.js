import React from "react";

function DashboardCard({ title, value, bgColor }) {
  return (
  <div>
    <table class="table table-bordered summary-section">
    <tbody>
      <tr>
        <th style={{backgroundColor:'#883cec', color:'white', width:'270px', border: '1px solid #883cec',borderColor:'#883cec', borderTopRadius:'15px'}}><h4 class="fs-5">{title}</h4></th>
        <td style={{border: '1px solid #883cec', borderColor:'#883cec'}}><h5>Rp {value.toLocaleString()}</h5></td>
      </tr>
    </tbody>
      </table>
      {/* <div>
        <table className="table table-bordered summary-section">
          <tbody>
            <tr>
              <th
                style={{
                  backgroundColor: "#883cec",
                  color: "white",
                  width: "270px",
                  border: "1px solid #883cec",
                  borderColor: "#883cec",
                }}
              >
                <h4 className="fs-5">{title}</h4>
              </th>
              <td
                style={{
                  border: "1px solid #883cec",
                  borderColor: "#883cec",
                }}
              >
                <div className="currency-wrapper">
                  <span className="currency-symbol">Rp</span>
                  <span className="currency-value">{value.toLocaleString()}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>  
);
}
  

  


export default DashboardCard;
