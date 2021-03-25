/** @jsx jsx */
import { jsx } from '@emotion/core'

import { useState, useEffect } from 'react'
import * as auth from 'auth-provider'
import { AuthenticatedApp } from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'
import { useAsync } from 'utils/hooks'
import { client } from 'utils/api-client'
import * as colors from 'styles/colors'
import { FullPageSpinner } from 'components/lib'

function App() {
  const {
    data: user,
    error,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    run,
    setData: setUser
  } = useAsync()

  const login = form => auth.login(form).then(u => setUser(u))
  const register = form => auth.register(form).then(u => setUser(u))
  const logout = () => {
    auth.logout()
    setUser(null)
  }

  const getUser = async () => {
    let user = null
    const token = await auth.getToken()
    if (token) {
      const data = await client('me', { token })
      user = data.user
    }

    return user
  }

  useEffect(() => {
    run(getUser())
  }, [run])

  if (isLoading || isIdle) return <FullPageSpinner />
  if (isError)
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )

  if (isSuccess)
    return user ? (
      <AuthenticatedApp user={user} logout={logout} />
    ) : (
      <UnauthenticatedApp login={login} register={register} />
    )
}

export { App }

/*
eslint
  no-unused-vars: "off",
*/
