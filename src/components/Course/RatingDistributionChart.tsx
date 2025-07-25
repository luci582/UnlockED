import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

interface RatingDistributionChartProps {
  ratings: RatingDistribution;
  totalReviews: number;
}

const RatingDistributionChart = ({ ratings, totalReviews }: RatingDistributionChartProps) => {
  const ratingEntries = Object.entries(ratings)
    .sort(([a], [b]) => Number(b) - Number(a)) // Sort by rating (5 to 1)
    .map(([rating, count]) => ({
      stars: Number(rating),
      count,
      percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0,
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Rating Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {ratingEntries.map(({ stars, count, percentage }) => (
          <div key={stars} className="flex items-center space-x-3">
            {/* Star rating label */}
            <div className="flex items-center space-x-1 w-16">
              <span className="text-sm font-medium">{stars}</span>
              <Star className="h-3 w-3 fill-primary text-primary" />
            </div>
            
            {/* Progress bar */}
            <div className="flex-1 relative">
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            
            {/* Count */}
            <div className="text-sm text-muted-foreground w-16 text-right">
              {count} review{count !== 1 ? 's' : ''}
            </div>
          </div>
        ))}
        
        <div className="pt-3 border-t border-border">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Total Reviews</span>
            <span className="font-medium">{totalReviews}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingDistributionChart;
