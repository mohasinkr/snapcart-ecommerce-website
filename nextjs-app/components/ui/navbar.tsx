"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Heart, SearchIcon, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories: { title: string; href: string; description: string }[] = [
  {
    title: "Men's Clothing",
    href: "/category/mens",
    description:
      "Explore our collection of men's apparel including shirts, pants, jackets and accessories.",
  },
  {
    title: "Women's Clothing",
    href: "/category/womens",
    description:
      "Discover the latest trends in women's fashion from casual wear to elegant dresses.",
  },
  {
    title: "Accessories",
    href: "/category/accessories",
    description:
      "Complete your look with our range of accessories including bags, jewelry, and more.",
  },
  {
    title: "Footwear",
    href: "/category/footwear",
    description:
      "Step out in style with our selection of shoes for all occasions.",
  },
  {
    title: "New Arrivals",
    href: "/new-arrivals",
    description:
      "Be the first to shop our latest products and collections fresh off the runway.",
  },
  {
    title: "Sale",
    href: "/sale",
    description:
      "Great deals on fashion items with discounts up to 70% off original prices.",
  },
];

const featuredCollections: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Summer Collection",
    href: "/collections/summer",
    description: "Light and breathable pieces perfect for the warm season.",
  },
  {
    title: "Winter Essentials",
    href: "/collections/winter",
    description: "Stay warm and stylish with our cold-weather favorites.",
  },
  {
    title: "Sustainable Fashion",
    href: "/collections/sustainable",
    description:
      "Eco-friendly clothing made with sustainable materials and practices.",
  },
];

export function Navbar() {
  return (
    <NavigationMenu className="max-w-none p-5">
      <NavigationMenuList className="space-x-10">
        <NavigationMenuItem className="text-3xl font-medium">
          SnapCart
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      SnapCart Store
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Discover the latest fashion trends and shop our curated
                      collections.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/new-arrivals" title="New Arrivals">
                The latest additions to our store - fresh styles updated weekly.
              </ListItem>
              <ListItem href="/bestsellers" title="Best Sellers">
                Our most popular items loved by customers worldwide.
              </ListItem>
              <ListItem href="/sale" title="Sale">
                Great deals on fashion items with discounts up to 70% off.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {categories.map((category) => (
                <ListItem
                  key={category.title}
                  title={category.title}
                  href={category.href}
                >
                  {category.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px] ">
              {featuredCollections.map((collection) => (
                <ListItem
                  key={collection.title}
                  title={collection.title}
                  href={collection.href}
                >
                  {collection.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <div className="space-x-2 flex">
          <NavigationMenuItem>
            <Button variant={"ghost"} aria-label="Search">
              <SearchIcon className="h-5 w-5" />
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button variant={"ghost"} aria-label="Wishlist">
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button variant={"ghost"} aria-label="Shopping Cart">
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
              </Link>
            </Button>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
