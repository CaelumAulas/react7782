import React, { Component } from 'react'
import './modal.css'


export default class Modal extends Component {


    render() {
        return (
            <div className={`modal ${ this.props.isAberto && 'modal--isAtivo' }`} onClick={this.props.fechaModal}>

                <div className="modal__wrap">
                    { this.props.children }
                </div>
            </div>
        )
    }
}