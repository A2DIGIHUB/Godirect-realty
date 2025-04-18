
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LayoutGrid, LayoutList, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyFilters from "@/components/properties/PropertyFilters";
import { properties } from "@/utils/data";
import { Helmet } from "react-helmet-async";

const PropertyListings = () => {
  const location = useLocation();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [initialFilters, setInitialFilters] = useState({});

  // Parse URL query params on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const locationFilter = params.get("location");
    const typeFilter = params.get("type");
    const priceFilter = params.get("price");
    
    const initialFilters: any = {};
    if (locationFilter) initialFilters.searchTerm = locationFilter;
    if (typeFilter) initialFilters.propertyTypes = [typeFilter];
    if (priceFilter) {
      // Handle price range logic based on your priceFilter format
    }
    
    setInitialFilters(initialFilters);
    
    // Apply initial filters if present
    if (Object.keys(initialFilters).length > 0) {
      handleApplyFilters(initialFilters);
    }
  }, [location.search]);

  const handleApplyFilters = (filters: any) => {
    // Apply all filters to the properties
    let results = [...properties];
    
    // Filter by search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      results = results.filter(
        (property) =>
          property.address.city.toLowerCase().includes(term) ||
          property.address.state.toLowerCase().includes(term) ||
          property.address.zipCode.toLowerCase().includes(term) ||
          property.title.toLowerCase().includes(term)
      );
    }
    
    // Filter by property type
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      results = results.filter((property) =>
        filters.propertyTypes.includes(property.propertyType)
      );
    }
    
    // Filter by bedrooms
    if (filters.bedrooms !== null) {
      results = results.filter(
        (property) => property.bedrooms >= filters.bedrooms
      );
    }
    
    // Filter by bathrooms
    if (filters.bathrooms !== null) {
      results = results.filter(
        (property) => property.bathrooms >= filters.bathrooms
      );
    }
    
    // Filter by price range
    if (filters.priceRange) {
      results = results.filter(
        (property) =>
          property.price >= filters.priceRange[0] &&
          property.price <= filters.priceRange[1]
      );
    }
    
    // Filter by amenities
    if (filters.amenities && filters.amenities.length > 0) {
      results = results.filter((property) =>
        filters.amenities.some((amenity: string) =>
          property.amenities.includes(amenity)
        )
      );
    }
    
    setFilteredProperties(results);
  };

  // Sort properties
  const sortProperties = (properties: any[]) => {
    switch (sortBy) {
      case "price_asc":
        return [...properties].sort((a, b) => a.price - b.price);
      case "price_desc":
        return [...properties].sort((a, b) => b.price - a.price);
      case "newest":
        return [...properties].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return properties;
    }
  };

  const sortedProperties = sortProperties(filteredProperties);

  return (
    <>
      <Helmet>
        <title>Browse Properties | HomePulse Realty</title>
        <meta name="description" content="Browse our extensive collection of properties for sale. Find houses, apartments, condos, and more." />
      </Helmet>
      
      <div className="bg-realty-50 dark:bg-realty-800/30 py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold text-realty-900 dark:text-white mb-2">
            Browse Properties
          </h1>
          <p className="text-realty-600 dark:text-realty-400 mb-8">
            Find your next home from our carefully curated property listings.
          </p>
          
          <PropertyFilters 
            onApplyFilters={handleApplyFilters} 
          />
          
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <p className="text-realty-600 dark:text-realty-400 mb-4 sm:mb-0">
              Showing <span className="font-medium text-realty-900 dark:text-white">{sortedProperties.length}</span> properties
            </p>
            
            <div className="flex space-x-3">
              <div className="flex items-center">
                <ArrowUpDown className="mr-2 h-4 w-4 text-realty-500" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex rounded-md overflow-hidden">
                <Button
                  variant={view === "grid" ? "default" : "outline"}
                  className={`px-3 ${view === "grid" ? "bg-realty-800 text-white" : ""}`}
                  onClick={() => setView("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant={view === "list" ? "default" : "outline"}
                  className={`px-3 ${view === "list" ? "bg-realty-800 text-white" : ""}`}
                  onClick={() => setView("list")}
                >
                  <LayoutList className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
            </div>
          </div>
          
          {sortedProperties.length > 0 ? (
            <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col space-y-6"}>
              {sortedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-realty-800 rounded-lg shadow">
              <h3 className="text-xl font-heading font-semibold text-realty-900 dark:text-white mb-2">
                No properties found
              </h3>
              <p className="text-realty-600 dark:text-realty-400">
                Try adjusting your filters to find the perfect property.
              </p>
            </div>
          )}
          
          {/* Pagination placeholder */}
          {sortedProperties.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-1">
                {[1, 2, 3].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "outline"}
                    className={page === 1 ? "bg-realty-800" : ""}
                    size="sm"
                  >
                    {page}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyListings;
