import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Form, Button } from 'semantic-ui-react';
import { cartProductPropType } from './reducer';
import config from '../../config/config';

class Checkout extends Component {
  getItems() {
    const items = this.props.cart;

    return JSON.stringify(
      items.map(item => ({ id: item.id, quantity: item.quantity })),
    );
  }

  render() {
    return (
      <Form method="GET" action={config.API_CHECKOUT_URL}>
        <Form.Input type="hidden" name="items" value={this.getItems()} />

        <Button color="purple" fluid type="submit">
          Checkout
        </Button>
      </Form>
    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(cartProductPropType).isRequired,
};

export default Checkout;
