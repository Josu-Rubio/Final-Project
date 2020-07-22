import React, { Component } from 'react';
import Moment from 'react-moment';
import Container from '@material-ui/core/Container';
import SearchPanel from '../SearchPanel';
import ProductList from '../ProductList';
import Paginator from '../Paginator';
import Loading from '../Loading';
import Footer from '../Footer/';
import NavBar from '../NavBar';
import Error from '../Error';
import './styles.css';

export default class Home extends Component {
  render() {
    const { isFetching, error, currentPage } = this.props.ui;
    const { maxProducts } = this.props.session;
    const numPages = Math.ceil(this.props.products.length / maxProducts);
    const minProduct = currentPage * maxProducts;
    const maxProduct =
      currentPage * parseInt(maxProducts) + parseInt(maxProducts);

    return (
      <React.Fragment>
        <NavBar />
        <Container className='Container__Fill'>
          <main className='Main__Section'>
            <div className='Home__Results'>
              <SearchPanel
                tags={this.props.tags}
                handleAPISearch={this.handleSearch}
              />
              <Paginator
                numPages={numPages}
                currentPage={currentPage}
                handleMovePaginator={this.handleMovePaginator}
              />
              <p className='Home__Count'>
                {this.props.products.length} products found.{' '}
              </p>
              <p className='Home__Count'>
                Last API call{' '}
                <Moment fromNow>{this.props.ui.lastProductsUpdated}</Moment>
              </p>
              {this.props.products.length > 0 && (
                <ProductList
                  products={this.props.products.slice(minProduct, maxProduct)}
                />
              )}
              {this.props.products.length === 0 && (
                <h2 className='Home__Subtitle'>
                  No hay anuncios que cumplan con los criterios de búsqueda
                </h2>
              )}
              <Paginator
                numPages={numPages}
                currentPage={currentPage}
                handleMovePaginator={this.handleMovePaginator}
              />
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
    this.props.fetchTags();
    this.props.loadProducts();
  }

  handleSearch = (filters) => {
    if (filters) return this.props.searchProducts(filters);
    this.props.loadProducts();
  };

  handleMovePaginator = (increment) => {
    let { currentPage } = this.props.ui;
    const { maxProducts } = this.props.session;
    const numPages = Math.ceil(this.props.products.length / maxProducts);
    currentPage += increment;
    if (increment !== 0 && currentPage >= 0 && currentPage < numPages) {
      this.props.setCurrentPage(currentPage);
    }
  };
}
