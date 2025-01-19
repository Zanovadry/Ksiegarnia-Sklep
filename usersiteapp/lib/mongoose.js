import mongoose from "mongoose";

// URL połączenia z bazą danych Ksiegarnia
const MONGO_URL =
    "mongodb+srv://admin:admin@cluster0.b0xcg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function mongooseConnect() {
    // Sprawdzenie, czy już istnieje połączenie
    if (mongoose.connection.readyState === 1) {
        console.log("Połączono z bazą danych Ksiegarnia");
        return mongoose.connection;
    }

    console.log("Łączenie z bazą danych Ksiegarnia...");
    return mongoose.connect(MONGO_URL).then(() => {
        console.log("Połączono z bazą danych Ksiegarnia");
    });
}
