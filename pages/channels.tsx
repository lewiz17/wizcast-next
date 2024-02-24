import React, { useEffect, useState } from "react";
import PinForm from "./enter";
import Container from "../components/Container";
import Head from "next/head";
import Layout from "../components/Layout";
import { CMS_NAME } from "../lib/constants";

import ChannelList from "../components/ChannelList";
import { isValidPin } from "../utils/helpers";

const ChannelPage: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentPin, setCurrentPin] = useState(0);
  const [validPin, setValidPin] = useState(0);

  useEffect(() => {
    const checkPIN = localStorage.getItem("validPin");

    if (isValidPin(checkPIN).isValid) {
      // Si ya hay un PIN en localStorage,validar y autenticar
      setAuthenticated(true);
      setValidPin(parseInt(checkPIN));
    } else {
      // Si no hay un PIN en localStorage, validar y almacenar si es válido
      const isPinValid = isValidPin(currentPin).isValid;
      const expirationPin = isValidPin(currentPin).expirationDate;

      if (isPinValid) {
        setAuthenticated(true);
        localStorage.setItem("validPin", currentPin.toString());
        localStorage.setItem("expirationPin", expirationPin.toString());
        setValidPin(currentPin);
      } else {
        alert("Este PIN ya expiró o no existe");
        setAuthenticated(false);
      }
    }
  }, [currentPin]);

  const handlePinSubmit = (pin) => {
    setCurrentPin(pin);
  };

  return (
    <Layout>
      <Head>
        <title>{`Site ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <div className="container mx-auto w-full p-5 my-10 rounded overflow-hidden shadow ">
          {authenticated ? (
            <ChannelList />
          ) : (
            <PinForm onSubmit={handlePinSubmit} />
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default ChannelPage;
