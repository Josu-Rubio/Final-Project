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

class ProductsInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      sale: 'sell',
      tag: 'lifestyle',
      img: '',
      desc: '',
      stat: 'available',
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

  handleIncludeProduct = async () => {
    const { name, price, sale, tag, img, desc, stat } = this.state;

    const payload = { name, price, sale, tag, img, desc, stat };

    await api.insertProduct(payload).then((res) => {
      window.alert(`Ad created sucessfully`);
      this.setState({
        name: '',
        price: '',
        sale: '',
        tag: '',
        img: '',
        desc: '',
        stat: '',
      });
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

        <Button onClick={this.handleIncludeProduct}>
          <Translate content='title.create' />
        </Button>
        <CancelButton href={'/products/list'}>
          <Translate content='button.cancel' />
        </CancelButton>
      </Wrapper>
    );
  }
}

export default ProductsInsert;
