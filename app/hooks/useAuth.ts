"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");

    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  return { usuario };
}
