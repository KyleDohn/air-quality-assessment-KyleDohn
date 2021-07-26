import './App.css';
import OpenAQProvider from "./contexts/OpenAQ/OpenAQProvider";
import AirQualityComparison from "./components/AirQualityComparison";

function App() {
  return (
    <OpenAQProvider>
        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1>
                City Air Quality Comparison Tool
            </h1>
            <h4>
                Enter a city to see its air quality stats courtesy of OpenAQ API.
            </h4>
        </div>
      <AirQualityComparison/>
    </OpenAQProvider>
  );
}

export default App;
