import React from 'react';

function DashboardCard({ title, value, bgColor }) {
  return (
    
        <table class="table table-bordered summary-section">
        <tbody>
          <tr>
            <th style={{backgroundColor:'#883cec', color:'white', width:'270px', border: '1px solid #883cec',borderColor:'#883cec', borderTopRadius:'15px'}}><h4 class="fs-5">{title}</h4></th>
            <td style={{border: '1px solid #883cec', borderColor:'#883cec'}}><h5>Rp {value.toLocaleString()}</h5></td>
          </tr>
        </tbody>
          </table>
    
  );
}
export default DashboardCard;