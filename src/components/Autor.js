import React, { Component } from "react";
import $ from 'jquery';
import InputCustom from "./InputCustom";
import SubmitCustom from "./SubmitCustom";

export class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = { lista: [], nome: '', email: '', senha: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    enviaForm(event) {
        event.preventDefault();
        $.ajax({
            url: 'http://cdc-react.herokuapp.com/api/autores',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
            success: function (resposta) {
                this.props.callbackAtualizaListagem(resposta);
            }.bind(this),
            error: function (resposta) {
                console.log("error");
            }
        });
    }

    setNome(event) {
        this.setState({ nome: event.target.value });
    }

    setEmail(event) {
        this.setState({ email: event.target.value });
    }

    setSenha(event) {
        this.setState({ senha: event.target.value });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustom id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"></InputCustom>
                    <InputCustom id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="E-mail"></InputCustom>
                    <InputCustom id="senha" type="text" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"></InputCustom>
                    <SubmitCustom type="submit" value="Gravar"></SubmitCustom>
                </form>
            </div> 
        )
    }
}

export class TabelaAutores extends Component {

    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                            
                        {
                            this.props.lista.map(function(autor){
                                return (
                                    
                                    <tr key={autor.id}>
                                        <td>
                                            {autor.nome}
                                        </td>
                                        <td>
                                            {autor.email}
                                        </td>
                                    </tr>
                                );
                            })
                        }

                    </tbody>
                </table>
            </div> 
        )
    }
}

export default class AutorBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
        this.atualizaListagem = this.atualizaListagem.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: "http://cdc-react.herokuapp.com/api/autores",
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta });
            }.bind(this)
        }
        );
    }

    atualizaListagem(novaLista) {
    this.setState({lista:novaLista});
  }

    render() {
        return (
            <div>
                <FormularioAutor callbackAtualizaListagem={this.atualizaListagem} />
                <TabelaAutores lista={this.state.lista} />
            </div>
        );
    }
}