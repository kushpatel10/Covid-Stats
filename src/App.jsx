import { useEffect, useState } from "react";
import CountrySelector from "./components/CountrySelector";
import StatsCard from "./components/StatsCard";
import StatsTable from "./components/StatsTable";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [countryData, setCountryData] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [view, setView] = useState("card");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(res => res.json())
      .then(data => setGlobalData(data));
  }, []);

  useEffect(() => {
  if (!selectedCountry) return;

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(
      `https://disease.sh/v3/covid-19/countries/${selectedCountry}`
    );
    const data = await res.json();
    setCountryData(data);
    setLoading(false);
  };

  fetchData();
}, [selectedCountry]); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-10 tracking-wide">
          🦠 COVID Statistics Dashboard
        </h1>

        {/* Global Summary */}
        {globalData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatBox title="Global Cases" value={globalData.cases} color="bg-red-500" />
            <StatBox title="Recovered" value={globalData.recovered} color="bg-green-500" />
            <StatBox title="Deaths" value={globalData.deaths} color="bg-gray-700" />
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">

          <CountrySelector
            countries={countries}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />

          <div className="flex bg-white/10 backdrop-blur-md rounded-xl p-1">
            <button
              onClick={() => setView("card")}
              className={`px-6 py-2 rounded-xl transition ${
                view === "card"
                  ? "bg-white text-black"
                  : "text-white hover:bg-white/20"
              }`}
            >
              Card View
            </button>

            <button
              onClick={() => setView("table")}
              className={`px-6 py-2 rounded-xl transition ${
                view === "table"
                  ? "bg-white text-black"
                  : "text-white hover:bg-white/20"
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-lg animate-pulse">
            Fetching data...
          </div>
        )}

        {/* Country Data */}
        {!loading && countryData && (
          view === "card" 
            ? <StatsCard data={countryData} />
            : <StatsTable data={countryData} />
        )}

      </div>
    </div>
  );
}

function StatBox({ title, value, color }) {
  return (
    <div className={`${color} rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

export default App;