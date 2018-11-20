import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Recipes extends Component {
  render() {
    let recipe = (recipe)=>{
        return (
            <Link to={ '/recipe/' + recipe.id }>
                <div className='recipe'> 
                    <img src={recipe.image} alt={recipe.title}/>
                    <div className="right-side">
                        <h1> {recipe.title} </h1>
                        <h2> Likes: {recipe.likes} </h2>
                        <h2> Ingredients used from grocery list: {recipe.usedIngredientCount} </h2>
                        <h2> Missing ingredients: {recipe.missedIngredientCount} </h2>
                    </div>
                </div>
            </Link>
        );
    }

    return (
      <div className='recipe-list'>
          {this.props.recipes.map((recipes) => recipe(recipes))}
      </div>
    )
  }
}
