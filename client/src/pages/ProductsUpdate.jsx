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

class ProductsUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
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

  handleUpdateProduct = async () => {
    const { id, name, price, sale, tag, img, desc } = this.state;

    const payload = { id, name, price, sale, tag, img, desc };

    await api.updateProductById(id, payload).then((res) => {
      window.alert(`Product updated successfully`);
      this.setState({
        name: '',
        price: '',
        sale: '',
        tag: '',
        img: '',
        desc: '',
      });

      window.location.href = `/products/list`;
    });
  };

  componentDidMount = async () => {
    const { id } = this.state;
    const product = await api.getProductById(id);

    this.setState({
      name: product.data.data.name,
      price: product.data.data.price,
      sale: product.data.data.sale,
      tag: product.data.data.tag,
      img: product.data.data.img,
      desc: product.data.data.desc,
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

        <Label>Tags: </Label>
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

        <Button onClick={this.handleUpdateProduct}>Update Product</Button>
        <CancelButton href={'/products/list'}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default ProductsUpdate;
