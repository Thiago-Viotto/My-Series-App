import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import {
    Link
} from 'react-router-dom'

import api from './Api'
import Favorite from '../src/Favorite'

const statuses = {
    "watched": "Assistido",
    "watching": "Assistindo",
    "toWatch": "Assistir"
}

class Series extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            series: [],
            genres: [],
            redirect: false
        }

        this.renderSeries = this.renderSeries.bind(this)
        this.loadData = this.loadData.bind(this)
        this.addFavorite = this.addFavorite.bind(this)
    }

    // O Componente está montado
    componentDidMount() {
        this.loadData()
    }

    loadData() {
        // define que os dados estão sendo carregados
        this.setState({ isLoading: true })

        api.loadSeriesbyId(this.props.match.params.id)
            .then((res) => {
                { this.setState({ series: res.data }) }
                this.refs.name.value = this.state.series.name
                this.refs.genre.value = this.state.series.genre
                this.refs.comment.value = this.state.series.comment
                this.refs.status.value = this.state.series.status
                this.refs.isFavorite.value = this.state.series.isFavorite
            })

        api.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data
                })
            })

        api.loadGenresbyGenrew(this.props.match.params.genre)
            .then((res) => {
                this.setState({
                    isLoading: false,
                    series: res.data,
                })
            })


    }

    deleteSeries(id) {
        api.deleteSeries(id)
            .then((res) => {
                this.loadData()
            })
    }

    addFavorite() {
        const myFavoriteSerie = {
            id: this.props.match.params.id,
            name: this.refs.name.value,
            comment: this.refs.comment.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            img: this.refs.urlImage.value,
            isFavorite: true
        }
        api.updateSeries(myFavoriteSerie)
            .then((res) => {
                this.setState({
                    redirect: '/series/' + this.refs.genre.value
                })
            })
    }

    renderSeries(series) {
        return (
            <div key={series.id} className="item col-xs-4 col-lg-4">
                {this.state.redirect &&
                    <Redirect to={this.state.redirect} ></Redirect>
                }
                <div className="thumbnail">
                    <img className="group list-group-image" src={series.img} alt="thumbnail of series" />
                    <div className="caption">
                        <h4 className="group inner list-group-item-heading">
                            {series.name}</h4>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <p className="lead">
                                    {series.genre} / {statuses[series.status]}</p>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <a className="btn btn-primary" onClick={this.addFavorite} >Favoritos </a>
                                <Link className="btn btn-success" to={'/series-edit' + series.id} >Editar </Link>
                                <a className="btn btn-danger" onClick={() => this.deleteSeries(series.id)}>Excluir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <section id="intro" className="intro-section"><h1>Series {this.props.match.params.genre}</h1>
                {this.isLoading &&
                    <p>Carregando, aguarde...</p>
                }
                {!this.isLoading && this.state.series.length === 0 &&
                    <div className='alert alert-info'>Nenhuma série cadastrada.</div>
                }
                <div id="series" className="row list-group">
                    {!this.state.isLoading && this.state.series.map(this.renderSeries)}

                </div>
            </section>
        )
    }


}

export default Series