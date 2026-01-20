import { Router, Response } from "express";
import { products } from "../data/products";

const router = Router();


router.get("/hello", (_req: any, res: Response) => {
  res.send("Hello World!");
});

const authenticate = () => {
  return (req: any, res: Response, next: any) => {
    if (req.cookies?.user) {
      return next();
    }

    return res.status(401).json({
      message: "Not authenticated"
    });
  };
};

router.post("/add-to-cart", authenticate(), (_req: any, res: Response) => {
  res.send("Added to cart");
  res.redirect("/hello");
});

router.post("/login", (_req: any, res: Response) => {
  res.status(200).json({
    message: "Logged in"
  });
  res.redirect("/products");

});



router.get("/products", (_req: any, res: Response) => {
  res.json(products);
});

export default router;
