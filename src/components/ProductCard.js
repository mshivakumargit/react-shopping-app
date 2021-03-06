import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Card, Button, Header, Grid } from 'semantic-ui-react';
import config from '../config/config';
import CircularImage from './CircularImage';

class ProductCard extends Component {
  render() {
    
    return (
      <Card centered>
        <Card.Content>
          <Grid>
            <Grid.Column width={5}>
              <Link to={'/product/' + this.props.id}>
                <CircularImage src={this.props.src} />
              </Link>
            </Grid.Column>
            <Grid.Column width={11}>
              <Card.Header className="break-words">{this.props.name}</Card.Header>             
              {this.props.price ?
                (
                  <Header as="h3" color="purple">
                    <div dangerouslySetInnerHTML={{ __html: config.CURRENCY + this.props.price }} />
                  </Header>
                )
                : null}
            </Grid.Column>
          </Grid>
        </Card.Content>
        <Card.Content extra>
          <Link to={'/product/' + this.props.id}>
            <Button color="purple" compact>
              Shop Now &gt;
            </Button>
          </Link>
        </Card.Content>
      </Card>
    );
  }
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,  
};

export default ProductCard;
