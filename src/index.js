import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import {/*taskCompleted,*/
    titleChanged,
    taskDeleted,
    completeTask,
    loadTasks,
    getTasks,
    getTasksLoadingStatus,
    newTaskCreated
} from "./store/task";
import {Provider, useDispatch, useSelector} from "react-redux";
import {getError} from "./store/errors";

const store = configureStore()

const App = (params) => {
    // const [state,setState] = useState(store.getState());
    const state = useSelector(getTasks())
    const isLoading = useSelector(getTasksLoadingStatus())
    const error = useSelector(getError())
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(loadTasks())
        
        // store.subscribe(()=>{
        //     setState(store.getState())
        // })
    }, []);
    
    
    // const completeTask = (taskId) => {
    //    store.dispatch((dispatch,getState) => {
    //        store.dispatch(taskCompleted(taskId))
    //    })
    // }
    
    const createNewTask = () => {
        dispatch(newTaskCreated({
            id: Math.random(),
            title: new Date(),
            completed: false}))
    }
    
    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId))
    }
    
    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId))
    }
    
    if (isLoading){
        return <h1>Loading</h1>
    }
    if (error){
        return <p>{error}</p>
    }
    
    
    return <>
        <h1>App</h1>
        <button onClick={()=>createNewTask()}>
            Add New Task
        </button>
        <hr/>
        <ul>
            {state.map((el) => <li key={el.id}>
                <p>{el.title}</p>
                <p>{`Completed: ${el.completed}`}</p>
                <button onClick={()=> dispatch(completeTask(el.id))}>
                    Complete
                </button>
                <button onClick={()=>changeTitle(el.id)}>
                    Change Title
                </button>
                <button onClick={()=>deleteTask(el.id)}>
                    Delete Task
                </button>
                <hr/>
            </li>)}
        </ul>
    </>
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
