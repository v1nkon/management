import axios from 'axios'
import {
    Message
} from 'element-ui'

import {
    baseUrl
} from './env'

import router from '../router'
import store from '../store'
export default async(url = '', data = {}, type = 'GET') => {
    type = type.toUpperCase();
    url = '/api/v1' + url
    let requestConfig = {
        url,     
        method: type,
        transfromRequest: [ 
            data => data
        ],
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'TOKEN': sessionStorage.getItem('TOKEN')
        },
        params: {
            
        },
        withCredentials: true,
        method: type,
        data: {
            
        },
        responseType: 'json',
        xsrfHeaderName: '',

    }
    if (type == 'GET') {
        Object.assign(requestConfig.params, data) 
    }
    if(type == 'POST' || type == 'PUT' || type == 'PATCH'){
        Object.assign(requestConfig.data, data)
    }
    
    const instance = axios.create(requestConfig)
    instance.interceptors.request.use(config => {

        return config
    }, err => {
        Message.error({
            message: '请求超时'
        })
        return Promise.resolve(err)
    })

    instance.interceptors.response.use( 
        data => {
            let response = data.data
            let {status, msg} = response
            if( status != 200){
                Message.error({
                    message: msg
                })
                response.isError = true
            }
            if ( status == 1000 || status == 1001 ) {
                Message.error({
                    message: msg
                })
                response.isError = true;
                sessionStorage.removeItem('TOKEN');
                store.commit('setMenusHasFinished', false)

                let historyRouter = sessionStorage.getItem('historyRouter') 
                if(!historyRouter){
                    sessionStorage.setItem('historyRouter', router.history.current.path)
                }
                router.push({ path: '/login' });

            }
            return response
        }
        , 
        err => {
            Message.error({
                message: err
            })
            return Promise.reject(err)
        }
    )
    let response =  await instance()
    return response
}
