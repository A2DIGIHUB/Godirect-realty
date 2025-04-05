
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

const mockSalesData = [
  { month: "Jan", sales: 4, value: 1250000 },
  { month: "Feb", sales: 6, value: 2100000 },
  { month: "Mar", sales: 8, value: 2850000 },
  { month: "Apr", sales: 10, value: 3500000 },
  { month: "May", sales: 7, value: 2450000 },
  { month: "Jun", sales: 9, value: 3200000 },
  { month: "Jul", sales: 11, value: 3900000 },
  { month: "Aug", sales: 8, value: 2800000 },
  { month: "Sep", sales: 12, value: 4250000 },
  { month: "Oct", sales: 10, value: 3600000 },
  { month: "Nov", sales: 9, value: 3100000 },
  { month: "Dec", sales: 14, value: 4950000 },
];

const mockDailyData = [
  { day: "Mon", sales: 3, value: 125000 },
  { day: "Tue", sales: 5, value: 175000 },
  { day: "Wed", sales: 7, value: 250000 },
  { day: "Thu", sales: 9, value: 320000 },
  { day: "Fri", sales: 12, value: 420000 },
  { day: "Sat", sales: 8, value: 280000 },
  { day: "Sun", sales: 4, value: 140000 },
];

const mockYearlyData = [
  { year: "2020", sales: 82, value: 28500000 },
  { year: "2021", sales: 96, value: 33600000 },
  { year: "2022", sales: 104, value: 36400000 },
  { year: "2023", sales: 115, value: 40250000 },
  { year: "2024", sales: 108, value: 37950000 },
];

const propertyTypeData = [
  { name: "House", value: 35, fill: "#8884d8" },
  { name: "Apartment", value: 25, fill: "#83a6ed" },
  { name: "Condo", value: 20, fill: "#8dd1e1" },
  { name: "Townhouse", value: 15, fill: "#82ca9d" },
  { name: "Land", value: 5, fill: "#ffc658" },
];

const locationData = [
  { name: "Urban", value: 45, fill: "#8884d8" },
  { name: "Suburban", value: 35, fill: "#83a6ed" },
  { name: "Rural", value: 20, fill: "#82ca9d" },
];

const priceRangeData = [
  { name: "Under $300k", value: 15, fill: "#8884d8" },
  { name: "$300k-$500k", value: 25, fill: "#83a6ed" },
  { name: "$500k-$750k", value: 30, fill: "#8dd1e1" },
  { name: "$750k-$1M", value: 20, fill: "#82ca9d" },
  { name: "Over $1M", value: 10, fill: "#ffc658" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const AdminSales = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales Analytics</CardTitle>
        <CardDescription>
          Track property sales statistics and trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
            <TabsTrigger value="property-type">Property Type</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="price-range">Price Range</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="mt-6 h-[400px]">
              <h3 className="text-lg font-medium mb-4">Monthly Sales</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={mockSalesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#82ca9d"
                    tickFormatter={(value) => `$${value / 1000000}M`}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "sales") return [`${value} properties`, "Sales"];
                      return [formatCurrency(value as number), "Value"];
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="sales" fill="#8884d8" name="Sales" />
                  <Bar yAxisId="right" dataKey="value" fill="#82ca9d" name="Value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">108</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from previous year
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$37.95M</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from previous year
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Sale Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$351,400</div>
                  <p className="text-xs text-muted-foreground">
                    +5% from previous year
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="daily" className="space-y-4">
            <div className="mt-6 h-[400px]">
              <h3 className="text-lg font-medium mb-4">Daily Sales (Current Week)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={mockDailyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#82ca9d"
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "sales") return [`${value} properties`, "Sales"];
                      return [formatCurrency(value as number), "Value"];
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    name="Sales"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="value"
                    stroke="#82ca9d"
                    name="Value"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">
                    +1 from yesterday
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$140K</div>
                  <p className="text-xs text-muted-foreground">
                    +15% from yesterday
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Week's Best Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Friday</div>
                  <p className="text-xs text-muted-foreground">
                    12 sales ($420K)
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly" className="space-y-4">
            <div className="mt-6 h-[400px]">
              <h3 className="text-lg font-medium mb-4">Monthly Sales (Current Year)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={mockSalesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#82ca9d"
                    tickFormatter={(value) => `$${value / 1000000}M`}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "sales") return [`${value} properties`, "Sales"];
                      return [formatCurrency(value as number), "Value"];
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="sales" fill="#8884d8" name="Sales" />
                  <Bar yAxisId="right" dataKey="value" fill="#82ca9d" name="Value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Best Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">December</div>
                  <p className="text-xs text-muted-foreground">
                    14 sales ($4.95M)
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Current Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8 sales</div>
                  <p className="text-xs text-muted-foreground">
                    $2.8M in revenue
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Month-over-Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12.5%</div>
                  <p className="text-xs text-muted-foreground">
                    Compared to last month
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="yearly" className="space-y-4">
            <div className="mt-6 h-[400px]">
              <h3 className="text-lg font-medium mb-4">Yearly Performance</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={mockYearlyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#82ca9d"
                    tickFormatter={(value) => `$${value / 1000000}M`}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "sales") return [`${value} properties`, "Sales"];
                      return [formatCurrency(value as number), "Value"];
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    name="Sales"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="value"
                    stroke="#82ca9d"
                    name="Value"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Current Year</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">108 sales</div>
                  <p className="text-xs text-muted-foreground">
                    $37.95M total revenue
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Year-over-Year</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">-6.1%</div>
                  <p className="text-xs text-muted-foreground">
                    Compared to 2023
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+7.1%</div>
                  <p className="text-xs text-muted-foreground">
                    Average annual growth
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="property-type">
            <div className="mt-6 h-[400px]">
              <h3 className="text-lg font-medium mb-4">Sales by Property Type</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {propertyTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="location">
            <div className="mt-6 h-[400px]">
              <h3 className="text-lg font-medium mb-4">Sales by Location</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="price-range">
            <div className="mt-6 h-[400px]">
              <h3 className="text-lg font-medium mb-4">Sales by Price Range</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priceRangeData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {priceRangeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminSales;
