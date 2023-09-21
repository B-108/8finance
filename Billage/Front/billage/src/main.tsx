import React from 'react'
import router from "./Router";
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from './themes/index.ts';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <RouterProvider router={router}/>
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>,
)
