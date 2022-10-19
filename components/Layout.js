import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
            {children}
            </div>
            <Footer />
        </>
    );
};

export default Layout;