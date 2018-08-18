import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Helmet from 'react-helmet'
import Modal from '../../components/Modal'

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

   componentDidMount() {
       console.log('didMount')
       fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
       .then( (respostaDoServidor) => respostaDoServidor.json() )
       .then( (tweetsVindosDoServidor) => {
            this.setState({
                tweets: tweetsVindosDoServidor
            })
       })
       // Façam  uma mensagem de 'carregando' enquanto não chegam
       // os tweets
   }

   adicionaTweet = (event) => { // Stage 3 do TC39
    event.preventDefault()
    console.log(this.state.novoTweet)
    // valida o conteudo?
    if(this.state.novoTweet) {
        fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'POST',
            body: JSON.stringify({ conteudo: this.state.novoTweet })
        })
        .then((respostaDoServidor) => {
            return respostaDoServidor.json()
        })
        .then((respostaConvertidaEmObjeto) => {
            console.log('Que danado que aconteceu', respostaConvertidaEmObjeto)

            this.setState({
                tweets: [respostaConvertidaEmObjeto, ...this.state.tweets],
                novoTweet: ''
            })
        })

    }
   }

   removeOTweet = (idDoTweet) => {
        console.log('vamo q vamo', idDoTweet)
        // # Deixar em uma linha só!
        const listaAtualizada = this.state.tweets.filter((tweetAtual) => {
                return tweetAtual._id !== idDoTweet
        })

        fetch(`http://twitelum-api.herokuapp.com/tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE'
        })
        .then( (resposta) => resposta.json() ) // Validação seria aqui!
        .then( (respostaConvertidaEmObjeto) => {
            console.log(respostaConvertidaEmObjeto)
            this.setState({
                tweets: listaAtualizada
            })
        })
    }

    abreModal = (idDoTweetQueVaiNoModal) => {
        console.log('Abre modal', idDoTweetQueVaiNoModal)
        const tweetQueVaiFicarAtivo = this.state.tweets.find((tweetAtual) => {
            return tweetAtual._id === idDoTweetQueVaiNoModal
        })
        this.setState({
            tweetAtivo: tweetQueVaiFicarAtivo
        })
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
                                        removeHandler={() => { this.removeOTweet(tweetAtual._id) }}
                                        abreModalHandler={ () => { this.abreModal(tweetAtual._id) } }
                                        usuario={tweetAtual.usuario} />
                            })
                        }
                    </div>
                </Widget>
            </Dashboard>
        </div>

        <Modal isAberto={Boolean(this.state.tweetAtivo._id)}>
            {
                Boolean(this.state.tweetAtivo._id) &&
                <Widget>
                    <Tweet 
                        id={this.state.tweetAtivo._id}
                        texto={this.state.tweetAtivo.conteudo}
                        usuario={this.state.tweetAtivo.usuario}
                    />
                </Widget>
            }
        </Modal>
      </Fragment>
    );
  }
}

export default Home;
