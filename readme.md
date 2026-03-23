Ten projekt to prosta księgarnia internetowa. Aplikacja umożliwia przeglądanie produktów, 
wystawianie opinii, dodawanie produktów do koszyka, finalizowanie zamówień, rejestrację oraz logowanie.

Autorzy: Jakub Kowalewski, Marcel Pokrywka, Emilia Tokarz

# Funkcjonalności:

Projekt został podzielony na dwie sekcje 
jako że mamy dwa poziomy uprawnień użytkowników: administratora oraz zwykłego usera

FUNKCJONALNOŚCI ADMINSITE:
- pulpit z dwoma wykresami które pokazują liczbę zamówień dla konkretnego dnia oraz dzienną sprzedaż (PLN)
- przejrzenie listy wszystkich produktów
- edycja produktu: zmiana zdjęcia oraz danych, lub jego usunięcie
- dodanie nowego produktu wraz z zdjęciem
- przejrzenie listy gatunków książek
- dodanie/usunięcie nowego gatunku
- edycja istniejącego gatunku
- przejrzenie listy wszystkich zamówień
- wybranie jednego zamówienia i sprawdzenie jego szczegółów
- edycja wybranego zamówienia
- usunięcie zamówienia
- możliwość zaktualizowania głównego produktu na stronie głównej

- FUNKCJONALNOŚCI USERSITE:

- możliwość zarejestrowania się
- pamiętanie danych logowania
- zalogowanie się
- użycie JWT token
- możliwość przejrzenia głównego produktu na stronie
- przejrzenie wszystkich dostępnych produktów
- filtrowanie produktów: po nazwie, cenie lub kategorii
- możliwość obejrzenia jednego produktu i jego detali
- dodanie produktu do koszyka
- wystawienie opinii o produkcie
- możliwość edycji koszyka
- przeliczanie wartości zamówienia
- złożenie zamówienia
  
Wszystkie operacje zostają zapisane w bazie danych na MongoDB
## Technologie
-   React
-   Tailwind CSS
-   Node JS
-   MongoDB
