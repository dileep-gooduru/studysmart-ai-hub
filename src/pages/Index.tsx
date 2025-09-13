import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { DocumentUpload } from "@/components/DocumentUpload";
import { AssessmentGenerator } from "@/components/AssessmentGenerator";
import { StudyRecommendations } from "@/components/StudyRecommendations";
import { DocumentLibrary } from "@/components/DocumentLibrary";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <DocumentUpload />;
      case 'assessments':
        return <AssessmentGenerator />;
      case 'study':
        return <StudyRecommendations />;
      case 'library':
        return <DocumentLibrary />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;