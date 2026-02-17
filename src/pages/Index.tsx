import MainLayout from "@/components/layout/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      <section className="section-padding-lg">
        <div className="container-jimmy text-center">
          <h1 className="mb-4 text-primary">
            Award-Winning Home Appliances
          </h1>
          <p className="mx-auto max-w-2xl text-body text-muted-foreground">
            Discover JIMMY's premium range of cordless vacuums, kitchen appliances, and hair care tools — designed for modern African living.
          </p>
        </div>
      </section>

      {/* Placeholder sections for upcoming homepage components */}
      <section className="section-padding-sm bg-jimmy-light-blue">
        <div className="container-jimmy text-center">
          <h2 className="mb-2">Shop by Category</h2>
          <p className="text-small">Coming next — Category Grid</p>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="container-jimmy text-center">
          <h2 className="mb-2">Best Sellers</h2>
          <p className="text-small">Coming next — Product Carousel</p>
        </div>
      </section>

      <section className="section-padding-sm bg-secondary">
        <div className="container-jimmy text-center">
          <h2 className="mb-2">Customer Reviews</h2>
          <p className="text-small">Coming next — Testimonials</p>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
