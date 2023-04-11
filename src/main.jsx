import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import './customize.scss';

const theme = createTheme({
    palette: {
        primary: {
            main: '#f8bc4c',
            opacity50 : 'rgba(248,188,76,0.5)',
            opacity25 : 'rgba(248,188,76,0.25)',
            opacity75 : 'rgba(248,188,76,0.75)',
        },
        danger: {
            main: '#f2523f',
            opacity50 : 'rgba(242,82,63,0.5)',
            opacity25 : 'rgba(242,82,63,0.25)',
            opacity75 : 'rgba(242,82,63,0.75)',
        },
        warning: {
            main: '#ea6e22',
            opacity50 : 'rgba(234,110,34,0.5)',
            opacity25 : 'rgba(234,110,34,0.25)',
            opacity75 : 'rgba(234,110,34,0.75)',
        },
        info: {
            main: '#5fd6d1'
        },
        success: {
            main: '#99db6b'
        },
        secondary: {
            main: '#4e4e4e'
        },
        light: {
            main : '#f1f1f1',
            opacity50 : 'rgb(241,241,241,0.5)',
            opacity25 : 'rgba(241,241,241,0.25)',
            opacity75 : 'rgba(241,241,241,0.75)',
        },
        dark: {
            main : '#202025',
            opacity50 : 'rgba(32,32,37,0.5)',
            opacity25 : 'rgba(32,32,37,0.25)',
            opacity75 : 'rgba(32,32,37,0.75)',
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <ThemeProvider theme={theme}>
              <App/>
          </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
