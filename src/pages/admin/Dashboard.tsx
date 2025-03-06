import React, { useState } from 'react';
import { 
  Car, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  BarChart3, 
  PieChart, 
  ArrowUpRight, 
  Plus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SearchBar } from '@/components/ui/SearchBar';

const mockVehicles = [
  { id: '1', plate: 'ABC1234', model: 'Toyota Corolla', workshop: 'Oficina Central', lastUpdate: '28/03/2023', status: 'inprogress' as const, daysDelayed: 0 },
  { id: '2', plate: 'DEF5678', model: 'Honda Civic', workshop: 'Oficina Sul', lastUpdate: '20/03/2023', status: 'delayed' as const, daysDelayed: 4 },
  { id: '3', plate: 'GHI9012', model: 'Volkswagen Golf', workshop: 'Oficina Norte', lastUpdate: '25/03/2023', status: 'inprogress' as const, daysDelayed: 0 },
  { id: '4', plate: 'JKL3456', model: 'Fiat Pulse', workshop: 'Oficina Central', lastUpdate: '18/03/2023', status: 'delayed' as const, daysDelayed: 6 },
  { id: '5', plate: 'MNO7890', model: 'Jeep Compass', workshop: 'Oficina Leste', lastUpdate: '26/03/2023', status: 'inprogress' as const, daysDelayed: 0 },
  { id: '6', plate: 'PQR1234', model: 'Chevrolet Onix', workshop: 'Oficina Oeste', lastUpdate: '27/03/2023', status: 'inprogress' as const, daysDelayed: 0 },
  { id: '7', plate: 'STU5678', model: 'Hyundai HB20', workshop: 'Oficina Sul', lastUpdate: '15/03/2023', status: 'completed' as const, daysDelayed: 0 },
  { id: '8', plate: 'VWX9012', model: 'Renault Kwid', workshop: 'Oficina Norte', lastUpdate: '10/03/2023', status: 'completed' as const, daysDelayed: 0 },
];

const Dashboard = () => {
  const delayedVehicles = mockVehicles.filter(v => v.status === 'delayed');
  const inProgressVehicles = mockVehicles.filter(v => v.status === 'inprogress');
  const completedVehicles = mockVehicles.filter(v => v.status === 'completed');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState(mockVehicles);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setFilteredVehicles(
        mockVehicles.filter(
          v => v.plate.toLowerCase().includes(query.toLowerCase()) || 
               v.model.toLowerCase().includes(query.toLowerCase()) ||
               v.workshop.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredVehicles(mockVehicles);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Dashboard Administrativo
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Gestão de veículos e acompanhamento de feedbacks
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button asChild variant="outline">
                <a href="/admin/relatorios">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Relatórios
                </a>
              </Button>
              
              <Button asChild>
                <a href="/admin/vistoria-entrada">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Vistoria
                </a>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="bg-red-100 dark:bg-red-900/30 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <AlertCircle className="w-6 h-6 text-status-delayed" />
                </div>
                
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Veículos com Atraso</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{delayedVehicles.length}</h3>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {delayedVehicles.length > 0 
                    ? `${Math.round((delayedVehicles.length / mockVehicles.length) * 100)}% do total`
                    : 'Nenhum veículo atrasado'}
                </p>
                
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <a href="/admin/relatorios">
                    Ver detalhes
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-status-inprogress" />
                </div>
                
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Em Andamento</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{inProgressVehicles.length}</h3>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {inProgressVehicles.length > 0 
                    ? `${Math.round((inProgressVehicles.length / mockVehicles.length) * 100)}% do total`
                    : 'Nenhum veículo em andamento'}
                </p>
                
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <a href="/admin/atualizacoes">
                    Atualizar
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-status-completed" />
                </div>
                
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Finalizados</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{completedVehicles.length}</h3>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {completedVehicles.length > 0 
                    ? `${Math.round((completedVehicles.length / mockVehicles.length) * 100)}% do total`
                    : 'Nenhum veículo finalizado'}
                </p>
                
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <a href="/admin/relatorios">
                    Ver detalhes
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Feedbacks por Oficina
                </h3>
              </div>
              
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Gráfico de barras seria exibido aqui
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Distribuição de Status
                </h3>
              </div>
              
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Gráfico de pizza seria exibido aqui
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 md:mb-0">
                Veículos em Sinistro
              </h3>
              
              <SearchBar 
                placeholder="Buscar por placa, modelo ou oficina" 
                onSearch={handleSearch}
                className="max-w-md"
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                <thead className="text-xs text-gray-600 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Placa</th>
                    <th scope="col" className="px-6 py-3">Modelo</th>
                    <th scope="col" className="px-6 py-3">Oficina</th>
                    <th scope="col" className="px-6 py-3">Última Atualização</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Dias em Atraso</th>
                    <th scope="col" className="px-6 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/30">
                      <td className="px-6 py-4 font-medium">{vehicle.plate}</td>
                      <td className="px-6 py-4">{vehicle.model}</td>
                      <td className="px-6 py-4">{vehicle.workshop}</td>
                      <td className="px-6 py-4">{vehicle.lastUpdate}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={vehicle.status} size="sm" />
                      </td>
                      <td className="px-6 py-4">
                        {vehicle.status === 'delayed' ? (
                          <span className="text-status-delayed font-medium">{vehicle.daysDelayed} dias</span>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Button asChild variant="ghost" size="sm">
                          <a href={`/admin/atualizacoes?plate=${vehicle.plate}`}>
                            Detalhes
                          </a>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredVehicles.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Nenhum veículo encontrado na busca.
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
