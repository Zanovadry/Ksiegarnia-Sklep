import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import NavBar from "../components/Nav"; // Komponent Navbar
import { useRouter } from "next/router"; // Hook do pobierania params z URL
import { Footer, FooterText } from "../components/Layout"; // Footer
import Cookies from "js-cookie";

const ProductPageWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
    min-height: 100vh;
    background-color: #f5f5f5;
    flex-direction: row;
    margin-top: 5vh;
`;

const ProductDetailsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    margin-top: 40px;
    background-color: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 49.5%;
    max-width: 1200px;
`;

const ProductImageWrapper = styled.div`
    flex: 1;
    margin-right: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProductImage = styled.img`
    width: 100%;
    max-width: 500px;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
`;

const ProductInfoWrapper = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const ProductTitle = styled.h2`
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
`;

const ProductAuthor = styled.h3`
    font-size: 1.5rem;
    color: #666;
    margin-bottom: 15px;
`;

const ProductDescription = styled.p`
    font-size: 1rem;
    color: #444;
    margin-bottom: 25px;
    line-height: 1.5;
    max-width: 500px;
`;

const ProductPrice = styled.div`
    font-size: 1.75rem;
    font-weight: bold;
    color: #00b300;
    margin-bottom: 25px;
`;

const ProductDetails = styled.div`
    font-size: 1.1rem;
    color: #444;
    margin-top: 20px;
    width: 90%;
`;

const ProductPublisher = styled.div`
    margin-bottom: 10px;
`;

const ProductPages = styled.div`
    margin-bottom: 10px;
`;

const ProductIsbn = styled.div`
    margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

const Button = styled.button`
    padding: 12px 20px;
    background-color: #007bff;
    color: white;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

const ReviewsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto; /* Włącz przewijanie w pionie */
    margin-bottom: 20px;
`;

const Review = styled.div`
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ReviewRating = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #007bff;
`;

const ReviewContent = styled.p`
    font-size: 1rem;
    color: #444;
    line-height: 1.5;
`;

const ReviewFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    height: 50%;
`;

const ReviewFormTitle = styled.h3`
    font-size: 1.75rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
`;

const ReviewCreateWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const ReviewInputWrapper = styled.div`
    margin-bottom: 15px;
`;

const RatingInput = styled.input`
    padding: 10px;
    font-size: 1.2rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    width: 100px;
    margin-right: 20px;
`;

const TextArea = styled.textarea`
    padding: 10px;
    font-size: 1.2rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    resize: none;
`;

const SubmitButton = styled(Button)`
    background-color: #28a745;
    &:hover {
        background-color: #218838;
    }
`;

const ProductReviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    background-color: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 49.5%;
    max-width: 1200px;
    max-height: 120vh;
`;

const ReviewPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    background-color: #f5f5f5;
    min-height: 100vh;
`;

export default function ProductPage() {
    const router = useRouter(); // Hook to get params from URL
    const { id } = router.query; // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [newReview, setNewReview] = useState("");
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`/api/products?id=${id}`); // Fetch product by ID
                    setProduct(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching product:", error);
                    setLoading(false);
                }
            };
            const fetchReviews = async () => {
                try {
                    const response = await axios.get(`/api/reviews?id=${id}`); // Fetch product by ID
                    setReviews(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching product:", error);
                    setLoading(false);
                }
            };

            fetchProduct();
            fetchReviews();
        }
    }, [id]); // Effect triggered when id in URL changes

    const handleSubmit = async () => {
        //Handle new review submit
        if (rating < 1 || rating > 5 || !newReview.trim()) {
            alert("Proszę podać ocenę (1-5) oraz treść opinii.");
            return;
        }

        try {
            // Use endpoint to post review for a certain product
            const response = await axios.post(`/api/reviews`, {
                productId: id,
                content: newReview,
                rating: rating,
            });

            setReviews([response.data, ...reviews]); // Locally add new review
            setNewReview(""); // Reset input field
            setRating(0); // Reset input field
            alert("Twoja opinia została dodana!");
        } catch (error) {
            console.error("Błąd podczas dodawania opinii:", error);
            alert("Coś poszło nie tak. Spróbuj ponownie później.");
        }
    };

    const addToCart = () => {
        // Get existing cart from cookies (if any)
        const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [];

        // Add the current product to the cart
        const productToAdd = {
            productId: product._id,
            title: product.title,
            price: product.price,
            quantity: 1, // Assuming the user wants 1 of the product. You can add logic for quantity if needed.
        };

        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(
            (item) => item.productId === product._id
        );
        if (existingProductIndex !== -1) {
            // If it exists, update the quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // If it's new, push the product into the cart
            cart.push(productToAdd);
        }

        // Save updated cart to cookies
        Cookies.set("cart", JSON.stringify(cart));

        alert(`${product.title} dodano do koszyka!`);
        window.location.reload();
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!product) {
        return <h2>Product not found</h2>;
    }

    return (
        <div>
            <NavBar />
            <ProductPageWrapper>
                <ProductDetailsWrapper>
                    {/* Product Image */}
                    <ProductImageWrapper>
                        <ProductImage
                            src={product.images[0]}
                            alt={product.title}
                        />
                    </ProductImageWrapper>

                    {/* Product Info */}
                    <ProductInfoWrapper>
                        <ProductTitle>{product.title}</ProductTitle>
                        <ProductAuthor>{product.author}</ProductAuthor>
                        <ProductDescription>
                            {product.description}
                        </ProductDescription>
                        <ProductPrice>{product.price} pln</ProductPrice>

                        {/* Additional Product Details */}
                        <ProductDetails>
                            <ProductPublisher>
                                Publisher: {product.publisher.name}
                            </ProductPublisher>
                            <ProductPublisher>
                                Rok: {product.publisher.year}
                            </ProductPublisher>
                            <ProductPages>Strony: {product.pages}</ProductPages>
                            <ProductIsbn>ISBN: {product.isbn}</ProductIsbn>
                            <ProductIsbn>Jezyk: {product.language}</ProductIsbn>
                        </ProductDetails>
                    </ProductInfoWrapper>
                    <ButtonWrapper>
                        <Button onClick={addToCart}>Dodaj do koszyka</Button>
                    </ButtonWrapper>
                </ProductDetailsWrapper>
                <ProductReviewWrapper>
                    <ReviewsWrapper>
                        {reviews && reviews.length > 0 ? (
                            reviews.map((review) => (
                                <Review key={review.id}>
                                    <ReviewRating>
                                        Ocena: {review.rating} / 5
                                    </ReviewRating>
                                    <ReviewContent>
                                        {review.content}
                                    </ReviewContent>
                                </Review>
                            ))
                        ) : (
                            <Review>
                                <ReviewRating></ReviewRating>
                                <ReviewContent>Brak opinii</ReviewContent>
                            </Review>
                        )}
                    </ReviewsWrapper>

                    <ReviewFormWrapper>
                        <ReviewFormTitle>Dodaj swoją opinię</ReviewFormTitle>
                        <ReviewCreateWrapper>
                            <ReviewInputWrapper>
                                <label>Ocena (1-5):</label>
                                <RatingInput
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={rating}
                                    onChange={(e) =>
                                        setRating(parseInt(e.target.value))
                                    }
                                />
                            </ReviewInputWrapper>
                            <ReviewInputWrapper>
                                <label>Treść opinii:</label>
                                <TextArea
                                    value={newReview}
                                    onChange={(e) =>
                                        setNewReview(e.target.value)
                                    }
                                    placeholder="Napisz swoją opinię"
                                />
                            </ReviewInputWrapper>
                            <SubmitButton onClick={handleSubmit}>
                                Dodaj opinię
                            </SubmitButton>
                        </ReviewCreateWrapper>
                    </ReviewFormWrapper>
                </ProductReviewWrapper>
            </ProductPageWrapper>

            {/* Product Reviews */}

            <Footer>
                <FooterText>
                    &copy; 2025 E-Biblioteka. All Rights Reserved.
                </FooterText>
            </Footer>
        </div>
    );
}
