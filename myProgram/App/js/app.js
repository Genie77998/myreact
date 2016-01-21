import '../scss/global.scss'
import '../scss/com.scss'
import React from 'react'
import { render } from 'react-dom'
import { HashLocation , Router, Route, Link } from 'react-router'
import routes from './router'
import {DZ_COM , convertRequestURL , convertParams} from './com/DZ_COM'
import redux , { createStore } from 'redux'
import { Provider } from 'react-redux'
import configureStore from './store'
function renderDevTools(store) {
    if (__DEBUG__) {
        let {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react')
        return (
            <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
            </DebugPanel>
        )
    }
    return null
}
const store = configureStore()
let unsubscribe = store.subscribe(() =>
  console.log(store.getState(),'log')
)

const init = function(){
	render(<div><Provider store={store}><Router routes={routes} history={HashLocation} /></Provider>{renderDevTools(store)}</div>, document.body);
}

/*document.addEventListener("DazeJSObjReady", () => {
    DZ_COM.login(() => init());
}, false);*/
if(__PROD__){
	document.addEventListener("DazeJSObjReady", () => {
        DZ_COM.login(function(){
        	init()
        })
    }, false);
}else{
    //绑定处理程序
    DZ_COM.login(() => init());
}
