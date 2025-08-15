import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Shared/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from 'date-fns';
import useAuth from "../../../hooks/useAuth";

const ShowExpense = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const { data: expenses = [], isLoading, isError, error } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/expenses?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email 
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">All Expenses</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
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
