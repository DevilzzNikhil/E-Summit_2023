import { createTheme, NextUIProvider } from "@nextui-org/react";
import React, { StrictMode } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Footer from "../components/Footer";
import Nav from "../components/Navbar";

export default function DashboardPage() {
  return (
    <StrictMode>
      <NextUIProvider theme={theme}>
        <div style={{ maxWidth: "1700px", margin: "auto" }}>
          <Nav />
          <Dashboard />
          <Footer />
        </div>
      </NextUIProvider>
    </StrictMode>
  );
}

const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: "$green200",
      primaryLightHover: "$green300",
      primaryLightActive: "$green400",
      primaryLightContrast: "$green600",
      primary: "#4ADE7B",
      primaryBorder: "$green500",
      primaryBorderHover: "$green600",
      primarySolidHover: "$green700",
      primarySolidContrast: "$white",
      primaryShadow: "$green500",

      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
      link: "#5E1DAD",

      // you can also create your own color
      myColor: "#ff4ecd",

      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});
