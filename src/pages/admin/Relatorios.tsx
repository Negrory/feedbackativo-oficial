import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileDown, Filter, Calendar, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Relatorios = () => {
  const [periodFilter, setPeriodFilter] = useState('month');
  const [workshopFilter, setWorkshopFilter] = useState('all');

  // Mock data for updates by workshop
  const updatesByWorkshopData = [
    { name: 'Oficina A', updates: 24 },
    { name: 'Oficina B', updates: 18 },
    { name: 'Oficina C', updates: 12 },
    { name: 'Oficina D', updates: 9 },
    { name: 'Oficina E', updates: 15 },
  ];

  // Mock data for delayed by workshop
  const delayedByWorkshopData = [
    { name: 'Oficina A', value: 5 },
    { name: 'Oficina B', value: 10 },
    { name: 'Oficina C', value: 15 },
    { name: 'Oficina D', value: 2 },
    { name: 'Oficina E', value: 8 },
  ];

  // Mock data for delayed vehicles
  const delayedVehiclesData = [
    { id: '1', plate: 'ABC1234', model: 'Toyota Corolla 2020', workshop: 'Oficina B', lastUpdate: '2023-09-15', daysDelayed: 30 },
    { id: '2', plate: 'DEF5678', model: 'Honda Civic 2021', workshop: 'Oficina C', lastUpdate: '2023-09-20', daysDelayed: 25 },
    { id: '3', plate: 'GHI9012', model: 'Chevrolet Onix 2019', workshop: 'Oficina A', lastUpdate: '2023-09-25', daysDelayed: 20 },
    { id: '4', plate: 'JKL3456', model: 'Volkswagen Golf 2022', workshop: 'Oficina C', lastUpdate: '2023-09-28', daysDelayed: 17 },
    { id: '5', plate: 'MNO7890', model: 'Ford Ecosport 2021', workshop: 'Oficina B', lastUpdate: '2023-10-01', daysDelayed: 14 },
  ];

  const handleExportReport = (reportType: string) => {
    // This would typically handle the export functionality
    console.log(`Exporting ${reportType} report`);
    // Add actual export logic here
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Relatórios e Auditoria</h1>
            
            <div className="flex space-x-4">
              <Select onValueChange={setPeriodFilter} value={periodFilter}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Última Semana</SelectItem>
                  <SelectItem value="month">Último Mês</SelectItem>
                  <SelectItem value="quarter">Último Trimestre</SelectItem>
                  <SelectItem value="year">Último Ano</SelectItem>
                </SelectContent>
              </Select>
              
              <Select onValueChange={setWorkshopFilter} value={workshopFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Oficina" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Oficinas</SelectItem>
                  <SelectItem value="workshop-a">Oficina A</SelectItem>
                  <SelectItem value="workshop-b">Oficina B</SelectItem>
                  <SelectItem value="workshop-c">Oficina C</SelectItem>
                  <SelectItem value="workshop-d">Oficina D</SelectItem>
                  <SelectItem value="workshop-e">Oficina E</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="dashboards">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
              <TabsTrigger value="delayed-vehicles">Veículos em Atraso</TabsTrigger>
              <TabsTrigger value="export">Exportar Relatórios</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboards">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Atualizações por Oficina</CardTitle>
                    <CardDescription>
                      Número total de atualizações postadas por cada oficina no período selecionado.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={updatesByWorkshopData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="updates" fill="#3b82f6" name="Atualizações" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Veículos em Atraso por Oficina</CardTitle>
                    <CardDescription>
                      Distribuição percentual de veículos em atraso por oficina.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={delayedByWorkshopData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {delayedByWorkshopData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="delayed-vehicles">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                    Veículos em Atraso
                  </CardTitle>
                  <CardDescription>
                    Lista de veículos com atualizações atrasadas (mais de 8 dias sem atualização).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Placa</TableHead>
                        <TableHead>Modelo</TableHead>
                        <TableHead>Oficina</TableHead>
                        <TableHead>Última Atualização</TableHead>
                        <TableHead>Dias em Atraso</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {delayedVehiclesData.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                          <TableCell className="font-medium">{vehicle.plate}</TableCell>
                          <TableCell>{vehicle.model}</TableCell>
                          <TableCell>{vehicle.workshop}</TableCell>
                          <TableCell>{vehicle.lastUpdate}</TableCell>
                          <TableCell>
                            <Badge variant="destructive">{vehicle.daysDelayed} dias</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Solicitar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="export">
              <Card>
                <CardHeader>
                  <CardTitle>Exportar Relatórios</CardTitle>
                  <CardDescription>
                    Exporte relatórios detalhados para análise posterior ou compartilhamento.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Relatório de Desempenho das Oficinas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          Relatório detalhado sobre o desempenho de cada oficina, incluindo número de atualizações,
                          tempo médio de reparo e taxa de atraso.
                        </p>
                        <Button onClick={() => handleExportReport('workshop-performance')} className="w-full">
                          <FileDown className="mr-2 h-4 w-4" />
                          Exportar CSV
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Relatório de Veículos em Atraso</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          Lista completa de veículos em atraso, com detalhes sobre último contato,
                          histórico de comunicações e informações de contato do cliente.
                        </p>
                        <Button onClick={() => handleExportReport('delayed-vehicles')} className="w-full">
                          <FileDown className="mr-2 h-4 w-4" />
                          Exportar CSV
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Relatório de Tempo de Reparo</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          Análise do tempo médio de reparo por tipo de sinistro, oficina e modelo de veículo.
                          Inclui comparativos históricos.
                        </p>
                        <Button onClick={() => handleExportReport('repair-time')} className="w-full">
                          <FileDown className="mr-2 h-4 w-4" />
                          Exportar CSV
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Relatório de Satisfação do Cliente</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          Dados sobre a satisfação dos clientes com o processo de reparo, baseado em pesquisas
                          pós-atendimento.
                        </p>
                        <Button onClick={() => handleExportReport('customer-satisfaction')} className="w-full">
                          <FileDown className="mr-2 h-4 w-4" />
                          Exportar CSV
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Relatorios; 