import React, { Component } from 'react';
import './cabecalho.css'

export default class Cabecalho extends Component {
  render() {
    console.log(this)
    const children = this.props.children
    return (
<header className="cabecalho">
    <div className="cabecalho__container container">
        <h1 className="cabecalho__logo">
            <a href="">Twitelum</a>
        </h1>
        { children }
    </div>
</header>
    )
  }
}
