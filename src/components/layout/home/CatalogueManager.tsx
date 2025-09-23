"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText, X } from "lucide-react";

interface CatalogueFile {
  name: string;
  path: string;
  size: number;
  displayName: string;
}

const CatalogueManager = () => {
  const [catalogues, setCatalogues] = useState<CatalogueFile[]>([]);
  const [selectedCatalogue, setSelectedCatalogue] = useState<CatalogueFile | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCatalogues();
  }, []);

  const loadCatalogues = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/catalogues');
      if (response.ok) {
        const catalogueFiles = await response.json();
        setCatalogues(catalogueFiles);
      }
    } catch (error) {
      console.error('Error loading catalogues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (catalogue: CatalogueFile) => {
    setSelectedCatalogue(catalogue);
    setShowPreview(true);
  };

  const handleDownload = (catalogue: CatalogueFile) => {
    const link = document.createElement('a');
    link.href = catalogue.path;
    link.download = catalogue.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const closePreview = () => {
    setShowPreview(false);
    setSelectedCatalogue(null);
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading catalogues...</p>
        </div>
      </div>
    );
  }

  if (catalogues.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Catalogues Available</h3>
          <p className="text-gray-600">No catalogue files found in the catalogues folder.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Product Catalogues
          </h2>
          <p className="text-gray-600 text-lg">
            Browse and download our comprehensive product catalogues
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogues.map((catalogue, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <FileText className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-800 truncate">
                      {catalogue.displayName}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(catalogue.size)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handlePreview(catalogue)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDownload(catalogue)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && selectedCatalogue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedCatalogue.displayName}
              </h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(selectedCatalogue)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closePreview}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <iframe
                src={selectedCatalogue.path}
                className="w-full h-full border rounded-lg"
                title={`Preview of ${selectedCatalogue.displayName}`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CatalogueManager;
