const mockProducts = [
  {
    id: 'VIS-001',
    slug: 'vis-001',
    sku: 'RB-WAYF-52-BLK',
    name: 'Wayfarer Classic 52',
    price: 389,
    brand: 'Ray-Ban',
    brandSlug: 'ray-ban',
    category: 'ACETATE',
    categorySlug: 'acetate',
    stock: 32,
    status: 'ACTIVE',
    details: 'ACETATE / SUN',
    stockLabel: 'IN STOCK',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1400&q=80',
    description: 'Timeless square profile with modern UV400 optics for city and travel wear.',
    featured: true,
    specs: [
      { label: 'Material', value: 'Premium Acetate' },
      { label: 'Weight', value: '26.8 Grams' },
      { label: 'Lens', value: 'G-15 UV400' },
      { label: 'Hinge', value: 'Five-Barrel Rivet' },
    ],
    features: ['Iconic wayfarer silhouette', 'Balanced daily fit', 'Durable front frame', 'Optical-grade clarity'],
  },
  {
    id: 'VIS-002',
    slug: 'vis-002',
    sku: 'OAK-RDRE-PRZM',
    name: 'Radar Edge Prizm',
    price: 459,
    brand: 'Oakley',
    brandSlug: 'oakley',
    category: 'CARBON',
    categorySlug: 'carbon',
    stock: 18,
    status: 'ACTIVE',
    details: 'CARBON / PERFORMANCE',
    stockLabel: 'IN STOCK',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1400&q=80',
    description: 'Performance wrap frame tuned for high-contrast visibility and low drag.',
    featured: true,
    specs: [
      { label: 'Material', value: 'Carbon Composite' },
      { label: 'Weight', value: '23.9 Grams' },
      { label: 'Lens', value: 'Prizm Road Black' },
      { label: 'Fit', value: 'Three-Point Performance' },
    ],
    features: ['Sport aerodynamic profile', 'Impact-resistant optics', 'Hydrophobic coat', 'Stable active grip'],
  },
  {
    id: 'VIS-003',
    slug: 'vis-003',
    sku: 'GUC-GG-MNGRM',
    name: 'GG Monogram Square',
    price: 679,
    brand: 'Gucci',
    brandSlug: 'gucci',
    category: 'ACETATE',
    categorySlug: 'acetate',
    stock: 11,
    status: 'ACTIVE',
    details: 'ACETATE / LUXURY SUN',
    stockLabel: 'LIMITED',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80',
    description: 'Bold Italian proportions with polished temples and premium tonal detailing.',
    featured: true,
    specs: [
      { label: 'Material', value: 'Italian Acetate' },
      { label: 'Weight', value: '30.1 Grams' },
      { label: 'Lens', value: 'Gradient Brown UV400' },
      { label: 'Temple Core', value: 'Metal-Reinforced' },
    ],
    features: ['Signature luxury profile', 'Hand-polished edge', 'UV400 protection', 'Premium comfort curve'],
  },
  {
    id: 'VIS-004',
    slug: 'vis-004',
    sku: 'PRA-11XV-TI',
    name: 'PR 11XV Signature',
    price: 639,
    brand: 'Prada',
    brandSlug: 'prada',
    category: 'TITANIUM',
    categorySlug: 'titanium',
    stock: 14,
    status: 'ACTIVE',
    details: 'TITANIUM / OPTICAL',
    stockLabel: 'IN STOCK',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1400&q=80',
    description: 'Minimal titanium geometry for lightweight all-day optical wear.',
    featured: true,
    specs: [
      { label: 'Material', value: 'Brushed Titanium Alloy' },
      { label: 'Weight', value: '19.0 Grams' },
      { label: 'Lens', value: 'Premium Demo Optical' },
      { label: 'Bridge', value: 'Adjustable Titanium Pads' },
    ],
    features: ['Ultra-light profile', 'Precise comfort fit', 'Matte industrial finish', 'Refined proportions'],
  },
  {
    id: 'VIS-005',
    slug: 'vis-005',
    sku: 'TF-ASC-AVI-62',
    name: 'Ascent Aviator 62',
    price: 724,
    brand: 'Tom Ford',
    brandSlug: 'tom-ford',
    category: 'MIXED',
    categorySlug: 'mixed',
    stock: 7,
    status: 'ACTIVE',
    details: 'MIXED / SUN',
    stockLabel: 'LIMITED',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1400&q=80',
    description: 'Hybrid-material aviator with premium polarized optics and sharp detailing.',
    featured: false,
    specs: [
      { label: 'Material', value: 'Titanium + Acetate Hybrid' },
      { label: 'Weight', value: '21.5 Grams' },
      { label: 'Lens', value: 'Polarized Smoke' },
      { label: 'Hinge', value: 'Spring Precision' },
    ],
    features: ['Signature luxury accents', 'Polarized visual comfort', 'Flexible hinge system', 'Runway-inspired lines'],
  },
  {
    id: 'VIS-006',
    slug: 'vis-006',
    sku: 'VER-MDS-RIM-57',
    name: 'Medusa Rim 57',
    price: 609,
    brand: 'Versace',
    brandSlug: 'versace',
    category: 'GOLD PLATE',
    categorySlug: 'gold-plate',
    stock: 8,
    status: 'ACTIVE',
    details: 'GOLD PLATE / SUN',
    stockLabel: 'LIMITED',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80',
    description: 'Statement metal construction with sculpted detailing and luxe tonal finish.',
    featured: false,
    specs: [
      { label: 'Material', value: 'Gold-Plated Stainless Alloy' },
      { label: 'Weight', value: '26.2 Grams' },
      { label: 'Lens', value: 'Smoke Gradient UV400' },
      { label: 'Pads', value: 'Silicone Comfort' },
    ],
    features: ['Luxury signature temple', 'Elegant gradient optics', 'Balanced distribution', 'Durable plated finish'],
  },
  {
    id: 'VIS-007',
    slug: 'vis-007',
    sku: 'CAR-302-CLS-60',
    name: 'Carrera 302 Classic',
    price: 429,
    brand: 'Carrera',
    brandSlug: 'carrera',
    category: 'CARBON',
    categorySlug: 'carbon',
    stock: 21,
    status: 'ACTIVE',
    details: 'CARBON / SUN',
    stockLabel: 'IN STOCK',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1400&q=80',
    description: 'Motorsport-inspired wrap frame with a lightweight carbon shell and crisp optics.',
    featured: false,
    specs: [
      { label: 'Material', value: 'Carbon Composite Front' },
      { label: 'Weight', value: '23.2 Grams' },
      { label: 'Lens', value: 'Mirror Silver UV400' },
      { label: 'Temple', value: 'Textured Sports Grip' },
    ],
    features: ['Race profile design', 'Secure active fit', 'High-contrast mirror lens', 'Low-weight comfort'],
  },
  {
    id: 'VIS-008',
    slug: 'vis-008',
    sku: 'RB-AVR-MTL-58',
    name: 'Aviator Metal 58',
    price: 412,
    brand: 'Ray-Ban',
    brandSlug: 'ray-ban',
    category: 'MIXED',
    categorySlug: 'mixed',
    stock: 15,
    status: 'ACTIVE',
    details: 'MIXED / SUN',
    stockLabel: 'IN STOCK',
    image: 'https://images.unsplash.com/photo-1516569422860-0457ab1f03ef?auto=format&fit=crop&w=1400&q=80',
    description: 'Classic aviator build with durable metal bridge and high-clarity lenses.',
    featured: false,
    specs: [
      { label: 'Material', value: 'Metal + Composite Temple' },
      { label: 'Weight', value: '22.3 Grams' },
      { label: 'Lens', value: 'Green Classic UV400' },
      { label: 'Bridge', value: 'Double Bar' },
    ],
    features: ['Legacy aviator shape', 'Stable nose support', 'Travel-ready build', 'Balanced frame curve'],
  },
  {
    id: 'VIS-009',
    slug: 'vis-009',
    sku: 'OAK-HLF-JKT-55',
    name: 'Half Jacket Pro',
    price: 378,
    brand: 'Oakley',
    brandSlug: 'oakley',
    category: 'CARBON',
    categorySlug: 'carbon',
    stock: 10,
    status: 'ACTIVE',
    details: 'CARBON / PERFORMANCE',
    stockLabel: 'LIMITED',
    image: 'https://images.unsplash.com/photo-1608539733292-a4d7f9f4f88f?auto=format&fit=crop&w=1400&q=80',
    description: 'High-mobility half-frame tuned for trail, road, and multisport use.',
    featured: false,
    specs: [
      { label: 'Material', value: 'O-Matter Composite' },
      { label: 'Weight', value: '20.7 Grams' },
      { label: 'Lens', value: 'Prizm Trail' },
      { label: 'Grip', value: 'Unobtainium Nose and Ear' },
    ],
    features: ['Ventilated lens architecture', 'Sweat-stable fit', 'Swap lens compatible', 'Performance contouring'],
  },
  {
    id: 'VIS-010',
    slug: 'vis-010',
    sku: 'GUC-ROUND-GD-51',
    name: 'Round Luxe Gold',
    price: 592,
    brand: 'Gucci',
    brandSlug: 'gucci',
    category: 'GOLD PLATE',
    categorySlug: 'gold-plate',
    stock: 5,
    status: 'ACTIVE',
    details: 'GOLD PLATE / SUN',
    stockLabel: 'LIMITED',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80',
    description: 'Round luxury sun frame with gold plating and premium tinted optics.',
    featured: false,
    specs: [
      { label: 'Material', value: 'Plated Alloy + Acetate Tips' },
      { label: 'Weight', value: '25.8 Grams' },
      { label: 'Lens', value: 'Brown Gradient UV400' },
      { label: 'Temple', value: 'Etched Signature Temples' },
    ],
    features: ['Elegant round profile', 'Premium plated finish', 'Hand-assembled detail', 'Luxury presentation'],
  },
  {
    id: 'VIS-011',
    slug: 'vis-011',
    sku: 'PRA-LINEA-OPT-50',
    name: 'Linea Optical 50',
    price: 558,
    brand: 'Prada',
    brandSlug: 'prada',
    category: 'TITANIUM',
    categorySlug: 'titanium',
    stock: 0,
    status: 'ARCHIVED',
    details: 'TITANIUM / OPTICAL',
    stockLabel: 'OUT OF STOCK',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1400&q=80',
    description: 'Archive titanium series known for lightweight construction and sharp profile.',
    featured: false,
    specs: [
      { label: 'Material', value: 'Medical-Grade Titanium' },
      { label: 'Weight', value: '17.8 Grams' },
      { label: 'Lens', value: 'Clear Optical Demo' },
      { label: 'Finish', value: 'Satin Titanium' },
    ],
    features: ['Slim precision profile', 'Historic archive release', 'Featherweight wear', 'Minimal front geometry'],
  },
  {
    id: 'VIS-012',
    slug: 'vis-012',
    sku: 'TF-BLK-PRM-54',
    name: 'Blackline Premier',
    price: 689,
    brand: 'Tom Ford',
    brandSlug: 'tom-ford',
    category: 'ACETATE',
    categorySlug: 'acetate',
    stock: 13,
    status: 'DRAFT',
    details: 'ACETATE / OPTICAL',
    stockLabel: 'IN STOCK',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=80',
    description: 'Upcoming optical model with deep black acetate and refined premium accents.',
    featured: false,
    specs: [
      { label: 'Material', value: 'Hand-Finished Acetate' },
      { label: 'Weight', value: '27.6 Grams' },
      { label: 'Lens', value: 'Optical Demo Blue-Light Ready' },
      { label: 'Hinge', value: 'Dual-Barrel Spring' },
    ],
    features: ['New-season release', 'Premium dark polish', 'Comfort spring hinge', 'Sharp tailored fit'],
  },
];

const mockOrders = [
  {
    id: 'mock-order-1',
    orderNumber: 'ORD-98241',
    customerName: 'Ali Raza',
    customerEmail: 'ali.raza@example.com',
    status: 'PROCESSING',
    totalAmount: 1148,
    itemCount: 2,
    createdAt: '2026-04-14T10:15:00.000Z',
  },
  {
    id: 'mock-order-2',
    orderNumber: 'ORD-98219',
    customerName: 'Sana Malik',
    customerEmail: 'sana.malik@example.com',
    status: 'SHIPPED',
    totalAmount: 639,
    itemCount: 1,
    createdAt: '2026-04-13T08:45:00.000Z',
  },
  {
    id: 'mock-order-3',
    orderNumber: 'ORD-98188',
    customerName: 'Hassan Ahmed',
    customerEmail: 'hassan.ahmed@example.com',
    status: 'DELIVERED',
    totalAmount: 1291,
    itemCount: 3,
    createdAt: '2026-04-11T14:10:00.000Z',
  },
  {
    id: 'mock-order-4',
    orderNumber: 'ORD-98144',
    customerName: 'Mina Tariq',
    customerEmail: 'mina.tariq@example.com',
    status: 'PENDING',
    totalAmount: 429,
    itemCount: 1,
    createdAt: '2026-04-10T11:25:00.000Z',
  },
  {
    id: 'mock-order-5',
    orderNumber: 'ORD-98093',
    customerName: 'Omar Siddiqui',
    customerEmail: 'omar.s@example.com',
    status: 'CANCELLED',
    totalAmount: 378,
    itemCount: 1,
    createdAt: '2026-04-07T09:00:00.000Z',
  },
];

const mockUsers = [
  {
    id: 'mock-user-1',
    name: 'Mission Control',
    email: 'admin@eyeconic.pk',
    role: 'ADMIN',
    phone: '+92-300-0000001',
    city: 'Lahore',
    createdAt: '2026-01-10T09:00:00.000Z',
  },
  {
    id: 'mock-user-2',
    name: 'Ali Raza',
    email: 'ali.raza@example.com',
    role: 'USER',
    phone: '+92-321-1200091',
    city: 'Lahore',
    createdAt: '2026-02-18T09:00:00.000Z',
  },
  {
    id: 'mock-user-3',
    name: 'Sana Malik',
    email: 'sana.malik@example.com',
    role: 'USER',
    phone: '+92-333-5550271',
    city: 'Islamabad',
    createdAt: '2026-02-28T09:00:00.000Z',
  },
  {
    id: 'mock-user-4',
    name: 'Hassan Ahmed',
    email: 'hassan.ahmed@example.com',
    role: 'USER',
    phone: '+92-300-7771922',
    city: 'Karachi',
    createdAt: '2026-03-07T09:00:00.000Z',
  },
  {
    id: 'mock-user-5',
    name: 'Mina Tariq',
    email: 'mina.tariq@example.com',
    role: 'USER',
    phone: '+92-345-9920015',
    city: 'Faisalabad',
    createdAt: '2026-03-15T09:00:00.000Z',
  },
  {
    id: 'mock-user-6',
    name: 'Usman Khan',
    email: 'usman.khan@example.com',
    role: 'USER',
    phone: '+92-312-6610014',
    city: 'Rawalpindi',
    createdAt: '2026-03-30T09:00:00.000Z',
  },
];

const mockTickets = [
  {
    id: 'mock-ticket-1',
    ticketNumber: 'TKT-2201',
    customerName: 'Ali Raza',
    customerEmail: 'ali.raza@example.com',
    subject: 'Need lens upgrade on ORD-98241',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    createdAt: '2026-04-14T12:22:00.000Z',
    updatedAt: '2026-04-14T14:50:00.000Z',
    messages: [
      { sender: 'USER', text: 'Can this order be upgraded to blue-light blocking lenses?', createdAt: '2026-04-14T12:22:00.000Z' },
      { sender: 'ADMIN', text: 'Yes, we can update it before dispatch. Additional charge is Rs. 2,000.', createdAt: '2026-04-14T14:50:00.000Z' },
    ],
  },
  {
    id: 'mock-ticket-2',
    ticketNumber: 'TKT-2196',
    customerName: 'Sana Malik',
    customerEmail: 'sana.malik@example.com',
    subject: 'Tracking number request',
    status: 'OPEN',
    priority: 'MEDIUM',
    createdAt: '2026-04-13T10:05:00.000Z',
    updatedAt: '2026-04-13T10:05:00.000Z',
    messages: [{ sender: 'USER', text: 'Please share tracking details for ORD-98219.', createdAt: '2026-04-13T10:05:00.000Z' }],
  },
  {
    id: 'mock-ticket-3',
    ticketNumber: 'TKT-2189',
    customerName: 'Mina Tariq',
    customerEmail: 'mina.tariq@example.com',
    subject: 'Frame fit adjustment query',
    status: 'RESOLVED',
    priority: 'LOW',
    createdAt: '2026-04-11T09:40:00.000Z',
    updatedAt: '2026-04-12T08:15:00.000Z',
    messages: [
      { sender: 'USER', text: 'Can I get frame fit adjustment at your Lahore branch?', createdAt: '2026-04-11T09:40:00.000Z' },
      { sender: 'ADMIN', text: 'Yes, complimentary fitting is available within 30 days of purchase.', createdAt: '2026-04-12T08:15:00.000Z' },
    ],
  },
];

export function getMockProducts() {
  return mockProducts.map((product) => ({ ...product }));
}

export function getMockProductById(id) {
  return mockProducts.find((product) => product.id === id || product.slug === id) || null;
}

export function getMockCollectionBySlug(slug) {
  const product = mockProducts.find((item) => item.brandSlug === slug || item.categorySlug === slug);

  if (!product) {
    return {
      slug,
      name: slug?.replace(/-/g, ' ')?.toUpperCase() || 'COLLECTION',
      type: 'unknown',
      count: 0,
      bio: 'A legacy of precision.',
    };
  }

  const isBrand = product.brandSlug === slug;
  const isCategory = product.categorySlug === slug;

  const collectionType = isBrand ? 'brand' : isCategory ? 'category' : 'unknown';
  const collectionName = isBrand ? product.brand : product.category;

  return {
    slug,
    name: collectionName,
    type: collectionType,
    count: mockProducts.filter((item) => item.brandSlug === slug || item.categorySlug === slug).length,
    bio:
      collectionType === 'brand'
        ? `${collectionName} curated through the shared mock inventory.`
        : `${collectionName} category pulled from the shared mock inventory.`,
  };
}

export function getMockProductsBySlug(slug) {
  return mockProducts.filter((item) => item.brandSlug === slug || item.categorySlug === slug);
}

export function getMockBrands() {
  const brands = new Map();

  for (const product of mockProducts) {
    if (!brands.has(product.brandSlug)) {
      brands.set(product.brandSlug, {
        slug: product.brandSlug,
        name: product.brand,
        count: 0,
      });
    }

    brands.get(product.brandSlug).count += 1;
  }

  return Array.from(brands.values());
}

export function getMockCategories() {
  const categories = new Map();

  for (const product of mockProducts) {
    if (!categories.has(product.categorySlug)) {
      categories.set(product.categorySlug, {
        slug: product.categorySlug,
        name: product.category,
        count: 0,
      });
    }

    categories.get(product.categorySlug).count += 1;
  }

  return Array.from(categories.values());
}

export function getMockOrders() {
  return mockOrders.map((order) => ({ ...order }));
}

export function getMockUsers() {
  return mockUsers.map((user) => ({ ...user }));
}

export function getMockTickets() {
  return mockTickets.map((ticket) => ({ ...ticket, messages: ticket.messages.map((message) => ({ ...message })) }));
}

export function getMockDashboardSnapshot() {
  const products = getMockProducts();
  const orders = getMockOrders();
  const users = getMockUsers();
  const tickets = getMockTickets();

  const revenue = orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
  const openOrders = orders.filter((order) => ['PENDING', 'PROCESSING'].includes(order.status)).length;
  const lowStockCount = products.filter((product) => product.stock <= 5 && product.status === 'ACTIVE').length;
  const queueSize = tickets.filter((ticket) => ['OPEN', 'IN_PROGRESS'].includes(ticket.status)).length;

  return {
    productStats: {
      total: products.length,
      byStatus: products.reduce(
        (acc, product) => {
          acc[product.status] = (acc[product.status] || 0) + 1;
          return acc;
        },
        { ACTIVE: 0, DRAFT: 0, ARCHIVED: 0 }
      ),
      lowStockCount,
    },
    orderStats: {
      total: orders.length,
      byStatus: orders.reduce(
        (acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        },
        { PENDING: 0, PROCESSING: 0, SHIPPED: 0, DELIVERED: 0, CANCELLED: 0 }
      ),
      open: openOrders,
    },
    userCount: users.length,
    ticketStats: {
      total: tickets.length,
      byStatus: tickets.reduce(
        (acc, ticket) => {
          acc[ticket.status] = (acc[ticket.status] || 0) + 1;
          return acc;
        },
        { OPEN: 0, IN_PROGRESS: 0, RESOLVED: 0 }
      ),
      queueSize,
    },
    revenueSummary: {
      windowDays: 30,
      revenue,
      avgOrderValue: orders.length ? revenue / orders.length : 0,
      count: orders.length,
    },
    latestOrders: orders.slice(0, 5),
    generatedAt: new Date().toISOString(),
    isMock: true,
  };
}

export function getMockProductsByBrand(slug) {
  return mockProducts.filter((product) => product.brandSlug === slug);
}

export function getMockProductsByCategory(slug) {
  return mockProducts.filter((product) => product.categorySlug === slug);
}
