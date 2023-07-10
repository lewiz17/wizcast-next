import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";

const Donate: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>{`Donación`}</title>
      </Head>
      <div className="container mx-auto">
        <p className="text-white my-10">
          Escanea el codigo QR y podrás realizar tu donación para apoyar el
          proyecto
        </p>
        <div className="flex justify-center h-[300px] items-center">
          <Image
            alt="Qr"
            width={200}
            height={200}
            className="object-cover"
            src={
              "https://storage.ko-fi.com/cdn/useruploads/C0C8MWA2R/qrcode.png?v=88297a00-21e1-493c-92ed-2530cd897b85?v=2"
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default Donate;
