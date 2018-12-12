import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Header, Card, Icon, Button } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import { productPropType } from '../Products/reducer';
import { addProduct } from '../Cart/actions';
import Variations from '../../components/Variations';
import SocialBox from './SocialBox';
import config from '../../config/config';

import './styles.css';

class ProductDetails extends Component {
  static isAnyCached(images) {
    
       return false       
  }

  constructor(props) {
    super(props);

    this.state = {
      selections: null,
      variationId: null,
    };

    this.receiveSelections = this.receiveSelections.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  getCategories() {
    return "";
  }

  getImageGallery() {
    const images = [
      {
        original: this.props.product.productphotourl,
        thumbnail: this.props.product.productphotourl,
      }
    ]
    return images;
  }

  /**
   * Modify component's state when a variation is selected.
   * @param {Object} selections
   * @param {Number} variationId
   */
  receiveSelections(selections, variationId) {
    this.setState({ selections, variationId });
  }

  /**
   * Add product to cart.
   * Display a warning if the product has variations and attributes were not selected.
   */
  addItem() {
    
    

    const { dispatch } = this.props;
    const product = this.props.product;

    dispatch(
      addProduct(
        product.id,
        product.title,
        product.sellingprice,       
        product.productphotourl,             
        this.state.selections,
      ),
    );

    toastr.success('Added to Cart', product.title + ' was added to your shopping cart.');
  }

  render() {
    const anyCached =false;
      

    return (
      <div>
        <Header textAlign="center" className="break-words">
          {this.props.product.name}
        </Header>
        <Card centered>
          <ImageGallery
            items={this.getImageGallery()}
            slideDuration={550}
            showPlayButton={false}
            showThumbnails={false}
            showNav={window.navigator.onLine || anyCached}
            disableSwipe={!window.navigator.onLine || !anyCached}
          />          
         
          <Card.Content>{this.props.product.unitsinstock ? 'In Stock' : 'Out of Stock'}</Card.Content>
          {this.props.product.price ?
            (<Card.Content>
              <div dangerouslySetInnerHTML={{ __html: config.CURRENCY + this.props.product.price }} />
            </Card.Content>) : null}
          
          {this.props.product.unitsinstock ? (
            <Button color="purple" fluid onClick={this.addItem}>
              ADD TO CART &nbsp;<Icon name="cart" />
            </Button>
          ) : null}
        </Card>
        {this.props.product.description.length === 0 ? null : (
          <Card centered>
            <Card.Content>
              <Card.Header as={Header} size="tiny">
                Description
              </Card.Header>
              <Card.Description>
                <div dangerouslySetInnerHTML={{ __html: this.props.product.description }} />
              </Card.Description>
            </Card.Content>
          </Card>
        )}       
        <SocialBox permalink={this.props.product.permalink} />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  product: productPropType.isRequired,
};

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ addProduct }, dispatch));
}

export default connect(null, mapDispatchToProps)(ProductDetails);
