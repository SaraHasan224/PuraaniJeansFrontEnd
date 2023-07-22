import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Container, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import { HELPER } from "../../../../utils";
import { MENU_ITEM_ACTIONS } from "../../../../store/actions";

const NavBar = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation();

  const { mainMenuCategories } = useSelector((state) => state.metadata);

  const [navClose, setNavClose] = useState({ left: "0px" });
  const [mainmenu, setMainMenu] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setMainMenu({ mainmenu: mainMenuCategories });
    if (window.innerWidth < 750) {
      setNavClose({ right: "-410px" });
    }
    if (window.innerWidth < 990) {
      setNavClose({ right: "-300px" });
    }
  }, []);

  useEffect(() => {
    const currentUrl = location.pathname;
    mainMenuCategories.filter((items) => {
      if (items.path === currentUrl) setNavActive(items);
      if (!items.children) return false;
      items.children.filter((subItems) => {
        if (subItems.path === currentUrl) setNavActive(subItems);
        if (!subItems.children) return false;
        subItems.children.filter((subSubItems) => {
          if (subSubItems.path === currentUrl) setNavActive(subSubItems);
        });
      });
    });
    setMainMenu({ mainmenu: mainmenu });
  }, [mainmenu]);
  
  

  const openNav = () => {
    setNavClose({ left: "0px" });
  };

  const closeNav = () => {
    setNavClose({ right: "-410px" });
  };
  // eslint-disable-next-line

  const handleMegaSubmenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (event.target.parentNode?.nextElementSibling?.classList.contains("opensubmegamenu"))
      event.target.parentNode.nextElementSibling?.classList.remove("opensubmegamenu");
    else {
      document.querySelectorAll(".menu-content").forEach(function (value) {
        value.classList.remove("opensubmegamenu");
      });
      event.target.parentNode.nextElementSibling?.classList.add(
        "opensubmegamenu"
      );
    }
  };

  const setNavActive = (item) => {
    mainmenu.filter((menuItem) => {
      if (menuItem != item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = false;
          }
        });
      }
    });

    setMainMenu({ mainmenu: mainmenu });
  };

  // Click Toggle menu
  const toggletNavActive = (e, item) => {
    if (!item.active) {
      mainmenu.forEach((a) => {
        if (mainmenu.includes(item)) a.active = false;
        if (!a.children) return false;
        a.children.forEach((b) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
          if (!b.children) return false;
          b.children.forEach((c) => {
            if (b.children.includes(item)) {
              c.active = false;
            }
          });
        });
      });
    }
    item.active = !item.active;
    setMainMenu({ mainmenu: mainmenu });
    // setMainMenu({ mainmenu: mainmenu });
    navigationAction(e, menuItem)
  };

  const navigationAction = (event, action) => {
    event.preventDefault();
    dispatch(MENU_ITEM_ACTIONS.REQUEST_MENU_ITEM({
      action: action,
      path: "shop",
      router: {
        title: action.title,
        parent: action.parent_title,
        child: action.child_title,
        slug: action.path,
        brand: '',
        color: '',
        size: '',
        minPrice: '',
        maxPrice: '',
      }
    }));
    router.push({
      pathname: '/shop',
      query: {
        title: action.title,
        parent: action.parent_title,
        child: action.child_title,
        slug: action.path,
        brand: '',
        color: '',
        size: '',
        minPrice: '',
        maxPrice: '',
      }
    },
      undefined, { shallow: false }
    )
    // window.location.reload()
    // router.replace(
    //   `shop?title=${action.title}&parent=${action.parent_title}&child=${action.child_title}&slug=${action.path}&brand=&color=&size=&minPrice=&maxPrice=`//,
    //   // undefined,
    //   // { shallow: true }
    //   )
  };

  const openMblNav = (event, menuItem) => {
    if (event.target.classList.contains("sub-arrow")) return;
    if (!event.target.nextElementSibling) {
      navigationAction(event, menuItem)
    } else {
      if (event.target.nextElementSibling.classList.contains("opensubmenu"))
        event.target.nextElementSibling.classList.remove("opensubmenu");
      else {
        document.querySelectorAll(".nav-submenu").forEach(function (value) {
          value.classList.remove("opensubmenu");
        });
        if (document.querySelector(".mega-menu-container")) {
          document.querySelector(".mega-menu-container").classList.remove("opensubmenu");
        }
        if (event.target.nextElementSibling) {
          event.target.nextElementSibling.classList.add("opensubmenu");
        }
      }
    }

  };

  return (
    <>
      <div>
        <div className="main-navbar">
          <div id="mainnav">
            <div className="toggle-nav" onClick={openNav.bind(this)}>
              <i className="fa fa-bars sidebar-bar"></i>
            </div>
            <ul className="nav-menu" style={navClose}>
              <li className="back-btn" onClick={closeNav.bind(this)}>
                <div className="mobile-back text-end">
                  <span>Back navbar</span>
                  <i className="fa fa-angle-right ps-2" aria-hidden="true"></i>
                </div>
              </li>
              {mainMenuCategories.map((menuItem, i) => {
                return (
                  <li
                    key={i}
                    className={` ${menuItem.megaMenu ? "mega-menu" : ""}`}
                  >
                    {
                      menuItem.type == 'link' ?
                        <a
                          href={"#"}
                          onClick={(e) => navigationAction(e, menuItem)}
                          className="nav-link"
                        >
                          {t(menuItem.title)}
                        </a>
                        :
                        <a href="#" className="nav-link" onClick={(e) => openMblNav(e, menuItem)}>
                          {t(menuItem.title)}
                          {menuItem.children ? <span className="sub-arrow"></span> : ''}
                        </a>
                    }
                    {HELPER.isNotEmpty(menuItem.children) && !menuItem.megaMenu ? (
                      <ul className="nav-submenu">
                        {HELPER.isNotEmpty(menuItem.children) && menuItem.children.map((childrenItem, index) => {
                          return (
                            <li
                              key={index}
                              className={`${childrenItem?.children ? "sub-menu " : ""
                                }`}
                            >
                              {childrenItem?.type === "sub" ? (
                                <a href={"#"} className="nav-link" onClick={(e) => toggletNavActive(e, childrenItem)}>
                                  {childrenItem.title}
                                  {childrenItem.tag === "new" ? (
                                    <span className="new-tag">new</span>
                                  ) : (
                                    ""
                                  )}
                                  <i className="fa fa-angle-right ps-2"></i>
                                </a>
                              ) : (
                                ""
                              )}
                              {childrenItem?.type === "link" ? (
                                <a href={"#"} onClick={(e) => navigationAction(e, childrenItem)}>
                                  {childrenItem.title}
                                  {childrenItem.tag === "new" ? (
                                    <span className="new-tag">new</span>
                                  ) : (
                                    ""
                                  )}
                                </a>
                              ) : (
                                ""
                              )}
                              {HELPER.isNotEmpty(childrenItem?.children) && childrenItem?.children ? (
                                <ul
                                  className={`nav-sub-childmenu ${childrenItem.active ? "menu-open " : "active"
                                    }`}
                                >
                                  {childrenItem?.children.map(
                                    (childrenSubItem, key) => (
                                      <li key={key}>
                                        {childrenSubItem.type === "link" ? (
                                          <a
                                            href={"#"}
                                            onClick={(e) => navigationAction(e, childrenSubItem)}
                                            className="sub-menu-title"
                                          >
                                            {childrenSubItem.title}
                                            {childrenSubItem.tag === "new" ? (
                                              <span className="new-tag">
                                                new
                                              </span>
                                            ) : (
                                              ""
                                            )}
                                          </a>
                                        ) : (
                                          ""
                                        )}
                                      </li>
                                    )
                                  )}
                                </ul>
                              ) : (
                                ""
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <>
                        {(menuItem.type !== 'link' && menuItem.children) &&
                          <div
                            className={`mega-menu-container${menuItem.megaMenu ? "" : " opensubmenu"
                              }`}
                          >
                            {menuItem.megaMenu === true ? (
                              <Container>
                                <Row>
                                  {HELPER.isNotEmpty(menuItem.children) && menuItem.children.map((megaMenuItem, i) => {
                                    return (
                                      <div
                                        className={`${menuItem.megaMenuType == "small"
                                          ? "col mega-box"
                                          : menuItem.megaMenuType == "medium"
                                            ? "col-lg-3"
                                            : menuItem.megaMenuType == "large"
                                              ? "col"
                                              : ""
                                          } `}
                                        key={i}
                                      >
                                        <div className="link-section">
                                          <div className="menu-title">
                                            <h5 onClick={(e) => handleMegaSubmenu(e)}>
                                              {megaMenuItem.title} dsfs
                                            </h5>
                                          </div>
                                          {HELPER.isNotEmpty(megaMenuItem.children) &&
                                            <div className="menu-content">
                                              <ul>
                                                {megaMenuItem.children.map(
                                                  (subMegaMenuItem, i) => {
                                                    return (
                                                      <li key={i}>
                                                        <a href={"#"} onClick={(e) => navigationAction(e, subMegaMenuItem)}>
                                                          {subMegaMenuItem.title}
                                                        </a>
                                                      </li>
                                                    );
                                                  }
                                                )}
                                              </ul>
                                            </div>
                                          }
                                        </div>
                                      </div>
                                    );
                                  })}
                                </Row>
                              </Container>
                            ) : (
                              ""
                            )}
                          </div>
                        }
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
