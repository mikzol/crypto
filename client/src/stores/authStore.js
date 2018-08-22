import { observable, action } from 'mobx';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// import * as R from 'ramda';

import setAuthToken from '../utils/setAuthToken';

class AuthStore {
  @observable
  user = {};
  @observable
  cryptocurrenciesLoading = false;
  @observable
  userCryptocurrencies = [];

  @action
  setUser = decoded => {
    this.user = decoded;
  };

  @action
  getUser = () => {
    axios
      .post('/auth/current_user')
      .then(res => {
        this.user.name = res.data.name;
      })
      .catch(err => {
        console.log(err);
      });
  };

  @action
  getUserCryptocurrencies = () => {
    this.cryptocurrenciesLoading = true;
    axios
      .get('/api/user_cryptocurrencies')
      .then(res => {
        this.getUserCryptoInfo(res.data.cryptocurrencies);
      })
      .catch(err => {
        this.cryptocurrenciesLoading = false;
      });
  };

  @action
  addUserCryptocurrencies = coins => {
    this.cryptocurrenciesLoading = true;
    axios
      .post('/api/user_cryptocurrencies', coins)
      .then(res => {
        // sends all user cryptocurrencies to the function that will find info on each one
        this.getUserCryptoInfo(res.data.cryptocurrencies);
      })
      .catch(err => {
        this.cryptocurrenciesLoading = false;
      });
  };

  @action
  getUserCryptoInfo = coins => {
    this.cryptocurrenciesLoading = true;
    this.userCryptocurrencies = [];
    // this works perfectly but sometimes takes a long time to load (api rate issues?)
    const finished = coins.map(coin =>
      fetch(`https://api.coinmarketcap.com/v2/ticker/${coin.api_id}/`)
        .then(item => item.json())
        .then(json => this.userCryptocurrencies.push(json.data))
        .catch(err => {
          this.cryptocurrenciesLoading = false;
        })
    );
    //  when all fetch requests have finished, stop loading and re-render the list of coins
    Promise.all(finished)
      .then(() => {
        this.cryptocurrenciesLoading = false;
      })
      .catch(err => {
        this.cryptocurrenciesLoading = false;
      });
    // sometimes the API takes too long to finish loading so this stops loading after 4 seconds and they finish over time
    setTimeout(() => {
      this.cryptocurrenciesLoading = false;
    }, 4000);
  };

  @action
  removeUserCrypto = coin => {
    //  removes the coin from the currently displaying coins if you click delete, then sends the API request to remove it from DB after
    this.userCryptocurrencies.forEach((crypto, i) => {
      if (crypto.id === coin) {
        this.userCryptocurrencies.splice(i, 1);
        axios.delete(`/api/user_cryptocurrencies/${coin}`).catch(err => console.log(err));
      }
    });
  };

  // TODO: test if this works properly
  @action
  logoutUser = () => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    this.user = {};
    this.userCryptocurrencies = [];
  };

  @action
  loginUser = userData => {
    axios
      .post('/auth/login', userData)
      .then(res => {
        this.user = jwtDecode(res.data.access_token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  @action
  registerUser = userData => {
    axios.post('/auth/register', userData).then(res => {
      localStorage.setItem('jwtToken', res.data.access_token);
    });
  };
}

export default new AuthStore();
