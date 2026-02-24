function StatsTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-white/20 text-white">
            <th className="p-4">Country</th>
            <th className="p-4">Cases</th>
            <th className="p-4">Recovered</th>
            <th className="p-4">Deaths</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center hover:bg-white/10 transition">
            <td className="p-4">{data.country}</td>
            <td className="p-4 text-red-400">{data.cases.toLocaleString()}</td>
            <td className="p-4 text-green-400">{data.recovered.toLocaleString()}</td>
            <td className="p-4 text-gray-300">{data.deaths.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StatsTable;