import React, { Component } from 'react'
import Anime from 'react-anime';

export default class Loading extends Component {
    render() {
    const Loading =() => (
        <Anime easing="easeOutElastic"
                loop={true}
                duration={900}
                direction="alternate"
                delay={(el, index) => index * 240}
                translateX='13rem'
                scale={[.75, .9]}>
            <div className="red"/>
            <div className="red"/>
            <div className="red"/>
        </Anime>
    );

    return (
        <section>
            <article id="loading">
                { Loading() }
            </article>
        </section>
    )
  }
}
