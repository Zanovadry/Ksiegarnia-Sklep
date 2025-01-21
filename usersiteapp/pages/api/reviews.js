import { mongooseConnect } from "../../lib/mongoose";
import mongoose from "mongoose";

// Review Schema
const ReviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default async function handle(req, res) {
    const { method, body, query } = req;
    await mongooseConnect();

    try {
        if (method === "GET") {
            // Download reviews for a certain product
            if (!query?.id) {
                return res
                    .status(400)
                    .json({ error: "Brakuje ID produktu w zapytaniu" });
            }

            const reviews = await Review.find({ productId: query.id }).lean();
            console.log(reviews);
            return res.status(200).json(reviews);
        }

        if (method === "POST") {
            const { productId, content, rating } = body;

            // Validate that review is correct
            if (!productId || !content || typeof rating !== "number") {
                return res
                    .status(400)
                    .json({ error: "Wszystkie pola są wymagane" });
            }

            // Create new review
            const newReview = await Review.create({
                productId,
                content,
                rating,
            });

            return res.status(201).json(newReview);
        }

        return res.status(400).json({ error: "Invalid request" });
    } catch (error) {
        console.error("Error processing request:", error);
        return res
            .status(500)
            .json({ error: error.message || "Something went wrong" });
    }
}
