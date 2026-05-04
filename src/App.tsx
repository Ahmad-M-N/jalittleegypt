import { useEffect, useMemo, useState, type ReactNode } from "react";
import heroLogo from "./JALE Logo -- Transparent.png";

type MenuItem = {
  name: string;
  description: string;
  tags?: string[];
};

type MenuCategory = {
  title: string;
  items: MenuItem[];
};

const menuCategories: MenuCategory[] = [
  {
    title: "Shawarma & Plates",
    items: [
      {
        name: "Chicken Shawarma Sandwich",
        description:
          "Marinated chicken cut into pieces, salad, garlic sauce, warm pita.",
        tags: ["popular"],
      },
      {
        name: "Chicken Shawarma Meal",
        description: "Shawarma plate with rice, salad, pita, and garlic sauce.",
        tags: ["full meal"],
      },
      {
        name: "Chicken Shawarma Bowl",
        description:
          "Shawarma over Samir's rice with side of salad and garlic sauce.",
        tags: ["bowl"],
      },
      {
        name: "Gyro Sandwich",
        description:
          "Seasoned beef and lamb, tzatziki, lettuce, tomato, onion, soft pita.",
      },
      {
        name: "Gyro Bowl",
        description: "Gyro meat over rice with crisp salad and tzatziki.",
      },
      {
        name: "Gyro Meal",
        description: "Gyro plate with rice, salad, pita, and sauces.",
      },
      {
        name: "Shish Kebab",
        description:
          "Char-grilled skewers with peppers, onions, and warm spice.",
      },
      {
        name: "Chicken Kebab",
        description: "Lemon-sumac marinated chicken skewers from the grill.",
      },
      {
        name: "Baked Chicken",
        description: "Oven-baked, spice-brushed chicken, juicy and tender.",
      },
      {
        name: "Fresh Chicken Tenders",
        description: "Hand-breaded chicken tenders, fried crisp.",
      },
    ],
  },
  {
    title: "Sides & Rice",
    items: [
      {
        name: "Fried Chicken Potato Wedges (hand cut)",
        description: "Hand-cut, house-seasoned wedges fried to order.",
        tags: ["side"],
      },
      {
        name: "Fresh Mac & Cheese",
        description: "Creamy béchamel mac with a toasted finish.",
      },
      {
        name: "Samir’s Rice",
        description: "House rice with warm spices and toasted vermicelli.",
      },
      {
        name: "Yellow Rice",
        description: "Tumeric, black pepper, fried onions with fluffy grains.",
      },
      {
        name: "Green Bean Deluxe",
        description: "Stewed green beans with bacon, onion, and garlic.",
      },
      {
        name: "Vegan Mashed Potatoes",
        description: "Potatos mashed with olive oil, garlic and parsley.",
        tags: ["vegan"],
      },
      {
        name: "Egyptian Mashed Potatoes",
        description: "Butter-whipped potatoes with warm spice.",
      },
    ],
  },
  {
    title: "Mezze & Salads",
    items: [
      {
        name: "Hummus",
        description: "Chickpeas, garlic, tahini, lemon, olive oil.",
        tags: ["vegan"],
      },
      {
        name: "Fresh Pita Chips",
        description: "Crisp pita chips served with house seasoning.",
      },
      {
        name: "Falafel",
        description: "Herb-packed chickpea fritters, sesame crust.",
        tags: ["vegan"],
      },
      {
        name: "Tabouli",
        description: "Parsley, bulgur, tomato, mint, green onion, and lemon.",
        tags: ["fresh"],
      },
      {
        name: "Baba Ghanoush",
        description:
          "Smoked eggplant, tahini, olive oil, parsley, and mild peppers.",
        tags: ["smoky"],
      },
      {
        name: "Fattoush",
        description: "Crisp salad, sumac dressing, toasted pita.",
      },
      {
        name: "Cucumber Tomato Salad",
        description: "Diced cucumber, tomato, lemon, and herbs.",
        tags: ["light"],
      },
    ],
  },
  {
    title: "Sweets",
    items: [
      {
        name: "Baklava",
        description: "Phyllo layers, walnuts, and citrus honey.",
        tags: ["sweet"],
      },
      {
        name: "Kunafa",
        description: "Shredded phyllo with sweet cheese and warm syrup.",
      },
      {
        name: "Basbousa",
        description: "Semolina cake with coconut and syrup.",
      },
      {
        name: "Rice Pudding",
        description: "Creamy rice with a hint of vanilla.",
      },
    ],
  },
];

const contact = {
  address: "702 S Chestnut St, Reed City, MI 49677",
  phone: "(231) 832-9924",
  hours: ["Mon–Fri 8:00a – 7:00p", "Sat 9:00a – 6:00p"],
};

const galleryModules = import.meta.glob(
  "./Gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" },
) as Record<string, string>;

const galleryImages = Object.entries(galleryModules)
  .map(([path, src]) => {
    const fileName = path.split("/").pop() ?? "gallery photo";
    const title = fileName
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return {
      src,
      alt: `${title} from J&A Little Egypt`,
    };
  })
  .sort((left, right) => left.alt.localeCompare(right.alt));

function Section({
  id,
  kicker,
  title,
  children,
}: {
  id?: string;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="section" id={id}>
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">{kicker}</span>
          <h2 className="section-title">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function App() {
  const [galleryColumnCount, setGalleryColumnCount] = useState(3);

  useEffect(() => {
    const updateGalleryColumns = () => {
      setGalleryColumnCount(window.innerWidth <= 1040 ? 2 : 3);
    };

    updateGalleryColumns();
    window.addEventListener("resize", updateGalleryColumns);

    return () => {
      window.removeEventListener("resize", updateGalleryColumns);
    };
  }, []);

  const galleryColumns = useMemo(() => {
    const columns = Array.from(
      { length: galleryColumnCount },
      () => [] as typeof galleryImages,
    );

    galleryImages.forEach((image, index) => {
      columns[index % galleryColumnCount].push(image);
    });

    return columns;
  }, [galleryColumnCount]);

  return (
    <main>
      <header className="hero">
        <div className="container hero-inner">
          <div className="hero-brand">
            <img
              className="hero-logo"
              src={heroLogo}
              alt="J&A Little Egypt logo"
            />
            <h1 className="tagline">
              Come for the food, leave with an experience.
            </h1>
          </div>
        </div>
      </header>

      <Section
        id="menu"
        kicker="Menu"
        title="Egyptian plates, bowls, and mezze"
      >
        <div className="menu-columns">
          {menuCategories.map((category) => (
            <div key={category.title} className="menu-group">
              <div className="menu-heading">{category.title}</div>
              <div className="menu-list">
                {category.items.map((item) => (
                  <div key={item.name} className="menu-item-row">
                    <div className="menu-name-row">
                      <div className="menu-name">{item.name}</div>
                      {item.tags && item.tags.length > 0 && (
                        <div className="menu-tags">{item.tags.join(" · ")}</div>
                      )}
                    </div>
                    <div className="menu-desc">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="gallery" kicker="Gallery" title="Inside J&A Little Egypt">
        <div className="gallery-grid">
          {galleryColumns.map((column, columnIndex) => (
            <div
              key={`gallery-column-${columnIndex}`}
              className="gallery-column"
            >
              {column.map((image) => (
                <figure key={image.src} className="gallery-item">
                  <img
                    className="gallery-photo"
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section id="details" kicker="Details" title="Call, visit, or dine in">
        <div className="details-grid">
          <div>
            <div className="detail-heading">Hours</div>
            <div className="detail-body">{contact.hours.join(" · ")}</div>
          </div>
          <div>
            <div className="detail-heading">Address</div>
            <div className="detail-body">{contact.address}</div>
          </div>
          <div>
            <div className="detail-heading">Contact</div>
            <div className="detail-body">{contact.phone} ·</div>
          </div>
        </div>
      </Section>
    </main>
  );
}

export default App;
