import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EcoResult {
  label: string;
  score: number;
  suggestion?: string;
  confidence?: number;
  isEcoFriendly?: boolean;
}

interface EcoResultsProps {
  result: EcoResult;
}

export const EcoResults: React.FC<EcoResultsProps> = ({ result }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-eco-success';
    if (score >= 60) return 'text-eco-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-eco-success/10 border-eco-success/20';
    if (score >= 60) return 'bg-eco-warning/10 border-eco-warning/20';
    return 'bg-destructive/10 border-destructive/20';
  };

  const getIcon = () => {
    if (result.score >= 80) return <CheckCircle className="h-5 w-5 text-eco-success" />;
    if (result.score >= 60) return <Leaf className="h-5 w-5 text-eco-warning" />;
    return <AlertCircle className="h-5 w-5 text-destructive" />;
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 animate-in fade-in-50 duration-500">
      <Card className="shadow-eco">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            {getIcon()}
            <span>Analysis Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Eco Score */}
          <div className="text-center">
            <div className={cn(
              "inline-flex items-center justify-center w-20 h-20 rounded-full border-2 mb-3",
              getScoreBg(result.score)
            )}>
              <span className={cn("text-2xl font-bold", getScoreColor(result.score))}>
                {result.score}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-1">{result.label}</h3>
            <Badge 
              variant={result.isEcoFriendly ? "default" : "destructive"}
              className={result.isEcoFriendly ? "bg-eco-success" : ""}
            >
              {result.isEcoFriendly ? "Eco-Friendly" : "Not Eco-Friendly"}
            </Badge>
          </div>

          {/* Score Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Eco Score</span>
              <span className={getScoreColor(result.score)}>{result.score}/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={cn(
                  "h-2 rounded-full transition-all duration-1000 ease-out",
                  result.score >= 80 ? "bg-eco-success" : 
                  result.score >= 60 ? "bg-eco-warning" : "bg-destructive"
                )}
                style={{ width: `${result.score}%` }}
              />
            </div>
          </div>

          {result.confidence && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Confidence</span>
                <span>{Math.round(result.confidence * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div 
                  className="bg-primary h-1 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Suggestions */}
          {result.suggestion && (
            <Card className="bg-gradient-eco-subtle border-eco-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-eco-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-eco-primary mb-1">Suggestion</h4>
                    <p className="text-sm text-foreground/80">{result.suggestion}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};