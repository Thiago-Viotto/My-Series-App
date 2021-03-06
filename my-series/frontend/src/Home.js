import React, { Component } from 'react'
import api from './server/api'

import {
    Link
} from 'react-router-dom'

import "./css/Home.css"
import './css/Films.css'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            isLoading: false
        }
    }

    // O Componente está montado
    componentDidMount() {

        // define que os dados estão sendo carregados
        this.setState({ isLoading: true })

        api.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data
                })
            })
    }

    renderGenrerLink(genre) {
        // <h2 key={genre}>&nbsp;&nbsp;<Link to={`/series/${genre}`}>{genre}</Link></h2>
        //  <Link to={`/series/${genre}`}><span key={genre}>&nbsp;&nbsp;{genre}</span></Link>
        switch (genre) {
            case "Comédia": 
                return <Link key={genre} to={`/films/${genre}`}>
                <div className="item col-xs-4 col-lg-4">
                    <div className="films">
                        <img className='imgGenresHome' alt={genre} src="imgGenres/comedia.jpg" />
                    </div>
                </div>
                        </Link>;
  
            case "Drama": 
                return <Link key={genre} to={`/films/${genre}`}>
                <div className="item col-xs-4 col-lg-4">
                    <div className="films">
                        <img className='imgGenresHome' alt={genre} src="imgGenres/drama.jpg" />
                    </div>
                </div>
                        </Link>;
            case "Ação": 
                return <Link key={genre} to={`/films/${genre}`}>
                    <div className="item col-xs-4 col-lg-4">
                        <div className="films">
                            <img className='imgGenresHome' alt={genre} src="imgGenres/acao.jpg" />
                        </div>
                    </div>
                        </Link>;
            case "Terror": 
            return <Link key={genre} to={`/films/${genre}`}>
                <div className="item col-xs-4 col-lg-4">
                    <div className="films">
                        <img className='imgGenresHome' alt={genre} src="imgGenres/terror.jpg" />
                    </div>
                </div>
                    </Link>;
            case "Aventura": 
            return <Link key={genre} to={`/films/${genre}`}>
                <div className="item col-xs-4 col-lg-4">
                    <div className="films">
                        <img className='imgGenresHome' alt={genre} src="imgGenres/aventura.jpg" />
                    </div>
                </div>
                    </Link>;
            case "Suspense": 
            return <Link key={genre} to={`/films/${genre}`}>
                <div className="item col-xs-4 col-lg-4">
                    <div className="films">
                        <img className='imgGenresHome' alt={genre} src="imgGenres/suspense.jpg" />
                    </div>
                </div>
                    </Link>;
            case "FicçãoCientífica": 
            return <Link key={genre} to={`/films/${genre}`}>
                <div className="item col-xs-4 col-lg-4">
                    <div className="films">
                        <img className='imgGenresHome' alt={genre} src="imgGenres/ficçaoCientifica.jpg" />
                    </div>
                </div>
                    </Link>;
            case "Romance": 
            return <Link key={genre} to={`/films/${genre}`}>
                <div className="item col-xs-4 col-lg-4">
                    <div className="films">
                        <img className='imgGenresHome' alt={genre} src="imgGenres/romance.jpeg" />
                    </div>
                </div>
                    </Link>;
            case "Animação": 
            return <Link key={genre} to={`/films/${genre}`}>
                <div className="item col-xs-4 col-lg-4">
                    <div className="films">
                        <img className='imgGenresHome' alt={genre} src="imgGenres/animaçao.jpg" />
                    </div>
                </div>
                    </Link>;
            default: 
                return <Link key={genre} to={`/films/${genre}`}>
                    <div className="item col-xs-4 col-lg-4">
                        <div className="thumbnail">
                            <img className='imgGenresHome' alt={genre} src="imgGenres/padrao.jpg" />
                        </div>
                    </div>
                        </Link>;
        }
    }

    render() {
        return (
            <div>
                <section id="cape" className="intro-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <img className="group list-group-image" src="images/logo.png" alt='Imagem do logo' style={{width:'100%', maxWidth:'480px'}} />
                                <h4 className="titlesMenu">Nunca mais esqueça um filme que você assistiu ou que alguém lhe indicou.</h4>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    {this.state.isLoading &&
                        <span>Aguarde, carregando...</span>
                    }
                    {!this.state.isLoading &&
                        <div>
                            <br /> 
                            {this.state.genres.map(this.renderGenrerLink)}
                        </div>
                    }
                </section>
            </div>
        )
    }
}

export default Home