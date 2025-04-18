
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Bed, Bath, Move, MapPin, ArrowRight } from "lucide-react";
import { Property } from "@/utils/supabaseData";
import { formatPriceWithCommas } from "@/utils/data";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link 
      to={`/properties/${property.id}`} 
      className="group block property-card-shadow rounded-xl overflow-hidden bg-white dark:bg-realty-800 transition-all duration-300"
    >
      {/* Image container */}
      <div className="relative w-full h-64 overflow-hidden">
        <img 
          src={property.images[0] || "/placeholder.svg"} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div 
          onClick={toggleFavorite}
          className={cn(
            "absolute top-4 right-4 p-2 rounded-full transition-all",
            isFavorite 
              ? "bg-white/90 text-rose-500" 
              : "bg-black/20 text-white hover:bg-white/90 hover:text-rose-500"
          )}
        >
          <Heart className={cn("h-5 w-5", isFavorite && "fill-rose-500")} />
        </div>
        
        {/* Property status badge */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-white dark:bg-realty-900 text-realty-800 dark:text-white">
            {property.status}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="mb-2">
          <h3 className="text-xl font-heading font-semibold text-realty-900 dark:text-white truncate">
            {property.title}
          </h3>
          <div className="flex items-center text-realty-500 dark:text-realty-400 text-sm mt-1">
            <MapPin className="h-4 w-4 flex-shrink-0 mr-1" />
            <span className="truncate">
              {property.city}, {property.state}
            </span>
          </div>
        </div>
        
        <div className="text-2xl font-heading font-semibold text-realty-800 dark:text-realty-gold mb-4">
          {formatPriceWithCommas(property.price)}
        </div>
        
        {/* Property details */}
        <div className="flex space-x-4 mb-4 text-sm text-realty-600 dark:text-realty-300">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms || 0} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms || 0} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center">
            <Move className="h-4 w-4 mr-1" />
            <span>{property.square_feet || 0} sqft</span>
          </div>
        </div>
        
        {/* View details */}
        <div className="pt-4 border-t border-gray-200 dark:border-realty-700">
          <div className="group-hover:text-realty-gold flex items-center justify-end text-sm font-medium text-realty-600 dark:text-realty-300">
            View Details
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
