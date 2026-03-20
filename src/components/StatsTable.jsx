function StatsTable({ data }) {
  const rows = [
    { label: "Total Cases", value: data.cases, color: "text-red-400" },
    { label: "Recovered", value: data.recovered, color: "text-green-400" },
    { label: "Deaths", value: data.deaths, color: "text-gray-300" },
    { label: "Today Cases", value: data.todayCases, color: "text-orange-400" },
    { label: "Today Deaths", value: data.todayDeaths, color: "text-red-400" },
    { label: "Active", value: data.active, color: "text-yellow-400" },
    { label: "Critical", value: data.critical, color: "text-pink-400" },
    { label: "Tests", value: data.tests, color: "text-blue-400" },
  ];

  return (
    <div className="space-y-4">
      {/* Country Header with Flag */}
      <div className="flex items-center justify-center gap-4 mb-2">
        {data.countryInfo?.flag && (
          <img
            src={data.countryInfo.flag}
            alt={`${data.country} flag`}
            className="w-12 h-8 rounded shadow-md object-cover"
          />
        )}
        <h2 className="text-2xl font-bold">{data.country}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10">
          <thead>
            <tr className="bg-white/10">
              <th className="p-4 text-left text-sm uppercase tracking-wider text-white/70">
                Metric
              </th>
              <th className="p-4 text-right text-sm uppercase tracking-wider text-white/70">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-t border-white/5 hover:bg-white/10 transition-colors duration-150"
              >
                <td className="p-4 font-medium">{row.label}</td>
                <td className={`p-4 text-right font-bold text-lg ${row.color}`}>
                  {row.value?.toLocaleString() ?? "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatsTable;