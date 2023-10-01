import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: "",
      errorStack: "",
      errorDetailsFlag: false,
    };
  }

  componentDidCatch(error, info) {
    // You can log the error or perform any necessary actions here
    //console.error('Error caught by boundary:', JSON.stringify(error));
    //console.error('Error caught by boundary info:', info);


    //console.error(`Error occurred at URL: ${info.componentStack}`);

    // Update state to trigger rendering of the fallback UI
    this.setState({ hasError: true, errorInfo: error.message, errorStack: info.componentStack });
  }

  errorDetails = () => {
    this.setState({
      errorDetailsFlag: !this.state.errorDetailsFlag
    })
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI
      return (
        <>
        <div className='errorDiv'>
          <h1>{this.props.title}</h1>
          <div className='errorIconBox'>
            <div className='errorIcon'><FontAwesomeIcon icon={faExclamationTriangle} size="3x" /></div>
          <p>{this.state.errorInfo.toUpperCase()}</p>
          </div>
          
          <button className='errorDetailsbtn' onClick={() => this.errorDetails()}>Error Details</button>
          {this.state.errorDetailsFlag &&
            <p className='errorDetail'>{this.state.errorStack}</p>
          }
          </div>
        </>
      );
    }

    // Render the regular content if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
