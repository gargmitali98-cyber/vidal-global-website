export type NavLink = {
  label: string;
  href: string;
  dropdown?: boolean;
};

export type MegaMenuSection = {
  title: string;
  items: {
    slug: string;
    icon: string;
    label: string;
    description: string;
    href: string;
  }[];
};

export type ProductSummary = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  section: string;
  href: string;
};

export type ProductMetric = {
  v: string;
  l: string;
};

export type ProductFeature = {
  i: string;
  t: string;
  d: string;
};

export type ProductBenefit = {
  i: string;
  t: string;
  d: string;
};

export type ProductDetail = {
  slug: string;
  tag: string;
  title: string;
  desc: string;
  metrics: ProductMetric[];
  features: ProductFeature[];
  benefits: ProductBenefit[];
  route: string;
};
