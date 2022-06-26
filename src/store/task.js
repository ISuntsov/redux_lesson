import {/*createAction, createReducer,*/ createSlice} from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import {setError} from "./errors";

const initialState = {entities: [], isLoading: true}

// [
    // {id:1, title: "Task 1", completed: false},
    // {id:2, title: "Task 2", completed: false}
// ]

// const update = createAction('task/updated')
// const remove = createAction('task/removed')

// const TASK_UPDATED = "task/updated"
// const TASK_DELETED = "task/deleted"

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        recived(state, action) {
            console.log(action.payload[0])
            state.entities = action.payload
            state.isLoading = false
        },
        createdNewTask(state, action) {
            console.log(action)
            state.entities = [...state.entities,action.payload]
            state.isLoading = false
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex(
                (el) => el.id === action.payload.id
            )
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload
            }
        },
        remove(state, action){
            state.entities = state.entities.filter(
                (el)=> el.id !== action.payload.id
            )
        },
        taskRequasted(state){
            state.isLoading = true
        },
        taskRequastFailed(state){
            state.isLoading = false
        }
}})

const {actions, reducer: taskReducer} = taskSlice
const {
    update,
    remove,
    recived,
    createdNewTask,
    taskRequasted,
    taskRequastFailed
} = actions

// const taskRequasted = createAction("task/requested")
// const taskRequastFailed = createAction("task/requestFailed")

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequasted())
    try {
        const data = await todosService.fetch()
        dispatch(recived(data))
    } catch (error) {
        dispatch(taskRequastFailed())
        dispatch(setError(error.message))
    }
}

export const newTaskCreated = (payload) => async (dispatch) => {
    console.log(payload)
    dispatch(taskRequasted());
    try {
        const data = await todosService.post(payload);
        dispatch(createdNewTask(data));
    } catch (error) {
        dispatch(taskRequastFailed());
        dispatch(setError(error.message));
    }
};


export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }))
}

// export function taskCompleted(id){
//     return update({ id, completed: true })
// }

export function titleChanged(id){
    return update({ id, title: `New title for ${id}` })
}

export function taskDeleted(id){
    return remove({ id })
}

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer

// const taskReducer = createReducer(initialState, (builder)=>{
//     builder.addCase(update, (state,action) => {
//         const elementIndex = state.findIndex(
//             (el) => el.id === action.payload.id
//         )
//         state[elementIndex] = {
//             ...state[elementIndex],
//             ...action.payload
//         }
//     }).addCase(remove, (state,action)=> {
//         return state.filter((el)=> el.id !== action.payload.id)
//     })
// })

// function taskReducer(state = [], action) {
//     switch (action.type) {
//         case update.type:
//             const newArray = [...state]
//             const elementIndex = newArray.findIndex(
//                 (el) => el.id === action.payload.id
//             )
//             newArray[elementIndex] = {
//                 ...newArray[elementIndex],
//                 ...action.payload
//             }
//             return newArray
//
//         case remove.type:
//             const reducedArray = [...state]
//             const deletedIndex = reducedArray.findIndex(
//                 (el) => el.id === action.payload.id
//             )
//             const deletedEl = reducedArray.splice(deletedIndex,1)
//             console.log(JSON.stringify(...deletedEl))
//             return reducedArray
//
//         default:
//             return state
//     }
// }

