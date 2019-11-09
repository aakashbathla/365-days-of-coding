import React,{useReducer, useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (currentIngredients, action) => {
  switch(action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ing=>ing.id!==action.id);
    default:
      throw new Error('Should not get there');
  }
}

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  // const [userIngredients,setUserIngredients] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();
  // useEffect(()=>{
  //   fetch('https://react-hooks-update-daf1c.firebaseio.com/ingredients.json',{
      
  //   }).then(response => {
  //     return response.json();
  //   }).then(responseData => {
  //     const loadedIngredients = [];
  //     for(const key in responseData){
  //       loadedIngredients.push({
  //         id: key,
  //         title: responseData[key].title,
  //         amount: responseData[key].amount
  //       })
  //     }
  //     setUserIngredients(loadedIngredients);
  //   })
  // },[]);

  useEffect(()=>{
    console.log('Rendering Ingredients',userIngredients)
  },[userIngredients])
  const addIngredientHandler = ingredient => {
      setIsloading(true);
      fetch('https://react-hooks-update-daf1c.firebaseio.com/ingredients.json',{
        method:'POST',
        body: JSON.stringify(ingredient),
        headers: {
          'Content-Type':'application/json'
        }
      }).then(response=>{
        setIsloading(false);
        return response.json()
      }).then(responseData => {
        dispatch({type: 'ADD', ingredient: {id: responseData.name, ...ingredient}})
        // setUserIngredients((prevIngredients)=>
        //   [...prevIngredients,
        //     {
        //       id: responseData.name,
        //       ...ingredient
        //     }
        //   ]
        // )
      })
  }
  const filteredIngredientsHandler = useCallback(filteredIngredients => {
      // setUserIngredients(filteredIngredients);
      dispatch({type: 'SET', ingredients: filteredIngredients})
  },[]);
  const removeIngredientHandler = ingredientId => {
    setIsloading(true);
    fetch(`https://react-hooks-update-daf1c.firebaseio.com/ingredients/${ingredientId}.json`,{
        method:'DELETE'
      }).then(response => {
        setIsloading(false);
        dispatch({type: 'DELETE', id: ingredientId})
        // setUserIngredients((prevIngredients)=>
        //   prevIngredients.filter(ingredient=>ingredient.id!==ingredientId)
        // )
      }).catch(err => {
        setError('Something Went Wrong');
      })
  }
  const clearError = () => {
    setError(null);
    setIsloading(false);
  }
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>
        {error}
      </ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients = {userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;

//useEffect method is similar to componentDidUpdate
//but when we pass empty array to useEffect Method it behaves 
//as componentDidMount
