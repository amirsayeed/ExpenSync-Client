import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

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

const AddExpense = () => {
 const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: "",
      amount: "",
      category: "", 
      date: "",
    },
  });
 const axiosSecure = useAxiosSecure();
 const {user} = useAuth();
 const navigate = useNavigate();

 const onSubmit = async (data) => {
    const expenseData = {
      ...data,
      date: new Date(data.date).toISOString(),
      userEmail: user.email
    };

    try {
      const res = await axiosSecure.post("/expenses", expenseData);
      if (res.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Expense Added!",
          text: "Your expense has been recorded successfully.",
          confirmButtonColor: "#2dcfc4",
        });
        reset();
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.response?.data?.message || "Please try again later.",
      });
    }
  };

  return (
    <div className="px-1 md:px-4">
      <div className="max-w-md mx-auto my-10 bg-base-100 border border-gray-300 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Your Expense</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            className="input input-bordered w-full"
            {...register("title", { required: true, minLength: 3 })}
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
            placeholder="Enter amount"
            className="input input-bordered w-full"
            {...register("amount", { required: true, min: 0.01, valueAsNumber: true })}
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
            className="select select-bordered w-full"
            {...register("category", { required: true })}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            className="input input-bordered w-full"
            {...register("date", { required: true })}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">Date is required</p>
          )}
        </div>

        <div>
          <button type="submit" className="btn bg-[#2dcfc4] text-white rounded-xl w-full">
            Add Expense
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddExpense;
