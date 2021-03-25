// 🐨 you'll need to import React and ReactDOM up here
import '@reach/dialog/styles.css'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Dialog } from '@reach/dialog'
import { VisuallyHidden } from '@reach/visually-hidden'

import { Logo, LoginForm } from 'components'

const modals = {
  register: 'register',
  login: 'login',
  none: 'none'
}
const App = () => {
  const [openModal, setOpenModal] = useState(modals.none)
  const close = () => setOpenModal('none')

  const login = formData => console.log('login', formData)
  const register = formData => console.log('register', formData)
  return (
    <>
      <Logo />
      <h1>Bookshelf</h1>

      <button onClick={() => setOpenModal(modals.login)}>Login</button>
      <button onClick={() => setOpenModal(modals.register)}>Register</button>
      <Dialog
        isOpen={openModal === 'login'}
        onDismiss={close}
        aria-label="Login form">
        <h3>Login</h3>
        <button className="close-button" onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>

        <LoginForm onSubmit={login} />
      </Dialog>

      <Dialog
        isOpen={openModal === 'register'}
        onDismiss={close}
        aria-label="Registration form">
        <h3>Register</h3>
        <button className="close-button" onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
        <LoginForm onSubmit={register} />
      </Dialog>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
