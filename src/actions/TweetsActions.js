

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