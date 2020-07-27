import React from "react"
import { PageProps } from "gatsby";

interface HeaderProps extends PageProps {
  headerText: string;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.headerText}</h1>
}

export default Header;