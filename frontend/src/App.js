import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GoogleMapReact from "google-map-react";
import Marker from "./components/Marker";
import axios from "axios";
import styles from "./components/Main.module.css";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import Registration from "./components/Registration";
import StationInfo from "./components/StationInfo";
import Profile from "./components/Profile";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userHistory: [],
      message: "",
      isLoggedIn: false,
      idUser: null,
      username: "",
      password: "",
      data: [],
      token: "",
      currentMarker: {},
      center: {
        lat: 65.01,
        lng: 25.49,
      },
      zoom: 13,
      Markers: [],
      arr: [],
      showSearchResults: false,
      isCharging: false,
      UUID: "",
      idCharging: "",
      noChargerNotification: "",
      currentCharge: {},
    };
  }

  componentDidMount = () => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/v1/stations/getAllStations`)
      .then((result) => {
        this.setState({ Markers: result.data.rows });
        this.setState({ arr: result.data.rows });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  logout = () => {
    this.stopCharging();
    this.setState({
      isLoggedIn: false,
      username: "",
      password: "",
      idUser: null,
      UUID: "",
      token: "",
    });
  };

  login = (username, password) => {
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
        await this.setState({
          isLoggedIn: true,
          username: username,
          password: password,
          token: response.data.token,
        });
        this.getUserHistory();
      })
      .catch((error) => {
        this.setState({
          message: "Incorrect username or password",
        });
      });
  };

  register = (username, email, password) => {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/v1/users/register`, {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        this.setState({ message: "Succesfully created" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setMessageToNull = () => this.setState({ message: "" });
  textInputChange = (value) => {
    this.setState({
      arr: this.state.Markers.filter(
        ({ stationName }) =>
          stationName.toLowerCase().indexOf(value.toLowerCase()) >= 0
      ),
    });
    // this.setState({ arr : this.state.arr.length = 5})
    this.setState({ currentMarker: {} });
    // ( this.state.arr.length != 0) ? this.setState( {showSearchResults: true}) : this.setState( {showSearchResults: false})
  };

  setCurrentStation = async (currentStation) => {
    await this.setState({
      currentMarker: currentStation,
      center: {
        lat: currentStation.lat,
        lng: currentStation.lng,
      },
      zoom: 16,
    });
  };

  setCurrentStationToNull = () => {
    this.setState({ currentMarker: {} });
  };

  refreshData = () => {
	  if(this.state.isCharging){

	  }
	let frequency = 5;
	console.log("chargId: ", this.state.idCharging )
    axios
      .put(
        `${process.env.REACT_APP_API_ENDPOINT}/v1/stations/chargingProcess/${this.state.idCharging}`,
        {},
        {
          headers: { Authorization: `Bearer ${this.state.token}` },
        }
      )
      .then((response) => {
        console.log("response: ", response);
        this.setState({ currentCharge: { ...response.data.rows[0] } });
      })
      .catch();
    this.getUserHistory();
    if (this.state.isCharging) {
      setTimeout(this.refreshData, frequency * 1000);
    }
  };

  getUserHistory = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}/v1/users/history/userHistory`,
        {
          headers: { Authorization: `Bearer ${this.state.token}` },
        }
      )
      .then((response) => {
        this.setState({ userHistory: response.data.rows });
      })

      .catch((error) => console.log(error));
  };

  stopCharging = async () => {
    await this.setState({ isCharging: false });
    axios
      .put(
        `${process.env.REACT_APP_API_ENDPOINT}/v1/stations/stopCharging/${this.state.idCharging}`,
        {},
        {
          headers: { Authorization: `Bearer ${this.state.token}` },
        }
      )
      .then(async (response) => {
        await this.componentDidMount();
      })
      .catch((error) => console.log(error));
  };

  startCharging = (UUID) => {
    if (UUID === "") {
      UUID = 0;
    }
    axios
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/v1/stations/startCharging/${UUID}`,
        {},
        {
          headers: { Authorization: `Bearer ${this.state.token}` },
        }
      )
      .then(async (response) => {
        console.log("response: ", response);
        if (response.data !== false) {
			console.log('response: ', response);
          await this.setState({
            isCharging: true,
            UUID: UUID,
            idCharging: response.data.rows[0].id,
            noChargerNotification: "",
          });
          this.refreshData();
          this.componentDidMount();
        } else {
          await this.setState({
            noChargerNotification:
              "No charger with such ID or it's taken already",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  _onChildClick = (key, childProps) => {
    let marker;
    this.state.Markers.forEach((e) => {
      if (e.stationName === childProps.text) {
        marker = e;
      }
    });
    this.setState({
      center: {
        lat: childProps.lat,
        lng: childProps.lng,
      },
      zoom: 16,
      currentMarker: marker,
    });
  };

  render() {
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
                  login={this.login}
                  {...routeProps}
                  username={this.state.username}
                  message={this.state.message}
                  setMessageToNull={this.setMessageToNull}
                />
              )}
            />
            <Route
              path="/profile"
              exact
              render={(routeProps) => (
                <Profile userHistory={this.state.userHistory} {...routeProps} />
              )}
            />
            <Route
              path="/registration"
              exact
              render={(routeProps) => (
                <Registration
                  {...routeProps}
                  register={this.register}
                  message={this.state.message}
                  setMessageToNull={this.setMessageToNull}
                />
              )}
            />
            <Route
              path="/"
              exact
              render={(routeProps) => (
                <MainPage
                  logout={this.logout}
                  message={this.state.message}
                  currentMarker={this.state.currentMarker}
                  isLoggedIn={this.state.isLoggedIn}
                  onSearchFilterUpdate={this.textInputChange}
                  showSearchResults={this.state.showSearchResults}
                  resultArray={this.state.arr.slice(0, 7)}
                  setStation={this.setCurrentStation}
                  setCurrentStationToNull={this.setCurrentStationToNull}
                  startCharging={this.startCharging}
                  noChargerNotification={this.state.noChargerNotification}
                  isCharging={this.state.isCharging}
                  UUID={this.state.UUID}
                  idCharging={this.state.idCharging}
                  currentCharge={this.state.currentCharge}
                  stopCharging={this.stopCharging}
                />
              )}
            />
          </Router>
        </main>

        <div className={styles.map}>
          <GoogleMapReact
            center={this.state.center}
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API }}
            zoom={this.state.zoom}
            onChildClick={this._onChildClick}
          >
            {this.state.Markers.map((item, i) => (
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
}
