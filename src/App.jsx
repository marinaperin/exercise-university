/* L'idea è di creare una React App che permette di cercare i link ai siti delle università italiane.

Nel componente App, create uno state [universities, setUniversities], che rappresenta un array di oggetti inizialmente vuoto. 
Al MountEnd viene eseguita una fetch a "http://universities.hipolabs.com/search?country=Italy" e a partire dall'oggetto risultante, 
viene creato un array con la seguente struttura:
[
  {
    name: "Bocconi University",
    url: "http://www.unibocconi.eu/"
  },
  {
    name: "University of Foggia",
    url: "http://www.unifg.it/"
  },
  ...
].

Quindi, create due componenti:
1. UniversityList, che rappresenta i link alle università, cliccabili e che vi portano sul sito esterno.
2. SearchBar, che rappresenta l'input con bottone "Cerca", per cercare tra le università.
Note: la ricerca avviene in locale (dovete filtrare l'array universities usando filter)

BONUS Funzionalita
- In UniversityList, al click di un bottone "Sort", la lista di universita viene ordinata in ordine alfabetico.
- In SearchBar, un contatore mostra all'utente quante ricerce sono state effettuate.

BONUS Stile
- In UniversityList, usando il random url di unsplash "https://source.unsplash.com/random/?{searchTerm}", aggiungi un immagine per ogni universita, creando delle vere e proprie Card al posto di una lista.
- In SearchBar, fintanto che il campo di testo è vuoto, il bottone Cerca è disattivato e ha uno stile specifico in CSS.
 */

import { useEffect, useState } from "react";
import "./App.scss";
import UniversityList from "./components/UniversityList";
import SearchBar from "./components/SearchBar";

function App() {
  const [universities, setUniversities] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  const universityFetch = async () => {
    try {
      const response = await fetch(
        "http://universities.hipolabs.com/search?country=Italy"
      );
      const result = await response.json();
      const universities = result.map((university) => {
        const { name, web_pages } = university;
        const newObj = { name: name, url: web_pages[0] };
        return newObj;
      });
      setUniversities(universities);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    universityFetch();
  }, []);

  const handleSort = () => {
    setUniversities([
      ...universities.sort((a, b) => (a.name < b.name ? -1 : 1)),
    ]);
    setIsSorted(true);
  };

  return (
    <>
    <h1>Browse Universities in Italy</h1>
      <SearchBar
        setUniversities={setUniversities}
        universities={universities}
        isSorted={isSorted}
      />
      <UniversityList sortClick={handleSort} universities={universities} />
    </>
  );
}

export default App;
