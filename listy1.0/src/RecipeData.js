import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Loading from './Loading';
import axios from 'axios';



class RecipeData extends Component {
    state = {
        data: {
            analyzedInstructions: [
                {
                    steps: []
                }
            ]
        },
        nutrition: {
            calories: {
                value: 0
            },
            carbs: {
                value: 0
            },
            fat: {
                value: 0
            },
            protein: {
                value: 0
            }
        },
        reccomended: {
            calories: 2000,
            carbs: 225,
            fat: 78,
            protein: 56
        }
    }

    readMe = (e) => {
        let readData = { 
            text: this.state.data.instructions
        };
        axios.post('http://localhost:8080/read', readData)
        .then((response)=>{
            console.log(response)
            let audio = document.getElementById('play');
            console.log(audio);
            // audio.src = 'http://localhost:8080/output.mp3';
            setTimeout(()=>{
                audio.src = 'http://localhost:8080/output.mp3';
                audio.play()
            }, 3000);
        })
        }


    displayData = () => {
        let keys = Object.keys(this.state.nutrition);
        keys.splice(0,1);
        let data = keys.map(key => {
            let hasPercent = Math.floor(Number(this.state.nutrition[key].value) / Number(this.state.reccomended[key]) * 100);
            return { name: key, percentage: hasPercent };
        });
        return (
          <BarChart width={600} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="percentage" fill="#ff3333" background={{ fill: '#eee' }} />
          </BarChart>
        );
    }

    displayInstructions = () => {
        return this.state.data.analyzedInstructions.map(instruction => (
            <div className='step'>
                <h3 className='step__number'>{ instruction.name }</h3>
                { 
                instruction.steps.map(step => {
                    return (
                        <div className='step__item'>
                            <h4>{ step.number }.</h4>
                            <p>{ step.step }</p>
                        </div>
                    );
                }) 
                }
            </div>
        ));
    }

    componentDidMount() {
        let url = 'http://localhost:8080/recipe/' + this.props.match.params.id
        axios.get(url).then(response => {
            this.setState({
                data: response.data.data,
                nutrition: response.data.nutrition
            });
        });   
    }
    
    render() {
        if(Object.keys(this.state.data).length === 1) return <Loading />;
        return (
            <div>
                <h1 className='recipe-title'>{ this.state.data.title }</h1>
                <div className='recipeData'>
                    <div className='left-side'>
                        <img src={ this.state.data.image } />
                        <button  onClick={this.readMe}> Read me my recipe </button>
                        <audio id='play' src='' type='audio/mpeg'>
                        </audio>
                        <h2>Meal Info</h2>
                        <p> Prep Time: { this.state.data.preparationMinutes } mins </p>
                        <p> Cooking Time: {this.state.data.cookingMinutes} mins </p>
                        <p> Servings: {this.state.data.servings} </p>
                        <h2> Nutrition </h2>
                        <p> Calories: { this.state.nutrition.calories.value } cals </p>
                        <p> Carbs: {this.state.nutrition.carbs.value} grams</p>
                        <p> Fat: {this.state.nutrition.fat.value} grams </p>
                        <p> Protein: {this.state.nutrition.protein.value} grams </p>
                        <div id="container">
                            { this.displayData() }
                        </div>
                    </div>
                    <div className='right-side'>
                        <h2 className='instructions'>Instructions</h2>
                        <p>{ this.displayInstructions() }</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecipeData;