// HistoryChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const HistoryChart = ({ data }) => {
  const chartData = Object.entries(data).map(([key, value]) => ({
    label: key.toUpperCase(),
    count: value,
  }));

  return (
    <div className="w-full h-64 mt-6 bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Prediction History</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryChart;
