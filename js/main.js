const getElement = (tagName, classNames, attributes) => {
  const element = document.createElement(tagName);
  if (classNames) {
    element.classList.add(...classNames);
  }

  if (attributes) {
    for (let attribute in attributes) {
      element[attribute] = attributes[attribute];
    }
  }
  return element;
};

const createHeader = ({ title, header: { logo, menu, social } }) => {
  const header = getElement("header");
  const container = getElement("div", ["header-container"]);
  const wrapper = getElement("div", ["wrapper"]);

  if (logo) {
    const logotype = getElement("img", ["logo"], {
      src: logo,
      alt: "Логотип " + title,
    });
    wrapper.append(logotype);
  }

  if (menu) {
    const nav = getElement("nav", ["menu-list"]);
    const allMenu = menu.map((item) => {
      const menuLink = getElement("a", ["menu-link"]);
      menuLink.textContent = item.title;
      menuLink.href = item.link;
      console.log(menuLink);
      return menuLink;
    });
    nav.append(...allMenu);
    wrapper.append(nav);
  }

  if (social) {
    const socialWrapper = getElement("div", ["social"]);
    const allSocial = social.map((item) => {
      const socialLink = getElement("a", ["social-link"]);
      socialLink.append(
        getElement("img", [], {
          src: item.image,
          alt: item.title,
        })
      );
      socialLink.href = item.link;
      return socialLink;
    });
    socialWrapper.append(...allSocial);
    wrapper.append(socialWrapper);
  }

  if (menu) {
    const menuButton = getElement("button", ["menu-button"]);
    menuButton.addEventListener("click", function () {
      menuButton.classList.toggle("menu-button-active");
      wrapper.classList.toggle("menu-list");
    });
    container.append(menuButton);
  }

  header.append(container);
  container.append(wrapper);
  return header;
};

const createMain = ({
  title,
  main: { genre, rating, description, trailer, slider },
}) => {
  const main = getElement("main");
  const container = getElement("div", ["container"]);
  const mainContent = getElement("div", ["main-content"]);
  const content = getElement("div", ["content"]);

  main.append(container);
  container.append(mainContent);
  mainContent.append(content);

  if (genre) {
    const genreSpan = getElement("span", ["genre", "animated", "fadeInRight"], {
      textContent: genre,
    });
    container.append(genreSpan);
  }

  if (rating) {
    const ratingBlock = getElement("div", ["genre", "animated", "fadeInRight"]);
    const ratingStar = getElement("div", ["rating-stars"]);
    const ratingNumber = getElement("div", ["rating-number"], {
      textContent: `${rating}/10`,
    });

    for (let i = 0; i < 10; i++) {
      const star = getElement("img", ["star"], {
        alt: i ? "" : `Рейтинг ${rating} из 10`,
        src: !i || i < rating ? "img/star.svg" : "img/star-o.svg",
      });
      ratingStar.append(star);
    }
    ratingBlock.append(ratingStar, ratingNumber);
    content.append(ratingBlock);
  }
  content.append(
    getElement("h1", ["main-title", "animated", "fadeInRight"], {
      textContent: title,
    })
  );

  if (description) {
    content.append(
      getElement("p", ["main-description", "animated", "fadeInRight"], {
        textContent: description,
        name: "description",
      })
    );
  }

  if (trailer) {
    content.append(
      getElement("a", ["button", "animated", "fadeInRight", "youtube-modal"], {
        href: trailer,
        textContent: "Смотреть трейлер",
      })
    );
    const youtubeImgLink = getElement("a", ["play", "youtube-modal"], {
      href: trailer,
      ariaLabel: "Смотреть трейлер",
    });

    const iconPlay = getElement("img", ["play-img"], {
      src: "img/play.svg",
      alt: "",
      ariaHidden: true,
    });

    mainContent.append(youtubeImgLink);
    youtubeImgLink.append(iconPlay);
  }

  if (slider) {
    const sliderBlock = getElement("div", ["series"]);
    const swiperBlock = getElement("div", ["swiper-container"]);
    const swiperWrapper = getElement("div", ["swiper-wrapper"]);
    const arrow = getElement("button", ["arrow"]);

    const slides = slider.map((item) => {
      const swiperSlide = getElement("div", ["swiper-slide"]);
      const card = getElement("figure", ["card"]);
      const cardImage = getElement("img", ["card-img"], {
        src: item.img,
        alt: ((item.title || " ") + (item.subtitle || " ")).trim(),
      });

      card.append(cardImage);

      if (item.title || item.subtitle) {
        const cardDescription = getElement("figcaption", ["card-description"]);
        cardDescription.innerHTML = `
          ${
            item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ""
          }
          ${item.title ? `<p class="card-title">${item.title}</p>` : ""}
        `;
        card.append(cardDescription);
      }
      swiperSlide.append(card);
      return swiperSlide;
    });
    swiperWrapper.append(...slides);
    swiperBlock.append(swiperWrapper);
    sliderBlock.append(swiperBlock, arrow);
    container.append(sliderBlock);

    new Swiper(swiperBlock, {
      loop: true,
      navigation: {
        nextEl: arrow,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        541: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
      },
    });
  }

  return main;
};

const createFooter = ({ title, footer: { copyright, menu } }) => {
  const footer = getElement("footer", ["footer"]);
  const container = getElement("div", ["container"]);
  const footerContent = getElement("div", ["footer-content"]);
  const leftBlock = getElement("div", ["left"]);
  const rightBlock = getElement("div", ["right"]);

  if (copyright) {
    let str = copyright;
    const span = getElement("span", ["copyright"]);
    span.innerHTML = str.replace(".", `. ${title}.`);
    leftBlock.append(span);
  }

  if (menu) {
    const nav = getElement("nav", ["footer-menu"]);
    const allMenu = menu.map((item) => {
      const menuLink = getElement("a", ["footer-link"]);
      menuLink.textContent = item.title;
      menuLink.href = item.link;
      console.log(menuLink);
      return menuLink;
    });
    nav.append(...allMenu);
    rightBlock.append(nav);
  }

  footer.append(container);
  footer.append(container);
  container.append(footerContent);
  footerContent.append(leftBlock, rightBlock);

  return footer;
};

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
