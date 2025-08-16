import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Shared/Loading/Loading";
import { PieChart,Pie,Cell,Tooltip,ResponsiveContainer,Legend } from "recharts";

const COLORS = ["#8884d8","#82ca9d","#ffc658","#ff8042","#8dd1e1","#a4de6c","#d0ed57","#d885ff","#ff6f91"];

const ExpensesByCategoryChart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["expensesSummary", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/summary?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Error loading expenses summary.
      </p>
    );

  return (
    <div className="my-10 bg-base-100 rounded-lg overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Expenses by Category
      </h2>
      {
        data.length === 0 && 
        <p className="text-center mt-10 text-red-600">
            No Expenses made yet
        </p>
      }
      <div className="w-ful h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={140}
              label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
                wrapperStyle={{ zIndex: 50 }}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }}
                itemStyle={{ fontSize: '14px' }}
                labelStyle={{ fontWeight: 'bold' }} 
                formatter={(value) => [`${value} Tk`, "Expense"]}
             />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpensesByCategoryChart;
