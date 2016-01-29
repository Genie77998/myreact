import { UPDATE_OBJ } from '../actions'
import { CarApi } from '../api'
import { common } from '../com/unilt'
let states = common.getObj()
export default function objItem( state = states, action) {
    switch (action.type) {
        case UPDATE_OBJ:
            if (typeof action.name != 'undefined' && typeof action.value != 'undefined') {
                state[action.name] = action.value
                common.setObj(state)
                return state
            } else {
                return state
            }
        default:
            return state
    }
}
