import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FilterButtonProps {
  activeFiltersCount: number;
  onClick: () => void;
  isOpen: boolean;
}

const FilterButton = ({ activeFiltersCount, onClick, isOpen }: FilterButtonProps) => {
  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <Button
      variant={hasActiveFilters ? "default" : "outline"}
      onClick={onClick}
      className={`transition-all duration-200 ${
        hasActiveFilters 
          ? "bg-primary text-primary-foreground hover:bg-primary/90" 
          : "hover:bg-primary/10 hover:text-primary"
      } ${isOpen ? "bg-primary/20" : ""}`}
    >
      <Filter className="h-4 w-4 mr-2" />
      Filters
      {hasActiveFilters && (
        <Badge 
          className={`ml-2 ${
            hasActiveFilters 
              ? "bg-primary-foreground text-primary" 
              : "bg-primary text-primary-foreground"
          }`}
          variant="secondary"
        >
          ({activeFiltersCount})
        </Badge>
      )}
    </Button>
  );
};

export default FilterButton;
