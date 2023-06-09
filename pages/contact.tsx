import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import Layout from "../components/Layout";
import Container from "../components/Container";
import ContactForm from "../components/Form";
import { useEffect, useState } from "react";

const About: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>{`Site ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <div className="w-full p-5 mt-10 rounded overflow-hidden shadow ">
          <h1 className="text-3xl font-bold">Contacto</h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5 mb-10 mt-10">
            <ContactForm />
            <div className="w-full px-2 rounded overflow-hidden shadow">
              <div className="px-6 py-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus assumenda dolor, velit, aliquam reiciendis suscipit
                ullam ab sed, libero impedit laborum doloremque quo eum rem
                vitae obcaecati amet quaerat nihil?
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default About;
