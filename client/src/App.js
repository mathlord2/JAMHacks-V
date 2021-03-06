import React, {useState} from "react";

import './App.css';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Sustainability from "./pages/Sustainability/Sustainability";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import Login from "./pages/Login/Login";

import axios from "axios";

import moment from "moment";

function App() {
  const [user, setUser] = useState(null);

  const [myAds, setMyAds] = useState([
    {
      name: "Samsung Galaxy S7",
      image: {
        name: "https://cdn.pocket-lint.com/r/s/1200x/assets/images/136767-phones-review-samsung-galaxy-s7-edge-review-image1-hl9cn7gsdo.jpg"
      },
      category: "Phone",
      materials: ["Glass", "Aluminum", "Plastic"],
      requests: [
          {
              name: "Barry Zhang",
              email: "bzbarry@gmail.com",
              dateRequested: moment("2021-05-22").toDate(),
              message: "I am in desperate need of this phone plz hand it over :)"
          },
          {
              name: "Tejas Srikanth",
              email: "tejassrikanth@gmail.com",
              dateRequested: moment("2021-05-22").toDate(),
              message: "I cannot afford a modern phone at the moment, so I really would love to have this."
          },
      ],
      description: "I don't need this anymore, free for grabs!",
      location: "500 Laurelwood Drive",
      date: moment("2021-05-22").toDate()
    },
    {
      name: "OttLite Lamp",
      image: {
        name: "https://i.ebayimg.com/images/g/nVkAAOSw2eNezswi/s-l400.jpg"
      },
      category: "Furniture",
      materials: ["Plastic"],
      requests: [
          {
              name: "Kevin Gao",
              email: "kevinboxugao@gmail.com",
              dateRequested: moment("2021-05-22").toDate(),
              message: "I am in desperate need of this phone plz hand it over :)"
          },
          {
              name: "Jonathan Ge",
              email: "jonathange@gmail.com",
              dateRequested: moment("2021-05-21").toDate(),
              message: "I cannot afford a modern phone at the moment, so I really would love to have this."
          },
      ],
      description: "I don't need this anymore, free for grabs!",
      location: "500 Columbia Street",
      date: moment("2021-05-20").toDate()
    },
  ]);

  const [ads, setAds] = useState([
    {
        name: "Samsung Galaxy S7",
        image: {
          name: "https://cdn.pocket-lint.com/r/s/1200x/assets/images/136767-phones-review-samsung-galaxy-s7-edge-review-image1-hl9cn7gsdo.jpg"
        },
        category: "Phone",
        materials: ["Glass", "Aluminum"],
        requests: [
          {
              name: "Barry Zhang",
              email: "bzbarry@gmail.com",
              dateRequested: moment("2021-05-22").toDate(),
              message: "I am in desperate need of this phone plz hand it over :)"
          },
          {
              name: "Tejas Srikanth",
              email: "tejassrikanth@gmail.com",
              dateRequested: moment("2021-05-22").toDate(),
              message: "I cannot afford a modern phone at the moment, so I really would love to have this."
          },
        ],
        description: "I don't need this anymore, free for grabs!",
        location: "500 Laurelwood Drive",
        date: moment("2021-05-22").toDate(),
        vendor: "Eric Xiao",
        email: "erixrekt69@gmail.com",
        userid: "afu290fjasd9023as0dj0",
        requested: false
    },
    {
        name: "Apple iPhone 4s",
        image: {
          name: "https://cdn.arstechnica.net/wp-content/uploads/2014/09/IMG_0052-980x639.jpg"
        },
        category: "Phone",
        materials: ["Glass", "Aluminum"],
        requests: [
          {
              name: "Barry Zhang",
              email: "bzbarry@gmail.com",
              dateRequested: moment("2021-05-22").toDate(),
              message: "I am in desperate need of this phone plz hand it over :)"
          },
          {
              name: "Tejas Srikanth",
              email: "tejassrikanth@gmail.com",
              dateRequested: moment("2021-05-22").toDate(),
              message: "I cannot afford a modern phone at the moment, so I really would love to have this."
          },
        ],
        description: "Free iPhone 4s for anyone!",
        location: "500 Laurelwood Drive",
        date: moment("2021-05-22").toDate(),
        vendor: "Jonathan Ge",
        email: "johnnyge@gmail.com",
        userid: "dcu3q309c09dafj",
        requested: false
    },
    {
        name: "Lenovo Thinkpad",
        image: {
          name: "https://outletclick.com/media/catalog/product/cache/15/image/9df78eab33525d08d6e5fb8d27136e95/2/0/20181211_115327_1_1_.jpg"
        },
        category: "Computer",
        materials: ["Plastic", "Aluminum"],
        requests: [
          {
              name: "Barry Zhang",
              email: "bzbarry@gmail.com",
              dateRequested: moment("2021-05-22").toDate(),
              message: "I am in desperate need of this phone plz hand it over :)"
          },
          {
              name: "Tejas Srikanth",
              email: "tejassrikanth@gmail.com",
              dateRequested: moment("2021-05-22").toDate(),
              message: "I cannot afford a modern phone at the moment, so I really would love to have this."
          },
        ],
        description: "Got a used Lenovo Thinkpad that still works pretty well! Up for grabs :)",
        location: "500 Laurelwood Drive",
        date: moment("2021-05-22").toDate(),
        vendor: "Jonathan Ge",
        email: "johnnyge@gmail.com",
        userid: "dcu3q309c09dafj",
        requested: false
    }
  ]);

  const addAd = (name, image, description, category, location, date) => {
    const ad = {name, image, description, category, location, date};
    setMyAds([...myAds, ad]);

    /*const config = {
      headers: {
        "authorization": "Bearer " + user.token,
        "accept": "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${form._boundary}`
      }
    }

    axios.post("http://localhost:5000/ads", ad, config)
    .then(response => {
      console.log(response.data);
    });*/
  }

  const logout = () => {
    setUser(null);
  }

  const login = (email, password) => {
      const userDict = {name: "Eric Xiao", email, password};
      let token = "";

      axios.post("http://localhost:5000/signin", userDict)
      .then(response => {
        console.log(response);
        token = response.data.token;
        setUser({...userDict, token});

        /*const config = {
          headers: {
            authorization: "Bearer " + token
          }
        }
  
        axios.get("http://localhost:5000/ads", config)
        .then(r => {
          console.log(r);
          setMyAds(r.data);
        });*/
      });
  }

  const signup = (name, email, password) => {
    const userDict = {name, email, password};
    axios.post("http://localhost:5000/signup", userDict)
    .then(response => {
      setUser({...userDict, token: response.data.token});
    });
  }

  return (
    <Router>
      {user ? <>
      <ul className="navbar">
        <li>
          <NavLink to="/profile" className="link" activeClassName="activeLink">Profile</NavLink>
          <NavLink to="/sustainability" className="link" activeClassName="activeLink">Sustainability</NavLink>
          <NavLink to="/search" className="link" activeClassName="activeLink">Search</NavLink>
          <NavLink exact to="/" className="link" activeClassName="activeLink">Home</NavLink>
        </li>
      </ul>
        
      <Switch>
        <Route exact path="/search">
          <Search ads={ads} token={user.token}/>
        </Route>
        <Route exact path="/sustainability">
          <Sustainability/>
        </Route>
        <Route exact path="/profile">
          <Profile user={user} logout={logout}/>
        </Route>
        <Route exact path="/">
          <Home ads={myAds} addAd={addAd} token={user.token}/>
        </Route>
      </Switch>
      </> : <Switch>
        <Route exact path="/">
          <Login login={login} signup={signup}/>
        </Route>  
      </Switch>}
    </Router>
  );
}

export default App;
