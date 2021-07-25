import { getElement, createHeader, createMain, createFooter } from "./main.js";

const movieConstructor = (selector, options) => {
  const app = document.querySelector(selector);
  app.classList.add("body-app");

  app.style.color = options.fontColor || "";
  app.style.backgroundColor = options.backgroundColor || "";
  if (options.subColor) {
    document.documentElement.style.setProperty("--sub-color", options.subColor);
  }

  app.style.backgroundImage = options.background
    ? `url('${options.background}')`
    : "";

  if (options.favicon) {
    const index = options.favicon.lastIndexOf(".");
    const type = options.favicon.substring(index + 1);
    const favicon = getElement("link", null, {
      rel: "icon",
      href: options.favicon,
      type: "image/" + (type === "svg" ? "svg-xml" : type),
    });
    document.head.append(favicon);
    console.log("favicon: ", favicon);
  }
  document.title = options.title;

  if (options.header) {
    createHeader;
    app.append(createHeader(options));
  }

  if (options.main) {
    createMain;
    app.append(createMain(options));
  }

  if (options.footer) {
    createFooter;
    app.append(createFooter(options));
  }
};

movieConstructor(".app", {
  favicon: "aliens/logo.jpg",
  title: "Alien saga",
  background: "aliens/background.jpg",
  fontColor: "#fffff",
  backgroundColor: "#141218",
  subColor: "#9d2929",
  header: {
    logo: "witcher/logo.png",
    social: [
      {
        title: "Twitter",
        link: "https://twitter.com/AlienMoviesUK",
        image: "witcher/social/twitter.svg",
      },
      {
        title: "Istagram",
        link: "https://www.instagram.com/alienanthology/",
        image: "witcher/social/instagram.svg",
      },
      {
        title: "Facebook",
        link: "https://web.facebook.com/AlienMovieRu/?brand_redir=8432351604",
        image: "witcher/social/facebook.svg",
      },
    ],
    menu: [
      { title: "Описание", link: "description" },
      { title: "Трейлер", link: "https://youtu.be/y0PhE_eY9O0" },
      { title: "Отзывы", link: "#" },
    ],
  },
  main: {
    genre: "horror action sci-fi / 1979-2017",
    rating: "8",
    description:
      'Alien is a science-fiction horror/action media franchise centered on the film series which depicts warrant officer Ellen Ripley (Sigourney Weaver) and her battles with an extraterrestrial lifeform, commonly referred to as "the Alien" or Xenomorph',
    trailer: "https://youtu.be/y0PhE_eY9O0",
    slider: [
      {
        img: "aliens/alien1.png",
        title: "",
        subtitle: "Alien",
      },
      {
        img: "aliens/aliens1986.jpg",
        title: "",
        subtitle: "Aliens",
      },
      {
        img: "aliens/alien3.jpg",
        title: "",
        subtitle: "Alien 3",
      },
      {
        img: "aliens/alien-resurr.jpg",
        title: "Resurrection",
        subtitle: "Alien",
      },
      {
        img: "aliens/alienvs.jpg",
        title: "",
        subtitle: "Alien vs. Predator",
      },
      {
        img: "aliens/prometheus.jpg",
        title: "",
        subtitle: "Prometheus",
      },
      {
        img: "aliens/covenant.jpg",
        title: "Covenant",
        subtitle: "Alien",
      },
    ],
  },
  footer: {
    copyright: `© 2020. All right reserved.`,
    menu: [
      { title: "Privacy Policy", link: "#" },
      { title: "Terms of Service", link: "#" },
      { title: "Legal", link: "#" },
    ],
  },
});
