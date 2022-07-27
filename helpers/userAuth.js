import { useState } from "react"
import { nextApi } from "../config"
import https from "./https"

export async function userAuth() {

    let auth = false;
    
    return https(`${nextApi}/api/check`)
    .then((res) => {
         auth = true;
         return auth
    //   store.actions({type: 'SET_AUTH', payload: true})
    //   store.actions({type: 'SET_NAME', payload: res.data.user_info?.name})
    //   store.actions({type: 'SET_EMAIL', payload: res.data.user_info?.email})
    }).catch((err) => {
        return auth
      // console.clear() 
    //   store.actions({type: 'SET_AUTH', payload: false})
    })
}
