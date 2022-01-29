import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useContext} from 'react';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';



import { ExchangeContext } from '../context/context';


const Input = (props) => {
    let { coinsAr, convertFrom, setConvertFrom, convertTo, setConvertTo, amount, setAmount, updateRes } = useContext(ExchangeContext)

    // swaping currencies
    const onSwapBtn = () => {
        let temp = convertFrom;
        setConvertFrom(convertTo)
        setConvertTo(temp)
        updateRes()
    }
    const onInputAmount = (e) => { 
        setAmount(e.target.value);
        updateRes()
        console.log(amount);
    }
    const onSelectFrom = (e) => { 
        setConvertFrom(e.target.value)
        updateRes()
    }
    const onSelectTo = (e) => { 
        setConvertTo(e.target.value)
        updateRes()
    }
    
    return (
        <div className="pt-3 row justify-content-around align-items-center g-3">
            
            <div className='col-md-4'>
                <TextField  fullWidth label="Amount" color="info" onChange={onInputAmount} focused />
            </div>

            <div className='col-md-3 '>
                <FormControl fullWidth style={{ minWidth: 150 }}>
                    <InputLabel >convert from</InputLabel>
                    <Select
                        value={convertFrom}
                        label="currency from"
                        onChange={onSelectFrom}
                    >
                        {coinsAr.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>{item.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

            </div>
            {/* swap button */}
            <div className='col-md-2 pe-1'>
            <Button  sx={ { borderRadius: 100 }} onClick={onSwapBtn} variant="outlined"><SwapHorizIcon></SwapHorizIcon></Button>
            </div>
            
            <div className='col-md-3'>
                <FormControl fullWidth style={{ minWidth: 150 }}>
                    <InputLabel >convert to</InputLabel>
                    <Select
                        value={convertTo}
                        label="currency from"
                        onChange={onSelectTo}
                    >
                        {coinsAr.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>{item.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

            </div>
        </div>
    )
}

export default Input