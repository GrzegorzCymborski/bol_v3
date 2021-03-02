import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div className="c-app c-default-layout">
      <Sidebar />
      <div className="c-wrapper">
        <Header />
        <div className="c-body">
          <h1>🚧content🚧</h1>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
