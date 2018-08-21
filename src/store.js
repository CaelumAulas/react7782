import { createStore } from 'redux'


const stateInicial = []
function tweetsReducer(stateDentroDaStore = stateInicial, acaoDisparadaPeloDev) {
    if(acaoDisparadaPeloDev.type === 'CARREGA_TWEETS') {
        console.log('Tentando carregar tweets')
        return acaoDisparadaPeloDev.tweets
    }
    return stateDentroDaStore
}
window.store = createStore(tweetsReducer)


// const createStore = (reducer) => {
//     let state
//     const subscribers = []

//     const dispatch = (actionDisparadaPeloDev) => {
//         state = reducer(state, actionDisparadaPeloDev)
//         subscribers.forEach( (funcaoAtual) => {
//             funcaoAtual()
//         })
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

