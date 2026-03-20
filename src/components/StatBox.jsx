function StatBox({ title, value, color, icon }) {
  return (
    <div
      className={`${color} rounded-2xl shadow-lg p-6 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-default`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-sm font-medium uppercase tracking-wider opacity-90 mb-1">
        {title}
      </h3>
      <p className="text-3xl font-extrabold tracking-tight">
        {value?.toLocaleString() ?? "N/A"}
      </p>
    </div>
  );
}

export default StatBox;
