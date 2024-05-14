import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from "react-modal";

import { API_ENDPOINT } from '../../assets/configuration/config';

const TransactionsModal = ({ isTransactionsPage, setIsTransactionsPage, user }) => {

    const [ transactions, setTransactions ] = useState([]);
    const [ newTransactionMode, setNewTransactionMode ] = useState(false);

    const fetchTransactions = () => {
        axios({
            method: "get",
            url: `${API_ENDPOINT}/transactions/user/${user.userId}`
          })
          .then(res => {
              setTransactions(res.data.reverse());
          }) 
          .catch(err => {
                console.error('Error fetching transactions:', err);
          });
    }
    
    const handleNewTransaction = e => {
        e.preventDefault(); 

        let transactionValue = e.target.amount.value;
        if(e.target.type.value==="Withdrawal") transactionValue = 0 - transactionValue;

        const transactionData = {
            type: e.target.type.value,
            value: transactionValue,
            description: e.target.details.value,
            transactionUserId: user.userId
        };

        axios({
            method: "post",
            url: `${API_ENDPOINT}/transactions`,
            data: transactionData
          })
          .catch(err => {
                console.error('Failed to send transactions data: Error: ', err);
          });
    }
    
    useEffect(()=>{
        fetchTransactions();
    },[isTransactionsPage])
    

    return(
    <ReactModal isOpen={true} closeTimeoutMS={200}>
        <div className="transactions-page">
            <i className="fa-solid fa-xmark position-absolute end-0 pe-3 close-modal" onClick={()=>setIsTransactionsPage(false)}></i>
                <div className="container">
                    <div className="text-center">
                        Balance: { user.balance }
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Details</th>
                                <th>Withdrawal</th>
                                <th>Deposit</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                    <tbody>
                        {transactions.map((t,i)=>{
                            return<tr key={i}>
                                <td>{t.transactionId}</td>
                                <td>{t.description}</td>
                                {t.value < 0 ? <><td>{t.value.toLocaleString().substring(1)}</td><td></td></> : <><td></td><td>{t.value.toLocaleString()}</td></>}
                                <td>{t.balanceAfter.toLocaleString()}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <div className="text-center">
                    <button className="btn btn-success text-white" onClick={()=>setNewTransactionMode(!newTransactionMode)}>+ New Transaction</button>
                    { newTransactionMode && <form onSubmit={handleNewTransaction}>
                        <label htmlFor="type">Type</label>
                        <select className="form-select" id="type" aria-label="Select type of transaction">
                            <option selected>Select</option>
                            <option value="Deposit">Deposit</option>
                            <option value="Withdrawal">Withdrawal</option>
                        </select>
                        <label htmlFor="amount">Enter amount:</label>
                        <input type="number" className="form-control" id="amount" placeholder="Enter amount" />
                        <label htmlFor="details">Enter details:</label>
                        <input type="text" className="form-control" id="details" placeholder="Enter details" />
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form> }
                </div>
            </div>
        </div> 
    </ReactModal>)
}

export default TransactionsModal;