import React from 'react';
import ShowExpense from '../ShowExpense/ShowExpense';
import ExpensesByCategoryChart from '../../ExpenseByCategoryChart/ExpenseByCategoryChart';

const Home = () => {
    return (
        <div>
            <ShowExpense/>
            <ExpensesByCategoryChart/>
        </div>
    );
};

export default Home;