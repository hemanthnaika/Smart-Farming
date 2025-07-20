import React from "react";

const Layout = ({ children }) => {
  return (
    <section className="px-2 md:px-4 lg:px-8 xl:px-16">{children}</section>
  );
};

export default Layout;
