
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function WelcomeSection() {
  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle>Welcome to Quiz Genie</CardTitle>
        <CardDescription>
          Generate high-quality multiple-choice questions from any text using Gemini AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">Step 1</h3>
              <p className="text-sm text-muted-foreground">
                Enter your Gemini API key. It's stored only in your browser and never sent anywhere else.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">Step 2</h3>
              <p className="text-sm text-muted-foreground">
                Paste any text or passage you want to create questions from.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">Step 3</h3>
              <p className="text-sm text-muted-foreground">
                Generate MCQs and test your knowledge with the interactive quiz.
              </p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Quiz Genie will generate 10 multiple-choice questions based on your text. 
            Test yourself and track your progress in the dashboard.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
