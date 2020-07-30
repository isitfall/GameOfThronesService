import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {

    constructor() {
        //соберет нашего персонажа
        super();
        this.updateChar();
    }
    
    //это сервис по получению данных с сервера
    gotService = new gotService();

    //опишем состояние нашего объекта
    state = {
        char: {},
        loading: true //в момент загрузки данных с сервера
    }

    //обработчики
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    //функция, которая собирает персонажа по данным из сервера
    updateChar() {
        //тут будем задавать id персонажа
        const id = Math.floor(Math.random()*140+25);//значения в диапазоне 25-140
       //обратимся к импортированному сервису 
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }


    render() {
        //деструктуризируем state
        const {char, loading, error } = this.state;

        //сообщение об ошибке
        const errorMessage = error ? <ErrorMessage/> : null;

        //условия, при которых отображается либо спиннер, либо контент
        const spinner = loading ? <Spinner/> : null;
        // const content = !{loading || error} ? <View char = {char} /> : null;       
        let content = null;
        
        if (!{loading} || !{error}) {
            content = <View char = {char} />
        } 

        return (
            <div className='random-block rounded'>
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}


// этот коспонент будет использоваться после получения ланных с сервера
const View = (({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <div className="random-block rounded">
                <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
        </>
    )
})
