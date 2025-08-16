import React from 'react';

const TotalExpense = ({totalExpense}) => {
    return (
        <div className="flex justify-center">
        <div className="card border border-[#2dcfc4] shadow-md mb-4">
            <div className="card-body">
                <h2 className="card-title text-lg">Total Expense</h2>
                <p className="text-2xl font-bold text-[#2dcfc4]">
                    {totalExpense.toFixed(2)} Tk.
                </p>
            </div>
        </div>
      </div>
    );
};

export default TotalExpense;