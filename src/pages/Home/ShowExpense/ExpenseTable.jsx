import { Link } from "react-router";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";

const ExpenseTable = ({ expenses, handleDelete }) => {
  return (
    <div className="overflow-x-auto w-full my-10">
      <table className="table w-full border border-gray-200 rounded-lg shadow-lg text-center">
        <thead>
          <tr className="bg-base-200 text-base font-semibold">
            <th>#</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <tr key={expense._id}>
                <td>{index + 1}</td>
                <td>{expense.title}</td>
                <td>{expense.amount} Tk.</td>
                <td className="badge bg-[#2dcfc4] text-white">{expense.category}</td>
                <td>{format(new Date(expense.date), "dd MMM, yyyy")}</td>
                <td className="flex gap-2 justify-center">
                  <Link
                    to={`/editExpense/${expense._id}`}
                    className="btn btn-sm flex bg-[#2dcfc4] text-white"
                  >
                    <span>Edit</span>
                    <span>
                      <FaEdit />
                    </span>
                  </Link>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="btn btn-sm flex btn-error text-white"
                  >
                    <span>Delete</span>
                    <span>
                      <IoTrashBin />
                    </span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No expenses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
