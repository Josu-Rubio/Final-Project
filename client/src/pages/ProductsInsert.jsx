import React, { Component } from 'react';
import api from '../api';

import styled from 'styled-components';

const Title = styled.h1.attrs({
  className: 'h1',
})``;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`;

class ProductsInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      sale: true,
      tag: '',
      img: '',
      desc: '',
    };
  }

  handleChangeInputName = async (event) => {
    const name = event.target.value;
    this.setState({ name });
  };

  handleChangeInputPrice = async (event) => {
    const price = event.target.value;
    this.setState({ price });
  };

  handleChangeInputSale = async (event) => {
    const sale = event.target.value;
    this.setState({ sale });
  };

  handleChangeInputTag = async (event) => {
    const tag = event.target.value;
    this.setState({ tag });
  };

  handleChangeInputImg = async (event) => {
    const img = event.target.value;
    this.setState({ img });
  };

  handleChangeInputDesc = async (event) => {
    const desc = event.target.value;
    this.setState({ desc });
  };

  handleIncludeProduct = async () => {
    const { name, price, sale, tag, img, desc } = this.state;

    const payload = { name, price, sale, tag, img, desc };

    await api.insertProduct(payload).then((res) => {
      window.alert(`Product inserted successfully`);
      this.setState({
        name: '',
        price: '',
        sale: '',
        tag: '',
        img: '',
        desc: '',
      });
    });
  };

  render() {
    const { name, price, sale, tag, img, desc } = this.state;
    return (
      <Wrapper>
        <Title>Create Product</Title>

        <Label>Name: </Label>
        <InputText
          type='text'
          value={name}
          onChange={this.handleChangeInputName}
        />

        <Label>Price: </Label>
        <InputText
          type='number'
          value={price}
          onChange={this.handleChangeInputPrice}
        />

        <Label>Sell or Buy: </Label>
        <select value={sale} onChange={this.handleChangeInputSale}>
          <option value='true'>Sell</option>
          <option value='false'>Buy</option>
        </select>

        <Label>Select a tag: </Label>
        <select value={tag} onChange={this.handleChangeInputTag}>
          <option value='Lifestyle'>Lifestyle</option>
          <option value='Motor'>Motor</option>
          <option value='Phone'>Phone</option>
        </select>

        <Label>Photo: </Label>
        <InputText
          type='text'
          value={img}
          onChange={this.handleChangeInputImg}
        />

        <Label>Description: </Label>
        <InputText
          type='text'
          value={desc}
          onChange={this.handleChangeInputDesc}
        />

        <Button onClick={this.handleIncludeProduct}>Add Product</Button>
        <CancelButton href={'/products/list'}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default ProductsInsert;
