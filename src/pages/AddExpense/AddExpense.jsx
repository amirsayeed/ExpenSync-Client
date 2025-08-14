import React from "react";
import { useForm } from "react-hook-form";

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
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: "",
      amount: "",
      category: "", 
      date: "",
    },
  });


  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-base-200 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block mb-1 font-semibold">Title</label>
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
          <label className="block mb-1 font-semibold">Amount</label>
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
          <label className="block mb-1 font-semibold">Category</label>
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
          <label className="block mb-1 font-semibold">Date</label>
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
          <button type="submit" className="btn btn-primary w-full">
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
