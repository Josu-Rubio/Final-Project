import React, { Component } from 'react';
import './styles.css';

export const Context = React.createContext();

const withForm = (WrappedComponent) => {
  return class Form extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    handleInputChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    };

    handleCheckChange = (event) => {
      this.setState({ [event.target.name]: event.target.checked });
    };

    handleSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit(this.state);
    };

    render() {
      return (
        <Context.Provider
          value={{
            inputs: this.state,
            handleInputChange: this.handleInputChange,
            handleCheckChange: this.handleCheckChange,
          }}
        >
          <WrappedComponent {...this.props} onSubmit={this.handleSubmit} />
        </Context.Provider>
      );
    }
  };
};

export default withForm;
