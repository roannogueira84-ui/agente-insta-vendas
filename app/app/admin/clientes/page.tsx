
import { prisma } from '@/lib/db';

export default async function AdminClientesPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
  });
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Clientes</h1>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Criado</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ativo</th>
            <th>Função</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-b">
              <td className="py-2">{new Date(u.createdAt).toLocaleString()}</td>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>{u.isActive ? 'Sim' : 'Não'}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
