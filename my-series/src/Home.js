import React, { Component } from 'react'
import api from './Api'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import "./css/Home.css"


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

    // Retorna o link do gênero
    renderGenrerLink(genre) {
        // <h2 key={genre}>&nbsp;&nbsp;<Link to={`/series/${genre}`}>{genre}</Link></h2>
        //  <Link to={`/series/${genre}`}><span key={genre}>&nbsp;&nbsp;{genre}</span></Link>
        switch (genre) {
            case "Comédia": return <Link key={genre} to={`/series/${genre}`}><img border="0" alt={genre} src="https://pt.yousuenos.com/wp-content/uploads/sites/2/2016/11/comedia.jpg" width="400" height="300" />&nbsp;</Link>;
            case "Drama": return <Link key={genre} to={`/series/${genre}`}><img border="0" alt={genre} src="https://abrilexame.files.wordpress.com/2016/09/size_960_16_9_cena-do-filme-preda-me.jpg" width="400" height="300" />&nbsp;</Link>;
            case "Ação": return <Link key={genre} to={`/series/${genre}`}><img border="0" alt={genre} src="https://i.ytimg.com/vi/bAO7To97WCc/maxresdefault.jpg" width="400" height="300" />&nbsp;</Link>;
            default: return <Link key={genre} to={`/series/${genre}`}><img border="0" alt={genre} src="https://www.minhaserie.com.br/uploads/editor_pictures/000/049/562/content_pic.jpg" width="400" height="300" />&nbsp;</Link>;
        }
    }

    render() {
        return (
            <div>
                <section id="cape" className="intro-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1><img src="images/logo.png" /></h1>
                                <h4 className="titlesMenu">Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.</h4>
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
                            <br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            {this.state.genres.map(this.renderGenrerLink)}
                        </div>
                    }
                </section>
            </div>
        )
    }
}

export default Home