import { Card, CardContent } from '../components/Card';
import { DollarSign, FileText, Users, TrendingUp } from 'lucide-react';

export default function Billing() {
  const stats = [
    { title: 'Total Revenue', value: '₱0.00', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'Pending Bills', value: '0', icon: FileText, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { title: 'Paid Today', value: '₱0.00', icon: TrendingUp, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'Total Patients', value: '0', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Billing Management</h1>
        <p className="text-gray-600 mt-2">Manage patient billing and payments</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Billing Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#A0D2EB]" />
              Recent Transactions
            </h2>
            <p className="text-gray-600">No transactions yet.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#A0D2EB]" />
              Pending Payments
            </h2>
            <p className="text-gray-600">No pending payments.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
