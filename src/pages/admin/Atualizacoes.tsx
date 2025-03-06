import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, CheckCircle, Clock, AlertTriangle, Camera, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Atualizacoes = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [pendingUpdates, setPendingUpdates] = useState([
    {
      id: '1',
      plate: 'ABC1234',
      date: '2023-10-15',
      status: 'Aguardando Peças',
      description: 'Aguardando chegada das peças para iniciar o reparo na porta dianteira esquerda.',
      hasPhotos: true
    },
    {
      id: '2',
      plate: 'DEF5678',
      date: '2023-10-14',
      status: 'Em Andamento',
      description: 'Reparo da lanterna traseira em andamento, previsão de conclusão em 3 dias.',
      hasPhotos: true
    }
  ]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedPhotos([...uploadedPhotos, ...filesArray]);
      toast({
        title: "Fotos carregadas",
        description: `${filesArray.length} foto(s) adicionada(s) com sucesso.`,
      });
    }
  };

  const handleSubmitUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedVehicle || !updateStatus || !updateDescription || uploadedPhotos.length === 0) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar atualização",
        description: "Preencha todos os campos e adicione pelo menos uma foto.",
      });
      return;
    }
    
    // Here you would typically send the data to your backend
    toast({
      title: "Atualização enviada",
      description: "Sua atualização foi enviada para aprovação.",
    });
    
    // Reset form
    setUpdateDescription('');
    setUploadedPhotos([]);
  };

  const mockVehicles = [
    { id: '1', plate: 'ABC1234', model: 'Toyota Corolla 2020' },
    { id: '2', plate: 'DEF5678', model: 'Honda Civic 2021' },
    { id: '3', plate: 'GHI9012', model: 'Chevrolet Onix 2019' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Atualizações Semanais</h1>
          
          <Tabs defaultValue="new-update" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="new-update">Nova Atualização</TabsTrigger>
              <TabsTrigger value="pending-approval">Aguardando Aprovação</TabsTrigger>
            </TabsList>
            
            <TabsContent value="new-update">
              <Card>
                <CardHeader>
                  <CardTitle>Registrar Nova Atualização</CardTitle>
                  <CardDescription>
                    Adicione informações sobre o progresso do reparo do veículo. A atualização será revisada antes de ser disponibilizada ao cliente.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmitUpdate}>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Selecione o Veículo</label>
                      <Select onValueChange={setSelectedVehicle} value={selectedVehicle}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um veículo" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockVehicles.map(vehicle => (
                            <SelectItem key={vehicle.id} value={vehicle.id}>
                              {vehicle.plate} - {vehicle.model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Status do Reparo</label>
                      <Select onValueChange={setUpdateStatus} value={updateStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="awaiting-parts">Aguardando Peças</SelectItem>
                          <SelectItem value="in-progress">Serviços em Andamento</SelectItem>
                          <SelectItem value="with-owner">Veículo em Posse do Proprietário</SelectItem>
                          <SelectItem value="completed">Finalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Descrição da Atualização</label>
                      <Textarea
                        placeholder="Descreva o andamento atual dos reparos..."
                        value={updateDescription}
                        onChange={(e) => setUpdateDescription(e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Fotos do Veículo (obrigatório)</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-4">
                          Clique para adicionar fotos do veículo ou arraste e solte arquivos aqui
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="photo-upload"
                        />
                        <Button asChild variant="outline">
                          <label htmlFor="photo-upload" className="cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" />
                            Selecionar Fotos
                          </label>
                        </Button>
                        
                        {uploadedPhotos.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {uploadedPhotos.map((file, index) => (
                              <div key={index} className="relative">
                                <Badge variant="secondary" className="absolute top-1 right-1">
                                  {index + 1}
                                </Badge>
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Uploaded ${index + 1}`}
                                  className="h-20 w-20 object-cover rounded"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Enviar para Aprovação
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="pending-approval">
              <Card>
                <CardHeader>
                  <CardTitle>Atualizações Aguardando Aprovação</CardTitle>
                  <CardDescription>
                    Visualize as atualizações que estão pendentes de aprovação pelo time administrativo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {pendingUpdates.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-gray-500">Não há atualizações pendentes de aprovação.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingUpdates.map(update => (
                        <div key={update.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{update.plate}</h3>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Pendente
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Status:</span> {update.status}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Data:</span> {update.date}
                          </p>
                          <p className="text-sm text-gray-600 mb-3">{update.description}</p>
                          <div className="flex justify-between items-center">
                            {update.hasPhotos && (
                              <Badge variant="secondary">
                                <Camera className="mr-1 h-3 w-3" />
                                Fotos Anexadas
                              </Badge>
                            )}
                            <Button variant="outline" size="sm">
                              Visualizar Detalhes
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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

export default Atualizacoes; 