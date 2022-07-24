import React, { useState, useEffect } from "react";
import Cards from "./Components/Cards/Cards.jsx";
import ChartView from "./Components/Chart/Chart.jsx";
import CountryPicker from "./Components/CountryPicker/CountryPicker.jsx";
import styles from "./App.css";
import { fetchData } from "./api";
import SignIn from './Components/SignIn/SignIn.jsx';
import { gapi } from "gapi-script";
import config from './Components/SignIn/config.json';

function App () {
  const [viewData, setViewData] = useState({
    data: {},
    country: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const handleSetAuthentication = () => {
    console.log("inside handle authentication")
    setIsAuthenticated(true);
  }

  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId: config.GOOGLE_CLIENT_ID,
    });
  });

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsAuthenticated(true);
      const getData = async() => {
        const fetchedData = await fetchData();
        setViewData({ ...viewData, data: fetchedData });
      }
      getData();
    } else {
      setIsAuthenticated(false);
      setViewData({
        data: {},
        country: "",
      })
    }
  }, []);

  const handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    setViewData({ data: fetchedData, country: country });
  };
    return (
      <div className={styles.container}>
      {isAuthenticated && (typeof viewData.data !== 'undefined') ? (
        <div>
          <text>
            <b style={{textAlign: 'center'}}><strong>Global and Country Wise Cases of Corona Virus</strong></b>
          </text>
          <br />
          <text>
            <i>(For a particular select a Country from below)</i>
          </text>
          <br />
          <br />
          <CountryPicker handleCountryChange={handleCountryChange} />
          <br />
          <br />
          <Cards data={viewData.data} country={viewData.country} />
          <ChartView data={viewData.data} country={viewData.country} />
        </div>) :
        ( <SignIn handleSetAuthentication = {handleSetAuthentication} /> ) }
      </div>
    );
}

export default App;
