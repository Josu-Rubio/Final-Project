import React, { Component, Suspense } from 'react';
import api from '../api';
import { withTranslation } from 'react-i18next';

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
      window.alert(`Ad created withsuccessfully`);
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
    const { t } = this.props;

    return (
      <Wrapper>
        <Title>{t('Create Ad')}</Title>

        <Label>{t('Name')}: </Label>
        <InputText
          type='text'
          value={name}
          onChange={this.handleChangeInputName}
        />

        <Label>{t('Price')}: </Label>
        <InputText
          type='number'
          value={price}
          onChange={this.handleChangeInputPrice}
        />

        <Label>{t('Sell or Buy')}: </Label>
        <select value={sale} onChange={this.handleChangeInputSale}>
          <option value='true'>{t('Sell')}</option>
          <option value='false'>{t('Buy')}</option>
        </select>

        <Label>{t('Select a tag')}: </Label>
        <select value={tag} onChange={this.handleChangeInputTag}>
          <option value='Lifestyle'>{t('Lifestyle')}</option>
          <option value='Motor'>{t('Motor')}</option>
          <option value='Phone'>{t('Electronics')}</option>
          <option value='Phone'>{t('Work')}</option>
        </select>

        <Label>{t('Photo')}: </Label>
        <InputText
          type='text'
          value={img}
          onChange={this.handleChangeInputImg}
        />

        <Label>{t('Description')}: </Label>
        <InputText
          type='text'
          value={desc}
          onChange={this.handleChangeInputDesc}
        />

        <Button onClick={this.handleIncludeProduct}>{t('Create Ad')}</Button>
        <CancelButton href={'/products/list'}>{t('Cancel')}</CancelButton>
      </Wrapper>
    );
  }
}

const AdCreate = withTranslation()(ProductsInsert);

export default function CreateAd() {
  return (
    <Suspense fallback='Loading...'>
      <AdCreate />
    </Suspense>
  );
}
