"use client";

import { Component, type ReactNode } from "react";
import { ErrorState } from "@/components/ui/error-state";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Unhandled render error:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto max-w-7xl px-6 py-16">
          <ErrorState message="Une erreur est survenue lors du chargement de cette page. Veuillez actualiser." />
        </div>
      );
    }
    return this.props.children;
  }
}
