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
  const [error, setError] = useState(null);              

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch(() => setError("Failed to load countries list."));
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => setGlobalData(data))
      .catch(() => setError("Failed to load global statistics."));
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://disease.sh/v3/covid-19/countries/${selectedCountry}`
        );
        const data = await res.json();
        setCountryData(data);
      } catch {
        setError(`Failed to load data for ${selectedCountry}.`);
        setCountryData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCountry]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">

        {}
        <h1 className="text-4xl font-bold text-center mb-2">
          🦠 COVID Statistics Dashboard
        </h1>
        <p className="text-center text-white/40 text-sm mb-10">
          Real-time global & country-level pandemic data
        </p>

        {}
        {error && (
          <div className="bg-red-500/20 border border-red-500/40 text-red-300 px-6 py-4 rounded-xl mb-8 text-center">
            ⚠️ {error}
          </div>
        )}

        {}
        {globalData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatBox title="Global Cases" value={globalData.cases} color="bg-red-500" />
            <StatBox title="Recovered" value={globalData.recovered} color="bg-green-500" />
            <StatBox title="Deaths" value={globalData.deaths} color="bg-gray-700" />
          </div>
        ) : (
          !error && (
            <div className="text-center text-white/30 mb-10 animate-pulse">
              Loading global statistics...
            </div>
          )
        )}

        {}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <CountrySelector
            countries={countries}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />

          <div className="flex bg-white/10 rounded-xl p-1">
            <button
              onClick={() => setView("card")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
                view === "card"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Card View
            </button>
            <button
              onClick={() => setView("table")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
                view === "table"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        {}
        {loading && (
          <div className="text-center text-white/50 py-10 animate-pulse">
            Fetching data...
          </div>
        )}

        {}
        {!loading && !countryData && !error && (
          <div className="text-center text-white/30 py-10">
            No data available. Select a country above.
          </div>
        )}

        {}
        {!loading && countryData && (
          view === "card"
            ? <StatsCard data={countryData} />
            : <StatsTable data={countryData} />
        )}

      </div>
    </div>
  );
}

// --- REUSABLE COMPONENT for the global stat boxes ---
function StatBox({ title, value, color }) {
  return (
    <div className={`${color} rounded-2xl p-6 text-center hover:scale-105 transition`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value?.toLocaleString() ?? "N/A"}</p>
    </div>
  );
}

export default App;