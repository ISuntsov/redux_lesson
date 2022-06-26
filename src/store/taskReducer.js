import {taskUpdated,taskDeleted} from "./actionTypes";

export function taskReducer(state = [], action) {
    switch (action.type) {
        case taskUpdated:
            const newArray = [...state]
            const elementIndex = newArray.findIndex(
                (el) => el.id === action.payload.id
            )
            newArray[elementIndex] = {
                ...newArray[elementIndex],
                ...action.payload
            }
            return newArray
    
        case taskDeleted:
            const reducedArray = [...state]
            const deletedIndex = reducedArray.findIndex(
                (el) => el.id === action.payload.id
            )
            const deletedEl = reducedArray.splice(deletedIndex,1)
            console.log(JSON.stringify(...deletedEl))
            return reducedArray
        
        default:
            return state
    }
}