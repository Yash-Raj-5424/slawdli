import { Component } from 'react';
import Button from './ui/Button';
import Card from './ui/Card';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex min-h-[50vh] max-w-lg items-center px-4 py-16">
          <Card className="w-full text-center">
            <h1 className="text-xl font-semibold text-clinical-text">Something went wrong</h1>
            <p className="mt-2 text-sm text-clinical-muted">
              An unexpected error occurred. Please refresh the page and try again.
            </p>
            <Button className="mt-6" onClick={() => window.location.reload()}>
              Refresh page
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
