import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer"; // 🌟 Importando o seu Footer de volta!
import { AuthProvider } from "../contexts/AuthContext";

// 🌟 Configurando a fonte oficial Plus Jakarta Sans do InPETU Maker
const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata = {
  title: "InPETU Maker",
  description: "Hub de Prototipagem e Inovação",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${plusJakartaSans.className} bg-[#FAFAFA] text-black min-h-screen flex flex-col antialiased`}>
        
        {/* O AuthProvider envelopa tudo de forma segura */}
        <AuthProvider>
          
          <Navbar />
          
          <main className="relative z-10 w-full flex-grow">
            {children}
          </main>
          
          {/* 🌟 O seu Footer reaparece aqui, perfeitamente alinhado no rodapé */}
          <Footer />
          
        </AuthProvider>

      </body>
    </html>
  );
}