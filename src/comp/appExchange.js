import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { ExchangeContext } from '../context/context';
import Input from './input';
import Score from './score';
import { Button } from '@mui/material';
import 'aos/dist/aos.css';

function AppExchange(props) {
    let [coinsAr, setCoinsAr] = useState([])
    let [convertFrom, setConvertFrom] = useState({});
    let [convertTo, setConvertTo] = useState({});
    let [amount, setAmount] = useState(0);
    let [res, setRes] = useState(0);
    let [click, setClick] = useState(false);

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        let url = `https://freecurrencyapi.net/api/v2/latest?apikey=f2dce500-45f0-11ec-9860-7954a32a920b`
        let resp = await axios.get(url);
        let obj = resp.data.data;
        obj.USD = 1; //adding usd property
        obj.BTC = obj.BTC / 1000 //correcting BTC value

        //inserting the object's properties to objects inside an array
        let arr = Object.keys(obj).map(item => {
            return (
                {
                    name: item,
                    value: obj[item]
                }
            )
        })
        // sort the array by name
        let ordered = _.sortBy(arr, ['name'])
        setCoinsAr(ordered)
        console.log(ordered);

    }
    const convert = (e) => {
        let res1 = amount * (convertTo.value / convertFrom.value)
        setRes(res1)
        console.log(res1);

        if (res1) {//res is define
            setClick(true)//display the score conmponent
            e.target.style.display = "none"
        }
    }
    const updateRes = () => { 
        let res1 = amount * (convertTo.value / convertFrom.value)
        setRes(res1)
    }

    return (
        <ExchangeContext.Provider value={{ coinsAr, convertFrom, setConvertFrom, convertTo, setConvertTo, amount, setAmount, res, setRes, updateRes }}>
            <div className='contianer-fluid strip'>
                <h2 className='display-2 text-center mt-0 p-5'>Currency Converter</h2>
            </div>

            <main>

                <div className='container col-lg-8 box border shadow p-4 pb-4 '>
                    <Input />
                    <Button className='mt-4 float-end' onClick={convert} variant="contained">convert</Button>
                    <div className='mt-4 text-lg-start'>
                        {click ? <Score /> : ""}
                    </div>
                </div>
            </main>
            <footer className='container-fluid fixed-bottom'>
                <div className='p-1'>

                created by Netanel Ronen - 2020
                </div>
            </footer>



        </ExchangeContext.Provider>
    )
}

export default AppExchange
