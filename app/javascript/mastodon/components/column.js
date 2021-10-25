import React from 'react';
import PropTypes from 'prop-types';
import detectPassiveEvents from 'detect-passive-events';
import { scrollTop } from '../scroll';

export default class Column extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
  };

  scrollTop () {
    const scrollable = this.node.querySelector('.scrollable');

    if (!scrollable) {
      return;
    }

    this._interruptScrollAnimation = scrollTop(scrollable);
  }

  handleWheel = () => {
    if (typeof this._interruptScrollAnimation !== 'function') {
      return;
    }

    this._interruptScrollAnimation();
  }

  setRef = c => {
    this.node = c;
  }

  componentDidMount () {
    this.node.addEventListener('wheel', this.handleWheel,  detectPassiveEvents.hasSupport ? { passive: true } : false);
  }

  componentWillUnmount () {
    this.node.removeEventListener('wheel', this.handleWheel);
  }

  render () {
    const { label, children } = this.props;

    return (
      <div role='region' aria-label={label} className='column' ref={this.setRef}>
        {children}
      </div>
    );
  }

}
