//display details for product
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const DetailsDisplay = (props) => {
  return <ListGroup>
          <ListGroup.Item >
            ASIN: {props.asin}
          </ListGroup.Item>
          <ListGroup.Item>
            Rank: {props.rank}
          </ListGroup.Item>
          <ListGroup.Item>
            Category: {props.category}
          </ListGroup.Item>
          < ListGroup.Item >
            Dimensions: {props.dimension}
          </ListGroup.Item>
        </ListGroup>
}

export default DetailsDisplay;