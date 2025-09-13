import { BookOpen, TrendingUp, Target, Clock, Award, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  const stats = [
    { label: "Documents Processed", value: "24", change: "+3 this week", icon: FileText },
    { label: "Assessments Completed", value: "18", change: "85% avg score", icon: Target },
    { label: "Study Streak", value: "12 days", change: "Personal best!", icon: Award },
    { label: "Time Studied", value: "2.4h", change: "Today", icon: Clock },
  ];

  const recentActivities = [
    { type: "assessment", title: "Biology Chapter 5 Quiz", score: "92%", time: "2 hours ago" },
    { type: "document", title: "Physics Lecture Notes", status: "Processed", time: "4 hours ago" },
    { type: "study", title: "Chemistry Review Session", duration: "45min", time: "1 day ago" },
    { type: "recommendation", title: "Suggested: Mathematics Practice", action: "pending", time: "2 days ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-learning rounded-xl p-8 text-primary-foreground shadow-glow">
        <h2 className="text-3xl font-bold mb-2">Welcome back, Alex!</h2>
        <p className="text-primary-foreground/90 mb-6">
          You're making great progress. Keep up the excellent work!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="secondary" className="bg-white/20 hover:bg-white/30 border-white/30">
            <BookOpen className="w-4 h-4 mr-2" />
            Continue Learning
          </Button>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Progress
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <p className="text-xs text-success mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Progress */}
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Learning Progress</CardTitle>
            <CardDescription>Your progress across different subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { subject: "Biology", progress: 78, color: "bg-secondary" },
              { subject: "Chemistry", progress: 65, color: "bg-primary" },
              { subject: "Physics", progress: 82, color: "bg-success" },
              { subject: "Mathematics", progress: 56, color: "bg-warning" },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.subject}</span>
                  <span className="text-muted-foreground">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activities</CardTitle>
            <CardDescription>Your latest learning activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                  {activity.score && (
                    <p className="text-xs text-success font-medium">Score: {activity.score}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};