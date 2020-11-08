import React, { useState } from "react";
import Resource from "resource/Resource";
import { Modal, Button, Form, Input } from "antd";
import axios from "axios/axios";
import { useSelector, useDispatch } from "react-redux";
import {rootReducerType} from "reducers/index";
import {authProcessSignInAction, authProcessInitAction} from "actions/authActions";

const SIGN_IN_MODAL_KEY = "signInModal";
const SIGN_UP_MODAL_KEY = "signUpModal";

const generateModalVisibleInitial = () => {
  const modalKeys = [SIGN_IN_MODAL_KEY, SIGN_UP_MODAL_KEY];
  let isVisibleModalsObj = {};
  modalKeys.forEach(
    key => (isVisibleModalsObj = { ...isVisibleModalsObj, [key]: false })
  );
  return isVisibleModalsObj;
};

const Header = () => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state:rootReducerType) => state.authReducer);
  const { authProcessLoading } = authReducer;
  
  const [isModalVisible, setIsModalVisible] = useState(() =>
    generateModalVisibleInitial()
  );

  const [signInForm, setSignInFrom] = useState({ email: "", password: "" });

  const signIn = async () => {

    dispatch(authProcessInitAction());

    const formData = {
      email: signInForm.email,
      password: signInForm.password
    }
    await dispatch(authProcessSignInAction(formData));
    modalVisibilityToggler(SIGN_IN_MODAL_KEY);
  };

  const signInFormOnChangeHandler = e => {
    const updatedForm = { ...signInForm };
    updatedForm[e.target.id] = e.target.value;
    setSignInFrom(updatedForm);
  };

  const modalVisibilityToggler = modalKey => {
    setIsModalVisible({
      ...isModalVisible,
      [modalKey]: !isModalVisible[modalKey]
    });
  };

  const signInModal = (
    <Modal
      className='modal--custom'
      title='Sign in'
      visible={isModalVisible[SIGN_IN_MODAL_KEY]}
      onOk={() => modalVisibilityToggler(SIGN_IN_MODAL_KEY)}
      onCancel={() => modalVisibilityToggler(SIGN_IN_MODAL_KEY)}
      footer={null}
    >
      <Form
        // initialValues={{ remember: true }}
        onFinish={() => {
          signIn();
        }}
        onFinishFailed={() => {
          console.log("onFinish FAILED");
        }}
      >
        <Form.Item name='email' rules={[{ required: true }]}>
          <Input
            size='large'
            placeholder='email'
            value={signInForm.email}
            id='email'
            onChange={e => signInFormOnChangeHandler(e)}
          />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true }]}>
          <Input
            size='large'
            placeholder='password'
            type='password'
            value={signInForm.password}
            id='password'
            onChange={e => signInFormOnChangeHandler(e)}
          />
        </Form.Item>
        <Button
          htmlType='submit'
          type='primary'
          loading={authProcessLoading}
          style={{ width: "100%" }}
        >
          <Resource locationResource='global' keyResource='signIn' />
        </Button>
      </Form>
    </Modal>
  );

  console.log("authReducer", authReducer);

  const unAuthorizedContent = (
    <>
      <a
        className='main-navigation__link'
        onClick={() => modalVisibilityToggler(SIGN_IN_MODAL_KEY)}
      >
        <Resource locationResource='global' keyResource='signIn' />
      </a>
      <a href='/' className='main-navigation__link'>
        <Resource locationResource='global' keyResource='signUp' />
      </a>
    </>
  )

  const authorizedContent = (
    <>
      <div className="main-navigation__link">
        {authReducer.email}
      </div>
    </>
  )

  const renderLinksContent = () => {
    if(authReducer.isSignedIn) {
      return authorizedContent
    } else {
      return unAuthorizedContent
    }
  }

  return (
    <>
      {signInModal}
      <header className='main-navigation'>
        <nav>
          <div className='main-navigation__logo'>FU</div>
          <div className='main-navigation__links'>
            {renderLinksContent()}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
