import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Wallet,
  LineChart,
  Target,
  Settings,
  LogOut,
  CreditCard,
  Plus,
  Eye,
  EyeOff,
  Upload,
  Bell,
  Menu,
  X as XIcon,
  Sun,
  Moon
} from 'lucide-react';
import { SpendingAnalysis } from './components/SpendingAnalysis';
import { GoalsTracker } from './components/GoalsTracker';
import { SmartAlerts } from './components/SmartAlerts';
import { PDFUploader } from './components/PDFUploader';
import type { Card, Transaction, Goal, SpendingAlert } from './types';

const INITIAL_CARDS: Card[] = [
  {
    id: '1',
    number: '4532123456781234',
    holder: 'Thalles Henrique',
    expiry: '12/25',
    limit: 18250,
    balance: 3250,
    bank: 'Nubank',
    color: 'from-purple-500 to-purple-700',
    dueDate: 10,
    closingDate: 3
  },
  {
    id: '2',
    number: '5412345678901234',
    holder: 'Carol Martins',
    expiry: '03/26',
    limit: 12000,
    balance: 1800,
    bank: 'Itaú',
    color: 'from-orange-500 to-orange-700',
    dueDate: 15,
    closingDate: 8
  }
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    cardId: '1',
    merchant: 'Amazon',
    amount: 299.9,
    date: 'Today',
    category: 'Shopping',
    installments: { current: 1, total: 3, amount: 99.97 }
  },
  { id: '2', cardId: '1', merchant: 'Uber', amount: 32.5, date: 'Yesterday', category: 'Transport' },
  { id: '3', cardId: '1', merchant: 'Restaurant', amount: 158.0, date: '2 days ago', category: 'Food' },
  { id: '4', cardId: '2', merchant: 'Netflix', amount: 39.9, date: 'Today', category: 'Entertainment' },
  { id: '5', cardId: '2', merchant: 'Supermarket', amount: 253.45, date: 'Yesterday', category: 'Groceries' }
];

const INITIAL_GOALS: Goal[] = [
  {
    id: '1',
    category: 'Economia Mensal',
    amount: 2000,
    currentAmount: 1850,
    deadline: 'Março 2024',
    color: 'indigo'
  },
  {
    id: '2',
    category: 'Limite de Alimentação',
    amount: 1000,
    currentAmount: 450,
    deadline: 'Março 2024',
    color: 'green'
  }
];

const INITIAL_ALERTS: SpendingAlert[] = [
  {
    id: '1',
    type: 'limit',
    message: 'Você atingiu 80% do limite do seu cartão Nubank',
    date: 'Agora',
    read: false
  },
  {
    id: '2',
    type: 'category',
    message: 'Gastos com alimentação acima da média este mês',
    date: '2 horas atrás',
    read: false
  },
  {
    id: '3',
    type: 'goal',
    message: 'Parabéns! Você está próximo de atingir sua meta de economia',
    date: 'Ontem',
    read: true
  }
];

function CreditCardSection() {
  const [showCardNumber, setShowCardNumber] = useState<Record<string, boolean>>({});
  const [selectedCard, setSelectedCard] = useState<string>(INITIAL_CARDS[0].id);
  const [showPDFUploader, setShowPDFUploader] = useState(false);

  const selectedCardData = INITIAL_CARDS.find(card => card.id === selectedCard);
  const cardTransactions = INITIAL_TRANSACTIONS.filter(t => t.cardId === selectedCard);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Cartões de Crédito</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPDFUploader(true)}
            className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            <Upload className="w-4 h-4" />
            <span className="text-sm font-medium">Upload Fatura</span>
          </button>
          <button className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Adicionar Cartão</span>
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {INITIAL_CARDS.map(card => (
          <button
            key={card.id}
            onClick={() => setSelectedCard(card.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-colors ${
              selectedCard === card.id
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-600'
            }`}
          >
            {card.bank}
          </button>
        ))}
      </div>

      {selectedCardData && (
        <>
          <div className={`relative h-48 bg-gradient-to-r ${selectedCardData.color} rounded-xl p-6 text-white mb-6`}>
            <div className="flex justify-between items-start mb-8">
              <CreditCard className="w-10 h-10" />
              <div className="text-right">
                <p className="text-sm opacity-80">Limite Disponível</p>
                <p className="text-xl font-bold">{formatCurrency(selectedCardData.limit - selectedCardData.balance)}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-medium">
                  {showCardNumber[selectedCardData.id]
                    ? selectedCardData.number.replace(/(\d{4})/g, '$1 ').trim()
                    : '•••• '.repeat(3) + selectedCardData.number.slice(-4)}
                </p>
                <button 
                  onClick={() => setShowCardNumber(prev => ({
                    ...prev,
                    [selectedCardData.id]: !prev[selectedCardData.id]
                  }))}
                  className="text-white/80 hover:text-white"
                >
                  {showCardNumber[selectedCardData.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="opacity-80">Titular</p>
                  <p className="font-medium">{selectedCardData.holder}</p>
                </div>
                <div className="text-right">
                  <p className="opacity-80">Validade</p>
                  <p className="font-medium">{selectedCardData.expiry}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-800 dark:text-white">Resumo do Cartão</h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">Março 2024</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Fatura Atual</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">{formatCurrency(selectedCardData.balance)}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Vencimento: dia {selectedCardData.dueDate}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Limite Total</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">{formatCurrency(selectedCardData.limit)}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Fechamento: dia {selectedCardData.closingDate}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Transações Recentes</h4>
              <div className="space-y-3">
                {cardTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{transaction.merchant}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.category}</p>
                      {transaction.installments && (
                        <p className="text-xs text-indigo-600 dark:text-indigo-400">
                          {transaction.installments.current}/{transaction.installments.total}x de {formatCurrency(transaction.installments.amount)}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800 dark:text-white">{formatCurrency(transaction.amount)}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {showPDFUploader && <PDFUploader onClose={() => setShowPDFUploader(false)} />}
    </div>
  );
}

function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Bem-vindo ao Caralis Finance!</h2>
        <p className="text-gray-600 dark:text-gray-300">Aqui está seu resumo financeiro</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Saldo Total', amount: 25500, trend: '+2.5%' },
          { title: 'Receita Mensal', amount: 8250, trend: '+5.2%' },
          { title: 'Despesas Mensais', amount: 3800, trend: '-1.8%' },
        ].map(({ title, amount, trend }) => (
          <div key={title} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-gray-600 dark:text-gray-300 mb-2">{title}</h3>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(amount)}
              </span>
              <span className={`text-sm ${
                trend.startsWith('+') ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
              }`}>
                {trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SpendingAnalysis transactions={INITIAL_TRANSACTIONS} />
        <CreditCardSection />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GoalsTracker goals={INITIAL_GOALS} />
        <SmartAlerts alerts={INITIAL_ALERTS} />
      </div>
    </div>
  );
}

function Sidebar({ darkMode, setDarkMode, mobile, onClose }: {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  mobile?: boolean;
  onClose?: () => void;
}) {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: CreditCard, label: 'Cartões' },
    { icon: Wallet, label: 'Transações' },
    { icon: LineChart, label: 'Análises' },
    { icon: Target, label: 'Metas' },
    { icon: Bell, label: 'Notificações' },
    { icon: Settings, label: 'Configurações' },
  ];

  return (
    <div className={`w-64 ${mobile ? '' : 'fixed'} h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4`}>
      <div className="flex items-center gap-2 mb-8">
        <Wallet className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Caralis Finance</h1>
      </div>
      
      <nav className="space-y-1">
        {navItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
              active
                ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            onClick={mobile ? onClose : undefined}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>

      {!mobile && (
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 w-full p-3 rounded-lg mt-4"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="font-medium">{darkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
        </button>
      )}

      <button className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 w-full p-3 rounded-lg mt-auto absolute bottom-4">
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Sair</span>
      </button>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Wallet className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Caralis Finance</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {mobileMenuOpen ? (
              <XIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl">
            <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} mobile onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;