import { Component } from "react";

// If the lazy three.js chunk fails to load (flaky network, old deploy),
// render nothing instead of taking the whole page down; the CSS orb in
// the hero stays visible as the fallback.
export default class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
