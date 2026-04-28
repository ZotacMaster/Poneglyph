import Link from "next/link";
import { Button } from "@Poneglyph/ui/components/button";
import { IconArrowLeft, IconDownload, IconCheck, IconFileText } from "@tabler/icons-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PDFDownloadPage({ params }: Props) {
  const { id } = await params;

  // Mock PDF data
  const pdfData = {
    id,
    title: "Global Health Survey 2024",
    description: "Comprehensive health survey data from 50 countries",
    size: "3.2 MB",
    pages: 42,
  };

  // Simulate download URL - in real app, this would be a valid URL
  const downloadUrl = `/api/datasets/${id}/download`;

  const handleDownload = () => {
    window.open(downloadUrl, "_blank");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="mx-auto max-w-[800px] px-6 py-16">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/pdf/${id}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to Preview
          </Link>
        </div>

        {/* Download Card */}
        <div className="rounded-lg border border-border bg-background p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <IconFileText className="h-10 w-10 text-primary" />
          </div>

          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-foreground">
            {pdfData.title}
          </h1>
          <p className="mb-6 text-body text-muted-foreground">{pdfData.description}</p>

          {/* File Details */}
          <div className="mb-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>{pdfData.size}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
            <span>{pdfData.pages} pages</span>
          </div>

          {/* Download Button */}
          <Button size="lg" className="gap-2" onClick={handleDownload}>
            <IconDownload className="h-5 w-5" />
            Download PDF
          </Button>

          <p className="mt-4 text-xs text-muted-foreground">
            Your download will start automatically
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <IconCheck className="h-4 w-4 text-primary" />
            Download Information
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>File format: PDF (Portable Document Format)</li>
            <li>This dataset is free to download and use</li>
            <li>Please cite Poneglyph when using this data</li>
            <li>For questions, contact support@poneglyph.org</li>
          </ul>
        </div>

        {/* Related Actions */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link href="/datasets">
            <Button variant="outline" size="sm">
              Browse More Datasets
            </Button>
          </Link>
          <Link href={`/pdf/${id}`}>
            <Button variant="outline" size="sm">
              View Preview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
