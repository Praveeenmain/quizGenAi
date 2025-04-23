
import { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ContextForm() {
  const { context, setContext, generateQuestions, isLoading, apiKey } = useQuiz();
  const [tempContext, setTempContext] = useState(context);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContext(tempContext);
    await generateQuestions();
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Enter Text Context</CardTitle>
        <CardDescription>
          Paste the text or passage you want to generate multiple-choice questions from.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            value={tempContext}
            onChange={(e) => setTempContext(e.target.value)}
            placeholder="Paste your text here..."
            className="min-h-[200px]"
          />
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading || !tempContext || !apiKey}
          >
            {isLoading ? "Generating Questions..." : "Generate Questions"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
