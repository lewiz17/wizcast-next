/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/dashplayer",
        destination: "/channel.html",
      },
    ];
  },
};
