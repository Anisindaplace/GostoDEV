import React, { Component } from 'react';

import Breacrumb from '../../../common/components/Breadcrumb/Breadcrumb';
import SigninForm from './components/SigninForm';
import bg from '../../../common/assets/bg.jpg';

export default class SigninPage extends Component {
  render() {
    return (
      <div className="Signin">
        <Breacrumb pageTitle="Signin" imageSrc={bg} />
        <div className="section before-after">
          <div className="container">
            <SigninForm />
          </div>
        </div>
      </div>
    );
  }
}
