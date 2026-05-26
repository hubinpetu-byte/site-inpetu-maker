"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase"; // Caminho corrigido para a pasta lib
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// 1. Criação do Contexto de Energia do Login
const AuthContext = createContext({
  user: null,
  perfil: null,
  loading: true,
});

// 2. O Provedor (A redoma que envolve o site e distribui os dados)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fica escutando o Firebase para saber se alguém logou ou deslogou
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
        try {
          // Puxa a ficha do banco de dados na hora para a Navbar saber o nome/foto
          const docRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(docRef);
          
          if (snap.exists()) {
            setPerfil(snap.data());
          }
        } catch (error) {
          console.error("Erro ao buscar perfil no AuthContext:", error);
        }
      } else {
        setUser(null);
        setPerfil(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, perfil, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. O Gancho (Hook) que a Navbar e as Páginas usam para ler as informações
export function useAuth() {
  return useContext(AuthContext);
}