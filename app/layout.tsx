import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";
import { AuthProvider } from "../contexts/AuthContext";

// Configurando a fonte oficial Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata = {
  title: "InPETU Maker",
  description: "Prototipagem e Inovação",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={plusJakartaSans.variable}>
      <body className="font-sans bg-[#FAFAFA] text-black min-h-screen flex flex-col antialiased">
        
        {/* O AuthProvider envelopa toda a aplicação */}
        <AuthProvider>
          
          <Navbar />
          
          <main className="relative z-10 w-full flex-grow">
            {children}
          </main>
          
          <Footer />
          
        </AuthProvider>

      </body>
    </html>
  );
}