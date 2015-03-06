import RenderNode from 'famous/core/RenderNode';
import Deck from 'famous/views/Deck';
import toPlainObject from 'lodash/lang/toPlainObject';
import React from 'react';

import FamousMixin from '../lib/FamousMixin';

export default React.createClass({
  mixins: [FamousMixin],

  famousName: 'Deck',

  famousCreate() {
    let deck = new Deck(this.props.options);
    this.setFamous(deck);
    this.setFamousNode(this.getFamousParentNode().add(deck));

    let sequence = this.props.children.map(() => new RenderNode());
    deck.sequenceFrom(sequence);
    this.setFamousKeyedNodes(toPlainObject(sequence));
  },

  famousUpdate(nextProps) {
    let deck = this.getFamous();

    deck.setOptions(nextProps.options);
  },

  render() {
    if (!this.getFamousReady()) { return null; }

    return (
      <div data-famous={this.famousName}>
        {this.props.children.map((child, idx) => React.cloneElement(child, {key: idx}))}
      </div>
    );
  }
});
