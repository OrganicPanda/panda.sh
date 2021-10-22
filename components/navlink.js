import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import classNames from "classnames";

const NavLink = ({ children, href, activeClassName = null, ...linkProps }) => {
  const router = useRouter();
  const isActive = router.asPath === href;
  const existingClassName = children.props.className || null;

  if (isActive) {
    return React.cloneElement(children, {
      href,
      className: classNames(existingClassName, activeClassName),
    });
  }

  return (
    <Link href={href} {...linkProps}>
      {children}
    </Link>
  );
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  activeClassName: PropTypes.string,
};

export default NavLink;
