
import React, { useState } from 'react';
import { Car, Calendar, Wrench, AlertCircle, MapPin, CheckCircle2, Clock, Image, ArrowRight, ShieldCheck, Settings, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/ui/SearchBar';
import { Timeline, TimelineItem } from '@/components/ui/Timeline';
import { StatusBadge } from '@/components/ui/StatusBadge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for demonstration
const mockVehicleData = {
  plate: 'ABC1234',
  model: 'Toyota Corolla',
  year: '2020',
  color: 'Prata',
  owner: 'João Silva',
  startDate: new Date('2023-03-15'),
  status: 'inprogress' as const,
  daysInRepair: 12,
  currentStage: 'Aguardando Peças',
  workshop: 'Oficina Central',
};

const mockTimelineItems: TimelineItem[] = [
  {
    id: '1',
    date: new Date('2023-03-15'),
    title: 'Vistoria de Entrada',
    description: 'Veículo recebido na oficina para avaliação inicial. Identificados danos na lateral direita e para-choque traseiro.',
    status: 'completed',
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: '2',
    date: new Date('2023-03-20'),
    title: 'Desmontagem e Orçamento',
    description: 'Veículo desmontado para avaliação detalhada. Orçamento aprovado, aguardando peças.',
    status: 'completed',
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: '3',
    date: new Date('2023-03-28'),
    title: 'Aguardando Peças',
    description: 'Peças solicitadas ao fornecedor. Previsão de chegada em 5 dias úteis.',
    status: 'current',
    images: []
  },
  {
    id: '4',
    date: new Date('2023-04-05'),
    title: 'Reparos em Andamento',
    description: 'Peças recebidas, iniciando os reparos na lataria e pintura.',
    status: 'upcoming',
    images: []
  },
  {
    id: '5',
    date: new Date('2023-04-12'),
    title: 'Montagem Final',
    description: 'Finalização da montagem e ajustes finais.',
    status: 'upcoming',
    images: []
  },
  {
    id: '6',
    date: new Date('2023-04-15'),
    title: 'Entrega do Veículo',
    description: 'Veículo pronto para entrega ao proprietário.',
    status: 'upcoming',
    images: []
  }
];

const Consulta = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<null | typeof mockVehicleData>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("timeline");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    setError(null);
    
    // Simulate API search
    setTimeout(() => {
      if (query.toUpperCase() === 'ABC1234' || query === '12345678900') {
        setSearchResult(mockVehicleData);
      } else {
        setError('Veículo não encontrado. Verifique a placa ou CPF informado.');
        setSearchResult(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('https://revistacarro.com.br/wp-content/uploads/2022/05/BMW-3-Series-Sedan_3.jpg')] bg-cover bg-fixed before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-slate-900/20 before:to-red-900/17,5 before:backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-red-900/70 to-slate-900/80 backdrop-blur-[2px] z-0"></div>
      
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-cyan-100 drop-shadow-md">
                Consulta de Veículo
              </h1>
              <p className="text-red-100/90 max-w-2xl mx-auto text-lg">
                Acompanhe em tempo real o status do reparo do seu veículo
              </p>
            </div>
            
            <Card className="mb-10 border-0 shadow-xl glass-card overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-cyan-400/10 rounded-lg"></div>
              <CardContent className="pt-6 relative z-10">
                <SearchBar 
                  placeholder="Digite a placa do veículo ou CPF do proprietário" 
                  onSearch={handleSearch}
                  className="mb-4"
                />
                <div className="mt-4 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-red-400" />
                    <p className="text-sm text-red-100">Consulta por placa</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-red-400" />
                    <p className="text-sm text-red-100">Consulta por CPF</p>
                  </div>
                </div>
                <p className="text-xs text-red-200/70 text-center mt-3">
                  Use <span className="font-mono bg-red-900/40 px-1.5 py-0.5 rounded">ABC1234</span> como exemplo para ver os resultados da busca
                </p>
              </CardContent>
            </Card>
            
            {isLoading && (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-red-300/30 border-t-red-300 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-red-100">Buscando informações do veículo...</p>
              </div>
            )}
            
            {error && !isLoading && (
              <Card className="border-0 glass-card shadow-lg overflow-hidden animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-400/10 rounded-lg"></div>
                <CardContent className="pt-6 relative">
                  <div className="text-center py-4">
                    <AlertCircle className="h-14 w-14 text-red-300 mx-auto mb-3" />
                    <h3 className="text-xl font-medium text-red-200 mb-2">Veículo não encontrado</h3>
                    <p className="text-red-200/80">{error}</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {searchResult && !isLoading && (
              <div className="space-y-6 animate-fade-in">
                <Card className="border-0 glass-card shadow-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-cyan-400/10 rounded-lg"></div>
                  
                  <CardContent className="p-6 relative">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
                      <div className="flex items-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center mr-5 border-2 border-red-300/20 shadow-lg bg-gradient-to-br from-red-500/80 to-red-700/80">
                          <Car className="w-10 h-10 text-white" />
                        </div>
                        
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-red-50 mb-1">
                            {searchResult.model}
                          </h2>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="bg-red-500/30 border border-red-500/40 text-red-100 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              {searchResult.plate}
                            </span>
                            <span className="text-red-200 text-sm">
                              {searchResult.color}, {searchResult.year}
                            </span>
                          </div>
                          <p className="text-red-300 text-sm mt-1.5">
                            Proprietário: <span className="font-medium text-red-200">{searchResult.owner}</span>
                          </p>
                        </div>
                      </div>
                      
                      <StatusBadge status={searchResult.status} size="lg" className="shadow-md" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-red-700/40">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-5 h-5 text-red-300 mr-2" />
                          <h3 className="text-sm font-medium text-red-200">Data de Entrada</h3>
                        </div>
                        <p className="text-lg font-semibold text-red-50">
                          {searchResult.startDate.toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-red-700/40">
                        <div className="flex items-center mb-2">
                          <MapPin className="w-5 h-5 text-red-300 mr-2" />
                          <h3 className="text-sm font-medium text-red-200">Oficina</h3>
                        </div>
                        <p className="text-lg font-semibold text-red-50">
                          {searchResult.workshop}
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-red-700/40">
                        <div className="flex items-center mb-2">
                          <Settings className="w-5 h-5 text-red-300 mr-2" />
                          <h3 className="text-sm font-medium text-red-200">Situação Atual</h3>
                        </div>
                        <p className="text-lg font-semibold text-red-50">
                          {searchResult.currentStage}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-center py-4 px-5 bg-gradient-to-r from-amber-500/20 to-amber-600/10 rounded-xl border border-amber-500/30 shadow-inner">
                      <div className="flex items-center justify-center gap-2 text-amber-200">
                        <Clock className="w-5 h-5" />
                        <p>
                          Veículo em reparo há <span className="font-bold">{searchResult.daysInRepair} dias</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 glass-card shadow-lg overflow-hidden">
                  <CardHeader className="border-b border-red-800/30 pb-3 pt-5">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="w-full bg-red-900/60 p-1 border border-red-700/40">
                        <TabsTrigger value="timeline" className="flex-1 data-[state=active]:bg-red-700/80">
                          <Clock className="w-4 h-4 mr-2" />
                          Histórico
                        </TabsTrigger>
                        <TabsTrigger value="photos" className="flex-1 data-[state=active]:bg-red-700/80">
                          <Camera className="w-4 h-4 mr-2" />
                          Fotos
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <TabsContent value="timeline" className="mt-0">
                      <div className="bg-red-950/30 p-4 rounded-lg mb-4 border border-red-800/30">
                        <h3 className="text-lg font-medium text-red-100 flex items-center gap-2 mb-1">
                          <Wrench className="w-5 h-5 text-red-300" />
                          Progresso do Reparo
                        </h3>
                        <p className="text-red-200 text-sm">Acompanhe todas as etapas do reparo do seu veículo</p>
                      </div>
                      
                      <Timeline items={mockTimelineItems} />
                      
                      <div className="mt-6 flex justify-center">
                        <Button variant="outline" className="group border-red-600/40 text-red-200 hover:text-red-50 hover:bg-red-700/50">
                          Ver histórico completo
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="photos" className="mt-0">
                      <div className="bg-red-950/30 p-4 rounded-lg mb-4 border border-red-800/30">
                        <h3 className="text-lg font-medium text-red-100 flex items-center gap-2 mb-1">
                          <Camera className="w-5 h-5 text-red-300" />
                          Fotos do Processo
                        </h3>
                        <p className="text-red-200 text-sm">Visualize as imagens do veículo durante as etapas de reparo</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {mockTimelineItems
                          .filter(item => item.images && item.images.length > 0)
                          .flatMap(item => item.images)
                          .map((image, index) => (
                            <div key={index} className="aspect-square bg-red-900/40 rounded-lg overflow-hidden shadow-lg border border-red-700/30 group">
                              <img 
                                src={image} 
                                alt={`Foto ${index + 1}`} 
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <style>
        {`
        .glass-card {
          background: rgba(16, 24, 39, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        `}
      </style>
      
      <Footer />
    </div>
  );
};

export default Consulta;