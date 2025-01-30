import React from 'react';
import { SpendingAlert } from '../types';
import { Bell, AlertCircle, Target, CreditCard } from 'lucide-react';

interface Props {
  alerts: SpendingAlert[];
}

export function SmartAlerts({ alerts }: Props) {
  const getAlertIcon = (type: SpendingAlert['type']) => {
    switch (type) {
      case 'limit':
        return CreditCard;
      case 'category':
        return AlertCircle;
      case 'goal':
        return Target;
      default:
        return Bell;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Alertas Inteligentes</h3>
        <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-sm">
          {alerts.filter(a => !a.read).length} novos
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map(alert => {
          const Icon = getAlertIcon(alert.type);
          return (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${
                alert.read ? 'bg-white' : 'bg-indigo-50 border-indigo-100'
              }`}
            >
              <div className="flex gap-3">
                <Icon className={`w-5 h-5 ${
                  alert.read ? 'text-gray-400' : 'text-indigo-600'
                }`} />
                <div>
                  <p className={`${alert.read ? 'text-gray-600' : 'text-gray-800'}`}>
                    {alert.message}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{alert.date}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}