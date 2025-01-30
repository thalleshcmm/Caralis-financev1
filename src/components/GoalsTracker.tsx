import React from 'react';
import { Goal } from '../types';
import { Target, TrendingUp, AlertCircle } from 'lucide-react';

interface Props {
  goals: Goal[];
}

export function GoalsTracker({ goals }: Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Metas Financeiras</h3>
        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          + Nova Meta
        </button>
      </div>

      <div className="space-y-4">
        {goals.map(goal => {
          const progress = (goal.currentAmount / goal.amount) * 100;
          return (
            <div key={goal.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-medium text-gray-800">{goal.category}</h4>
                </div>
                <span className="text-sm text-gray-500">até {goal.deadline}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {formatCurrency(goal.currentAmount)} de {formatCurrency(goal.amount)}
                  </span>
                  <span className="font-medium text-indigo-600">{progress.toFixed(1)}%</span>
                </div>

                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {progress >= 90 && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Você está muito próximo de atingir sua meta!</span>
                  </div>
                )}

                {progress < 50 && goal.deadline === 'Março 2024' && (
                  <div className="flex items-center gap-2 text-yellow-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>Atenção: Meta pode não ser atingida no prazo</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}