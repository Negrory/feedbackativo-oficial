import React, { useState } from 'react';
import { Camera, FileCheck, AlertCircle, CheckCircle, Upload, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Finalizacao = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [vehicleStatus, setVehicleStatus] = useState<'active'|'pending'|'inactive'|''>('');
  const [termPhotoUploaded, setTermPhotoUploaded] = useState(false);
  const [finalPhotosUploaded, setFinalPhotosUploaded] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [termPhoto, setTermPhoto] = useState<File | null>(null);

  const mockVehicles = [
    { id: '1', plate: 'ABC1234', model: 'Toyota Corolla 2020', status: 'active' },
    { id: '2', plate: 'DEF5678', model: 'Honda Civic 2021', status: 'pending' },
    { id: '3', plate: 'GHI9012', model: 'Chevrolet Onix 2019', status: 'inactive' },
  ];

  const handleVehicleSelect = (value: string) => {
    setSelectedVehicle(value);
    const vehicle = mockVehicles.find(v => v.id === value);
    if (vehicle) {
      setVehicleStatus(vehicle.status as 'active'|'pending'|'inactive');
    }
  };

  const handleTermPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTermPhoto(e.target.files[0]);
      setTermPhotoUploaded(true);
      toast({
        title: "Termo carregado",
        description: "Foto do termo de entrega adicionada com sucesso.",
      });
    }
  };

  const handleFinalPhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedPhotos([...uploadedPhotos, ...filesArray]);
      setFinalPhotosUploaded(true);
      toast({
        title: "Fotos carregadas",
        description: `${filesArray.length} foto(s) do veículo finalizado adicionada(s) com sucesso.`,
      });
    }
  };

  const handleSubmitFinalization = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedVehicle || !termPhotoUploaded || !finalPhotosUploaded) {
      toast({
        variant: "destructive",
        title: "Erro ao finalizar processo",
        description: "Preencha todos os campos e adicione as fotos necessárias.",
      });
      return;
    }
    
    if (vehicleStatus !== 'active') {
      toast({
        variant: "destructive",
        title: "Veículo inadimplente",
        description: "Não é possível finalizar o processo para um veículo inadimplente.",
      });
      return;
    }
    
    // Here you would typically send the data to your backend
    toast({
      title: "Processo finalizado",
      description: "O veículo foi finalizado com sucesso no sistema.",
    });
    
    // Reset form
    setSelectedVehicle('');
    setVehicleStatus('');
    setTermPhotoUploaded(false);
    setFinalPhotosUploaded(false);
    setUploadedPhotos([]);
    setTermPhoto(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Finalização do Veículo</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Formalizar a Entrega do Veículo</CardTitle>
              <CardDescription>
                Complete o processo de finalização do veículo, registrando a entrega ao proprietário.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitFinalization}>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Selecione o Veículo</label>
                  <Select onValueChange={handleVehicleSelect} value={selectedVehicle}>
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
                
                {selectedVehicle && (
                  <>
                    <div className="rounded-lg p-4 bg-gray-50">
                      <h3 className="font-medium mb-2">Status do Pagamento</h3>
                      
                      {vehicleStatus === 'active' && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span>Ativo - Liberado para finalização</span>
                        </div>
                      )}
                      
                      {vehicleStatus === 'pending' && (
                        <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Pagamento Pendente</AlertTitle>
                          <AlertDescription>
                            O veículo possui pagamentos pendentes. A finalização não é permitida até a regularização.
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      {vehicleStatus === 'inactive' && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Inadimplente</AlertTitle>
                          <AlertDescription>
                            O veículo está inadimplente. A finalização está bloqueada até a regularização dos pagamentos.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    
                    <Separator />
                    
                    {vehicleStatus === 'active' && (
                      <>
                        <div>
                          <h3 className="font-medium mb-4">Checklist de Entrega</h3>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                1. Termo de Entrega Assinado
                              </label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <FileCheck className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-4">
                                  Adicione uma foto do termo de entrega assinado pelo cliente
                                </p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleTermPhotoUpload}
                                  className="hidden"
                                  id="term-upload"
                                />
                                <Button asChild variant="outline">
                                  <label htmlFor="term-upload" className="cursor-pointer">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Selecionar Foto do Termo
                                  </label>
                                </Button>
                                
                                {termPhoto && (
                                  <div className="mt-4">
                                    <Badge variant="outline" className="mb-2 bg-green-50 text-green-600 border-green-200">
                                      <CheckCircle className="mr-1 h-3 w-3" />
                                      Termo carregado
                                    </Badge>
                                    <img
                                      src={URL.createObjectURL(termPhoto)}
                                      alt="Termo de entrega"
                                      className="h-32 w-auto mx-auto object-cover rounded"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                2. Fotos do Veículo Finalizado
                              </label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <Car className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-4">
                                  Adicione fotos do veículo finalizado (mínimo 4 ângulos)
                                </p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={handleFinalPhotosUpload}
                                  className="hidden"
                                  id="final-photos-upload"
                                />
                                <Button asChild variant="outline">
                                  <label htmlFor="final-photos-upload" className="cursor-pointer">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Selecionar Fotos do Veículo
                                  </label>
                                </Button>
                                
                                {uploadedPhotos.length > 0 && (
                                  <div className="mt-4">
                                    <Badge variant="outline" className="mb-2 bg-green-50 text-green-600 border-green-200">
                                      <CheckCircle className="mr-1 h-3 w-3" />
                                      {uploadedPhotos.length} foto(s) carregada(s)
                                    </Badge>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                      {uploadedPhotos.map((file, index) => (
                                        <div key={index} className="relative">
                                          <Badge variant="secondary" className="absolute top-1 right-1">
                                            {index + 1}
                                          </Badge>
                                          <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Veículo finalizado ${index + 1}`}
                                            className="h-20 w-20 object-cover rounded"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={!selectedVehicle || vehicleStatus !== 'active' || !termPhotoUploaded || !finalPhotosUploaded}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Finalizar Processo
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Finalizacao; 