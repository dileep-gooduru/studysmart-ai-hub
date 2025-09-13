import { useState } from "react";
import { Search, Filter, BookOpen, FileText, Calendar, Tag, Eye, Download, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Document {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'txt' | 'image';
  subject: string;
  uploadDate: string;
  size: string;
  status: 'processed' | 'processing' | 'failed';
  tags: string[];
  description: string;
  assessments: number;
  views: number;
}

export const DocumentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const documents: Document[] = [
    {
      id: '1',
      title: 'Cell Structure and Function',
      type: 'pdf',
      subject: 'Biology',
      uploadDate: '2024-01-15',
      size: '2.4 MB',
      status: 'processed',
      tags: ['cell-biology', 'organelles', 'membrane'],
      description: 'Comprehensive guide to cellular components and their functions',
      assessments: 3,
      views: 24
    },
    {
      id: '2',
      title: 'Chemical Bonding Fundamentals',
      type: 'pdf',
      subject: 'Chemistry',
      uploadDate: '2024-01-12',
      size: '1.8 MB',
      status: 'processed',
      tags: ['bonding', 'ionic', 'covalent'],
      description: 'Introduction to different types of chemical bonds',
      assessments: 2,
      views: 18
    },
    {
      id: '3',
      title: 'Newton\'s Laws of Motion',
      type: 'doc',
      subject: 'Physics',
      uploadDate: '2024-01-10',
      size: '856 KB',
      status: 'processed',
      tags: ['mechanics', 'force', 'acceleration'],
      description: 'Detailed explanation of fundamental physics principles',
      assessments: 4,
      views: 31
    },
    {
      id: '4',
      title: 'Calculus Problem Set',
      type: 'pdf',
      subject: 'Mathematics',
      uploadDate: '2024-01-08',
      size: '1.2 MB',
      status: 'processing',
      tags: ['calculus', 'derivatives', 'integrals'],
      description: 'Practice problems for advanced calculus concepts',
      assessments: 0,
      views: 5
    },
    {
      id: '5',
      title: 'Periodic Table Notes',
      type: 'txt',
      subject: 'Chemistry',
      uploadDate: '2024-01-05',
      size: '324 KB',
      status: 'processed',
      tags: ['periodic-table', 'elements', 'properties'],
      description: 'Study notes on element properties and trends',
      assessments: 1,
      views: 12
    }
  ];

  const subjects = ['Biology', 'Chemistry', 'Physics', 'Mathematics'];
  const documentTypes = ['pdf', 'doc', 'txt', 'image'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || doc.subject === selectedSubject;
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'bg-success text-success-foreground';
      case 'processing':
        return 'bg-warning text-warning-foreground';
      case 'failed':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'doc':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'txt':
        return <FileText className="w-4 h-4 text-gray-500" />;
      case 'image':
        return <FileText className="w-4 h-4 text-green-500" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2">Document Library</h2>
        <p className="text-muted-foreground">
          Manage your uploaded study materials and generated assessments
        </p>
      </div>

      {/* Filters */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents, tags, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Library Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{documents.length}</div>
            <div className="text-sm text-muted-foreground">Total Documents</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">
              {documents.filter(d => d.status === 'processed').length}
            </div>
            <div className="text-sm text-muted-foreground">Processed</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {documents.reduce((sum, doc) => sum + doc.assessments, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Assessments Created</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {subjects.length}
            </div>
            <div className="text-sm text-muted-foreground">Subjects</div>
          </CardContent>
        </Card>
      </div>

      {/* Document Grid */}
      <div className="grid gap-4">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="shadow-soft hover:shadow-medium transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    {getTypeIcon(doc.type)}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">{doc.title}</h3>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm">
                      {doc.description}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {doc.subject}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(doc.uploadDate)}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {doc.views} views
                      </span>
                      <span>{doc.size}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {doc.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {doc.assessments > 0 && (
                      <div className="text-sm">
                        <span className="text-success font-medium">
                          {doc.assessments} assessment(s) generated
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card className="shadow-soft">
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No documents found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or upload some documents to get started
            </p>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Upload Documents
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};