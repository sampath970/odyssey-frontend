import '../styles/global.scss';
import './layout.scss';

// Logo is a Server Component
import Logo from '../components/logo'
import Navbar from '../components/nav-bar/nav-bar';
import OdesseyFonts from '../layout.config';
import { Providers } from './providers'
import Script from 'next/script';
import AppConfig from '../config/application.config';

// Layout is a Server Component by default
export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/assets/images/odyssey_favicon.png" sizes="any" />
        <Script>{`
 var clarityKey = "${AppConfig.clarity_key}";
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", clarityKey); // Use clarityKey here
`}</Script>
      </head>
      <body className={OdesseyFonts.className + " main"}>
        <main>
          {children}
        </main>
        <div id="modal-container"></div>
      </body>
    </html>
  )
}