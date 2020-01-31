import { Input, message } from 'antd';
import React, { Component } from 'react';
import './LawsuitSearch.scss';
import axios from 'axios'
import LawsuitInfo from './lawsuit-info/LawsuitInfo'
import qs from 'qs';

const { Search } = Input;

class LawsuitSearch extends Component {

    constructor() {
        super();
        this.state = {
            lawsuitNumber: null,
            lawsuit: null,
            loading: false,
            notFound: false,
        }
    }

    crawlerLawsuit(lawsuitNumber) {
        if(lawsuitNumber){
            this.setState({ loading: true });
            axios.get(`api/lawsuit/?lawsuitNumber=${lawsuitNumber}`)
                .then(response => {
                    this.props.history.push(`?lawsuitNumber=${lawsuitNumber}`);
                    this.setState({ lawsuit: response.data, loading: false });
                    console.log(this.state.lawsuit.props);
                })
                .catch(response => {
                    this.props.history.push('');
                    this.setState({ lawsuit: null, loading: false });
                    message.error('Nenhum processo encontrado com este número');
                })
        } else {
            message.error('Insira o número do processo');
        }
    }

    componentDidMount() {
        let params = qs.parse(this.props.history.location.search, { ignoreQueryPrefix: true });
        if (params.lawsuitNumber) {
            this.setState({ lawsuitNumber: params.lawsuitNumber });
            this.crawlerLawsuit(params.lawsuitNumber);
        }
    }

    handleChange(event) {
        this.setState({ lawsuitNumber: event.target.value });
    }

    render() {
        return (
            <div className="LawsuitSearch">
                <span className="title">Busca de processos</span>
                <div className="content">
                    <h1>Buscar processo</h1>
                    <Search
                        placeholder="Insira o número do processo"
                        enterButton="Buscar"
                        size="large"
                        value={this.state.lawsuitNumber}
                        onChange={this.handleChange.bind(this)}
                        onSearch={value => this.crawlerLawsuit(value)}
                    />
                </div>
                <LawsuitInfo lawsuit={this.state.lawsuit} loading={this.state.loading}/>
            </div>

        )
    }
}

export default LawsuitSearch