import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

const stateInicial = []
function tweetsReducer(stateDentroDaStore = stateInicial, acaoDisparadaPeloDev) {

    if(acaoDisparadaPeloDev.type === 'CARREGA_TWEETS') {
        console.log('Tentando carregar tweets')
        return acaoDisparadaPeloDev.tweets
    }

    if(acaoDisparadaPeloDev.type === 'ADD_TWEET') {
        console.log(acaoDisparadaPeloDev)
        const tweetsAntigos = stateDentroDaStore
        const tweetNovo = acaoDisparadaPeloDev.tweet

        return [tweetNovo, ...tweetsAntigos]
    }

    if(acaoDisparadaPeloDev.type === 'REMOVE_TWEET') {
        const idDoTweetQueVaiSumir = acaoDisparadaPeloDev.idDoTweetQueVaiSumir
        const listaAtualizadaDeTweets = stateDentroDaStore.filter((tweetAtual) => {
            return tweetAtual._id !== idDoTweetQueVaiSumir
        })

        return listaAtualizadaDeTweets
    }

    return stateDentroDaStore
}

export default createStore(
    tweetsReducer,
    applyMiddleware(thunk)
)


// const createStore = (reducer) => {
//     let state
//     const subscribers = []

//     const dispatch = (actionDisparadaPeloDev) => {
        // if(typeof actionDisparadaPeloDev === 'function') {
        //     actionDisparadaPeloDev(dispatch)
        // } else {
        //     state = reducer(state, actionDisparadaPeloDev)
        //     subscribers.forEach( (funcaoAtual) => {
        //         funcaoAtual()
        //     })

        // }
//     }
//     const subscribe = (funcao) => {
//         subscribers.push(funcao)
//     }
//     return {
//         getState: () => state,
//         dispatch,
//         subscribe
//     }
// }

