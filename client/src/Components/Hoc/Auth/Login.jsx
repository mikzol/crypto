import React, { Component } from 'react';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import authStore from '../../../stores/authStore';
import setAuthToken from '../../../utils/setAuthToken';

class Login extends Component {
  render() {
    const { values, errors, touched } = this.props;
    return (
      <section className="auth">
        <div className="">
          <div className="has-text-centered">
            <div className="column">
              <div className="">
                <Form>
                  <div className="field">
                    <div className="control">
                      <div className="help has-text-grey-dark">Email</div>
                      <Field
                        field="email"
                        className={`input ${touched.email && errors.email ? 'is-danger' : ''}`}
                        placeholder="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="help is-danger">{touched.email && errors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <div className="help has-text-grey-dark">Password</div>
                      <Field
                        field="password"
                        className={`input ${
                          touched.password && errors.password ? 'is-danger' : ''
                        }`}
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                      />
                      {errors.password && (
                        <p className="help is-danger">{touched.password && errors.password}</p>
                      )}
                    </div>
                  </div>
                  <button type="submit" className="button is-block is-info is-fullwidth">
                    Log In
                  </button>
                  <div className="columns">
                    <div className="column">
                      <a href="/" className="help">
                        Create an account
                      </a>
                    </div>
                    <div className="column">
                      <a href="/" className="help">
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  {/* TODO: add oauth options ? */}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const FormikLogin = withFormik({
  mapPropsToValues() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  validationSchema: Yup.object().shape({
    // TODO: add username limitations (spaces, etc)
    email: Yup.string()
      .email()
      .required()
      .max(150),
    password: Yup.string()
      .min(6)
      .required()
  }),
  handleSubmit(values, errors) {
    axios.post('/auth/login', values).then(res => {
      if (res.data.message === 'Login Successful') {
        localStorage.setItem('jwtToken', res.data.access_token);
        //  redirect after success
        // set a flash message after success(?)
      }
    });
  }
})(Login);

export default FormikLogin;

// TODO: nevber use formik when i want to have conditionally different routes etc
