import axios from 'axios';

export const  getData = () =>{
    return function (dispatch) {
        return axios.get("http://localhost:3010/getdata").then(res => {
            dispatch(setData(res.data))
        })

    }
}


function setData(data){
    return ({
        type: 'get_data',
        payload: data
    })
}