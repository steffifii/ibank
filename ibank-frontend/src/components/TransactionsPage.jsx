import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { API_ENDPOINT } from '../assets/configuration/config';

const TransactionsPage = (user) => {

    const [ transactions, setTransactions ] = useState([]);

    const fetchTransactions = () => {
        axios({
            method: "get",
            url: `${API_ENDPOINT}/transactions/user/${user.userId}`
          })
          .then(res => {
              setTransactions(res.data)
          }) 
          .catch(err => {
                console.error('Error fetching transactions:', err);
          });
    }

    
        // axios.post(`${API_ENDPOINT}/borrows`, borrow)
        //     .then(()=>{
        //         axios.get(`${API_ENDPOINT}/transactions`)
        //             .then(res => setBooks(res.data)) 
        //             .catch(err => {
        //             console.error('Error fetching books after new borrow:', err);
        //         })
        //     }) 
        //     .catch(err => {
        //         console.error('Error creating borrow:', err);
        // });
    
    useEffect(()=>{
        fetchTransactions();
    },[])
    

    return(<div className="transactions-page">
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Details</th>
                        <th>Deposit</th>
                        <th>Withdrawal</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t,i)=>{
                        return<tr key={i}>
                            <td>{t.transactionId}</td>
                        </tr>
                    })}
                </tbody>
            </table>
       </div>
    </div>)
}

export default TransactionsPage;