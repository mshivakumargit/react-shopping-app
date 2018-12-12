import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../../config/config';

class CreateProduct extends Component {
    
  constructor() {
    super();
    this.state = {
        id: '',
        title: '',
        description: '',
        unitprice: '',
        sellingprice:'',
        unitsinstock: '',
        remarks: '',
        productphotourl: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { id, title, description,unitprice, sellingprice, unitsinstock,remarks,productphotourl } = this.state;

    axios.post(config.RESTAPI_URL +'api/products', { id, title, description,unitprice, sellingprice, unitsinstock,remarks,productphotourl  })
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { id, title, description,unitprice, sellingprice, unitsinstock,remarks,productphotourl } = this.state;
    return (
      <div class="ui center aligned header">
        <div class="ui centered card">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD PRODUCT
            </h3>
          </div>
          <div class="panel-body">  
          <h4></h4>          
            <form onSubmit={this.onSubmit}>
            <div class="form-group">
              <label for="id">ID:</label> <br></br>            
              <input type="number" class="form-control" name="id" value={id} onChange={this.onChange} placeholder="Id" />
            </div>              
              <div class="form-group">
                <label for="title">Title:</label><br></br> 
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label><br></br> 
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="24" rows="2">{description}</textArea>
              </div>
              <div class="form-group">
                <label for="remarks">Remarks:</label><br></br> 
                <textArea class="form-control" name="remarks" onChange={this.onChange} placeholder="Remarks" cols="24" rows="2">{remarks}</textArea>
              </div>
              <div class="form-group">
                <label for="unitprice">Unit Price:</label><br></br> 
                <input type="number" class="form-control" name="unitprice" value={unitprice} onChange={this.onChange} placeholder="Unitprice" />
              </div>
              <div class="form-group">
                <label for="sellingprice">Selling Price:</label><br></br> 
                <input type="number" class="form-control" name="sellingprice" value={sellingprice} onChange={this.onChange} placeholder="Sellingprice" />
              </div>
              <div class="form-group">
                <label for="unitsinstock">Units In Stock:</label><br></br> 
                <input type="number" class="form-control" name="unitsinstock" value={unitsinstock} onChange={this.onChange} placeholder="Unitsinstock" />
              </div>
              <div class="form-group">
                <label for="productphotourl">Product photo url:</label><br></br> 
                <input type="text" class="form-control" name="productphotourl" value={productphotourl} onChange={this.onChange} placeholder="Productphotourl" />
              </div><br></br> 
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProduct;
