import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ImageUpload';
import { EcoResults } from '@/components/EcoResults';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Leaf, Sparkles, Camera } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import heroImage from '@/assets/eco-hero.jpg';

interface EcoResult {
  label: string;
  score: number;
  suggestion?: string;
  confidence?: number;
  isEcoFriendly?: boolean;
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EcoResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setResult(null);
    setError(null);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await axios.post("http://localhost:8000/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);

      toast({
        title: "Analysis complete!",
        description: `Your image scored ${response.data.score}/100 for eco-friendliness.`,
      });


      // Mock response for demonstration
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockResult: EcoResult = {
        label: selectedImage.name.toLowerCase().includes('plant') || selectedImage.name.toLowerCase().includes('leaf')
          ? "Eco-Friendly Item"
          : "Needs Improvement",
        score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        suggestion: "Consider using more sustainable materials and reducing packaging waste. Look for eco-certifications when shopping.",
        confidence: 0.85,
        isEcoFriendly: Math.random() > 0.3
      };

      setResult(mockResult);

      toast({
        title: "Analysis complete!",
        description: `Your image scored ${mockResult.score}/100 for eco-friendliness.`,
      });

    } catch (err) {
      console.error("Prediction failed:", err);
      setError(
        axios.isAxiosError(err)
          ? "Failed to connect to the analysis service. Please ensure the backend is running."
          : "An unexpected error occurred. Please try again."
      );

      toast({
        title: "Analysis failed",
        description: "Please try again or check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-eco-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-hero"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative bg-gradient-hero">
          <div className="container mx-auto px-4 py-24 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                <Leaf className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              EcoVision AI
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Analyze the environmental impact of products using advanced AI
            </p>
            <div className="flex items-center justify-center space-x-2 text-white/80">
              <Camera className="h-5 w-5" />
              <span>Upload • Analyze • Improve</span>
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          {/* How it works */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-eco-primary/20 hover:shadow-eco transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-gradient-eco rounded-full flex items-center justify-center mb-4">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">1. Upload Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Take a photo or upload an image of any product you want to analyze
                  </p>
                </CardContent>
              </Card>

              <Card className="border-eco-primary/20 hover:shadow-eco transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-gradient-eco rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">2. AI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our advanced AI analyzes the environmental impact and sustainability
                  </p>
                </CardContent>
              </Card>

              <Card className="border-eco-primary/20 hover:shadow-eco transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-gradient-eco rounded-full flex items-center justify-center mb-4">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">3. Get Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Receive detailed insights and suggestions for eco-friendly alternatives
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Upload Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Analyze Your Product</h2>
              <p className="text-muted-foreground">
                Upload an image to get started with your eco-analysis
              </p>
            </div>

            <ImageUpload
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              onRemoveImage={handleRemoveImage}
              isUploading={isLoading}
            />

            {selectedImage && !isLoading && !result && !error && (
              <div className="text-center">
                <Button
                  variant="eco"
                  size="lg"
                  onClick={handleSubmit}
                  className="min-w-48"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Check Eco-Friendliness
                </Button>
              </div>
            )}

            {/* Results Section */}
            {result && <EcoResults result={result} />}

            {/* Error Section */}
            {error && <ErrorMessage message={error} onRetry={handleRetry} />}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-6 w-6 mr-2" />
            <span className="text-lg font-semibold">EcoVision AI</span>
          </div>
          <p className="text-primary-foreground/80">
            Making the world more sustainable, one product at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;