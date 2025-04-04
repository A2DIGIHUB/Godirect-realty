
import { ArrowUpCircle, ArrowDownCircle, CircleDot } from "lucide-react";
import { marketTrends } from "@/utils/data";
import { cn } from "@/lib/utils";

const MarketTrends = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return (
          <ArrowUpCircle 
            className="h-6 w-6 text-green-500 dark:text-green-400" 
          />
        );
      case 'down':
        return (
          <ArrowDownCircle 
            className="h-6 w-6 text-red-500 dark:text-red-400" 
          />
        );
      default:
        return (
          <CircleDot 
            className="h-6 w-6 text-blue-500 dark:text-blue-400" 
          />
        );
    }
  };

  const getTrendClass = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-blue-600 dark:text-blue-400';
    }
  };

  return (
    <section className="section-padding bg-realty-50 dark:bg-realty-800/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-semibold mb-2 text-realty-900 dark:text-white">
            Market Trends
          </h2>
          <p className="text-realty-600 dark:text-realty-300 max-w-2xl mx-auto">
            Stay informed with the latest real estate market insights and trends to make better property decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketTrends.map((item) => (
            <div 
              key={item.id} 
              className="bg-white dark:bg-realty-800 rounded-xl shadow-md p-6 transition-transform hover:translate-y-[-5px] duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading text-lg text-realty-800 dark:text-white">
                  {item.title}
                </h3>
                {getTrendIcon(item.trend)}
              </div>
              
              <div className="mb-2">
                <span className={cn("text-3xl font-bold", getTrendClass(item.trend))}>
                  {item.value}
                </span>
              </div>
              
              <p className="text-sm text-realty-600 dark:text-realty-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 p-5 bg-white dark:bg-realty-800 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-xl font-heading font-medium text-realty-900 dark:text-white">
                Want expert market analysis?
              </h3>
              <p className="text-realty-600 dark:text-realty-400">
                Get a personalized report from our real estate experts.
              </p>
            </div>
            <button className="px-6 py-3 bg-realty-800 dark:bg-realty-gold text-white dark:text-realty-900 rounded-lg hover:bg-realty-700 dark:hover:bg-realty-gold/90 transition-colors font-medium">
              Request Market Analysis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketTrends;
