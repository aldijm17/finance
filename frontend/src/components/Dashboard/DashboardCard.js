import React from 'react';

function DashboardCard({ title, value, bgColor }) {
  return (
    <div>
        <table class="table table-bordered summary-section">
        <tbody>
          <tr>
            <th style={{backgroundColor:'#883cec', color:'white', width:'270px'}}><h4 class="fs-5">{title}</h4></th>
            <td><h5>Rp {value.toLocaleString()}</h5></td>
          </tr>
        </tbody>
    </table>
    </div>
  );
}
export default DashboardCard;