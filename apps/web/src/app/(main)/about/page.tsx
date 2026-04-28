import Link from "next/link";
import { Button } from "@Poneglyph/ui/components/button";
import {
  IconArrowRight,
  IconBuilding,
  IconUsers,
  IconDatabase,
  IconBrain,
} from "@tabler/icons-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border py-20 text-center">
        <div className="mx-auto max-w-[1200px] px-6">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            About Poneglyph
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Empowering NGOs, researchers, and journalists with AI-driven insights from survey data
            worldwide.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">Our Mission</h2>
              <p className="mt-4 text-body text-muted-foreground">
                Poneglyph bridges the gap between raw survey data and actionable insights. We
                provide a platform where volunteers can share datasets, NGOs can access extracted
                insights, and AI agents can analyze patterns across global surveys.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">Our Vision</h2>
              <p className="mt-4 text-body text-muted-foreground">
                A world where data-driven decision making is accessible to every organization
                working for social good. We believe that quality survey data, when properly analyzed
                and shared, can transform communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/50 py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: IconDatabase, label: "Datasets", value: "10,000+" },
              { icon: IconUsers, label: "Volunteers", value: "2,500+" },
              { icon: IconBuilding, label: "NGO Partners", value: "500+" },
              { icon: IconBrain, label: "AI Insights", value: "50,000+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight text-foreground">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Volunteers Submit Data",
                description:
                  "Volunteers upload survey datasets, get ratings, and build their reputation in the community.",
              },
              {
                step: "2",
                title: "AI Extracts Insights",
                description:
                  "Our AI agents analyze datasets to extract meaningful patterns, trends, and actionable insights.",
              },
              {
                step: "3",
                title: "NGOs Access & Act",
                description:
                  "NGOs, researchers, and journalists access insights to drive impactful decision-making.",
              },
            ].map((item) => (
              <div key={item.step} className="relative rounded-lg border border-border p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-body text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-20 text-center">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-body text-muted-foreground">
            Join our community of data-driven changemakers today.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/discover">
              <Button size="lg">
                Discover Volunteers
                <IconArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
