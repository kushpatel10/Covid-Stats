function StatsCard({ data }) {
  return (
    <div className="space-y-6">
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

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card color="bg-red-500/80" title="Total Cases" value={data.cases} icon="📊" />
        <Card color="bg-green-500/80" title="Recovered" value={data.recovered} icon="💚" />
        <Card color="bg-gray-700/80" title="Deaths" value={data.deaths} icon="💀" />
      </div>

      {/* Extra Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniCard label="Today Cases" value={data.todayCases} color="text-orange-400" />
        <MiniCard label="Today Deaths" value={data.todayDeaths} color="text-red-400" />
        <MiniCard label="Active" value={data.active} color="text-yellow-400" />
        <MiniCard label="Critical" value={data.critical} color="text-pink-400" />
      </div>
    </div>
  );
}

function Card({ title, value, color, icon }) {
  return (
    <div
      className={`${color} backdrop-blur-md rounded-2xl shadow-xl p-8 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-sm font-medium uppercase tracking-wider opacity-90 mb-1">
        {title}
      </h3>
      <p className="text-3xl font-extrabold">
        {value?.toLocaleString() ?? "N/A"}
      </p>
    </div>
  );
}

function MiniCard({ label, value, color }) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 text-center border border-white/10 hover:bg-white/10 transition-all duration-200">
      <p className="text-xs uppercase tracking-wider text-white/50 mb-1">{label}</p>
      <p className={`text-xl font-bold ${color}`}>
        {value?.toLocaleString() ?? "N/A"}
      </p>
    </div>
  );
}

export default StatsCard;