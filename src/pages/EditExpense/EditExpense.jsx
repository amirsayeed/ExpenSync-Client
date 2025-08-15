import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Shared/Loading/Loading";
import { format } from "date-fns";

const categories = [
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

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const { data: expense, isLoading } = useQuery({
    queryKey: ["expense", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/expenses/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (expense) {
      setValue("title", expense.title);
      setValue("amount", expense.amount);
      setValue("category", expense.category);
      setValue("date", format(new Date(expense.date), "yyyy-MM-dd"));
    }
  }, [expense, setValue]);

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      amount: Number(data.amount),
      date: new Date(data.date).toISOString(),
    };

    try {
      const res = await axiosSecure.patch(`/expenses/${id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Expense has been updated.", "success");
        navigate("/");
      } else {
        Swal.fire("No Changes", "No fields were updated.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update the expense.", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-md mx-auto my-10 bg-base-100 border border-gray-300 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Expense</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            {...register("title", { required: true, minLength: 3 })}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              Title is required (min 3 characters)
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter amount"
            {...register("amount", { required: true, min: 0.01, valueAsNumber: true })}
            className="input input-bordered w-full"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">
              Amount must be greater than 0
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">Category is required</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            {...register("date", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">Date is required</p>
          )}
        </div>

        <button
          type="submit"
          className="btn bg-[#2dcfc4] text-white rounded-xl w-full"
        >
          Update Expense
        </button>
      </form>
    </div>
  );
};

export default EditExpense;
