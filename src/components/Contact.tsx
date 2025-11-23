import { MapPin, Mail, Clock, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit our store or reach out to us. We're here to help with all your phone needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-sm text-muted-foreground">
                1234 Sunset Boulevard,<br />
                Los Angeles, CA 90028
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-muted-foreground break-all">
                garrettdavis2090@gmail.com
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-sm text-muted-foreground">
                Call us for inquiries
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Hours</h3>
              <p className="text-sm text-muted-foreground">
                Mon-Sat: 9AM-8PM<br />
                Sun: 10AM-6PM
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
