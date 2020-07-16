import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./components/Marker";
import axios from "axios";
import styles from "./components/Main.module.css";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import Registration from "./components/Registration";
import StationInfo from "./components/StationInfo";
import Profile from "./components/Profile";
import Loader from "react-loader-spinner";
import { useAlert } from "react-alert";

export default function App(props) {
  const [fetchData, setFetchData] = useState(false);
  const [userHistory, setUserHistory] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  // eslint-disable-next-line
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [currentMarker, setCurrentMarker] = useState([]);
  const [center, setCenter] = useState({
    lat: 65.01,
    lng: 25.49,
  });
  const [zoom, setZoom] = useState(13);
  const [markers, setMarkers] = useState([]);
//   This is a duplicate of markers. Its aim to
//   show the data in the sidebar
  const [arr, setArr] = useState([]);
  const [isCharging, setIsCharging] = useState(false);
  const [UUID, setUUID] = useState("");
  const [idCharging, setIdCharging] = useState("");
  const [currentCharge, setCurrentCharge] = useState({});
  const alert = useAlert();

// Gets all stations data
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/v1/stations/getAllStations`)
      .then((result) => {
        setMarkers(result.data.rows);
        setArr(result.data.rows);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

// Fetchs the server to update data when needed
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/v1/stations/getAllStations`)
      .then((result) => {
        setMarkers(result.data.rows);
        setArr(result.data.rows);
      })
      .catch((error) => {
        console.error(error);
      });
    if (token !== "") {
      getUserHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, token]);

// Charghing process timer that sends requests every 5 secs
  useEffect(() => {
    if (idCharging && isCharging) {
      const interval = setInterval(() => {
        refreshData();
      }, 5000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCharging]);

// Logout function
  const logout = () => {
    stopCharging();
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setUUID("");
    setToken("");
  };

// Login function
  const login = (username, password) => {
    axios
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/v1/users/login`,
        {},
        {
          auth: {
            username,
            password,
          },
        }
      )
      .then(async (response) => {
        setIsLoggedIn(true);
        setUsername(username);
        setPassword(password);
        setToken(response.data.token);
        alert.success("Succesfully logged in", {
          timeout: 3000, // custom timeout just for this one alert
        });
      })
      .catch((error) => {
        alert.error("Incorrect username or password", {
          timeout: 3000, // custom timeout just for this one alert
        });
      });
  };

// Register function
  const register = (username, email, password) => {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/v1/users/register`, {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
		  console.log('response: ', response);
        alert.success("Succesfully created", {
          timeout: 3000, // custom timeout just for this one alert
		});
		return true;
      })
      .catch((error) => {
		  console.log('error: ', error);
        alert.error("An error occured", {
          timeout: 3000, // custom timeout just for this one alert
        });
      });
  };
  const textInputChange = (value) => {
    setArr(
      markers.filter(
        ({ stationName }) =>
          stationName.toLowerCase().indexOf(value.toLowerCase()) >= 0
      )
    );
    setCurrentMarker({});
  };

// Function sets the maps coordinates to the chosen station
  const setCurrentStation = (currentStation) => {
    setCurrentMarker(currentStation);
    setCenter({
      lat: currentStation.lat,
      lng: currentStation.lng,
    });
    setZoom(16);
  };

  // Sets current station to null
  const setCurrentStationToNull = () => {
    setCurrentMarker({});
  };

  // Function refetches the data of current charging
  const refreshData = async () => {
    axios
      .put(
        `${process.env.REACT_APP_API_ENDPOINT}/v1/stations/chargingProcess/${idCharging}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setCurrentCharge({ ...response.data.rows[0] });
      })
      .catch();
    await getUserHistory();
  };

// Function fetchs user's history
  const getUserHistory = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}/v1/users/history/userHistory`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setUserHistory(response.data.rows);
      })

      .catch((error) => console.log(error));
  };

  // Function stops charging process
  const stopCharging = async () => {
    setIsCharging(false);
    if (idCharging) {
      await axios
        .put(
          `${process.env.REACT_APP_API_ENDPOINT}/v1/stations/stopCharging/${idCharging}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(async (response) => {
          setFetchData(!fetchData);
          alert.info("Stopped charging", {
            timeout: 3000, // custom timeout just for this one alert
          });
        })
        .catch((error) => console.log(error));
    }
    setIdCharging(0);
  };

//   Function starts charging process
  const startCharging = async (UUID) => {
    if (UUID === "") {
      UUID = 0;
    }
    await axios
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/v1/stations/startCharging/${UUID}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(async (response) => {
        if (response.data !== false) {
          setIsCharging(true);
          setUUID(UUID);
          setIdCharging(response.data.rows[0].id);
          setCurrentCharge({
            cost: 0,
            timeOfUsage: 0,
            energy: 0,
          });
          setFetchData(!fetchData);
          alert.success("Started charging", {
            timeout: 3000, // custom timeout just for this one alert
          });
        } else {
          alert.info("No charger with such ID or it's taken already", {
            timeout: 6000, // custom timeout just for this one alert
          });
        }
      })
      .catch((error) => {
		alert.info("No charger with such ID or it's taken already", {
            timeout: 3000, // custom timeout just for this one alert
          });
        console.error(error);
      });
  };

// Function gets the info about clicked station
  const _onChildClick = (key, childProps) => {
    let marker;
    markers.forEach((e) => {
      if (e.stationName === childProps.text) {
        marker = e;
      }
    });
    setCenter({
      lat: childProps.lat,
      lng: childProps.lng,
    });
    setZoom(16);
    setCurrentMarker(marker);
  };
  return (
    <div className={styles.generalGrid}>
      <main>
        <Router>
          <Route
            path="/station/:id"
            exact
            render={(routeProps) => (
              <StationInfo
                {...routeProps}
                getInfoAboutStation={this.getInfoAboutStation}
              />
            )}
          />
          <Route
            path="/login"
            exact
            render={(routeProps) => (
              <Login
                login={login}
                {...routeProps}
                username={username}
              />
            )}
          />
          <Route
            path="/profile"
            exact
            render={(routeProps) => (
              <Profile userHistory={userHistory} {...routeProps} />
            )}
          />
          <Route
            path="/registration"
            exact
            render={(routeProps) => (
              <Registration
                {...routeProps}
                register={register}
              />
            )}
          />
          <Route
            path="/"
            exact
            render={(routeProps) => (
              <MainPage
                logout={logout}
                currentMarker={currentMarker}
                isLoggedIn={isLoggedIn}
                onSearchFilterUpdate={textInputChange}
                resultArray={arr.slice(0, 7)}
                setStation={setCurrentStation}
                setCurrentStationToNull={setCurrentStationToNull}
                startCharging={startCharging}
                isCharging={isCharging}
                UUID={UUID}
                idCharging={idCharging}
                currentCharge={currentCharge}
                stopCharging={stopCharging}
              />
            )}
          />
        </Router>
      </main>

      <Loader
        className={styles.loader}
        type="Oval"
        color="#00BFFF"
        height={"10rem"}
        width={"10rem"}
        timeout={1000000}
        visible={markers.length === 0 ? true : false}
      />

      <div className={markers.length === 0 ? styles.mapBlured : styles.map}>
        <GoogleMapReact
          center={center}
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API }}
          zoom={zoom}
          onChildClick={_onChildClick}
        >
          {markers.map((item, i) => (
            <Marker
              key={i}
              lat={item.lat}
              lng={item.lng}
              isTaken={item.isTaken}
              type={item.type}
              text={item.stationName}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
}
