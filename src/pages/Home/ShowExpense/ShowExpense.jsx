import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Shared/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from 'date-fns';
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import Swal from "sweetalert2";

const ShowExpense = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const { data: expenses = [], refetch, isLoading, isError, error } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/expenses?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email 
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This expense will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/expenses/${id}`);
          if (res.data?.deletedCount > 0) { 
            Swal.fire('Deleted!', 'Expense has been deleted.', 'success');
            refetch();
          } else {
            Swal.fire('Error', 'No expense was deleted.', 'error');
          }
        } catch (err) {
          console.error(err);
          Swal.fire('Error', 'Failed to delete the expense.', 'error');
        }
      }
    });
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="my-10 px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Expenses</h2>
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
      <div className="overflow-x-auto w-full p-4">
        <table className="table w-full shadow-md">
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
                  <td>{expense.category}</td>
                  <td>
                    {format(new Date(expense.date), 'dd MMM, yyyy')}
                  </td>
                  <td className="flex gap-2 justify-center">
                    <Link to={`/editExpense/${expense._id}`} className="btn btn-sm">Edit</Link>
                    <button onClick={()=>handleDelete(expense._id)} className="btn btn-sm">Delete</button>
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
    </div>
  );
};

export default ShowExpense;
