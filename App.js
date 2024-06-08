import React from "react";
import Layout from "./app/_layout";
import { SessionProvider } from "./SessionContext";

export default function App() {
  return (
    <SessionProvider>
      <Layout />
    </SessionProvider>
  );
}
