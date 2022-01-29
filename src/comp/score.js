import React, { useContext, useEffect } from 'react';
import { ExchangeContext } from '../context/context';
import AOS from 'aos';
import 'aos/dist/aos.css';


function Score(props){
    let {convertFrom, convertTo, amount, res } = useContext(ExchangeContext)
    let res1 =res.toFixed(2)
    useEffect(() => {
        AOS.init();
    }, [])
        return(
        <div data-aos="fade-down">
            <h4>{amount} {convertFrom.name} =</h4>
            <h2>{ res.toFixed(2)} {convertTo.name}</h2> 
            <div>1 {convertTo.name} = {convertFrom.value/convertTo.value} {convertFrom.name}</div>
        </div> 
    )
}

export default Score