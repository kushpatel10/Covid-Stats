function CountrySelector({ countries, selectedCountry, setSelectedCountry }) {
  return (
    <select
      value={selectedCountry}
      onChange={(e) => setSelectedCountry(e.target.value)}
      className="bg-white/10 backdrop-blur-md text-white p-3 rounded-xl border border-white/20 focus:outline-none"
    >
      {countries.map((country) => (
        <option key={country.country} value={country.country} className="text-black">
          {country.country}
        </option>
      ))}
    </select>
  );
}

export default CountrySelector;