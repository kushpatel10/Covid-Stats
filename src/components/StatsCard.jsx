function StatsCard({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <Card color="bg-red-500" title="Total Cases" value={data.cases} />
      <Card color="bg-green-500" title="Recovered" value={data.recovered} />
      <Card color="bg-gray-700" title="Deaths" value={data.deaths} />

    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`${color} rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition duration-300`}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-3xl font-bold">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

export default StatsCard;