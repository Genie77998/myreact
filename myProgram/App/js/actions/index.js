export const UPDATE_OBJ = 'UPDATE_OBJ'
export function updateobj(name,value) {
    return {
        type: UPDATE_OBJ,
        name,
        value
    }
}
