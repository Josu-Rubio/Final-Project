import React, { Component } from 'react';
import Container from '@material-ui/core/Container';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <React.Fragment>
          <Container>
            <main className='Home'>
              <h1>An unknown error has ocurred.</h1>
              <h2>Please, contact with the IT department.</h2>
              <h3>{this.state.error}</h3>
            </main>
          </Container>
        </React.Fragment>
      );
    } else {
      return this.props.children;
    }
  }
}
