
import { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function ApiKeyForm() {
  const { apiKey, setApiKey } = useQuiz();
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [showApiKey, setShowApiKey] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(tempApiKey);
  };
  
  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Gemini API Key</CardTitle>
        <CardDescription>
          Enter your Gemini API key to generate questions. Your key is stored locally and never sent anywhere else.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="relative">
            <Input
              type={showApiKey ? "text" : "password"}
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="pr-10"
            />
            <button
              type="button"
              onClick={toggleShowApiKey}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showApiKey ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            {apiKey ? "Update API Key" : "Save API Key"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
