import { Brain, Target, Clock, TrendingUp, BookOpen, Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface StudyPlan {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  progress: number;
  type: 'review' | 'new-topic' | 'practice' | 'assessment';
  subject: string;
}

interface WeakArea {
  topic: string;
  subject: string;
  confidence: number;
  lastScore: number;
  recommendedAction: string;
}

export const StudyRecommendations = () => {
  const studyPlan: StudyPlan[] = [
    {
      id: '1',
      title: 'Review Chemical Bonding',
      description: 'Focus on ionic and covalent bonds based on recent assessment results',
      priority: 'high',
      estimatedTime: '45 min',
      progress: 0,
      type: 'review',
      subject: 'Chemistry'
    },
    {
      id: '2',
      title: 'Practice Physics Problems',
      description: 'Mechanics problem-solving to strengthen weak areas',
      priority: 'high',
      estimatedTime: '60 min',
      progress: 25,
      type: 'practice',
      subject: 'Physics'
    },
    {
      id: '3',
      title: 'Biology Cell Division Quiz',
      description: 'Test your understanding of mitosis and meiosis',
      priority: 'medium',
      estimatedTime: '20 min',
      progress: 0,
      type: 'assessment',
      subject: 'Biology'
    },
    {
      id: '4',
      title: 'Advanced Calculus Concepts',
      description: 'Explore derivatives and integrals in depth',
      priority: 'low',
      estimatedTime: '90 min',
      progress: 0,
      type: 'new-topic',
      subject: 'Mathematics'
    }
  ];

  const weakAreas: WeakArea[] = [
    {
      topic: 'Chemical Bonding',
      subject: 'Chemistry',
      confidence: 45,
      lastScore: 67,
      recommendedAction: 'Review theory and practice problems'
    },
    {
      topic: 'Projectile Motion',
      subject: 'Physics',
      confidence: 52,
      lastScore: 74,
      recommendedAction: 'Work through example problems'
    },
    {
      topic: 'Cellular Respiration',
      subject: 'Biology',
      confidence: 68,
      lastScore: 78,
      recommendedAction: 'Light review and quiz'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'review':
        return <BookOpen className="w-4 h-4" />;
      case 'practice':
        return <Target className="w-4 h-4" />;
      case 'assessment':
        return <Brain className="w-4 h-4" />;
      case 'new-topic':
        return <Star className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence < 50) return 'text-destructive';
    if (confidence < 70) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2">AI Study Recommendations</h2>
        <p className="text-muted-foreground">
          Personalized learning path based on your performance and progress
        </p>
      </div>

      {/* Today's Focus */}
      <Card className="shadow-soft bg-gradient-learning text-primary-foreground">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <CardTitle className="text-xl">Today's Focus</CardTitle>
          </div>
          <CardDescription className="text-primary-foreground/80">
            Recommended activities for optimal learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">2.5h</div>
              <div className="text-sm opacity-80">Recommended Study Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">4</div>
              <div className="text-sm opacity-80">Priority Topics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">85%</div>
              <div className="text-sm opacity-80">Success Prediction</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Study Plan */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold">Recommended Study Plan</h3>
          
          {studyPlan.map((item, index) => (
            <Card key={item.id} className="shadow-soft hover:shadow-medium transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{item.title}</h4>
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {item.estimatedTime}
                        </span>
                        <span>{item.subject}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">
                    Start
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
                
                {item.progress > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-1" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weak Areas */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Areas for Improvement</h3>
          
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Focus Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weakAreas.map((area, index) => (
                <div key={index} className="space-y-3 p-4 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{area.topic}</h5>
                      <p className="text-sm text-muted-foreground">{area.subject}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {area.lastScore}%
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Confidence</span>
                      <span className={getConfidenceColor(area.confidence)}>
                        {area.confidence}%
                      </span>
                    </div>
                    <Progress value={area.confidence} className="h-1" />
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    {area.recommendedAction}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Learning Streak */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Learning Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">12</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Days in a row
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Star className="w-4 h-4 mr-2" />
                  Keep it going!
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};