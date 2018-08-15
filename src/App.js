import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {
   constructor() {
        super()

       this.state = {
           novoTweet: '',
           tweets: ['alo alo w brazil', 'xablau']
       }

    //    this.adicionaTweet = this.adicionaTweet.bind(this)
   }

//    adicionaTweet(event) {
//         // Prevenir o default?
//         event.preventDefault()
//         // primeiro pegamos o conteudo
//         console.log(this)
//         // valida o conteudo?
//         // põe no state?
//    }

   teste = 'Mario'

   adicionaTweet = (event) => { // Stage 3 do TC39
    event.preventDefault()
    console.log(this.state.novoTweet)
    // valida o conteudo?
    if(this.state.novoTweet) {
        this.setState({
            tweets: [this.state.novoTweet, ...this.state.tweets],
            novoTweet: ''
        })
    }
   }

  render() {
    //   console.log('Render rodando loucamente')
    return (
      <Fragment>
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
                            this.state.tweets.map(function(tweetAtual, indice) {
                                return <Tweet key={indice} texto={tweetAtual} />
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

export default App;
