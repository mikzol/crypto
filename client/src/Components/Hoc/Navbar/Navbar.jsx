import React, { Component } from 'react';

import Login from '../Auth/Login';
import Register from '../Auth/Register';

export default class Navbar extends Component {
  state = {
    // eslint-disable-next-line
    signup: false,
    // eslint-disable-next-line
    login: false
  };

  // toggle navbar
  toggleBurger = () => {
    const burgerIcon = document.getElementById('burger');
    const dropMenu = document.getElementById('navMenu');
    dropMenu.classList.toggle('is-active');
    burgerIcon.classList.toggle('is-active');
  };

  render() {
    return (
      <nav className="navbar is-transparent is-fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img
                src="https://bulma.io/images/bulma-logo.png"
                alt="Bulma: a modern CSS framework based on Flexbox"
                width="112"
                height="28"
              />
            </a>
            <div
              onClick={this.toggleBurger}
              onKeyDown={this.toggleBurger}
              id="burger"
              className="navbar-burger burger"
              tabIndex="0"
              role="menu"
            >
              <span />
              <span />
              <span />
            </div>
          </div>

          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" href="https://bulma.io/">
                Home
              </a>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link" href="/documentation/overview/start/">
                  Docs
                </a>
                <div className="navbar-dropdown is-boxed">
                  <a className="navbar-item" href="/documentation/overview/start/">
                    Overview
                  </a>
                  <a
                    className="navbar-item"
                    href="https://bulma.io/documentation/modifiers/syntax/"
                  >
                    Modifiers
                  </a>
                  <a className="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                    Columns
                  </a>
                  <a
                    className="navbar-item"
                    href="https://bulma.io/documentation/layout/container/"
                  >
                    Layout
                  </a>
                  <a className="navbar-item" href="https://bulma.io/documentation/form/general/">
                    Form
                  </a>
                  <hr className="navbar-divider" />
                  <a className="navbar-item" href="https://bulma.io/documentation/elements/box/">
                    Elements
                  </a>
                  <a
                    className="navbar-item is-active"
                    href="https://bulma.io/documentation/components/breadcrumb/"
                  >
                    Components
                  </a>
                </div>
              </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Sign Up</a>
                <div className="navbar-dropdown is-boxed is-right desktop-auth">
                  <Register />
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Log In</a>
                <div className="navbar-dropdown is-boxed is-right desktop-auth">
                  <Login />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
