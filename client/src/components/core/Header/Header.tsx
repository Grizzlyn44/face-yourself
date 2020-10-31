import React, { useState } from "react";
import Resource from "resource/Resource";
import { Modal, Button, Form, Input } from "antd";
import axios from "axios/axios";

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
  const [isModalVisible, setIsModalVisible] = useState(() =>
    generateModalVisibleInitial()
  );

  const [signInForm, setSignInFrom] = useState({ email: "", password: "" });
  const [signInLoading, setSignInLoading] = useState(false);

  const signIn = async () => {
    setSignInLoading(true);

    await axios
      .post("/signin", {
        email: signInForm.email,
        password: signInForm.password
      })
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log("error", err);
      });

    setSignInLoading(false);
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
          console.log("onFinsifh");
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
          loading={signInLoading}
          style={{ width: "100%" }}
        >
          <Resource locationResource='global' keyResource='signIn' />
        </Button>
      </Form>
    </Modal>
  );

  // console.log("value", mainContext);
  if (false) {
    console.log("you are signed in");
  } else {
    console.log("you are NOT signed in");
  }

  return (
    <>
      {signInModal}
      <header className='main-navigation'>
        <nav>
          <div className='main-navigation__logo'>FU</div>
          <div className='main-navigation__links'>
            <a
              className='main-navigation__link'
              onClick={() => modalVisibilityToggler(SIGN_IN_MODAL_KEY)}
            >
              <Resource locationResource='global' keyResource='signIn' />
            </a>
            <a href='/' className='main-navigation__link'>
              <Resource locationResource='global' keyResource='signUp' />
            </a>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
