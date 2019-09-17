import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DetailsDisplay from './DetailsDisplay.js';
import DatabaseTable from './DatabaseTable.js';
//import DetailsDisplay from './DetailsDisplay.js';

class App extends React.Component {
  state = {
    id: null,
    result: false,
    databaseContent: [],
    productData: {},
  }

  showDatabase() {
    let link = 'http://localhost:4000/db';
    let that = this;
    axios.get(link)
      .then(function (response) {
        // handle success
        that.setState({
          databaseContent: response.data.data
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  componentDidMount() {
    this.showDatabase();
  }

  findProduct(id) {
    let link = 'http://localhost:4000/parse/' + id;
    let that = this;
    axios.get(link)
    .then(function (response) {
      // handle success
      that.setState({productData: response.data.data});
      that.setState({result: true});
      that.showDatabase();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
    this.setState({databaseContent: true})
  };

  render() {
    let List;
    let Tablee;
    if (this.state.result) {
      List = <DetailsDisplay
              asin={this.state.id}
              rank={this.state.productData.rank}
              category={this.state.productData.category}
              dimension={this.state.productData.dimension}
            />
    }
    if (this.state.databaseContent.length > 0) {

      Tablee = <DatabaseTable content={this.state.databaseContent}/>
    }

    return <Container className="p-5 m-t-3">
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Enter ASIN to search"
                    aria-label = "Enter ASIN to search"
                    aria-describedby="basic-addon2"
                    onChange={(e) => {
                      this.setState({ id: e.target.value });
                      this.setState({ productData: {}})
                    }}
                  />
                  <InputGroup.Append>
                    <Button variant="success" onClick={() => this.findProduct(this.state.id)}>Search</Button>
                  </InputGroup.Append>
                </InputGroup>
                {List}
              </Col>
              <Col>
                {Tablee}
              </Col>
            </Row>
          </Container>
  }
}

export default App;