import PropTypes from "prop-types";
import NavBar from "@/components/navbar/index";
import Footer from "@/components/footer/index";

export default function Layout({ children }) {

  return (
    <>
      <NavBar />
      <main
        className="body"
      >
        {children}
      </main>
      <Footer />
    </>
  );
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
};