import fs from "fs";
import RSS from "rss";
import { getMovies } from "../pages/api/top10.json";
import { formatTitle } from "./helpers";

export default async function generateRssFeed() {
  const topmovies = (await getMovies());


  const feed = new RSS({
    title: "Wizpelis 2023",
    description: "Wizpelis, Estrenos en Peliculas y Series",
    site_url: "https://wizpelis.site",
    feed_url: "https://wizpelis.site/feed.xml",
    copyright: `${new Date().getFullYear()} Wizpelis 2023`,
    language: "es-MX",
    pubDate: new Date(),
  });

  topmovies.map(movie => {
    return feed.item({
        title: movie.original_title,
        guid: `https://wizpelis.site/movie/${movie.id}/${formatTitle(movie.title)}`,
        url: `https://wizpelis.site/movie/${movie.id}/${formatTitle(movie.title)}`,
        date: movie.release_date,
        description: movie.overview,
        image_url: `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
    })
  })


  // Write the RSS feed to a file as XML.
  fs.writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
}
