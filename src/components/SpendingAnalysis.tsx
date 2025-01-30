import React from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Transaction } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

interface Props {
  transactions: Transaction[];
}

export function SpendingAnalysis({ transactions }: Props) {
  // Prepare data for monthly spending trend
  const monthlyData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Gastos Mensais',
        data: [3200, 3800, 3500, 4200, 3800, 4500],
        borderColor: 'rgb(99, 102, 241)',
        tension: 0.4,
      },
    ],
  };

  // Prepare data for category distribution
  const categoryData = {
    labels: ['Alimentação', 'Transporte', 'Lazer', 'Compras', 'Outros'],
    datasets: [
      {
        data: [30, 20, 15, 25, 10],
        backgroundColor: [
          'rgb(99, 102, 241)',
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(107, 114, 128)',
        ],
      },
    ],
  };

  // Daily average spending data
  const dailyAverageData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Média Diária',
        data: [120, 150, 180, 90, 210, 250, 140],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Tendência de Gastos Mensais</h3>
          <Line
            data={monthlyData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Distribuição por Categoria</h3>
          <Doughnut
            data={categoryData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'right' as const,
                },
              },
            }}
          />
        </div>

        {/* Daily Average Spending */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Média de Gastos Diários</h3>
          <Bar
            data={dailyAverageData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>

        {/* Smart Suggestions */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Sugestões Inteligentes</h3>
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-indigo-700">
                Seus gastos com alimentação aumentaram 15% este mês. Considere preparar mais refeições em casa.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <p className="text-green-700">
                Você economizou 20% em transporte. Continue assim para atingir sua meta mensal!
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <p className="text-yellow-700">
                Atenção: Você está próximo do limite do seu cartão Nubank.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}