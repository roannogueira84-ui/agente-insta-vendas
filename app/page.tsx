import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main style={{minHeight:"100vh", display:"flex", flexDirection:"column", gap:16, alignItems:"center", justifyContent:"center"}}>
      <h1 style={{fontSize:24, fontWeight:700}}>Agente Insta Vendas 🚀</h1>
      <p>Clique em Login para acessar o painel.</p>

      {session ? (
        <Link href="/dashboard" style={{padding:"10px 16px", border:"1px solid #ddd", borderRadius:8}}>
          Ir para o painel
        </Link>
      ) : (
        // rota padrão do NextAuth
        <a href="/api/auth/signin" style={{padding:"10px 16px", border:"1px solid #ddd", borderRadius:8}}>
          Login
        </a>
      )}
    </main>
  );
}
