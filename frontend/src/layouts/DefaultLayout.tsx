import { Outlet } from 'react-router-dom';
import Navbar from '@/components/user/navbar/Navbar';
import Footer from '@/components/user/footer/Footer';

const DefaultLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
