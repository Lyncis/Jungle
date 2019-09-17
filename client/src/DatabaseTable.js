import React from 'react';
import Table from 'react-bootstrap/Table';

const DatabaseTable = (props) => {
  return <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ASIN</th>
              <th>Rank</th>
              <th>Category</th>
              <th>Dimensions</th>
            </tr>
          </thead>
          <tbody>
            {
              props.content.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.asin}</td>
                  <td>{item.rank}</td>
                  <td>{item.category}</td>
                  <td>{item.dimension}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
}

export default DatabaseTable;