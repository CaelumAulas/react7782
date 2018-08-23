import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../containers/TweetContainer'
import Helmet from 'react-helmet'
import Modal from '../../components/Modal'
import PropTypes from 'prop-types'
import * as TweetsActions from '../../actions/TweetsActions'

class Home extends Component {
   constructor() {
       super()

       this.state = {
           novoTweet: '',
           tweets: [],
           tweetAtivo: {}
        }
    //    this.adicionaTweet = this.adicionaTweet.bind(this)
   }

   static contextTypes = {
       store: PropTypes.object
   }


   componentDidMount() {
        this.context.store.subscribe(() => {
            console.log(this.context.store.getState())
            this.setState({
                tweetAtivo: this.context.store.getState().tweetAtivo,
                tweets: this.context.store.getState().tweets,
            })
        })

        this.context.store.dispatch(TweetsActions.carregaTweets())
    }

   adicionaTweet = (event) => { // Stage 3 do TC39
    event.preventDefault()
    if(this.state.novoTweet) {
        this.context
            .store.dispatch(TweetsActions.adicionaTweet(this.state.novoTweet))

        this.setState({
            novoTweet: ''
        })
    }
   }

    abreModal = (idDoTweetQueVaiNoModal) => {
        this.context.store.dispatch({ type: 'ABRE_MODAL', idDoTweetQueVaiNoModal  })
        // this.setState({
        //     tweetAtivo: tweetQueVaiFicarAtivo
        // })
    }

    fechaModal = (evento) => {
        const elementoAlvo = evento.target
        const isModal = elementoAlvo.classList.contains('modal')

        if(isModal) {
            console.log('fecha o modal')
            this.context.store.dispatch({ type: 'FECHA_MODAL' })
        }
    }
  render() {

    //   console.log('Render rodando loucamente')
    return (
      <Fragment>
        <Helmet>
            <title>
                Twitelum - Tweets ({ `${this.state.tweets.length}` })
            </title>

        </Helmet>
        <Cabecalho>
            <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form className="novoTweet" onSubmit={this.adicionaTweet}>
                        <div className="novoTweet__editorArea">
                            <span className={ `novoTweet__status ${
                                this.state.novoTweet.length > 140
                                ? 'novoTweet__status--invalido'
                                : ''
                            }` }>
                                { this.state.novoTweet.length }/140
                            </span>
                            <textarea
                                onChange={ (event) => { this.setState({ novoTweet: event.target.value }) } }
                                value={this.state.novoTweet}
                                className="novoTweet__editor"
                                placeholder="O que está acontecendo?"
                            ></textarea>
                        </div>
                        
                        <button type="submit"
                                disabled={ this.state.novoTweet.length > 140 }
                                className="novoTweet__envia">
                                Tweetar
                        </button>
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                        {
                            this.state.tweets.length === 0 
                            ? <h2>Loading... Cargando... Carregando...</h2>
                            : ''
                        }

                        {
                            this.state.tweets.map((tweetAtual, indice) => {
                                return <Tweet
                                        key={tweetAtual._id}
                                        id={tweetAtual._id}
                                        texto={tweetAtual.conteudo}
                                        removivel={tweetAtual.removivel}
                                        likeado={tweetAtual.likeado}
                                        totalLikes={tweetAtual.totalLikes}
                                        // removeHandler={() => { this.removeOTweet(tweetAtual._id) }}
                                        abreModalHandler={ () => { this.abreModal(tweetAtual._id) } }
                                        usuario={tweetAtual.usuario} />
                            })
                        }
                    </div>
                </Widget>
            </Dashboard>
        </div>

        <Modal
            isAberto={Boolean(this.state.tweetAtivo._id)}
            fechaModal={this.fechaModal}>
            {
                Boolean(this.state.tweetAtivo._id) &&
                <Widget>
                    <Tweet 
                        id={this.state.tweetAtivo._id}
                        texto={this.state.tweetAtivo.conteudo}
                        usuario={this.state.tweetAtivo.usuario}
                        totalLikes={this.state.tweetAtivo.totalLikes}
                        removivel={this.state.tweetAtivo.removivel}
                        likeado={this.state.tweetAtivo.likeado}
                    />
                </Widget>
            }
        </Modal>
      </Fragment>
    );
  }
}

export default Home;
