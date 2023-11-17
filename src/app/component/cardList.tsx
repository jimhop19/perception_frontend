import Card from "./card"

interface SearchResult {
  spider_name: string;
  items: any[];
}

const CardList = ({ searchResultsArray }: { searchResultsArray: SearchResult[] }) => {
  
  return (    
    searchResultsArray
      .filter((e) => e.items.length > 0)
      .map((searchResults) => {
        return (
          <Card key={searchResults.spider_name} data={searchResults} />
        );
      })
  );
};


export default CardList