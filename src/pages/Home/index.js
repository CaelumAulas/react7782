import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Helmet from 'react-helmet'

class Home extends Component {
   constructor() {
       super()

       this.state = {
           novoTweet: '',
           tweets: []
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

  render() {

    //   console.log('Render rodando loucamente')
    return (
      <Fragment>
        <Helmet>
            <title>Twitelum - Tweets ({ `${this.state.tweets.length}` })</title>
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
                            this.state.tweets.map(function(tweetAtual, indice) {
                                return <Tweet
                                        key={tweetAtual._id}
                                        id={tweetAtual._id}
                                        texto={tweetAtual.conteudo}
                                        likeado={tweetAtual.likeado}
                                        totalLikes={tweetAtual.totalLikes}
                                        usuario={tweetAtual.usuario} />
                            })
                        }
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default Home;
