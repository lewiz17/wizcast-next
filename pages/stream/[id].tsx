export async function getServerSideProps(context) {
  const { id } = context.params!;

  let urlDecoded;
  if (typeof id === "string") {
    urlDecoded = Buffer.from(id, "base64").toString("utf-8");
  } else if (Array.isArray(id)) {
    urlDecoded = Buffer.from(id[0], "base64").toString("utf-8");
  }

  return {
    redirect: {
      destination: urlDecoded,
      permanent: true,
    },
  };
}

function MyPage() {
  return null;
}

export default MyPage;
