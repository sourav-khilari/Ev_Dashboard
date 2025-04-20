import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  //run when error occurs
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("🔥 Caught by Error Boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 m-6 bg-red-100 text-red-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold">Something went wrong 😢</h2>
          <p className="text-sm mt-2">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;