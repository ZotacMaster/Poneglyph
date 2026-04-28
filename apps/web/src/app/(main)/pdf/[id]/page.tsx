import Link from "next/link";
import { Button } from "@Poneglyph/ui/components/button";
import { IconArrowLeft, IconDownload, IconFileText } from "@tabler/icons-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PDFPreviewPage({ params }: Props) {
  const { id } = await params;

  // Mock PDF data - in real app, fetch from server
  const pdfData = {
    id,
    title: "Global Health Survey 2024",
    description: "Comprehensive health survey data from 50 countries",
    pages: 42,
    size: "3.2 MB",
    uploadedAt: "2024-12-15",
    downloadUrl: `/pdf/download/${id}`,
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/datasets"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <IconArrowLeft className="h-4 w-4" />
                Back to Datasets
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <IconFileText className="h-5 w-5 text-primary" />
                <div>
                  <h1 className="text-lg font-semibold text-foreground">{pdfData.title}</h1>
                  <p className="text-xs text-muted-foreground">
                    {pdfData.pages} pages · {pdfData.size}
                  </p>
                </div>
              </div>
            </div>
            <Link href={pdfData.downloadUrl}>
              <Button className="gap-2">
                <IconDownload className="h-4 w-4" />
                Download PDF
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="rounded-lg border border-border bg-muted/30 p-8">
          {/* Mock PDF Pages */}
          <div className="space-y-6">
            {[1, 2, 3].map((pageNum) => (
              <div key={pageNum} className="mx-auto max-w-3xl">
                <div className="mb-2 text-center text-xs text-muted-foreground">Page {pageNum}</div>
                <div className="aspect-[8.5/11] w-full rounded-lg border border-border bg-white shadow-sm">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <IconFileText className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground">PDF Preview - Page {pageNum}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {pageNum === 1 && "Title page with survey overview"}
                        {pageNum === 2 && "Data visualization and key findings"}
                        {pageNum === 3 && "Detailed statistics and methodology"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PDF Info */}
          <div className="mt-8 rounded-lg border border-border bg-background p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Document Information</h3>
            <dl className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Title", value: pdfData.title },
                { label: "Pages", value: pdfData.pages.toString() },
                { label: "File Size", value: pdfData.size },
                { label: "Upload Date", value: pdfData.uploadedAt },
                { label: "Description", value: pdfData.description },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-sm font-medium text-muted-foreground">{item.label}</dt>
                  <dd className="mt-1 text-sm text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
