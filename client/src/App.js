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

class App extends React.Component {
  state = {
    id: null,
    result: false,
    error: false,
    databaseError: false,
    databaseContent: [],
    productData: {},
  }
  // get the database content to display
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
        that.setState({databaseError: true});
        console.log(error);
      })
  }

  // show the database on mount
  componentDidMount() {
    this.showDatabase();
  }

  // search the product by ASIN
  findProduct(id) {
    this.setState({result: false});
    this.setState({error: false});
    let link = 'http://localhost:4000/parse/' + id;
    let that = this;
    axios.get(link)
    .then(function (response) {
      // handle success
      if (!response.data.error) {
        that.setState({productData: response.data.data});
        that.setState({result: true});
      } else {
        // display error message
        that.setState({error: true});
      }
        // update the database table
        that.showDatabase();
    })
    .catch(function (error) {
      // show error
      console.log(error);
    })
    this.setState({databaseContent: true})
  };

  render() {
    let List;
    let ContentTable;
    //if app got the result
    if (this.state.result) {
      List = <DetailsDisplay
              asin={this.state.id}
              rank={this.state.productData.rank}
              category={this.state.productData.category}
              dimension={this.state.productData.dimension}
            />
    }
    //if we got an error message
    if (this.state.error){
      List = <div>Please check if ASIN is correct and try again.</div>
    }
    //if there is anything to show in the database, show it
    if (this.state.databaseContent.length > 0) {
      ContentTable = <DatabaseTable content={this.state.databaseContent}/>
    }
    if (this.state.databaseError) {
      ContentTable = <div> Something went wrong. Try again later. </div>
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
                {ContentTable}
              </Col>
            </Row>
          </Container>
  }
}

export default App;