import React, { Component } from 'react'
import axios from 'axios';
import Recipes from './Recipes';
import SpeechToText from 'speech-to-text';
import Loading from './Loading';

// onFinalised = text => {
//     let ingredientsArray = text.split(' ').map((ingredient)=> {
//         return ingredient.trim()
//     });
//     let ingredientsObject = {
//         ingredients: ingredientsArray
//     }
//     axios.post('http://localhost:8080/recipes', ingredientsObject)
//     .then(recipes => {
//         console.log(recipes.data);
//         this.setState({
//             recipes: recipes.data
//         });
//     })
// };



export default class Home extends Component {
    state = {
       recipes: [],
       listening: false,
       loading: false
    }; 

    toggleLoading = () => this.setState({ loading: !this.state.loading });

    onFinalised = text => {
        let ingredientsArray = text.split(' ').map((ingredient)=> {
            return ingredient.trim()
        });
        let ingredientsObject = {
            ingredients: ingredientsArray
        }
        if (ingredientsArray[ingredientsArray.length - 1] === 'submit'){
        axios.post('http://localhost:8080/recipes', ingredientsObject)
        .then(recipes => {
            this.setState({
                recipes: recipes.data,
                listening: false
            });
        })}
    };

    onAnythingSaid = text => {
        console.log(text);
    };

    onListener = () =>{
        try {
            this.setState({ listening: true });
            const listener = new SpeechToText(this.onAnythingSaid, this.onFinalised);
            listener.startListening();
        } catch (error) {
            console.log(error);
        }
    }
    onSubmit = (e)=>{
        e.preventDefault();
        this.setState({ loading: true })
        let ingredients = e.target.input.value;
        let ingredientsArray = ingredients.split(',');
        ingredientsArray = ingredientsArray.map((ingredient)=> {
            return ingredient.trim()
        });
        let ingredientsObject = {
            ingredients: ingredientsArray
        }
        axios.post('http://localhost:8080/recipes', ingredientsObject)
        .then(recipes => {
            console.log(recipes.data);
            this.setState({
                recipes: recipes.data,
                loading: false
            });
        })
    }

  render() {
      
    return (
        <div className="groceryList">
        <div className='search'>
            <img src='/Assets/Pictures/bread-head.jpg' />
            <form onSubmit={this.onSubmit}>
                <label>
                    <h1 className='hero-text'>Enter Ingredients</h1>
                    <input className="search-input" name='input' placeholder="Example: broccoli, chicken, broth..."></input>
                    <button className="search-button"><img className="search-icon" src="/Assets/pictures/Search.svg" /></button>
                </label>
                <div className='listener'>
                    <svg className='listener__icon' onClick={this.onListener} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        fill={ this.state.listening ? '#ff3333' : '#000000' } viewBox="0 0 475.085 475.085">
                    <g>
                        <g>
                            <path d="M237.541,328.897c25.128,0,46.632-8.946,64.523-26.83c17.888-17.884,26.833-39.399,26.833-64.525V91.365
                                c0-25.126-8.938-46.632-26.833-64.525C284.173,8.951,262.669,0,237.541,0c-25.125,0-46.632,8.951-64.524,26.84
                                c-17.893,17.89-26.838,39.399-26.838,64.525v146.177c0,25.125,8.949,46.641,26.838,64.525
                                C190.906,319.951,212.416,328.897,237.541,328.897z"/>
                            <path d="M396.563,188.15c-3.606-3.617-7.898-5.426-12.847-5.426c-4.944,0-9.226,1.809-12.847,5.426
                                c-3.613,3.616-5.421,7.898-5.421,12.845v36.547c0,35.214-12.518,65.333-37.548,90.362c-25.022,25.03-55.145,37.545-90.36,37.545
                                c-35.214,0-65.334-12.515-90.365-37.545c-25.028-25.022-37.541-55.147-37.541-90.362v-36.547c0-4.947-1.809-9.229-5.424-12.845
                                c-3.617-3.617-7.895-5.426-12.847-5.426c-4.952,0-9.235,1.809-12.85,5.426c-3.618,3.616-5.426,7.898-5.426,12.845v36.547
                                c0,42.065,14.04,78.659,42.112,109.776c28.073,31.118,62.762,48.961,104.068,53.526v37.691h-73.089
                                c-4.949,0-9.231,1.811-12.847,5.428c-3.617,3.614-5.426,7.898-5.426,12.847c0,4.941,1.809,9.233,5.426,12.847
                                c3.616,3.614,7.898,5.428,12.847,5.428h182.719c4.948,0,9.236-1.813,12.847-5.428c3.621-3.613,5.431-7.905,5.431-12.847
                                c0-4.948-1.81-9.232-5.431-12.847c-3.61-3.617-7.898-5.428-12.847-5.428h-73.08v-37.691
                                c41.299-4.565,75.985-22.408,104.061-53.526c28.076-31.117,42.12-67.711,42.12-109.776v-36.547
                                C401.998,196.049,400.185,191.77,396.563,188.15z"/>
                        </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                    </svg>
                </div>
            </form>
        </div>
        { this.state.loading ? <Loading/> : <Recipes recipes={ this.state.recipes } /> }
      </div>
    )
  }
}
