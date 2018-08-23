import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

const stateInicial = { tweets: [], tweetAtivo: {} }
function tweetsReducer(stateDentroDaStore = stateInicial, acaoDisparadaPeloDev) {

    if(acaoDisparadaPeloDev.type === 'CARREGA_TWEETS') {
        return {
            ...stateDentroDaStore,
            tweets: acaoDisparadaPeloDev.tweets
        }
    }
    if(acaoDisparadaPeloDev.type === 'ADD_TWEET') {
        const tweetsAntigos = stateDentroDaStore.tweets
        const tweetNovo = acaoDisparadaPeloDev.tweet

        return {
            ...stateDentroDaStore,
            tweets: [tweetNovo, ...tweetsAntigos]
        }
    }
    if(acaoDisparadaPeloDev.type === 'REMOVE_TWEET') {
        const idDoTweetQueVaiSumir = acaoDisparadaPeloDev.idDoTweetQueVaiSumir
        const listaAtualizadaDeTweets = stateDentroDaStore.tweets.filter((tweetAtual) => {
            return tweetAtual._id !== idDoTweetQueVaiSumir
        })
        return {
            ...stateDentroDaStore,
            tweets: listaAtualizadaDeTweets
        }
    }

    if(acaoDisparadaPeloDev.type === 'ABRE_MODAL') {
        console.log(acaoDisparadaPeloDev)
        const idDoTweetQueVaiNoModal = acaoDisparadaPeloDev.idDoTweetQueVaiNoModal
        const tweetQueVaiFicarAtivo = stateDentroDaStore.tweets.find((tweetAtual) => {
            return tweetAtual._id === idDoTweetQueVaiNoModal
        })

        return {
            ...stateDentroDaStore,
            tweetAtivo: tweetQueVaiFicarAtivo
        }
    }
    if(acaoDisparadaPeloDev.type === 'FECHA_MODAL') {
        return {
            ...stateDentroDaStore,
            tweetAtivo: {}
        }
    }


    // ABRE MODAL

    //  FECHA MODAL 

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

