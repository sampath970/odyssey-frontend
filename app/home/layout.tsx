import "../../styles/global.scss";

// Logo is a Server Component
import Logo from "../../components/logo";
import { Providers } from "./../providers";

// Layout is a Server Component by default
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Providers>{children}</Providers>
    </main>
  );
}
