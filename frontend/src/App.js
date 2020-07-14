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

export default function App(props) {
  const [fetchData, setFetchData] = useState(false);
  const [userHistory, setUserHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState([]);
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
  const [arr, setArr] = useState([]);
  const [isCharging, setIsCharging] = useState(false);
  const [UUID, setUUID] = useState("");
  const [idCharging, setIdCharging] = useState("");
  const [noChargerNotification, setNoChargerNotification] = useState("");
  const [currentCharge, setCurrentCharge] = useState({});

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

  useEffect(() => {
    if (idCharging && isCharging) {
      const interval = setInterval(() => {
        refreshData();
      }, 5000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCharging]);

  const logout = () => {
    stopCharging();
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setUUID("");
    setToken("");
    setMessage("");
  };

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
      })
      .catch((error) => {
        setMessage("Incorrect username or password");
      });
  };

  const register = (username, email, password) => {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/v1/users/register`, {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        setMessage("Succesfully created");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setMessageToNull = () => setMessage("");
  const textInputChange = (value) => {
    setArr(
      markers.filter(
        ({ stationName }) =>
          stationName.toLowerCase().indexOf(value.toLowerCase()) >= 0
      )
    );
    setCurrentMarker({});
  };

  const setCurrentStation = (currentStation) => {
    setCurrentMarker(currentStation);
    setCenter({
      lat: currentStation.lat,
      lng: currentStation.lng,
    });
    setZoom(16);
  };

  const setCurrentStationToNull = () => {
    setCurrentMarker({});
  };

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
        })
        .catch((error) => console.log(error));
    }
    setIdCharging(0);
  };

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
          setNoChargerNotification("");
          setCurrentCharge({
            cost: 0,
            timeOfUsage: 0,
            energy: 0,
          });
          setFetchData(!fetchData);
        } else {
          setNoChargerNotification(
            "No charger with such ID or it's taken already"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
                message={message}
                setMessageToNull={setMessageToNull}
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
                message={message}
                setMessageToNull={setMessageToNull}
              />
            )}
          />
          <Route
            path="/"
            exact
            render={(routeProps) => (
              <MainPage
                logout={logout}
                message={message}
                currentMarker={currentMarker}
                isLoggedIn={isLoggedIn}
                onSearchFilterUpdate={textInputChange}
                resultArray={arr.slice(0, 7)}
                setStation={setCurrentStation}
                setCurrentStationToNull={setCurrentStationToNull}
                startCharging={startCharging}
                noChargerNotification={noChargerNotification}
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

      <div className={styles.map}>
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
