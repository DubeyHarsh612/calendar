import TimeZoneInfo from "./Components/TimeZoneInfo";
import WeekNavigationButtons from "./Components/WeekNavigationButtons";

function App() {
  return (
    <div className="container ">
      <div className="btnstime">
        <WeekNavigationButtons />
      </div>

      <hr />
      <TimeZoneInfo />
      <hr />
    </div>
  );
}

export default App;
