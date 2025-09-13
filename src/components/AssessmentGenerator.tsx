import { useState } from "react";
import { Brain, FileText, Target, Plus, Play, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface Assessment {
  id: string;
  title: string;
  document: string;
  type: 'multiple-choice' | 'short-answer' | 'essay';
  difficulty: 'easy' | 'medium' | 'hard';
  questions: number;
  status: 'draft' | 'ready' | 'completed';
  score?: number;
  createdAt: string;
}

export const AssessmentGenerator = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: '1',
      title: 'Biology Chapter 5 Quiz',
      document: 'Cell Structure and Function',
      type: 'multiple-choice',
      difficulty: 'medium',
      questions: 15,
      status: 'completed',
      score: 92,
      createdAt: '2 days ago'
    },
    {
      id: '2',
      title: 'Chemistry Reactions Test',
      document: 'Chemical Bonding Notes',
      type: 'short-answer',
      difficulty: 'hard',
      questions: 8,
      status: 'ready',
      createdAt: '1 day ago'
    },
    {
      id: '3',
      title: 'Physics Motion Quiz',
      document: 'Mechanics Fundamentals',
      type: 'multiple-choice',
      difficulty: 'easy',
      questions: 12,
      status: 'draft',
      createdAt: '3 hours ago'
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateAssessment = () => {
    setIsGenerating(true);
    
    // Simulate AI assessment generation
    setTimeout(() => {
      const newAssessment: Assessment = {
        id: Date.now().toString(),
        title: 'Mathematics Functions Quiz',
        document: 'Algebra Fundamentals',
        type: 'multiple-choice',
        difficulty: 'medium',
        questions: 10,
        status: 'ready',
        createdAt: 'Just now'
      };

      setAssessments(prev => [newAssessment, ...prev]);
      setIsGenerating(false);
      
      toast({
        title: "Assessment Generated!",
        description: "Your new quiz is ready to take",
      });
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'ready':
        return <Play className="w-4 h-4 text-primary" />;
      case 'draft':
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'ready':
        return 'bg-primary text-primary-foreground';
      case 'draft':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-success/10 text-success border-success/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'hard':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-2">Assessment Generator</h2>
          <p className="text-muted-foreground">
            AI-powered quiz and test generation from your documents
          </p>
        </div>
        <Button 
          onClick={generateAssessment}
          disabled={isGenerating}
          className="bg-gradient-primary shadow-soft hover:shadow-glow transition-all"
        >
          {isGenerating ? (
            <>
              <Brain className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Generate Assessment
            </>
          )}
        </Button>
      </div>

      {/* Generation Options */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Quick Generate</CardTitle>
          <CardDescription>
            Create assessments from your uploaded documents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Document</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select document" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="biology">Biology Chapter 5</SelectItem>
                  <SelectItem value="chemistry">Chemical Bonding</SelectItem>
                  <SelectItem value="physics">Mechanics</SelectItem>
                  <SelectItem value="math">Algebra Fundamentals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Assessment Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="short-answer">Short Answer</SelectItem>
                  <SelectItem value="essay">Essay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment List */}
      <div className="grid gap-4">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="shadow-soft hover:shadow-medium transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">{assessment.title}</h3>
                    {getStatusIcon(assessment.status)}
                  </div>
                  
                  <p className="text-muted-foreground mb-3">
                    Based on: {assessment.document}
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge className={getStatusColor(assessment.status)}>
                      {assessment.status}
                    </Badge>
                    <Badge variant="outline" className={getDifficultyColor(assessment.difficulty)}>
                      {assessment.difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {assessment.questions} questions
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {assessment.createdAt}
                    </span>
                  </div>
                  
                  {assessment.score && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Last Score: </span>
                      <span className="font-semibold text-success">{assessment.score}%</span>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 ml-4">
                  {assessment.status === 'ready' && (
                    <Button size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Start Quiz
                    </Button>
                  )}
                  {assessment.status === 'completed' && (
                    <Button variant="outline" size="sm">
                      <Target className="w-4 h-4 mr-2" />
                      Review
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};