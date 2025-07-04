
import React from 'react';
// Card components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-gray-200 ${className}`}>{children}</div>
);
const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 pt-6 pb-2 border-b border-gray-100 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = "" }) => (
  <h2 className={`font-bold text-gray-900 ${className}`}>{children}</h2>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 pb-6 pt-4 ${className}`}>{children}</div>
);

// Tabs components
const Tabs = ({ children, defaultValue, className = "" }) => {
  const [active, setActive] = React.useState(defaultValue);
  // Clone children and inject active tab state
  return (
    <div className={className}>
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, { active, setActive })
          : child
      )}
    </div>
  );
};
const TabsList = ({ children, className = "", active, setActive }) => (
  <div className={`flex ${className}`}>
    {React.Children.map(children, child =>
      React.isValidElement(child)
        ? React.cloneElement(child, { active, setActive })
        : child
    )}
  </div>
);
const TabsTrigger = ({ children, value, className = "", active, setActive }) => (
  <button
    type="button"
    className={`transition-all px-2 py-2 rounded-lg font-medium border-b-2 ${
      active === value
        ? "border-blue-600 text-blue-700 bg-blue-50 shadow"
        : "border-transparent text-gray-600 hover:bg-gray-100"
    } ${className}`}
    onClick={() => setActive(value)}
  >
    {children}
  </button>
);
const TabsContent = ({ children, value, active, className = "" }) =>
  active === value ? <div className={className}>{children}</div> : null;

// Badge component
const Badge = ({ children, className = "", variant }) => {
  let base =
    "inline-block px-3 py-1 rounded-full text-xs font-semibold transition-colors";
  let color =
    variant === "destructive"
      ? "bg-red-100 text-red-800"
      : "bg-green-100 text-green-800";
  return <span className={`${base} ${color} ${className}`}>{children}</span>;
};
import { GraduationCap, Home, AlertTriangle, FileText, Ban } from 'lucide-react';

const FeeDetailsSection = () => {
  const feeCategories = [
    {
      id: 'academic',
      label: 'Academic Fee',
      icon: GraduationCap,
      color: 'blue',
      fees: [
        { name: 'Tuition Fee', receivable: 150000, deposit: 150000, due: 0, status: 'paid' },
        { name: 'Lab Fee', receivable: 25000, deposit: 25000, due: 0, status: 'paid' },
        { name: 'Library Fee', receivable: 15000, deposit: 15000, due: 0, status: 'paid' },
        { name: 'Development Fee', receivable: 10000, deposit: 0, due: 10000, status: 'due' },
      ]
    },
    {
      id: 'hostel',
      label: 'Hostel Fee',
      icon: Home,
      color: 'green',
      fees: [
        { name: 'Room Rent', receivable: 40000, deposit: 40000, due: 0, status: 'paid' },
        { name: 'Mess Fee', receivable: 20000, deposit: 0, due: 20000, status: 'due' },
      ]
    },
    {
      id: 'late',
      label: 'Late Fee',
      icon: AlertTriangle,
      color: 'orange',
      fees: [
        { name: 'Late Submission Fine', receivable: 5000, deposit: 0, due: 5000, status: 'due' },
      ]
    },
    {
      id: 'backpaper',
      label: 'Back Paper',
      icon: FileText,
      color: 'purple',
      fees: [
        { name: 'Re-examination Fee', receivable: 8000, deposit: 0, due: 8000, status: 'due' },
      ]
    },
    {
      id: 'penalty',
      label: 'Penalty/Exemption',
      icon: Ban,
      color: 'red',
      fees: [
        { name: 'Disciplinary Fine', receivable: 7000, deposit: 0, due: 7000, status: 'due' },
        { name: 'Equipment Damage', receivable: 2400, deposit: 2400, due: 0, status: 'paid' },
      ]
    },
  ];

  const getStatusBadge = (status) => {
    if (status === 'paid') {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>;
    }
    return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">Due</Badge>;
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      orange: 'text-orange-600 bg-orange-100',
      purple: 'text-purple-600 bg-purple-100',
      red: 'text-red-600 bg-red-100',
    };
    return colorMap[color] || 'text-gray-600 bg-gray-100';
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Fee Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            {feeCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-1 text-xs sm:text-sm"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {feeCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-2 rounded-lg ${getColorClasses(category.color)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.label}</h3>
                </div>

                <div className="space-y-3">
                  {category.fees.map((fee, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-gray-900">{fee.name}</h4>
                        {getStatusBadge(fee.status)}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Receivable</p>
                          <p className="font-semibold">₹{fee.receivable.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Deposit</p>
                          <p className="font-semibold text-green-600">₹{fee.deposit.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Due</p>
                          <p className={`font-semibold ${fee.due > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ₹{fee.due.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-blue-600 font-medium mb-1">Total Receivable</p>
                      <p className="font-bold text-lg">
                        ₹{category.fees.reduce((sum, fee) => sum + fee.receivable, 0).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-600 font-medium mb-1">Total Deposit</p>
                      <p className="font-bold text-lg text-green-600">
                        ₹{category.fees.reduce((sum, fee) => sum + fee.deposit, 0).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-600 font-medium mb-1">Total Due</p>
                      <p className="font-bold text-lg text-red-600">
                        ₹{category.fees.reduce((sum, fee) => sum + fee.due, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FeeDetailsSection;
