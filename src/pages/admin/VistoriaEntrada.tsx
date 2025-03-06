
import React, { useState } from 'react';
import { Camera, Upload, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from '@/hooks/use-toast';

const VistoriaEntrada = () => {
  const [formData, setFormData] = useState({
    plate: '',
    model: '',
    year: '',
    color: '',
    owner: '',
    cpf: '',
    description: '',
  });
  
  const [photos, setPhotos] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would upload the file to a storage service
      // Here we just create a fake URL for demo purposes
      const newPhotos = [...photos];
      for (let i = 0; i < e.target.files.length; i++) {
        newPhotos.push(URL.createObjectURL(e.target.files[i]));
      }
      setPhotos(newPhotos);
    }
  };
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would upload the file to a storage service
      // Here we just create a fake URL for demo purposes
      const newVideos = [...videos];
      for (let i = 0; i < e.target.files.length; i++) {
        newVideos.push(URL.createObjectURL(e.target.files[i]));
      }
      setVideos(newVideos);
    }
  };
  
  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };
  
  const removeVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (photos.length === 0) {
      toast({
        title: "Erro no formulário",
        description: "É necessário incluir pelo menos uma foto do veículo.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Vistoria registrada com sucesso!",
        description: "O veículo foi registrado para acompanhamento.",
        variant: "default"
      });
      
      // Reset form
      setFormData({
        plate: '',
        model: '',
        year: '',
        color: '',
        owner: '',
        cpf: '',
        description: '',
      });
      setPhotos([]);
      setVideos([]);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Vistoria de Entrada
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Registre a entrada do veículo na oficina com fotos e informações detalhadas.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="plate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Placa do Veículo*
                    </label>
                    <input
                      type="text"
                      id="plate"
                      name="plate"
                      value={formData.plate}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary sm:text-sm"
                      placeholder="ABC1234"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Modelo*
                    </label>
                    <input
                      type="text"
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary sm:text-sm"
                      placeholder="Toyota Corolla"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Ano*
                    </label>
                    <input
                      type="text"
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary sm:text-sm"
                      placeholder="2022"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cor*
                    </label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary sm:text-sm"
                      placeholder="Prata"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="owner" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Proprietário*
                    </label>
                    <input
                      type="text"
                      id="owner"
                      name="owner"
                      value={formData.owner}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary sm:text-sm"
                      placeholder="João da Silva"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      CPF do Proprietário*
                    </label>
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary sm:text-sm"
                      placeholder="123.456.789-00"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descrição do Estado do Veículo*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary sm:text-sm"
                    placeholder="Descreva o estado atual do veículo, danos existentes, e outras observações relevantes."
                    required
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fotos do Veículo* 
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(Obrigatório pelo menos uma foto)</span>
                    </label>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="gap-2"
                        onClick={() => document.getElementById('photo-upload')?.click()}
                      >
                        <Camera className="w-4 h-4" />
                        Adicionar Fotos
                      </Button>
                      
                      <input
                        type="file"
                        id="photo-upload"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Formatos aceitos: JPG, PNG, WEBP
                      </p>
                    </div>
                    
                    {photos.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                        {photos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                              <img 
                                src={photo} 
                                alt={`Foto ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => removePhoto(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Vídeos do Veículo 
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(Opcional)</span>
                    </label>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="gap-2"
                        onClick={() => document.getElementById('video-upload')?.click()}
                      >
                        <Upload className="w-4 h-4" />
                        Adicionar Vídeos
                      </Button>
                      
                      <input
                        type="file"
                        id="video-upload"
                        accept="video/*"
                        multiple
                        className="hidden"
                        onChange={handleVideoUpload}
                      />
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Formatos aceitos: MP4, MOV, WEBM
                      </p>
                    </div>
                    
                    {videos.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                        {videos.map((video, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-video rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                              <video 
                                src={video} 
                                controls 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => removeVideo(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    Cancelar
                  </Button>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    Salvar Vistoria
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VistoriaEntrada;