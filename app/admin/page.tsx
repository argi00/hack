"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DataTable } from "@/components/ui/DataTable";
import { RoleBadge } from "@/components/ui/RoleBadge";
import { Modal } from "@/components/ui/Modal";
import { useAuth } from "@/lib/auth-context";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  projectCount: number;
}

interface UserDetail {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  projects: any[];
}

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "ADMIN") {
      router.push("/");
    }
  }, [authLoading, user, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin">
          <div className="h-12 w-12 border-4 border-gray-200 border-t-[#FF6600] rounded-full"></div>
        </div>
      </div>
    );
  }

  // Charger les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "10",
          ...(search && { search }),
          ...(roleFilter && { role: roleFilter }),
        });

        const res = await fetch(`/api/admin/users?${params}`);
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [search, roleFilter, page]);

  // Charger les détails d'un utilisateur
  const handleUserClick = async (user: User) => {
    try {
      const res = await fetch(`/api/admin/users/${user.id}`);
      const data = await res.json();
      setSelectedUser(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const columns = [
    {
      key: "firstName",
      label: "Nom",
      sortable: true,
      render: (value: string, row: User) => `${row.firstName} ${row.lastName}`,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "phone",
      label: "Téléphone",
      render: (value: string) => value || "-",
    },
    {
      key: "role",
      label: "Rôle",
      render: (value: string) => <RoleBadge role={value} />,
    },
    {
      key: "projectCount",
      label: "Projets",
      render: (value: number) => (
        <span className="font-semibold text-gray-900">{value}</span>
      ),
    },
    {
      key: "isActive",
      label: "Statut",
      render: (value: boolean) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            value
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value ? "Actif" : "Inactif"}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tableau de bord Admin
          </h1>
          <p className="text-gray-600">
            Gestion des utilisateurs et suivi des projets
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700 font-medium">Total utilisateurs</p>
            <p className="text-3xl font-bold text-blue-900 mt-2">
              {users.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 font-medium">Coaches</p>
            <p className="text-3xl font-bold text-green-900 mt-2">
              {users.filter((u) => u.role === "COACH").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-700 font-medium">Utilisateurs actifs</p>
            <p className="text-3xl font-bold text-orange-900 mt-2">
              {users.filter((u) => u.isActive).length}
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recherche
              </label>
              <input
                type="text"
                placeholder="Nom, email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrer par rôle
              </label>
              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              >
                <option value="">Tous les rôles</option>
                <option value="USER">Utilisateur</option>
                <option value="COACH">Coach</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
        >
          <DataTable
            columns={columns}
            data={users}
            onRowClick={handleUserClick}
            loading={loading}
          />
        </motion.div>
      </main>

      {/* User Detail Modal */}
      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="Détails de l'utilisateur"
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            {/* User Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Prénom</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedUser.firstName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nom</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedUser.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedUser.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Rôle</p>
                <div className="mt-1">
                  <RoleBadge role={selectedUser.role} />
                </div>
              </div>
            </div>

            {/* Projects */}
            {selectedUser.projects.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ses projets ({selectedUser.projects.length})
                </h3>
                <div className="space-y-3">
                  {selectedUser.projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {project.name}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {project.description}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            project.status === "incubation"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      {project.feedbacks.length > 0 && (
                        <p className="text-xs text-gray-500 mt-2">
                          {project.feedbacks.length} feedback(s) reçu(s)
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Aucun projet</p>
              </div>
            )}
          </div>
        )}
      </Modal>

    </div>
  );
}
