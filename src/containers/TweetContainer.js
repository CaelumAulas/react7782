import Tweet from '../components/Tweet'
import * as TweetsActions from '../actions/TweetsActions'
import { connect } from 'react-redux'
const mapStateToProps = (state) => { return {} }
const mapDispatchToProps = (dispatch, propsRecebidas) => {
    return {
        removeHandler: function() {
            dispatch(TweetsActions.removeTweet(propsRecebidas.id))
        }
    }
}
const TweetPadraoContainer = connect(mapStateToProps, mapDispatchToProps)(Tweet)
export default TweetPadraoContainer

// export default class TweetContainer extends Component {
//     removeHandler = () => {
//  
//     }
//     render() {
//         console.log(this.props)
//         return (
//             <Tweet { ...this.props } removeHandler={this.removeHandler} />
//         )
//     }
// }