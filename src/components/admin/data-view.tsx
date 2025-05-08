"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAcceptances } from '@/lib/storage';
import type { PolicyAcceptance } from '@/types';
import { Download, Users, FileText, CalendarDays, Edit } from 'lucide-react';

export function AdminDataView() {
  const [acceptances, setAcceptances] = useState<PolicyAcceptance[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setAcceptances(getAcceptances());
    setHydrated(true); // Mark as hydrated after initial data load
  }, []);

  const exportToCSV = () => {
    if (!acceptances.length) return;

    const headers = ["Full Name", "Identification Number", "Timestamp", "Signature (Data URL)"];
    const rows = acceptances.map(acc => [
      acc.fullName,
      acc.identificationNumber,
      new Date(acc.timestamp).toLocaleString(),
      acc.signature,
    ]);

    let csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "policy_acceptances.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!hydrated) {
    // Render a loading state or null until hydrated to prevent mismatch
    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl flex items-center">
                        <Users className="mr-3 h-8 w-8 text-primary" />
                        Policy Acceptances
                    </CardTitle>
                    <CardDescription>Loading acceptance records...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="animate-pulse">
                        <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
                        <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
                        <div className="h-12 bg-muted rounded w-full"></div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <CardTitle className="text-2xl md:text-3xl flex items-center">
            <Users className="mr-3 h-8 w-8 text-primary" />
            Policy Acceptances
          </CardTitle>
          <CardDescription>View users who have accepted the data treatment policy.</CardDescription>
        </div>
        <Button onClick={exportToCSV} disabled={!acceptances.length} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Download className="mr-2 h-4 w-4" /> Export to CSV
        </Button>
      </CardHeader>
      <CardContent>
        {acceptances.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No policy acceptances recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]"><FileText className="inline mr-2 h-4 w-4 text-primary" />Full Name</TableHead>
                  <TableHead><Hash className="inline mr-2 h-4 w-4 text-primary" />ID Number</TableHead>
                  <TableHead><CalendarDays className="inline mr-2 h-4 w-4 text-primary" />Timestamp</TableHead>
                  <TableHead><Edit className="inline mr-2 h-4 w-4 text-primary" />Signature</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {acceptances.map((acceptance) => (
                  <TableRow key={acceptance.id}>
                    <TableCell className="font-medium">{acceptance.fullName}</TableCell>
                    <TableCell>{acceptance.identificationNumber}</TableCell>
                    <TableCell>{new Date(acceptance.timestamp).toLocaleString()}</TableCell>
                    <TableCell>
                      {acceptance.signature ? (
                        <Image 
                          src={acceptance.signature} 
                          alt={`Signature of ${acceptance.fullName}`} 
                          width={150} 
                          height={75}
                          className="border rounded-md bg-white p-1 shadow-sm"
                          data-ai-hint="signature drawing"
                        />
                      ) : (
                        <span className="text-muted-foreground">No signature</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>A list of all recorded policy acceptances.</TableCaption>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
