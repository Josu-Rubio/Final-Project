import React, { Component } from 'react';
import api from '../../api';
import Translate from 'react-translate-component';

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
      sale: '',
      tag: '',
      img: '',
      desc: '',
      stat: '',
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

  handleChangeInputStat = async (event) => {
    const stat = event.target.value;
    this.setState({ stat });
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
    const { id, name, price, sale, tag, img, desc, stat } = this.state;

    const payload = { id, name, price, sale, tag, img, desc, stat };

    await api.updateProductById(id, payload).then((res) => {
      window.alert(`Ad updated successfully`);
      this.setState({
        name: '',
        price: '',
        sale: '',
        tag: '',
        img: '',
        desc: '',
        stat: '',
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
      stat: product.data.data.stat,
    });
  };

  render() {
    const { name, price, sale, tag, img, desc, stat } = this.state;
    return (
      <Wrapper>
        <Title>
          <Translate content='title.create' component='h1' />
        </Title>
        <Label>
          <Translate content='label.name' component='h5' />
        </Label>
        <InputText
          type='text'
          value={name}
          onChange={this.handleChangeInputName}
        />
        <Label>
          <Translate content='label.price' component='h5' />
        </Label>
        <InputText
          type='number'
          value={price}
          onChange={this.handleChangeInputPrice}
        />
        <Label>
          <Translate content='label.sale' component='h5' />
        </Label>
        <select value={sale} onChange={this.handleChangeInputSale}>
          <Translate content='sale.sell' component='option' value='sell' />
          <Translate content='sale.buy' component='option' value='buy' />
        </select>
        <Label>
          <Translate content='label.tag' component='h5' />
        </Label>
        <select value={tag} onChange={this.handleChangeInputTag}>
          <Translate content='tag.life' component='option' value='lifestyle' />
          <Translate content='tag.motor' component='option' value='motor' />
          <Translate content='tag.elec' component='option' value='mobile' />
          <Translate content='tag.work' component='option' value='work' />
        </select>
        <Label>
          <Translate content='label.stat' component='h5' />
        </Label>
        <select value={stat} onChange={this.handleChangeInputStat}>
          <Translate
            content='stat.available'
            component='option'
            value='available'
          />
          <Translate
            content='stat.reserved'
            component='option'
            value='reserved'
          />
          <Translate content='stat.sold' component='option' value='sold' />
        </select>
        <br />
        <Label>
          <Translate content='label.img' component='h5' />
        </Label>
        <InputText
          type='text'
          value={img}
          onChange={this.handleChangeInputImg}
        />
        <Label>
          <Translate content='label.desc' component='h5' />
        </Label>
        <InputText
          type='text'
          value={desc}
          onChange={this.handleChangeInputDesc}
        />

        <Button onClick={this.handleUpdateProduct}>
          <Translate content='title.update' />
        </Button>
        <CancelButton href={'/products/list'}>
          <Translate content='button.cancel' />
        </CancelButton>
      </Wrapper>
    );
  }
}

export default ProductsUpdate;
