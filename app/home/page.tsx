// This is the Home page
// - loaded from layout.tsx
import { Metadata } from "next";
import Footer from "../../components/footer/footer";
import Banner from "../../components/banner/banner";


interface PageProps { }

export const metadata: Metadata = {
  title: "E.C.H.O Solutions Inc",
};

export default function Page(props: PageProps): JSX.Element {
  
  return (
    <div>
      <div className="header-brand">
        {/* <Logo /> */}
          {/* <Topbar /> */}
      </div>
      <main className="main">
        <Banner />
        <Footer />
      </main>
    </div>
  );
}
