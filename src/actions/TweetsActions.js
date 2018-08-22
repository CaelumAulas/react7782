
export const removeTweet = (idDoTweet) => {
    return function(dispatch) {
        fetch(`http://twitelum-api.herokuapp.com/tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE'
        })
        .then( (resposta) => resposta.json() ) // Validação seria aqui!
        .then( (respostaConvertidaEmObjeto) => {
            dispatch({ type: 'REMOVE_TWEET', idDoTweetQueVaiSumir: idDoTweet })
        })
    }
}

export const adicionaTweet = (novoTweet) => {
    return function(dispatch) {
        fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'POST',
            body: JSON.stringify({ conteudo: novoTweet })
        })
        .then((respostaDoServidor) => { return respostaDoServidor.json() })
        .then((respostaConvertidaEmObjeto) => {
            dispatch({ type: 'ADD_TWEET', tweet: respostaConvertidaEmObjeto })
        })
    } // fecha a function
} // fecha o adicionaTweet()

// Action Creator (async)
export const carregaTweets = () => {
    return function(dispatch) {
        fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then( (respostaDoServidor) => respostaDoServidor.json() )
            .then( (tweetsVindosDoServidor) => {
                dispatch({ type: 'CARREGA_TWEETS', tweets: tweetsVindosDoServidor })
            })
    }
}