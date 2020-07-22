// NPM Modules
import React, { Component } from 'react';
import Moment from 'react-moment';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import SearchPanel from '../SearchPanel';
import ProductList from '../ProductList';
import Paginator from '../Paginator';
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
export default class Home extends Component {
  /**
   * Render
   */
  render() {
    // Variables para el UI
    const { isFetching, error, currentPage } = this.props.ui;
    const { maxProducts } = this.props.session;
    // Variables para el paginado
    const numPages = Math.ceil(this.props.products.length / maxProducts);
    const minProduct = currentPage * maxProducts;
    const maxProduct =
      currentPage * parseInt(maxProducts) + parseInt(maxProducts);

    // Render
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
                {this.props.products.length} resultados cumplen el filtro.{' '}
                {this.props.ui.totalProductsReturned} resultados en el store de
                redux
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

  /**
   * Component did mount
   */
  componentDidMount() {
    this.props.fetchTags();
    this.props.loadProducts();
  }

  /**
   * Gestiona el evento de búsqueda de anuncios
   */
  handleSearch = (filters) => {
    if (filters) return this.props.searchProducts(filters);
    this.props.loadProducts();
  };

  /**
   * Retrocede una página
   */
  handleMovePaginator = (increment) => {
    // Actualizo la pagina actual
    let { currentPage } = this.props.ui;
    const { maxProducts } = this.props.session;
    const numPages = Math.ceil(this.props.products.length / maxProducts);
    currentPage += increment;
    // Actualizo el state sólo si sigue dentro de los limites (realmente este chequeo también lo hace el componete paginator)
    if (increment !== 0 && currentPage >= 0 && currentPage < numPages) {
      this.props.setCurrentPage(currentPage);
    }
  };
}
