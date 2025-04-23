
import { useQuiz } from "@/contexts/QuizContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, TrendingUp, Award } from "lucide-react";

export function StatsCards() {
  const { streak, totalAnswered, correctAnswers } = useQuiz();
  
  const accuracy = totalAnswered > 0 
    ? Math.round((correctAnswers / totalAnswered) * 100)
    : 0;
  
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Questions Answered
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAnswered}</div>
          <p className="text-xs text-muted-foreground">
            Total questions you've answered
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Accuracy Rate
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{accuracy}%</div>
          <p className="text-xs text-muted-foreground">
            {correctAnswers} correct out of {totalAnswered} questions
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Current Streak
          </CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{streak}</div>
          <p className="text-xs text-muted-foreground">
            Consecutive correct answers
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
