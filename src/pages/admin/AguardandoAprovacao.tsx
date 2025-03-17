import React, { useState } from 'react';
import { AlertTriangle, Check, X, Filter, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from '@/hooks/use-toast';

// Mock data para feedbacks aguardando aprovação
const mockFeedbacks = [
  {
    id: '1',
    officina: 'Oficina Central',
    dataEnvio: '2024-03-28',
    placa: 'ABC1234',
    modelo: 'Toyota Corolla',
    descricao: 'Troca de óleo e filtros realizada.',
    fotos: ['foto1.jpg', 'foto2.jpg']
  },
  {
    id: '2',
    officina: 'Oficina Sul',
    dataEnvio: '2024-03-27',
    placa: 'DEF5678',
    modelo: 'Honda Civic',
    descricao: 'Reparo na suspensão concluído.',
    fotos: ['foto3.jpg']
  },
  // Adicione mais feedbacks mock conforme necessário
];

const AguardandoAprovacao = () => {
  const [filtroOficina, setFiltroOficina] = useState('todas');
  const [filtroPeriodo, setFiltroPeriodo] = useState('todos');
  const [feedbacks, setFeedbacks] = useState(mockFeedbacks);
  const [modalAberto, setModalAberto] = useState(false);
  const [feedbackSelecionado, setFeedbackSelecionado] = useState(null);
  const [feedbackEditado, setFeedbackEditado] = useState(null);

  const handleVerDetalhes = (feedback) => {
    setFeedbackSelecionado(feedback);
    setFeedbackEditado({ ...feedback });
    setModalAberto(true);
  };

  const handleSalvarEdicao = () => {
    setFeedbacks(feedbacks.map(f => 
      f.id === feedbackEditado.id ? feedbackEditado : f
    ));
    setModalAberto(false);
    toast({
      title: "Alterações salvas",
      description: "As alterações no feedback foram salvas com sucesso.",
    });
  };

  const handleAprovar = (id: string) => {
    // Aqui você implementaria a lógica real de aprovação
    setFeedbacks(feedbacks.filter(f => f.id !== id));
    toast({
      title: "Feedback aprovado",
      description: "O feedback foi aprovado e já está disponível para consulta.",
    });
  };

  const handleRejeitar = (id: string) => {
    // Aqui você implementaria a lógica real de rejeição
    setFeedbacks(feedbacks.filter(f => f.id !== id));
    toast({
      title: "Feedback rejeitado",
      description: "O feedback foi rejeitado e a oficina será notificada.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <AlertTriangle className="w-8 h-8 text-[#ff4d4d] mr-2" />
                Feedbacks Aguardando Aprovação
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Revise e aprove os feedbacks enviados pelas oficinas
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={filtroOficina} onValueChange={setFiltroOficina}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrar por oficina" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as oficinas</SelectItem>
                  <SelectItem value="central">Oficina Central</SelectItem>
                  <SelectItem value="sul">Oficina Sul</SelectItem>
                  {/* Adicione mais oficinas conforme necessário */}
                </SelectContent>
              </Select>

              <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrar por período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os períodos</SelectItem>
                  <SelectItem value="hoje">Hoje</SelectItem>
                  <SelectItem value="semana">Última semana</SelectItem>
                  <SelectItem value="mes">Último mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                <thead className="text-xs text-gray-600 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Oficina</th>
                    <th scope="col" className="px-6 py-3">Data de Envio</th>
                    <th scope="col" className="px-6 py-3">Placa</th>
                    <th scope="col" className="px-6 py-3">Modelo</th>
                    <th scope="col" className="px-6 py-3">Descrição</th>
                    <th scope="col" className="px-6 py-3">Fotos</th>
                    <th scope="col" className="px-6 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((feedback) => (
                    <tr key={feedback.id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-6 py-4">{feedback.officina}</td>
                      <td className="px-6 py-4">{new Date(feedback.dataEnvio).toLocaleDateString()}</td>
                      <td className="px-6 py-4 font-medium">{feedback.placa}</td>
                      <td className="px-6 py-4">{feedback.modelo}</td>
                      <td className="px-6 py-4">{feedback.descricao}</td>
                      <td className="px-6 py-4">{feedback.fotos.length} foto(s)</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleVerDetalhes(feedback)}
                            variant="outline"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Ver Detalhes
                          </Button>
                          <Button
                            onClick={() => handleAprovar(feedback.id)}
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Aprovar
                          </Button>
                          <Button
                            onClick={() => handleRejeitar(feedback.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Rejeitar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {feedbacks.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Não há feedbacks aguardando aprovação.
              </div>
            )}
          </div>

          {/* Modal de Detalhes */}
          <Dialog open={modalAberto} onOpenChange={setModalAberto}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Detalhes do Feedback</DialogTitle>
              </DialogHeader>

              {feedbackEditado && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="oficina" className="text-right">
                      Oficina
                    </Label>
                    <Input
                      id="oficina"
                      value={feedbackEditado.officina}
                      onChange={(e) => setFeedbackEditado({
                        ...feedbackEditado,
                        officina: e.target.value
                      })}
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="placa" className="text-right">
                      Placa
                    </Label>
                    <Input
                      id="placa"
                      value={feedbackEditado.placa}
                      onChange={(e) => setFeedbackEditado({
                        ...feedbackEditado,
                        placa: e.target.value
                      })}
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="modelo" className="text-right">
                      Modelo
                    </Label>
                    <Input
                      id="modelo"
                      value={feedbackEditado.modelo}
                      onChange={(e) => setFeedbackEditado({
                        ...feedbackEditado,
                        modelo: e.target.value
                      })}
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="descricao" className="text-right">
                      Descrição
                    </Label>
                    <Textarea
                      id="descricao"
                      value={feedbackEditado.descricao}
                      onChange={(e) => setFeedbackEditado({
                        ...feedbackEditado,
                        descricao: e.target.value
                      })}
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                      Fotos
                    </Label>
                    <div className="col-span-3">
                      {feedbackEditado.fotos.length} foto(s) anexada(s)
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setModalAberto(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSalvarEdicao}>
                  Salvar Alterações
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AguardandoAprovacao; 