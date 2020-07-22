import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import ProductListSmall from '../ProductListSmall';
import Loading from '../Loading';
import Footer from '../Footer/';
import NavBar from '../NavBar';
import Error from '../Error';
import './styles.css';

export default class Catalog extends Component {
  render() {
    const { isFetching, error } = this.props.ui;
    return (
      <React.Fragment>
        <NavBar />
        <Container className='Container__Fill'>
          <main className='Main__Section'>
            <div className='Catalog__Results'>
              <p className='Catalog__Count'>
                {this.props.productsSelling.length} anuncios en venta.
              </p>
              {this.props.productsSelling &&
                this.props.productsSelling.length > 0 && (
                  <ProductListSmall
                    products={this.props.productsSelling}
                    history={this.props.history}
                  />
                )}
              <p className='Catalog__Count'>
                {this.props.productsBuying.length} anuncios en búsqueda.
              </p>
              {this.props.productsBuying &&
                this.props.productsBuying.length > 0 && (
                  <ProductListSmall
                    products={this.props.productsBuying}
                    history={this.props.history}
                  />
                )}
            </div>
            {isFetching && <Loading text={'fetching data'} />}
            {error && <Error error={error} />}
          </main>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.props.loadProducts();
  }
}
