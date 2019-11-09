import {useReducer,useCallback} from 'react';
const httpReducer = (curHttpState,action) => {
    switch(action.type){
      case 'SEND':
        return {
          loading: true,
          error: null,
          data: null
        }
      case 'RESPONSE':
        return {
          ...curHttpState,
          loading: false,
          data: action.responseData
        }
      case 'ERROR':
        return {
          loading: false,
          error: action.errorData
        }
      case 'CLEAR':
        return {
          ...curHttpState,
          error: null
        }
      default:
        throw new Error('Should not be reached');
    }
  }
const useHttp = () => {
    const [httpsState,dispatchHttp] = useReducer(httpReducer, {loading: false, error: null,data: null})
    const sendRequest = useCallback((url,method,body) => {
        dispatchHttp({type: 'SEND'})
        fetch(url,{
            method:method,
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
            // setIsloading(false);
            // dispatchHttp({type: 'RESPONSE'}); 
            // setUserIngredients((prevIngredients)=>
            //   prevIngredients.filter(ingredient=>ingredient.id!==ingredientId)
            // )
        }).then(responseData => {
            dispatchHttp({type: 'RESPONSE',responseData: responseData})
        }).catch(err => {
            
            dispatchHttp({type: 'ERROR', errorData: 'Something went wrong'}); 
            // setError('Something Went Wrong');
        })   
    },[]);
    return {
        isLoading: httpsState.loading,
        data: httpsState.data,
        error: httpsState.error,
        sendRequest: sendRequest
    };
}
export default useHttp;