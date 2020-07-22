// NPM Modules
import React, { Component } from 'react';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import ProductListSmall from '../ProductListSmall';
import Loading from '../Loading';
import Footer from '../Footer/';
import NavBar from '../NavBar';
import Error from '../Error';
// Own modules
// Assets
// CSS
import './styles.css';

/**
 * Main App
 */
export default class Catalog extends Component {
  /**
   * Render
   */
  render() {
    // Variables para el UI
    const { isFetching, error } = this.props.ui;
    // Render
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

  /**
   * Component did mount
   */
  componentDidMount() {
    this.props.loadProducts();
  }
}
