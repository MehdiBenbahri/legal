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
            main: '#4cd8f8',
            opacity50 : 'rgba(76,216,248,0.5)',
            opacity25 : 'rgba(76,216,248,0.25)',
            opacity75 : 'rgba(76,216,248,0.75)',
        },
        danger: {
            main: '#f2523f',
            opacity50 : 'rgba(242,82,63,0.5)',
            opacity25 : 'rgba(242,82,63,0.25)',
            opacity75 : 'rgba(242,82,63,0.75)',
        },
        warning: {
            main: '#eaa422',
            opacity50 : 'rgba(234,164,34,0.5)',
            opacity25 : 'rgba(234,164,34,0.25)',
            opacity75 : 'rgba(234,164,34,0.75)',
        },
        info: {
            main: '#5f81d6'
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
