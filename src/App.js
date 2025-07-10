import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  CreditCard, 
  Activity,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const FintechAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const dashboardStats = {
    totalUsers: 24563,
    totalRevenue: 1847293,
    activeTransactions: 1247,
    flaggedAccounts: 18
  };

  const recentTransactions = [
    { id: 'TX001', user: 'John Doe', amount: 1250.00, type: 'transfer', status: 'completed', time: '2 min ago' },
    { id: 'TX002', user: 'Sarah Smith', amount: 3400.00, type: 'deposit', status: 'pending', time: '5 min ago' },
    { id: 'TX003', user: 'Mike Johnson', amount: 890.50, type: 'withdrawal', status: 'completed', time: '12 min ago' },
    { id: 'TX004', user: 'Emma Wilson', amount: 2100.00, type: 'transfer', status: 'flagged', time: '18 min ago' },
    { id: 'TX005', user: 'David Brown', amount: 567.25, type: 'payment', status: 'completed', time: '25 min ago' }
  ];

  const flaggedAccounts = [
    { id: 'ACC001', name: 'Alex Thompson', reason: 'Unusual activity pattern', risk: 'high', amount: 45000 },
    { id: 'ACC002', name: 'Lisa Chen', reason: 'Multiple failed logins', risk: 'medium', amount: 12500 },
    { id: 'ACC003', name: 'Robert Davis', reason: 'Large transactions', risk: 'low', amount: 89000 }
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', balance: 12500.00, status: 'active', joined: '2024-01-15' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', balance: 8900.50, status: 'active', joined: '2024-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', balance: 15600.75, status: 'suspended', joined: '2024-01-08' },
    { id: 4, name: 'Emma Wilson', email: 'emma@example.com', balance: 22100.00, status: 'active', joined: '2024-03-12' },
    { id: 5, name: 'David Brown', email: 'david@example.com', balance: 5670.25, status: 'pending', joined: '2024-06-01' }
  ];

  const StatCard = ({ title, value, icon: Icon, trend, color = 'blue' }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
              {Math.abs(trend)}% from last month
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const TransactionRow = ({ transaction }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.id}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{transaction.user}</td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">${transaction.amount.toLocaleString()}</td>
      <td className="px-6 py-4 text-sm text-gray-600 capitalize">{transaction.type}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
          transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {transaction.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{transaction.time}</td>
      <td className="px-6 py-4">
        <button className="text-blue-600 hover:text-blue-800">
          <Eye className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );

  const UserRow = ({ user }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">${user.balance.toLocaleString()}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          user.status === 'active' ? 'bg-green-100 text-green-800' :
          user.status === 'suspended' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{user.joined}</td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800">
            <Eye className="w-4 h-4" />
          </button>
          <button className="text-red-600 hover:text-red-800">
            <Ban className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">FinTech Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm h-screen">
          <div className="p-6">
            <div className="space-y-2">
              {[
                { id: 'overview', label: 'Overview', icon: Activity },
                { id: 'users', label: 'Users', icon: Users },
                { id: 'transactions', label: 'Transactions', icon: CreditCard },
                { id: 'alerts', label: 'Security Alerts', icon: AlertTriangle },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatCard 
                    title="Total Users" 
                    value={dashboardStats.totalUsers.toLocaleString()} 
                    icon={Users}
                    trend={12.5}
                    color="blue"
                  />
                  <StatCard 
                    title="Total Revenue" 
                    value={`$${dashboardStats.totalRevenue.toLocaleString()}`} 
                    icon={DollarSign}
                    trend={8.2}
                    color="green"
                  />
                  <StatCard 
                    title="Active Transactions" 
                    value={dashboardStats.activeTransactions.toLocaleString()} 
                    icon={TrendingUp}
                    trend={-2.1}
                    color="purple"
                  />
                  <StatCard 
                    title="Flagged Accounts" 
                    value={dashboardStats.flaggedAccounts} 
                    icon={AlertTriangle}
                    trend={-15.3}
                    color="red"
                  />
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      {recentTransactions.slice(0, 5).map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{transaction.user}</p>
                            <p className="text-sm text-gray-600">{transaction.type} • {transaction.time}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">${transaction.amount.toLocaleString()}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Security Alerts</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      {flaggedAccounts.map((account) => (
                        <div key={account.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                          <div>
                            <p className="font-medium text-gray-900">{account.name}</p>
                            <p className="text-sm text-gray-600">{account.reason}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              account.risk === 'high' ? 'bg-red-100 text-red-800' :
                              account.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {account.risk} risk
                            </span>
                            <p className="text-sm text-gray-600 mt-1">${account.amount.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <div className="flex space-x-3">
                  <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <UserRow key={user.id} user={user} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Transaction Management</h2>
                <div className="flex space-x-3">
                  <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction) => (
                        <TransactionRow key={transaction.id} transaction={transaction} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Security Alerts</h2>
              
              <div className="grid gap-4">
                {flaggedAccounts.map((account) => (
                  <div key={account.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          account.risk === 'high' ? 'bg-red-100' :
                          account.risk === 'medium' ? 'bg-yellow-100' :
                          'bg-green-100'
                        }`}>
                          <AlertTriangle className={`w-5 h-5 ${
                            account.risk === 'high' ? 'text-red-600' :
                            account.risk === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{account.name}</h3>
                          <p className="text-sm text-gray-600">{account.reason}</p>
                          <p className="text-sm text-gray-500">Amount: ${account.amount.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center">
                          <XCircle className="w-4 h-4 mr-2" />
                          Block
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart visualization would go here</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart visualization would go here</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Volume</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart visualization would go here</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart visualization would go here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FintechAdminDashboard;
