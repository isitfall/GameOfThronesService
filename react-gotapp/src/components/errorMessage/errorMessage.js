import React from 'react';
import './errorMessage.css'
import img from './got.jpeg'

const ErrorMessage = () => {
    return (
        <>
        <img src={img} alt='err'></img>
        <span>Something wents wrong...</span>
        </>
    )
}

export default ErrorMessage;