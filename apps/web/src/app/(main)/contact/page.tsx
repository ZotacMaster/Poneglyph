import Link from "next/link";
import { Button } from "@Poneglyph/ui/components/button";
import { Input } from "@Poneglyph/ui/components/input";
import { Textarea } from "@Poneglyph/ui/components/textarea";
import { IconMail, IconPhone, IconMapPin, IconSend } from "@tabler/icons-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border py-20 text-center">
        <div className="mx-auto max-w-[1200px] px-6">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Have questions or want to collaborate? We would love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-lg border border-border p-8">
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
                Send us a Message
              </h2>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      First Name
                    </label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Last Name
                    </label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Subject</label>
                  <Input placeholder="How can we help?" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Message</label>
                  <Textarea placeholder="Tell us about your inquiry..." className="min-h-[150px]" />
                </div>
                <Button type="submit" className="w-full gap-2">
                  <IconSend className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
                  Get in Touch
                </h2>
                <p className="text-body text-muted-foreground">
                  Our team is here to help you with any questions about datasets, volunteer
                  opportunities, or partnerships.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: IconMail,
                    title: "Email Us",
                    details: ["info@poneglyph.org", "support@poneglyph.org"],
                  },
                  {
                    icon: IconPhone,
                    title: "Call Us",
                    details: ["+1 (555) 123-4567", "Mon-Fri 9am-6pm EST"],
                  },
                  {
                    icon: IconMapPin,
                    title: "Visit Us",
                    details: ["123 Data Street", "San Francisco, CA 94102"],
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      {item.details.map((detail) => (
                        <p key={detail} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Link */}
              <div className="rounded-lg border border-border bg-muted/50 p-6">
                <h3 className="mb-2 font-semibold text-foreground">Frequently Asked Questions</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Find quick answers to common questions in our FAQ section.
                </p>
                <Link href="#">
                  <Button variant="outline" size="sm">
                    Visit FAQ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
