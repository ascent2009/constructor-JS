export const getElement = (tagName, classNames, attributes) => {
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

export const createHeader = ({ title, header: { logo, menu, social } }) => {
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

export const createMain = ({
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

export const createFooter = ({ title, footer: { copyright, menu } }) => {
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
