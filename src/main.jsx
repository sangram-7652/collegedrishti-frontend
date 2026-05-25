// src/main.jsx

import React, { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider} from "@tanstack/react-query";


import { Toaster } from "react-hot-toast";

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

import App from "./App";

import "./index.css";

const queryClient = new QueryClient();

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
      <BrowserRouter>
        <QueryClientProvider
          client={queryClient}
        >
          <App />

          <Toaster
            position="top-right"
            reverseOrder={false}
          />
        </QueryClientProvider>
      </BrowserRouter>
  </StrictMode>
);