import React from "react"
import {Button, Grid, Link, TextField} from "@mui/material"

import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import SettingsIcon from '@mui/icons-material/Settings'

const LogIn = (): React.ReactNode => {
    return (
        <div style={style.formContainer}>
            <form noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {/*<FormControlLabel*/}
                {/*  control={<Checkbox value="remember" color="primary" />}*/}
                {/*  label="Remember me"*/}
                {/*/>*/}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={style.submitButton}
                >
                    Log In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

const style = {
    formContainer: {
        width: '350px'
    },
    buttonContainer: {
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'start'
    },
    appsContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    navButton: {
        padding: 0
    },
    navIcon: {
        width: '22px',
        color: '#CFCED9'
    },
    submitButton: {
        background: '#282636',
        color: '#CFCED9'
    }
}

export default LogIn
