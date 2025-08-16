import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Shared/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import TotalExpense from "./TotalExpense";
import ExpenseTable from "./ExpenseTable";

const categories = [
  "All",
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Bills",
  "Travel",
  "Others",
];

const ShowExpense = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: expenses = [], refetch, isLoading, isError, error } = useQuery({
    queryKey: ["expenses", selectedCategory],
    queryFn: async () => {
      const categoryQuery = selectedCategory !== "All" ? `&category=${selectedCategory}` : "";
      const res = await axiosSecure.get(
        `/expenses?email=${user.email}${categoryQuery}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This expense will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/expenses/${id}`);
          if (res.data?.deletedCount > 0) {
            Swal.fire("Deleted!", "Expense has been deleted.", "success");
            refetch();
          } else {
            Swal.fire("Error", "No expense was deleted.", "error");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete the expense.", "error");
        }
      }
    });
  };

  const totalExpense = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="my-10 px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Expenses</h2>
      <TotalExpense totalExpense={totalExpense} />

      <div className="flex justify-end mb-2">
        <select
          className="select select-bordered w-40"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <ExpenseTable expenses={expenses} handleDelete={handleDelete} />
    </div>
  );
};

export default ShowExpense;