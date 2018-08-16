import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'


class LoginPage extends Component {

    aloaloToFazendoLogin = (evento) => {
        evento.preventDefault()
        const login = this.inputDoLogin.value
        const senha = this.inputDaSenha.value
        const dadosDeLogin = { login: login, senha: senha }
        fetch('http://twitelum-api.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify(dadosDeLogin)
        })
        .then( (respostaDoServidor) => { return respostaDoServidor.json() })
        .then( (respostaEmObjeto) => {
            localStorage.setItem('TOKEN', respostaEmObjeto.token)
            this.props.history.push('/')
        })
    }

    render() {
        console.log('render disparado')
        return (
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h1 className="loginPage__title">Twitelum</h1>
                        <form className="loginPage__form" onSubmit={this.aloaloToFazendoLogin} action="/">
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Login</label> 
                                <input
                                    ref={ (inputDoLogin) => this.inputDoLogin = inputDoLogin }
                                    className="loginPage__input"
                                    type="text"
                                    id="login"
                                   name="login"/>
                            </div>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                <input
                                    ref={ (inputDaSenha) => this.inputDaSenha = inputDaSenha }
                                    className="loginPage__input"
                                    type="password" id="senha" name="senha"/>
                            </div>
                            {/* <div className="loginPage__errorBox">
                                Mensagem de erro!
                            </div> */}
                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit">
                                    Logar
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        )
    }
}


export default LoginPage